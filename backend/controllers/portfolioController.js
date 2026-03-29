const Portfolio = require('../models/Portfolio');

// Sample seed data matching the original site
const SEED_DATA = [
  { title: 'Funingo Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/funingologo.jpg', featured: true, order: 1 },
  { title: 'JK Marble Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/jklogomarblelogo.png', featured: false, order: 2 },
  { title: 'Parampara Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/paramparalogo.jpg', featured: true, order: 3 },
  { title: 'Shopmine Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shopminelogo.jpg', featured: true, order: 4 },
  { title: 'Shoeboxx Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shoeboxxlogo.png', featured: true, order: 5 },
  { title: 'Footlight Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/footlightlogo.jpg', featured: true, order: 6 },
  { title: 'Achiever Post', category: 'Poster Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/achieverpost.jpg', featured: false, order: 7 },
  { title: 'Crack CAT', category: 'Poster Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/crackCAT.jpg', featured: false, order: 8 },
  { title: 'Do You Wish', category: 'Poster Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/doyouwish.jpg', featured: false, order: 9 },
  { title: 'Coderhouse', category: 'Social Media Post', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/coderhouse.jpg', featured: false, order: 10 },
  { title: 'Ganesh Ji Post', category: 'Social Media Post', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/instastoryganeshji.jpg', featured: false, order: 11 },
  { title: 'Path to IIMs', category: 'Social Media Post', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/pathtoiims.jpg', featured: false, order: 12 },
  { title: 'Internship Program', category: 'Social Media Post', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/internshipprogram.jpg', featured: false, order: 13 },
  { title: 'What Next', category: 'Social Media Post', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/whatnext.jpg', featured: false, order: 14 },
  { title: 'Siddharth Jain Card', category: 'Business Card', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/siddharthjain.jpg', featured: false, order: 15 },
  { title: 'Shoeboxx Card', category: 'Business Card', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shoeboxx.jpg', featured: false, order: 16 },
  { title: 'HP Webmart Card', category: 'Business Card', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/hpwebmart.jpg', featured: false, order: 17 },
  { title: 'Brolabs Card', category: 'Business Card', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/brolabs.jpg', featured: false, order: 18 },
  { title: 'KBC Post', category: 'Infographics', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/kbc.jpg', featured: false, order: 19 },
  { title: 'Jawed Habib Post', category: 'Infographics', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/jawedhabib.jpg', featured: false, order: 20 },
  { title: 'Golujifoundation Logo', category: 'Logo Designs', imageUrl: 'https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/golujifoundationlogo.png', featured: false, order: 21 },
];

/**
 * @desc    Get all portfolio items (with optional category filter)
 * @route   GET /api/portfolio?category=Logo+Designs
 * @access  Public
 */
const getPortfolio = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured portfolio items for homepage
 * @route   GET /api/portfolio/featured
 * @access  Public
 */
const getFeatured = async (req, res, next) => {
  try {
    const items = await Portfolio.find({ featured: true }).sort({ order: 1 }).limit(6);
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add portfolio item
 * @route   POST /api/portfolio
 * @access  Private/Admin
 */
const addItem = async (req, res, next) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update portfolio item
 * @route   PUT /api/portfolio/:id
 * @access  Private/Admin
 */
const updateItem = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete portfolio item
 * @route   DELETE /api/portfolio/:id
 * @access  Private/Admin
 */
const deleteItem = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed portfolio data
 * @route   POST /api/portfolio/seed
 * @access  Public (disable in production)
 */
const seedPortfolio = async (req, res, next) => {
  try {
    await Portfolio.deleteMany({});
    const items = await Portfolio.insertMany(SEED_DATA);
    res.json({ success: true, message: `Seeded ${items.length} portfolio items` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPortfolio, getFeatured, addItem, updateItem, deleteItem, seedPortfolio };