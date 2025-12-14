import express from 'express';
import { getProfileByIdController, updateProfileController, passwordProfileController } from '../controllers/profileController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { updateProfileRules, passwordProfileRules } from '../middlewares/validators/profile.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/profile', authenticateToken, isActiveUser, hasPermission('read:profile'), getProfileByIdController);
router.put('/profile/:id/edit', authenticateToken, isActiveUser, hasPermission('update:profile'), updateProfileRules, validate, updateProfileController);
router.put('/profile/:id/password', authenticateToken, isActiveUser, hasPermission('update:profile'), passwordProfileRules, validate, passwordProfileController);

export default router;