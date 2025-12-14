import { body } from 'express-validator';

export const createPermissionRules = [
  body("name")
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("description")
    .notEmpty().withMessage('La descripción es requerida.')
    .isString().withMessage('La descripción debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('La descripción debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape()
];

export const updatePermissionRules = [
  body("name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("description")
    .optional({ checkFalsy: true })
    .isString().withMessage('La descripción debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('La descripción debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape()
];