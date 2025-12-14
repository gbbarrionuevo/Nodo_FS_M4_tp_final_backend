import { body } from 'express-validator';

export const createCardRules = [
  body("cardId")
    .notEmpty().withMessage('El cardId es requerido.')
    .isString().withMessage('El cardId debe ser un texto.')
    .trim()
    .escape(),

  body("localId")
    .notEmpty().withMessage('El localId es requerido.')
    .isString().withMessage('El localId debe ser un texto.')
    .trim()
    .escape(),

  body("name")
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un texto.')
    .trim()
    .escape(),

  body("image")
    .notEmpty().withMessage('La imagen es requerido.')
    .isString().withMessage('La imagen debe ser un texto.')
    .trim()
    .escape(),

  body("category")
    .optional({ checkFalsy: true })
    .isString().withMessage('La categoria debe ser un texto.')
    .trim()
    .escape(),

  body("illustrator")
    .optional({ checkFalsy: true })
    .isString().withMessage('El ilustrador debe ser un texto.')
    .trim()
    .escape(),

  body("rarity")
    .optional({ checkFalsy: true })
    .isString().withMessage('La rareza debe ser un texto.')
    .trim()
    .escape(),

  body("set")
    .optional({ checkFalsy: true })
    .isObject(),

  body("hp")
    .optional({ checkFalsy: true })
    .isInt({ min: 0 }).withMessage('El hp debe ser un entero positivo.'),

  body("types")
    .optional({ checkFalsy: true })
    .isArray(),

  body("stage")
    .optional({ checkFalsy: true })
    .isString(),

  body("attacks")
    .optional({ checkFalsy: true })
    .isArray(),

  body("weaknesses")
    .optional({ checkFalsy: true })
    .isArray(),

  body("resistances")
    .optional({ checkFalsy: true })
    .isArray(),

  body("abilities")
    .optional({ checkFalsy: true })
    .isArray(),

  body("price")
    .notEmpty().withMessage('El precio es requerido.')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un entero positivo.'),

  body("quantity")
    .notEmpty().withMessage('La cantidad es requerido.')
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un entero positivo.')
];

export const updateCardRules = [
  body("cardId")
    .optional({ checkFalsy: true })
    .isString().withMessage('El cardId debe ser un texto.')
    .trim()
    .escape(),

  body("localId")
    .optional({ checkFalsy: true })
    .isString().withMessage('El localId debe ser un texto.')
    .trim()
    .escape(),

  body("name")
    .optional({ checkFalsy: true })
    .isString().withMessage('El nombre debe ser un texto.')
    .trim()
    .escape(),

  body("image")
    .optional({ checkFalsy: true })
    .isString().withMessage('La imagen debe ser un texto.')
    .trim()
    .escape(),

  body("category")
    .optional({ checkFalsy: true })
    .isString().withMessage('La categoria debe ser un texto.')
    .trim()
    .escape(),

  body("illustrator")
    .optional({ checkFalsy: true })
    .isString().withMessage('El ilustrador debe ser un texto.')
    .trim()
    .escape(),

  body("rarity")
    .optional({ checkFalsy: true })
    .isString().withMessage('La rareza debe ser un texto.')
    .trim()
    .escape(),

  body("set")
    .optional({ checkFalsy: true })
    .isObject(),

  body("hp")
    .optional({ checkFalsy: true })
    .isInt({ min: 0 }).withMessage('El hp debe ser un entero positivo.'),

  body("types")
    .optional({ checkFalsy: true })
    .isArray(),

  body("stage")
    .optional({ checkFalsy: true })
    .isString(),

  body("attacks")
    .optional({ checkFalsy: true })
    .isArray(),

  body("weaknesses")
    .optional({ checkFalsy: true })
    .isArray(),

  body("resistances")
    .optional({ checkFalsy: true })
    .isArray(),

  body("abilities")
    .optional({ checkFalsy: true })
    .isArray(),

  body("price")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage('El precio debe ser un entero/decimal positivo.'),

  body("quantity")
    .optional({ checkFalsy: true })
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un entero positivo.')
];