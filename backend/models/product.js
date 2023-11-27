const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  stocks: { type: Number, default: 0 },
  tag: { type:String },
  sizes: [{ type: String }]
});
module.exports = mongoose.model('Product', productSchema);
