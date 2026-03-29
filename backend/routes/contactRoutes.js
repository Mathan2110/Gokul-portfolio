const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts, updateStatus } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

router.post('/', contactRules, validate, submitContact);
router.get('/', protect, adminOnly, getContacts);
router.put('/:id/status', protect, adminOnly, updateStatus);

module.exports = router;