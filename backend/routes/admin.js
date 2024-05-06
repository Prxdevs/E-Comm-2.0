const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');
const Order = require('../models/order');
const multer = require('multer');
const path = require ('path')
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productName = req.body.name;
    const productDirectory = `products/${productName}`; // Set the destination folder for uploaded files
    if (!fs.existsSync(productDirectory)) {
      fs.mkdirSync(productDirectory, { recursive: true });
    }

    cb(null, productDirectory);

  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });


const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.name;
    const categoryDirectory = `category/${category}`; // Set the destination folder for uploaded files
    if (!fs.existsSync(categoryDirectory)) {
      fs.mkdirSync(categoryDirectory, { recursive: true });
    }

    cb(null, categoryDirectory);

  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload2 = multer({ storage: storage2 });

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

router.use('/products', express.static(path.join(__dirname, 'products')));
router.use('/category', express.static(path.join(__dirname, 'category')));

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
router.get('/category',async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/addproduct',  upload.array('image'), async (req, res) => {
  try {
    const { name, category, rating, price, description, stocks, tag, sizes,colors,gender, } = req.body;
    const directoryPath = path.join(__dirname,  '../products', name);
    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const imagePath = req.files.map(file => `/products/${name}/${file.filename}`);
    console.log(imagePath)
    const product = new Product({
      name,
      category,
      rating,
      price,
      description,
      stocks,
      tag,
      sizes,
      colors,
      gender,
      image: imagePath, // Save the filename instead of the buffer
    });

    await Product.create(product);
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/addcategory',  upload2.array('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const directoryPath = path.join(__dirname,  '../category', name);
    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const imagePath = req.files.map(file => `/category/${name}/${file.filename}`);
    console.log(imagePath)
    const category = new Category({
      name,
      image: imagePath, // Save the filename instead of the buffer
    });

    await Category.create(category);
    res.status(201).json({ message: 'Category created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/deleteproduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (!Array.isArray(existingProduct.image)) {
      return res.status(500).json({ message: 'Invalid image paths.' });
    }
    existingProduct.image.forEach((imagePath) => {
      try {
        const fullPath = path.join(__dirname, '../', imagePath);
        fs.unlinkSync(fullPath);
      } catch (error) {
        // Handle the unlink error (e.g., file not found) or log it
        console.error(`Error deleting file: ${error.message}`);
      }
    });

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/deletecategory/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check if the Category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: 'category not found.' });
    }

    if (!Array.isArray(existingCategory.image)) {
      return res.status(500).json({ message: 'Invalid image paths.' });
    }
    existingCategory.image.forEach((imagePath) => {
      try {
        const fullPath = path.join(__dirname, '../', imagePath);
        fs.unlinkSync(fullPath);
      } catch (error) {
        // Handle the unlink error (e.g., file not found) or log it
        console.error(`Error deleting file: ${error.message}`);
      }
    });

    // Delete the product from the database
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/users', async (req, res) => {
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

router.put('/updateproduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(productId)
    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update the product properties
    const { name, category, rating, price, description, stocks, tag, sizes } = req.body;
    console.log(req.body)
    existingProduct.name = name || existingProduct.name;
    existingProduct.category = category || existingProduct.category;
    existingProduct.rating = rating || existingProduct.rating;
    existingProduct.price = price || existingProduct.price;
    existingProduct.description = description || existingProduct.description;
    existingProduct.stocks = stocks || existingProduct.stocks;
    existingProduct.tag = tag || existingProduct.tag;
    existingProduct.sizes = sizes || existingProduct.sizes;

    // Check if a new image is provided
    if (req.file) {
      // Remove the previous image
      const previousImagePath = path.join(__dirname, '../', existingProduct.image);
      await fs.unlink(previousImagePath);

      // Update the product with the new image path
      const newImagePath = `/products/${req.file.filename}`;
      existingProduct.image = newImagePath;
    }

    // Save the updated product to the database
    await existingProduct.save();

    res.status(200).json({ message: 'Product updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.put('/updatecategory/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId)
    // Check if the product exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Update the product properties
    const { name } = req.body;
    console.log(req.body)
    existingCategory.name = name || existingCategory.name;


    // Check if a new image is provided
    if (req.file) {
      // Remove the previous image
      const previousImagePath = path.join(__dirname, '../', existingCategory.image);
      await fs.unlink(previousImagePath);

      // Update the product with the new image path
      const newImagePath = `/category/${req.file.filename}`;
      existingCategory.image = newImagePath;
    }

    // Save the updated product to the database
    await existingCategory.save();

    res.status(200).json({ message: 'category updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
