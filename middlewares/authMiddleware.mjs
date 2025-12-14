import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token no encontrado'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Token inválido'
    });
  }
};

export const isActiveUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Usuario no autenticado'
      });
    }

    const user = await User.findById(req.user.id).select('deletedAt');

    if (!user) {
      return res.status(401).json({
        message: 'Usuario no encontrado'
      });
    }

    if (user.deletedAt !== null) {
      return res.status(403).json({
        message: 'Usuario dado de baja'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error validando usuario'
    });
  }
};

export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'Usuario no autenticado'
        });
      }

      const user = await User.findById(req.user.id).populate({
        path: 'roles',
        populate: {
          path: 'permissions'
        }
      });

      if (!user) {
        return res.status(401).json({
          message: 'Usuario no encontrado'
        });
      }

      if (user.deletedAt !== null) {
        return res.status(403).json({
          message: 'Usuario dado de baja'
        });
      }

      const hasPermission = user.roles.some(role =>
        role.permissions.some(p => p.name === requiredPermission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: 'No tenés permiso para realizar esta acción'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};