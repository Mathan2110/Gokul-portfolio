const express = require('express');
const router = express.Router();
const { getPortfolio, getFeatured, addItem, updateItem, deleteItem, seedPortfolio } = require('../controllers/portfolioController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getPortfolio);
router.get('/featured', getFeatured);
router.post('/seed', seedPortfolio);           // Seed sample data
router.post('/', protect, adminOnly, addItem);
router.put('/:id', protect, adminOnly, updateItem);
router.delete('/:id', protect, adminOnly, deleteItem);

module.exports = router;