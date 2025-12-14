import { body } from 'express-validator';

export const createUserRules = [
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
    .escape(),

  body("direccion")
    .optional({ checkFalsy: true })
    .isString().withMessage('La dirección debe ser un texto.')
    .isLength({ max: 255 }).withMessage('La dirección debe tener hasta 255 caracteres.')
    .trim()
    .escape(),

  body("avatar")
    .optional({ checkFalsy: true })
    .isString().withMessage('El avatar debe ser un texto.')
    .isLength({ max: 255 }).withMessage('El avatar debe tener hasta 255 caracteres.')
    .trim()
    .escape(),

  body("roles")
    .isArray({ min: 1 }).withMessage('Los roles deben ser un array y son obligatorios.')
    .custom(arr => {
      arr.forEach(rol => {
        if (!rol.trim()) {
          throw new Error('Cada rol no puede estar vacío.');
        }
        if (typeof rol !== 'string' || !isNaN(rol)) {
          throw new Error('Cada rol debe ser una cadena de texto.');
        }
      });
      return true;
    })
    .customSanitizer(arr => arr.map(rol => rol.trim()))

    // .custom(value => {
    //   if (Array.isArray(value)) {
    //     return true;
    //   }
    //   if (typeof value === "string" && value.trim() !== "") {
    //     return true;
    //   }
    //   throw new Error("Roles debe ser un string o un array.");
    // })
    // .customSanitizer(v => Array.isArray(v) ? v.map(r => r.trim()) : [v.trim()])
];

export const updateUserRules = [
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

  body("email")
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Email incorrecto.')
    .isLength({ min: 3, max: 90 }).withMessage('El email debe tener entre 3 y 90 caracteres.')
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

  body("direccion")
    .optional({ checkFalsy: true })
    .isString().withMessage('La dirección debe ser un texto.')
    .isLength({ max: 255 }).withMessage('La dirección debe tener hasta 255 caracteres.')
    .trim()
    .escape(),

  body("avatar")
    .optional({ checkFalsy: true })
    .isString().withMessage('El avatar debe ser un texto.')
    .isLength({ max: 255 }).withMessage('El avatar debe tener hasta 255 caracteres.')
    .trim()
    .escape(),

  body("roles")
    .optional({ checkFalsy: true })
    .isArray({ min: 1 }).withMessage('Los roles deben ser un array y son obligatorios.')
    .custom(arr => {
      arr.forEach(rol => {
        if (!rol.trim()) {
          throw new Error('Cada rol no puede estar vacío.');
        }
        if (typeof rol !== 'string' || !isNaN(rol)) {
          throw new Error('Cada rol debe ser una cadena de texto.');
        }
      });
      return true;
    })
    .customSanitizer(arr => arr.map(rol => rol.trim()))

    // .custom(value => {
    //   if (Array.isArray(value)) {
    //     return true;
    //   }
    //   if (typeof value === "string" && value.trim() !== "") {
    //     return true;
    //   }
    //   throw new Error("Roles debe ser un string o un array.");
    // })
    // .customSanitizer(v => Array.isArray(v) ? v.map(r => r.trim()) : [v.trim()])
];