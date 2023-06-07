const router = require('express').Router();
const { ValidateBeforeSendingMessage, userValidationResult } = require('../middlewares/validate');
const validateAccess = require('../middlewares/validateAccess');
const Message = require('../models/messages');
const ShortUniqueId = require('short-unique-id');

router.post('/postMessages', validateAccess, ValidateBeforeSendingMessage, userValidationResult, async (req, res) => {
  const { orderID, writtenBy, request, amount, paid, text } = req.body;
  const uid = new ShortUniqueId({ length: 10 });
  if (!orderID.length) orderID = uid();
  try {
    const myMessage = {
      orderID: orderID,
      messages: [{
        id: uid(),
        text: text,
        writtenBy: writtenBy,
        request: request,
        amount: amount,
        paid: paid
      }]
    }

    const message = await Message.findOne({ orderID: orderID });
    if (!message) await new Message(myMessage).save();
    else {
      message.messages.push(myMessage.messages[0]);
      await message.save();
    }
    return res.status(200).json({ success: true, message: "Message sent" });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;