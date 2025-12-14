import express from 'express';
import { getContactAllController, getContactByIdController, createContactController, deleteContactController } from '../controllers/contactController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { createContactRules } from '../middlewares/validators/contact.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/contacts', authenticateToken, isActiveUser, hasPermission('read:contact'), getContactAllController);
router.post('/contacts/create', authenticateToken, isActiveUser, hasPermission('create:contact'), createContactRules, validate, createContactController);
router.delete('/contacts/:id', authenticateToken, isActiveUser, hasPermission('delete:contact'), deleteContactController);
router.get('/contacts/:id/show', authenticateToken, isActiveUser, hasPermission('read:contact'), getContactByIdController);

export default router;