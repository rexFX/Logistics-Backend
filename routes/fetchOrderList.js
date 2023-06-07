const router = require('express').Router();
const validateAccess = require('../middlewares/validateAccess');
const Message = require('../models/messages');

router.get('/fetchOrderList', validateAccess, async (req, res) => {
  const email = req.query.email;
  try {
    const orderList = await Message.find({ $or: [{ manufacturer: email }, { transporter: email }] });
    if (!orderList.length) return res.status(200).json({ success: false, message: [] });
    else return res.status(200).json({ success: true, message: orderList });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;