const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Use Mongoose to find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      // If the product is not found, return a 404 status
      return res.status(404).json({ message: 'Product not found.' });
    }

    // If the product is found, return it as JSON
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
