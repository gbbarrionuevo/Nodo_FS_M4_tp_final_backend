import { body } from 'express-validator';

export const updateProfileRules = [
  body("user_name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("password")
    .optional({ checkFalsy: true })
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("first_name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("last_name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El apellido debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El apellido debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),
];

export const passwordProfileRules = [
  body("old_password")
    .notEmpty().withMessage('El password es requerido.')
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("new_password")
    .notEmpty().withMessage('El password es requerido.')
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("repeat_password")
    .notEmpty().withMessage('El password es requerido.')
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape()
];