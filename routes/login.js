const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { LoginValidation, userValidationResult } = require('../middlewares/validate');

router.post('/login', LoginValidation, userValidationResult, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: 'User with this email does not exist' });
  }
  else {
    bcrypt.compare(password, user.hashedPassword, function (err, result) {
      if (err) {
        return res.status(400).json({ success: false, message: "Internal Server Error" });
      }

      if (result) {
        const token = jwt.sign({
          _id: user._id,
          email: user.email,
        }, process.env.JWT_SECRET);

        res.cookie('token', token, { expire: new Date() + 9999, httpOnly: true });
        return res.status(200).json({
          success: true,
          token: token,
          details: {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
          }
        });
      }
      else {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }
    });
  }
});

module.exports = router;