const router = require('express').Router();
const validateAccess = require('../middlewares/validateAcess');
const Message = require('../models/messages');
const ShortUniqueId = require('short-unique-id');

router.post('/postMessages', validateAccess, async (req, res) => {
  const { from, to, text, orderID, writtenBy, request, amount, paid } = req.body;
  //from = manufacturer, to = transporter

  const uid = new ShortUniqueId({ length: 10 });
  try {
    const myMessage = {
      from: from,
      to: to,
      orderID: orderID,
      messages: [{
        id: uid(),
        text: text,
        from: from,
        to: to,
        writtenBy: writtenBy,
        request: request,
        amount: amount,
        paid: paid
      }]
    }

    const message = await Message.findOne({ from: from, to: to, orderID: orderID });
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