const router = require('express').Router();
const validateAccess = require('../middlewares/validateAccess');
const Message = require('../models/messages');

router.post('/pay', validateAccess, async (req, res) => {
  const { orderID, textID } = req.body;
  try {
    const message = await Message.findOne({ orderID: orderID });
    if (message) {
      message.messages.forEach((msg) => {
        if (msg.id === textID) {
          msg.paid = true;
        }
      });
      await message.save();
      res.status(200).json({ success: true, message: "Payment Successful" });
    }
    else {
      res.status(400).json({ success: false, message: "Order not found" });
    }
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;
