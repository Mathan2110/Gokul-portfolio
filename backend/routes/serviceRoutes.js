const express = require('express');
const router = express.Router();
const { getServices, seedServices } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getServices);
router.post('/seed', seedServices);

module.exports = router;