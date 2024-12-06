const express = require('express');
const { query, param, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Fruit = require('../models/Fruit'); // Adjust path as needed

const router = express.Router();

// GET / - Retrieve all products
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sortBy').optional().isIn(['name', 'price']).withMessage('Invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be "asc" or "desc"'),
  ],
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;

    const fruits = await Fruit.findAll({
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [[sortBy, order.toUpperCase()]],
    });

    res.status(200).json({ success: true, data: fruits });
  })
);

// GET /:id - Retrieve a product by ID
router.get(
  '/:id',
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const fruitId = req.params.id;
    const fruit = await Product.findByPk(fruitId);

    if (fruit) {
      res.status(200).json({ success: true, data:fruit });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  })
);

module.exports = router;
