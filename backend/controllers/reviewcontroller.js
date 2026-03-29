const Review = require('../models/Review');

const SEED_REVIEWS = [
  {
    name: 'Shubham Dwivedi',
    designation: 'Android/Web Developer',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKCJyUP9uiC8oTUKLqUjAlKBIphgI3F0aZpkXggZZTCwYI=s360-c-no',
    rating: 5,
    review: "Aanchal is a standout graphics designer and UI/UX professional. Her innovative designs elevate my Android apps with a perfect blend of creativity, functionality, and user appeal. Highly recommended!",
    approved: true,
  },
  {
    name: 'Vasu Gupta',
    designation: 'Optus/Funingo Founder',
    avatar: 'https://res.cloudinary.com/dbdj94yye/image/upload/v1704301085/creato-graphix-website/vasu-gupta.jpg',
    rating: 5,
    review: "Great Work, Timely Delivery, Amazing at Coordination. Anchal is really dedicated towards her craft and that gets reflected in the quality of work which she delivers.",
    approved: true,
  },
  {
    name: 'Harvansh Sainy',
    designation: 'Brand Goyral',
    avatar: 'https://cdn-icons-png.flaticon.com/512/2115/2115958.png',
    rating: 4,
    review: "For graphic design, Aanchal is the best choice. All graphics are provided by her and the quality is consistently excellent.",
    approved: true,
  },
  {
    name: 'Manoneet Kumar',
    designation: 'By Startupmed',
    avatar: 'https://cdn-icons-png.flaticon.com/512/9307/9307803.png',
    rating: 5,
    review: "Aanchal has truly impressed us with her design skills. Quick, creative, and professional. Highly recommend!",
    approved: true,
  },
];

/**
 * @desc    Get approved reviews
 * @route   GET /api/reviews
 * @access  Public
 */
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit a review
 * @route   POST /api/reviews
 * @access  Public
 */
const submitReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Review submitted! It will appear after admin approval.',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve a review
 * @route   PUT /api/reviews/:id/approve
 * @access  Private/Admin
 */
const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed reviews
 * @route   POST /api/reviews/seed
 */
const seedReviews = async (req, res, next) => {
  try {
    await Review.deleteMany({});
    const reviews = await Review.insertMany(SEED_REVIEWS);
    res.json({ success: true, message: `Seeded ${reviews.length} reviews` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, submitReview, approveReview, seedReviews };