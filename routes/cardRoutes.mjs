import express from 'express';
import { getCardAllController, getCardByIdController, createCardController, updateCardController, deleteCardController } from '../controllers/cardController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { createCardRules, updateCardRules } from '../middlewares/validators/card.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/cards', authenticateToken, isActiveUser, hasPermission('read:card'), getCardAllController);
router.post('/cards/create', authenticateToken, isActiveUser, hasPermission('create:card'), createCardRules, validate, createCardController);
router.delete('/cards/:id', authenticateToken, isActiveUser, hasPermission('delete:card'), deleteCardController);
router.get('/cards/:id/show', authenticateToken, isActiveUser, hasPermission('read:card'), getCardByIdController);
router.put('/cards/:id/edit', authenticateToken, isActiveUser, hasPermission('update:card'), updateCardRules, validate, updateCardController);

export default router;