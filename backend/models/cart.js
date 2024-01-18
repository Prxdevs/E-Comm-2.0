// models/cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      selectedColor:{type:String,required: true},
      selectedSize:{type:String,required:true},
      totalPrice:{type:Number,required:true}
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
