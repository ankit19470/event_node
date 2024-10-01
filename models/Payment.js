const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true }, // The event's title
  amount: { type: Number, required: true }, // Payment amount
  customerName: { type: String, required: true }, // Customer's name
  date: { type: Date, default: Date.now }, // Payment date
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
