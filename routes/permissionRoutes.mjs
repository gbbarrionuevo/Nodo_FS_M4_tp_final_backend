import express from 'express';
import { getPermissionAllController, getPermissionByIdController, createPermissionController, updatePermissionController, deletePermissionController } from '../controllers/permissionController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { createPermissionRules, updatePermissionRules } from '../middlewares/validators/permission.mjs';
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/permissions', authenticateToken, isActiveUser, hasPermission('read:permission'), getPermissionAllController);
router.post('/permissions/create', authenticateToken, isActiveUser, hasPermission('create:permission'), createPermissionRules, validate, createPermissionController);
router.delete('/permissions/:id', authenticateToken, isActiveUser, hasPermission('delete:permission'), deletePermissionController);
router.get('/permissions/:id/show', authenticateToken, isActiveUser, hasPermission('read:permission'), getPermissionByIdController);
router.put('/permissions/:id/edit', authenticateToken, isActiveUser, hasPermission('update:permission'), updatePermissionRules, validate, updatePermissionController);

export default router;