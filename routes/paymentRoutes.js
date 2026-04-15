const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  auth,
  [body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')],
  validateRequest,
  (req, res) => {
    const { amount, currency = 'USD' } = req.body;
    if (amount > 0) {
      return res.json({
        status: 'success',
        amount,
        currency,
        message: 'Mock payment processed successfully',
      });
    }

    res.status(400).json({ status: 'failed', message: 'Invalid payment amount' });
  }
);

module.exports = router;
