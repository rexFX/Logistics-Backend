const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  transporter: {
    type: String,
  },
  transporterName: {
    type: String,
  },
  manufacturerName: {
    type: String,
  },
  orderID: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  quantity: {
    type: String,
  },
  messages: [
    {
      id: {
        type: String,
        required: true
      },
      text: {
        type: String,
      },
      writtenBy: {
        type: String,
        required: true
      },
      request: {
        type: Boolean,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      paid: {
        type: Boolean,
        required: true
      }
    }
  ],
});

module.exports = mongoose.model('Message', messageSchema);