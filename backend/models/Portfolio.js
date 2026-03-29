const mongoose = require('mongoose');

/**
 * Portfolio model — for design work items
 */
const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Logo Designs', 'Poster Designs', 'Social Media Post', 'Business Card', 'Infographics', 'UI/UX Design'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  description: {
    type: String,
    default: '',
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);