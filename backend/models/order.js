// models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      email: { type: String},
    },
  ],
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default:'Pending' },
  address: { type: String },
  city: { type: String },
  phone: { type: String },
  name: { type: String },
  email: { type: String },
  pincode: { type: Number },
  paymentId: { type: String }, // Add payment ID field
  paymentStatus: { type: String }, // Add payment status field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
