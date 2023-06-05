const router = require('express').Router();
const { OrderRequestValidation, userValidationResult } = require('../middlewares/validate');
const validateAccess = require('../middlewares/validateAcess');
const Message = require('../models/messages');
const ShortUniqueId = require('short-unique-id');

router.post('/postOrderMessages', validateAccess, OrderRequestValidation, userValidationResult, async (req, res) => {
  const { from, to, orderID, address, quantity, transporter, manufacturer } = req.body;
  const uid = new ShortUniqueId({ length: 10 });
  try {
    const newOrder = new Message({
      from: from,
      to: to,
      orderID: orderID,
      address: address,
      quantity: quantity,
      transporter: transporter,
      manufacturer: manufacturer,
      messages: [{
        id: uid(),
        text: `Order Request (OrderID: ${orderID}): I have to deliver ${quantity} units of goods to ${to}. Pickup is ${from}. Please let me know if you are interested in delivering this order.`,
        from: from,
        to: to,
        writtenBy: "manufacturer",
        request: false,
        amount: 0,
        paid: false
      }]
    });
    await newOrder.save();
    res.status(200).json({ success: true, message: "Order sent, kindly check order list" });
  }
  catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

module.exports = router;