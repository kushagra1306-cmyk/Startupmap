const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const businessValidation = [
  body('name').trim().notEmpty().withMessage('Business name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').optional().trim(),
  body('city').optional().trim(),
  body('latitude').optional().isDecimal().withMessage('Latitude must be a valid number'),
  body('longitude').optional().isDecimal().withMessage('Longitude must be a valid number'),
  body('contactEmail').optional().isEmail().withMessage('Valid email is required'),
  validate
];

const collaborationValidation = [
  body('receiverBusinessId').isInt().withMessage('Receiver business ID is required'),
  body('requestType').trim().notEmpty().withMessage('Request type is required'),
  body('message').optional().trim(),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  businessValidation,
  collaborationValidation
};