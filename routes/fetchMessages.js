const router = require('express').Router();
const validateAccess = require('../middlewares/validateAcess');
const Message = require('../models/messages');

router.get('/fetchMessages', validateAccess, async (req, res) => {
  const { from, to, orderID } = req.query;
  try {
    //from = manufacturer, to = transporter
    const message = await Message.find({ from: from, to: to, orderID: orderID });

    if (!message.length) return res.status(200).json({ success: false, message: 'No messages found' });
    else return res.status(200).json({ success: true, message: message });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;