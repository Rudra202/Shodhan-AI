import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { generateRandomToken, calculateExpiry } from '../utils/helpers.js';
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../lib/mailer.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { JwtPayload } from '../types/index.js';

async function getUserRoles(userId: string): Promise<string[]> {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: { role: true },
  });
  return userRoles.map((ur) => ur.role.name);
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  username?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  if (data.username) {
    const usernameTaken = await prisma.user.findUnique({ where: { username: data.username } });
    if (usernameTaken) {
      throw new AppError('Username already taken', 409);
    }
  }

  const hashedPassword = await hashPassword(data.password);
  const role = await prisma.role.findUnique({ where: { name: 'EMPLOYEE' } });
  if (!role) {
    throw new AppError('Default role not found', 500);
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      username: data.username,
      roles: {
        create: { roleId: role.id },
      },
      settings: {
        create: {},
      },
    },
  });

  const verificationToken = generateRandomToken();
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      token: verificationToken,
      type: 'EMAIL_VERIFICATION',
      expiresAt: calculateExpiry(1440),
    },
  });

  try {
    await sendVerificationEmail(data.email, verificationToken);
  } catch (err) {
    console.error('Failed to send verification email:', err);
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'USER_REGISTERED',
      entity: 'User',
      entityId: user.id,
    },
  });

  return { userId: user.id, email: user.email, name: user.name };
}

export async function loginUser(data: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !user.password) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Account is deactivated', 403);
  }

  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const roles = await getUserRoles(user.id);
  const payload: JwtPayload = { userId: user.id, email: user.email, roles };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: calculateExpiry(7 * 24 * 60),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'USER_LOGIN',
      entity: 'User',
      entityId: user.id,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      isVerified: user.isVerified,
      roles,
    },
    accessToken,
    refreshToken,
  };
}

export async function refreshTokens(refreshTokenStr: string) {
  let payload: JwtPayload;
  try {
    payload = verifyRefreshToken(refreshTokenStr);
  } catch {
    throw new AppError('Invalid refresh token', 401);
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshTokenStr } });
  if (!stored || stored.revokedAt) {
    throw new AppError('Refresh token has been revoked', 401);
  }

  if (stored.expiresAt < new Date()) {
    throw new AppError('Refresh token has expired', 401);
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.isActive) {
    throw new AppError('User not found or inactive', 401);
  }

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const roles = await getUserRoles(user.id);
  const newPayload: JwtPayload = { userId: user.id, email: user.email, roles };

  const newAccessToken = signAccessToken(newPayload);
  const newRefreshToken = signRefreshToken(newPayload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: newRefreshToken,
      expiresAt: calculateExpiry(7 * 24 * 60),
    },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logoutUser(userId: string) {
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      userId,
      action: 'USER_LOGOUT',
      entity: 'User',
      entityId: userId,
    },
  });
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return;
  }

  const token = generateRandomToken();
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      token,
      type: 'PASSWORD_RESET',
      expiresAt: calculateExpiry(60),
    },
  });

  try {
    await sendPasswordResetEmail(email, token);
  } catch (err) {
    console.error('Failed to send password reset email:', err);
  }
}

export async function resetPassword(data: { token: string; password: string }) {
  const stored = await prisma.verificationToken.findUnique({ where: { token: data.token } });
  if (!stored || stored.usedAt) {
    throw new AppError('Invalid or used reset token', 400);
  }

  if (stored.type !== 'PASSWORD_RESET') {
    throw new AppError('Invalid token type', 400);
  }

  if (stored.expiresAt < new Date()) {
    throw new AppError('Reset token has expired', 400);
  }

  const hashedPassword = await hashPassword(data.password);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: stored.userId },
      data: { password: hashedPassword },
    }),
    prisma.verificationToken.update({
      where: { id: stored.id },
      data: { usedAt: new Date() },
    }),
    prisma.refreshToken.updateMany({
      where: { userId: stored.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);
}

export async function verifyEmail(token: string) {
  const stored = await prisma.verificationToken.findUnique({ where: { token } });
  if (!stored || stored.usedAt) {
    throw new AppError('Invalid or used verification token', 400);
  }

  if (stored.type !== 'EMAIL_VERIFICATION') {
    throw new AppError('Invalid token type', 400);
  }

  if (stored.expiresAt < new Date()) {
    throw new AppError('Verification token has expired', 400);
  }

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: stored.userId },
      data: { isVerified: true },
    }),
    prisma.verificationToken.update({
      where: { id: stored.id },
      data: { usedAt: new Date() },
    }),
  ]);

  try {
    await sendWelcomeEmail(user.email, user.name || 'User');
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.password) {
    throw new AppError('User not found', 404);
  }

  const valid = await comparePassword(currentPassword, user.password);
  if (!valid) {
    throw new AppError('Current password is incorrect', 400);
  }

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function handleOAuthUser(data: {
  email: string;
  name: string;
  avatarUrl?: string;
  provider: string;
}) {
  let user = await prisma.user.findUnique({ where: { email: data.email } });

  if (user) {
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }
    const roles = await getUserRoles(user.id);
    const payload: JwtPayload = { userId: user.id, email: user.email, roles };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: calculateExpiry(7 * 24 * 60),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        roles,
      },
      accessToken,
      refreshToken,
    };
  }

  const role = await prisma.role.findUnique({ where: { name: 'EMPLOYEE' } });
  if (!role) {
    throw new AppError('Default role not found', 500);
  }

  user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
      isVerified: true,
      roles: {
        create: { roleId: role.id },
      },
      settings: {
        create: {},
      },
    },
  });

  const roles = await getUserRoles(user.id);
  const payload: JwtPayload = { userId: user.id, email: user.email, roles };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: calculateExpiry(7 * 24 * 60),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: `USER_REGISTERED_VIA_${data.provider.toUpperCase()}`,
      entity: 'User',
      entityId: user.id,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      isVerified: user.isVerified,
      roles,
    },
    accessToken,
    refreshToken,
  };
}
