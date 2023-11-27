// routes/order.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

router.post('/create-order', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user

    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const productsInCart = user.cart.filter(item => item.productId);

    if (productsInCart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add products to your cart first.' });
    }

    const totalAmount = productsInCart.reduce((total, item) => {
      const product = item.productId;
      return total + product.price * item.quantity;
    }, 0);

    const order = new Order({
      products: productsInCart.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    user.orders.push(order);
    user.cart = []; // Clear the user's cart after creating the order

    await Promise.all([order.save(), user.save()]);

    res.json({ message: 'Order created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/get-orders', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user

    const user = await User.findById(userId).populate('orders');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ orders: user.orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
