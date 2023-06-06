const router = require('express').Router();
const validateAccess = require('../middlewares/validateAccess');
const User = require('../models/user');

router.get('/fetchTransportersList', validateAccess, async (req, res) => {
  try {
    const transporterList = await User.find({ role: 'transporter' });
    if (!transporterList.length) return res.status(200).json({ success: false, message: [] });
    else return res.status(200).json({ success: true, message: transporterList });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;