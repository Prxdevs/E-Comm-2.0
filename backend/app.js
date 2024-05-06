// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require ('path')
const { router: authRoutes, checkTokenBlacklist } = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order'); // Add order routes
require('dotenv').config();

const app = express();
const { PORT, MONGODB_URI } = process.env;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Replace with your allowed origin
  credentials: true, // Explicitly enable credentials
};



// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Routes
app.use('/products', express.static(path.join(__dirname, 'products')));
app.use('/category', express.static(path.join(__dirname, 'category')));
app.use('/auth', authRoutes);
app.use('/admin',  adminRoutes); //Admin Routes For AdminPanel
app.use('/product',  productRoutes);
app.use('/cart',  cartRoutes);
app.use('/orders',  orderRoutes); // Use checkTokenBlacklist middleware for order routes

// MongoDB connection
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
