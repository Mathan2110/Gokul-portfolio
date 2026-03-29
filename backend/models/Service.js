const mongoose = require('mongoose');

/**
 * Service model — for the services offered
 */
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  icon: {
    type: String, // Icon name or SVG string
    default: 'palette',
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Service', serviceSchema);