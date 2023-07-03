const { validationResult } = require('express-validator');

exports.handleValidationErrors = function (_req, res, next) {
  const errors = validationResult(_req);

  // If request validation errors exist, return and send them in the response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
