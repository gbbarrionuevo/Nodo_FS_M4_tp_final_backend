import express from 'express';
import { getStoreAllController } from '../controllers/storeController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/store', authenticateToken, isActiveUser, hasPermission('read:store'), getStoreAllController);

export default router;