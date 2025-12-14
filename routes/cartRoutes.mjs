import express from 'express';
import { getCartByUserController, syncCartController } from '../controllers/cartController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/cart', authenticateToken, isActiveUser, hasPermission('read:cart'), getCartByUserController);
router.post('/cart/sync', authenticateToken, isActiveUser, hasPermission('create:cart'), hasPermission('update:cart'), hasPermission('delete:cart'), syncCartController);

export default router;