// routes/order.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

router.post('/checkout', async (req, res) => {
  try {
    const { userId, address, city, pincode, paymentId, paymentStatus } = req.body;

    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { cart } = user;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add products to your cart first.' });
    }

    const totalAmount = cart.reduce((total, item) => {
      const product = item.productId;
      return total + product.price * item.quantity;
    }, 0);

    const order = new Order({
      user: {
        userId: user._id, // Assuming user is the user who placed the order
        email: user.email,
      },
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      address,
      city,
      pincode,
      totalAmount,
      paymentId, // Add payment ID to the order
      paymentStatus, // Add payment status to the order
    });

    // Save the order
    await order.save();
    user.orders.push({
      orderId: order._id,
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      address,
      city,
      pincode,
      totalAmount,
      paymentId,
      paymentStatus,
      createdAt: order.createdAt,
    });
    
    // Empty the cart
    user.cart = [];
    await user.save();

    res.json({ message: 'Order created successfully.', orderId: order._id });
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

router.get('/get-all-orders', async (req, res) => {
  try {
    // Fetch all orders
    const allOrders = await Order.find();

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }

    res.json({ orders: allOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
