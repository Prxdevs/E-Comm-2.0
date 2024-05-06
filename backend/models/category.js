const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: [{ type: String }],
  // Add any other category-related fields here
});

module.exports = mongoose.model('Category', categorySchema);
