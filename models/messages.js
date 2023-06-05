const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  transporter: {
    type: String,
    required: true
  },
  orderID: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('Message', messageSchema);