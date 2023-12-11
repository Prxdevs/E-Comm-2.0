const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  rating: { type: Number, default: 0 },
  price: { type: Number},
  description: { type: String },
  image: { type: String },
  imageUrl: { type: String },
  stocks: { type: Number, default: 0 },
  tag: { type:String },
  sizes: [{ type: String }]
});
module.exports = mongoose.model('Product', productSchema);
