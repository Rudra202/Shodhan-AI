import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';
import type { JwtPayload } from '../types/index.js';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json({ success: true, message: 'Registration successful. Please verify your email.', data: result });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.loginUser(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ success: false, error: 'Refresh token is required' });
      return;
    }
    const result = await authService.refreshTokens(refreshToken);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as unknown as Record<string, unknown>).user as JwtPayload;
    await authService.logoutUser(user.userId);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({ success: true, message: 'If the email exists, a reset link has been sent.' });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.resetPassword(req.body);
    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.verifyEmail(req.body.token);
    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as unknown as Record<string, unknown>).user as JwtPayload;
    await authService.changePassword(user.userId, req.body.currentPassword, req.body.newPassword);
    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (err) {
    next(err);
  }
}
