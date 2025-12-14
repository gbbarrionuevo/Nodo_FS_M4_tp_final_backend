import express from 'express';
import { loginController, registerController, getUserRolesController } from '../controllers/authController.mjs';
import { authenticateToken, isActiveUser } from '../middlewares/authMiddleware.mjs';
import { loginRules, registerRules } from '../middlewares/validators/auth.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.post('/auth/login', loginRules, validate, loginController);
router.post('/auth/register', registerRules, validate, registerController);
router.get('/auth/roles', authenticateToken, isActiveUser, getUserRolesController);

export default router;