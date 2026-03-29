const mongoose = require('mongoose');

/**
 * Review/Testimonial model
 */
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name too long'],
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, 'Review text is required'],
    maxlength: [1000, 'Review too long'],
  },
  approved: {
    type: Boolean,
    default: false, // Admin must approve before showing
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);