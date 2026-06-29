import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import oauthRoutes from './oauth.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/auth', oauthRoutes);
router.use('/users', userRoutes);

export default router;
