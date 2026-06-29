import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service.js';
import type { JwtPayload } from '../types/index.js';

function getUser(req: Request): JwtPayload {
  return (req as unknown as Record<string, unknown>).user as JwtPayload;
}

export async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await userService.getMyProfile(getUser(req).userId);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await userService.updateProfile(getUser(req).userId, req.body);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}

export async function uploadAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file provided' });
      return;
    }
    const { uploadToCloudinary } = await import('../lib/cloudinary.js');
    const result = await uploadToCloudinary(req.file, 'avatars');
    const updated = await userService.updateAvatar(getUser(req).userId, result.url);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const user = await userService.getUserById(id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(String(req.query.page || '1'));
    const limit = parseInt(String(req.query.limit || '10'));
    const search = req.query.search ? String(req.query.search) : undefined;
    const role = req.query.role ? String(req.query.role) : undefined;
    const result = await userService.listUsers({ page, limit, search, role });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function toggleUserStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const result = await userService.toggleUserStatus(id);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    await userService.deleteUser(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}
