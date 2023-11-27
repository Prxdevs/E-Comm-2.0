// routes/cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

router.post('/add-to-cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming you have user information in req.user

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingCartItem = cart.items.find(item => item.productId.equals(productId));

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({ message: 'Product added to the cart successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/get-cart', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user

    const cart = await Cart.findOne({ user: userId }).populate('items.productId');

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
