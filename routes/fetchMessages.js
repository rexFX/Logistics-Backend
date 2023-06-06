const router = require('express').Router();
const validateAccess = require('../middlewares/validateAccess');
const Message = require('../models/messages');

router.get('/fetchMessages', validateAccess, async (req, res) => {
  const { orderID } = req.query;
  try {
    const message = await Message.findOne({ orderID: orderID });
    if (!message) return res.status(200).json({ success: false, message: 'No messages found' });
    else return res.status(200).json({ success: true, message: message });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;