const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  rating: { type: Number, default: 0 },
  price: { type: Number},
  description: { type: String },
  image: [{ type: String }],
  stocks: { type: Number, default: 0 },
  colors: [{ type: String }],
  tag: { type:String }, // popular, featured, deal of the day, seasonal items.
  sizes: [{ type: String }],
  gender: { type: String }
});
module.exports = mongoose.model('Product', productSchema);
