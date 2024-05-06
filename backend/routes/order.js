// routes/order.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config().parsed;

router.post('/checkout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized. Bearer token not provided.' });
    }

    
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'mysecretkey')
    const userId = decodedToken.userId;

      // Retrieve the user ID from the decoded token
      // res.json({ userId });
      if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
      }
      
      // res.json(decodedToken.userId)
    const { address, city,phone,name,email, pincode, paymentId, paymentStatus } = req.body;

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
        userId: userId, // Assuming user is the user who placed the order
        email: user.email,
      },
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      address,city,
      phone,email,name,
      pincode,
      totalAmount,
      paymentId: '00001', // Add payment ID to the order
      paymentStatus: "success", // Add payment status to the order
    });

    // // Save the order
    await order.save();
    user.orders.push({
      orderId: order._id,
      // products: cart.map(item => ({
      //   productId: item.productId,
      //   quantity: item.quantity,
      // })),
      // address,
      // city,
      // pincode,
      // totalAmount,
      paymentId: "00001",
      paymentStatus: "Success",
      // createdAt: order.createdAt,
    });
    
    // // Empty the cart
    user.cart = [];
    await user.save();
    res.json({ message: 'Order created successfully.', user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.get('/get-orders', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received Token:', token);

    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log('Decoded Token:', decodedToken);

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const userId = decodedToken.userId;
    const user = await User.findById(userId).populate('orders');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ orders: user.orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
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
