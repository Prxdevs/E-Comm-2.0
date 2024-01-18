// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      selectedSize:{ type: String,required:true },
      selectedColor:{ type: String,required:true },
      totalPrice:{type: String,required:true}
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String }, // Add payment ID field
  paymentStatus: { type: String }, // Add payment status field
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      selectedSize:{ type: String,required:true },
      selectedColor:{ type: String,required:true },
      totalPrice:{ type: String,required:true}
    },
  ],
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
