import { body } from 'express-validator';

export const createContactRules = [
  body("message")
    .notEmpty().withMessage('El mensaje es requerido.')
    .isString().withMessage('El mensaje debe ser un texto.')
    .isLength({ min: 3, max: 255 }).withMessage('El mensaje debe tener entre 3 y 255 caracteres.')
    .trim()
    .escape()
];