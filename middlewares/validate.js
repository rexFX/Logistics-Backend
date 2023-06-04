const { check, validationResult } = require('express-validator');

const RegistrationValidation = [
  check('name').trim().notEmpty().withMessage('Name should not be empty').isAlpha().withMessage('Proper name is required'),
  check('email').trim().notEmpty().withMessage('Email should not be empty').normalizeEmail().isEmail().withMessage('Proper Email is required'),
  check('password').trim().notEmpty().withMessage('Password should not be empty').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('countryCode').trim().notEmpty().withMessage('Country code should not be empty').contains('+').withMessage('Country code should contain +').isNumeric().withMessage('Country code should be a valid number, eg: +91'),
  check('phone').trim().notEmpty().withMessage('Phone number should not be empty').isNumeric().withMessage('Invalid symbol in phone number').not().contains('+').withMessage('Invalid symbol in phone number').not().contains('-').withMessage('Invalid symbol in phone number').isLength({ min: 10, max: 10 }).withMessage('Phone number must be of 10 digits'),
  check('address').trim().notEmpty().withMessage('Address is required'),
  check('pincode').trim().notEmpty().withMessage('Pincode should not be empty').isNumeric().withMessage('Invalid symbol in pincode').not().contains('+').withMessage('Invalid symbol in pincode').not().contains('-').withMessage('Invalid symbol in pincode').isLength({ min: 6, max: 6 }).withMessage('Pincode must be of 6 digits'),
  check('type').trim().notEmpty().withMessage('Please specify whether you are a transporter or manufacturer')
]

const LoginValidation = [
  check('email').trim().notEmpty().withMessage('Email should not be empty').normalizeEmail().isEmail().withMessage('Proper Email is required'),
  check('password').trim().notEmpty().withMessage('Password should not be empty').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

const userValidationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
}

module.exports = { RegistrationValidation, LoginValidation, userValidationResult };