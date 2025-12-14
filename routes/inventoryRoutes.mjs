import express from 'express';
import { getInventoryByUserController, getInventoryItemController } from '../controllers/inventoryController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/inventory', authenticateToken, isActiveUser, hasPermission('read:inventory'), getInventoryByUserController);
router.get('/inventory/:id/show', authenticateToken, isActiveUser, hasPermission('read:inventory-item-detail'), getInventoryItemController);

export default router;