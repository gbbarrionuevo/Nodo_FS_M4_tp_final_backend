import express from 'express';
import { getRoleAllController, getRoleByIdController, createRoleController, updateRoleController, deleteRoleController } from '../controllers/roleController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { createRoleRules, updateRoleRules } from '../middlewares/validators/role.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/roles', authenticateToken, isActiveUser, hasPermission('read:role'), getRoleAllController);
router.post('/roles/create', authenticateToken, isActiveUser, hasPermission('create:role'), createRoleRules, validate, createRoleController);
router.delete('/roles/:id', authenticateToken, isActiveUser, hasPermission('delete:role'), deleteRoleController);
router.get('/roles/:id/show', authenticateToken, isActiveUser, hasPermission('read:role'), getRoleByIdController);
router.put('/roles/:id/edit', authenticateToken, isActiveUser, hasPermission('update:role'), updateRoleRules, validate, updateRoleController);

export default router;