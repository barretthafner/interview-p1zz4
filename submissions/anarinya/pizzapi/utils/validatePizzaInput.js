const { check } = require('express-validator');

exports.validatePizzaInput = [
  check('size').isInt().withMessage('Please provide a pizza size id number'),
  check('sauce').isInt().withMessage('Please provide a pizza sauce id number'),
  check('toppings')
    .isArray()
    .withMessage('Please provide an array of pizza topping id numbers')
    .isLength({ min: 1 })
    .withMessage('Array should include at least 1 pizza topping id number'),
  check('toppings.*').isInt(),
];
