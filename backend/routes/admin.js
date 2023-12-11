const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const multer = require('multer');
const path = require ('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'products/'); // Specify the directory where files should be saved
  },
  filename: function (req, file, cb) {
    // Use a unique filename, or keep the original filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

router.use('/products', express.static(path.join(__dirname, 'products')));

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const staticUser = { email: 'your', password: 'your' };

    if (email === staticUser.email && password === staticUser.password) {
      req.user = { email: staticUser.email };
      res.json({ message: 'Login successful', user: req.user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.post('/logout', (req, res) => {
  // Clear user information from the request on logout
  req.user = null;
  res.json({ message: 'Logout successful' });
});



router.get('/products',async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/addproduct', upload.single('image'), async (req, res) => {
  try {
    const { name, category, rating, price, description, stocks, tag, sizes } = req.body;
    const product = new Product({
      name,
      category,
      rating,
      price,
      description,
      stocks,
      tag,
      sizes,
      image: req.file.filename, // Save the filename instead of the buffer
    });

    await Product.create(product);
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/users', isAuthenticated,async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/orders', isAuthenticated,async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.put('/updateproduct/:id',  async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, rating, price, description, imageUrl, stocks, tag, sizes } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update product details
    product.name = name;
    product.category = category;
    product.rating = rating;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    product.stocks = stocks;
    product.tag = tag;
    product.sizes = sizes;

    // Save the updated product
    await product.save();

    res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
module.exports = router;
