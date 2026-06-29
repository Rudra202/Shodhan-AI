import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from '../types/index.js';

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as unknown as Record<string, unknown>).user as JwtPayload | undefined;
    if (!user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const hasRole = user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    next();
  };
}
