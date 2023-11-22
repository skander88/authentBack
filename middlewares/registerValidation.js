const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("email", "please enter a valid email !").isEmail(),
  body("password", "please enter a minimum 8 characters password  !").isLength({
    min: 8,
  }),
];
exports.loginValidation = [
  body("email", "please enter a valid email !").isEmail(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
