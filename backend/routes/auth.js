const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('dotenv').config().parsed;
// In-memory token blacklist
const tokenBlacklist = [];

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// auth.js

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Ensure the user object has the correct password before attempting to compare
      if (!(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '48h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

  router.post('/logout', async (req, res) => {
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
  
      // Add the token to the blacklist
      tokenBlacklist.push(token);
  
      res.json({ message: 'Logout successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  
  // Middleware to check if the token is blacklisted
  const checkTokenBlacklist = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
  
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
    }
  
    next();
  };

  module.exports = { router, checkTokenBlacklist };
