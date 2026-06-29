import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

export async function getMyProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      roles: { include: { role: true } },
      settings: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified,
    roles: user.roles.map((r) => r.role.name),
    profile: user.profile,
    settings: user.settings,
    createdAt: user.createdAt,
  };
}

export async function updateProfile(userId: string, data: Record<string, unknown>) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (data.username && data.username !== user.username) {
    const existing = await prisma.user.findUnique({ where: { username: data.username as string } });
    if (existing) {
      throw new AppError('Username already taken', 409);
    }
  }

  const { bio, phone, location, website, company, jobTitle, ...userData } = data as Record<string, string>;

  await prisma.$transaction(async (tx) => {
    if (Object.keys(userData).length > 0) {
      await tx.user.update({
        where: { id: userId },
        data: userData,
      });
    }

    await tx.profile.upsert({
      where: { userId },
      create: { userId, bio, phone, location, website, company, jobTitle },
      update: { bio, phone, location, website, company, jobTitle },
    });
  });

  return getMyProfile(userId);
}

export async function updateAvatar(userId: string, avatarUrl: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { avatarUrl },
    select: { id: true, avatarUrl: true },
  });
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      roles: { include: { role: true } },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified,
    roles: user.roles.map((r) => r.role.name),
    profile: user.profile,
    createdAt: user.createdAt,
  };
}

export async function listUsers(params: { page: number; limit: number; search?: string; role?: string }) {
  const { page, limit, search, role } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
      { username: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (role) {
    where.roles = { some: { role: { name: role } } };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      include: {
        roles: { include: { role: true } },
        profile: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      username: u.username,
      avatarUrl: u.avatarUrl,
      isVerified: u.isVerified,
      isActive: u.isActive,
      roles: u.roles.map((r) => r.role.name),
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function toggleUserStatus(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { isActive: !user.isActive },
  });

  if (!updated.isActive) {
    await prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  return { id: updated.id, isActive: updated.isActive };
}

export async function deleteUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  await prisma.user.delete({ where: { id: userId } });
}
