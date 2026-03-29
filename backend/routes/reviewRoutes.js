const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getReviews, submitReview, approveReview, seedReviews } = require('../controllers/reviewcontroller');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');

const reviewRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('review').trim().isLength({ min: 10 }).withMessage('Review must be at least 10 characters'),
];

router.get('/', getReviews);
router.post('/', reviewRules, validate, submitReview);
router.put('/:id/approve', protect, adminOnly, approveReview);
router.post('/seed', seedReviews);

module.exports = router;