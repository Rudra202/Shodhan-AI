import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { updateProfileSchema } from '../validators/index.js';
import { uploadSingle } from '../middlewares/upload.js';

const router = Router();

router.get('/me', authenticate, userController.getMyProfile);
router.put('/profile', authenticate, validate(updateProfileSchema), userController.updateProfile);
router.post('/avatar', authenticate, uploadSingle, userController.uploadAvatar);
router.get('/:id', authenticate, userController.getUserById);
router.get('/', authenticate, authorize('ADMIN', 'CEO'), userController.listUsers);
router.patch('/:id/toggle-status', authenticate, authorize('ADMIN', 'CEO'), userController.toggleUserStatus);
router.delete('/:id', authenticate, authorize('ADMIN'), userController.deleteUser);

export default router;
