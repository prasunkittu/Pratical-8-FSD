const express = require('express');
const multer = require('multer');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
  },
});

router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a number greater than 0'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, price } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: 'Product image is required' });
      }

      const product = new Product({
        name,
        price,
        image: req.file.path,
      });
      await product.save();

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Server error' });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
