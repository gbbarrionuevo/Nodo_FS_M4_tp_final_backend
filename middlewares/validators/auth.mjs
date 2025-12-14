import { body } from 'express-validator';

export const loginRules = [
  body("email")
    .notEmpty().withMessage('El email es requerido.')
    .isEmail().withMessage('Email incorrecto.')
    .isLength({ min: 3, max: 90 }).withMessage('El email debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("password")
    .notEmpty().withMessage('El password es requerido.')
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),
];

export const registerRules = [
  body("user_name")
    .notEmpty().withMessage('El nombre de usuario es requerido.')
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("password")
    .notEmpty().withMessage('El password es requerido.')
    .isString().withMessage('El password debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El password debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("email")
    .notEmpty().withMessage('El email es requerido.')
    .isEmail().withMessage('Email incorrecto.')
    .isLength({ min: 3, max: 90 }).withMessage('El email debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("first_name")
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body("last_name")
    .notEmpty().withMessage('El apellido es requerido.')
    .isString().withMessage('El apellido debe ser un texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El apellido debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape()
];