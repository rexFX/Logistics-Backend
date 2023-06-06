const jwt = require('jsonwebtoken');

function validateAccess(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (req.body.verification !== verified.email && req.query.verification !== verified.email) return res.status(401).json({ success: false, message: 'Access denied' });
    next();
  }
  catch (err) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  };
};

module.exports = validateAccess;