import express from 'express';
import { getUserAllController, getUserByIdController, createUserController, updateUserController, deleteUserController, restoreUserController, updateAvatarController } from '../controllers/userController.mjs';
import { authenticateToken, isActiveUser, hasPermission } from '../middlewares/authMiddleware.mjs';
import { createUserRules, updateUserRules } from '../middlewares/validators/user.mjs';
import uploadAvatar from "../middlewares/validators/uploadAvatar.mjs";
import validate from '../middlewares/validators/validate.mjs';

const router = express.Router();

router.get('/users', authenticateToken, isActiveUser, hasPermission('read:user'), getUserAllController);
router.post('/users/create', authenticateToken, isActiveUser, hasPermission('create:user'), createUserRules, validate, createUserController);
router.delete('/users/:id', authenticateToken, isActiveUser, hasPermission('delete:user'), deleteUserController);
router.get('/users/:id/show', authenticateToken, isActiveUser, hasPermission('read:user'), getUserByIdController);
router.put('/users/:id/edit', authenticateToken, isActiveUser, hasPermission('update:user'), updateUserRules, validate, updateUserController);
router.put('/users/:id/restore', authenticateToken, isActiveUser, hasPermission('restore:user'), restoreUserController);

router.put("/users/avatar", authenticateToken, isActiveUser, hasPermission('update:profile'),
  (req, res, next) => {
    uploadAvatar.single("avatar")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [{ msg: err.message }]
        });
      }
      next();
    });
  }, updateAvatarController);

export default router;