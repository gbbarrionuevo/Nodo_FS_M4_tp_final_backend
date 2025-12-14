import { body } from 'express-validator';

export const createRoleRules = [
  body("name")
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 })
    .trim()
    .escape(),

  body("description")
    .notEmpty().withMessage('La descripción es requerida.')
    .isString().withMessage('La descripción debe ser un texto.')
    .isLength({ min: 3, max: 90 })
    .trim()
    .escape(),

  body("permissions")
    .isArray({ min: 1 }).withMessage('Los permisos deben ser un array y son obligatorios.')
    .custom(arr => {
      arr.forEach(permiso => {
        if (!permiso.trim()) {
          throw new Error('Cada permiso no puede estar vacío.');
        }
        if (typeof permiso !== 'string' || !isNaN(permiso)) {
          throw new Error('Cada permiso debe ser una cadena de texto.');
        }
      });
      return true;
    })
    .customSanitizer(arr => arr.map(permiso => permiso.trim()))
];

export const updateRoleRules = [
  body("name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 })
    .trim()
    .escape(),

  body("description")
    .optional({ checkFalsy: true })
    .isString().withMessage('La descripción debe ser un texto.')
    .isLength({ min: 3, max: 90 })
    .trim()
    .escape(),

  body("permissions")
    .optional({ checkFalsy: true })
    .isArray({ min: 1 }).withMessage('Los permisos deben ser un array y son obligatorios.')
    .custom(arr => {
      arr.forEach(permiso => {
        if (!permiso.trim()) {
          throw new Error('Cada permiso no puede estar vacío.');
        }
        if (typeof permiso !== 'string' || !isNaN(permiso)) {
          throw new Error('Cada permiso debe ser una cadena de texto.');
        }
      });
      return true;
    })
    .customSanitizer(arr => arr.map(permiso => permiso.trim()))
];