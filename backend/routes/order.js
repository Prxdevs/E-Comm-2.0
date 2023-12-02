// routes/order.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

router.post('/create-order', async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { address, city, pincode, cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add products to your cart first.' });
    }

    const totalAmount = cart.reduce((total, item) => {
      const product = user.cart.find(cartItem => cartItem.productId == item.productId).productId;
      return total + product.price * item.quantity;
    }, 0);

    const order = new Order({
      userId: userId, // Add the user ID to the order
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        address,
        city,
        pincode,
      })),
      totalAmount,
    });

    user.orders.push(order);
    user.cart = [];

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
