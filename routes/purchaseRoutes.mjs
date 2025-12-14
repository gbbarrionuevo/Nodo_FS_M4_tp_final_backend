import express from 'express';
import { getPurchaseByUserController, createPurchaseController } from '../controllers/purchaseController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/purchases', authenticateToken, isActiveUser, hasPermission('read:purchase'), getPurchaseByUserController);
router.post('/purchases/create', authenticateToken, isActiveUser, hasPermission('create:purchase'), createPurchaseController);

export default router;