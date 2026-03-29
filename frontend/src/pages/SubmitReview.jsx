import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reviewApi } from '../services/api';
import { FaStar } from 'react-icons/fa';

export default function SubmitReview() {
  const [values, setValues] = useState({ name: '', designation: '', rating: 5, review: '' });
  const [errors, setErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Name is required';
    if (!values.designation.trim()) errs.designation = 'Designation is required';
    if (values.review.trim().length < 10) errs.review = 'Review must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await reviewApi.submit(values);
      setSubmitted(true);
      toast.success('Review submitted! It will appear after approval.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-surface border ${errors[field] ? 'border-red-500/60' : 'border-border hover:border-muted focus:border-gold'} px-5 py-4 text-paper placeholder-muted/50 font-body text-sm outline-none transition-colors duration-200`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="section-label">Share Your Experience</div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
          Add a <span className="gold-text italic">Review</span>
        </h1>
        <p className="font-body text-muted mb-12">
          Your feedback means the world. Share your experience working with me.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gold/20 p-16 text-center"
          >
            <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-3">Thank You!</h3>
            <p className="font-body text-muted">Your review has been submitted and is pending approval.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Star rating */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-muted mb-3">Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setValues(prev => ({ ...prev, rating: star }))}
                    aria-label={`Rate ${star} stars`}
                  >
                    <FaStar
                      size={28}
                      className={`transition-colors duration-150 ${
                        star <= (hoveredStar || values.rating) ? 'text-gold' : 'text-border'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <input name="name" value={values.name} onChange={handleChange} placeholder="Your Name" className={inputClass('name')} aria-label="Name" />
                {errors.name && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <input name="designation" value={values.designation} onChange={handleChange} placeholder="Your Title / Company" className={inputClass('designation')} aria-label="Designation" />
                {errors.designation && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.designation}</p>}
              </div>
            </div>

            <div>
              <textarea
                name="review"
                value={values.review}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows={6}
                className={`${inputClass('review')} resize-none`}
                aria-label="Review"
              />
              {errors.review && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.review}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-4 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}