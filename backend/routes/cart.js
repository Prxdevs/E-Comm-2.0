// routes/cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config().parsed;


router.post('/add-to-cart', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing.' });
    }

    // Split the Authorization header and get the token
    const tokenParts = req.headers.authorization.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid Authorization header format.' });
    }

    const token = tokenParts[1];

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    const { productId, quantity, selectedSize, selectedColor } = req.body;
console.log(req.body)
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update user's cart array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userCartItem = user.cart.find(item => item.productId.equals(productId));

    if (userCartItem) {
      userCartItem.quantity += parseInt(quantity, 10);
    } else {
      user.cart.push({ productId, quantity: parseInt(quantity, 10), selectedColor, selectedSize });
    }

    // Save changes to the User model
    await user.save();

    res.json({ message: 'Product added to the cart successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/get-cart', async (req, res) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing.' });
    }

    // Split the Authorization header and get the token
    const tokenParts = req.headers.authorization.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid Authorization header format.' });
    }

    const token = tokenParts[1];

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user and populate the cart items with product details
    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ items: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/delete-from-cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.userId; // Assuming you have user information in req.user

    // Update user's cart array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the item in the user's cart
    const userCartItem = user.cart.find(item => item.productId.equals(productId));

    if (userCartItem) {
      // Update the quantity or remove the item from the user's cart
      if (quantity === userCartItem.quantity) {
        // Remove the entire item from the user's cart
        user.cart = user.cart.filter(item => !item.productId.equals(productId));
      } else {
        // Update the quantity
        userCartItem.quantity -= parseInt(quantity, 10);
      }

      // If the quantity becomes 0, remove the entire cart array from the user
      if (userCartItem.quantity === 0) {
        user.cart = user.cart.filter(item => !item.productId.equals(productId));
      }
    }

    // Save changes to the User model
    await user.save();

    res.json({ message: 'Product deleted from the cart successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
