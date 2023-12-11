const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/addproduct', async (req, res) => {
  try {
    const { name, category, rating, price, description, imageUrl, stocks,tag,sizes } = req.body;
    const product = new Product({ name, category, rating, price, description, imageUrl, stocks,tag,sizes });
    await product.save();

    res.status(201).json({ message: 'Product created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
