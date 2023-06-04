const router = require('express').Router();
const User = require('../models/user');
const { RegistrationValidation, userValidationResult } = require('../middlewares/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', RegistrationValidation, userValidationResult, async (req, res) => {
  const { name, email, address, password, phone, countryCode, pincode, type } = req.body;

  const user = await User.findOne({ email });
  const ph = await User.findOne({ phone });
  if (user || ph) {
    res.status(400).json({ message: 'User with this email or phone number already exists' });
  }
  else {
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      address,
      hashedPassword,
      phone,
      countryCode,
      pincode,
      userType: type
    });

    await newUser.save()
      .then(() => {
        res.status(200).json({ success: true, message: "User registered successfully" });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: err.message });
      });
  }
});

module.exports = router;