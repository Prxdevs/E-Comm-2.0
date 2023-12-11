// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router: authRoutes, checkTokenBlacklist } = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order'); // Add order routes
require('dotenv').config();

const app = express();
const { PORT, MONGODB_URI } = process.env;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin
  credentials: true, // Explicitly enable credentials
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type, Authorization', // Add any other required headers
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // Session timeout in milliseconds (1 hour in this case)
  },
};



// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin',  adminRoutes); //Admin Routes For AdminPanel
app.use('/products',  productRoutes);
app.use('/cart', checkTokenBlacklist, cartRoutes);
app.use('/orders', checkTokenBlacklist, orderRoutes); // Use checkTokenBlacklist middleware for order routes

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
