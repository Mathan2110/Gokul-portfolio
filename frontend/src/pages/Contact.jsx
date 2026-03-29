import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { contactApi } from '../services/api';
import { HiMail, HiPhone, HiDownload } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

// Minimal custom hook replacing react-hook-form for brevity
function useContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Name is required';
    if (!values.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Valid email required';
    if (!values.subject.trim()) errs.subject = 'Subject is required';
    if (values.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return { values, setValues, errors, validate };
}

export default function Contact() {
  const { values, setValues, errors, validate } = useContactForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await contactApi.submit(values);
      setSubmitted(true);
      toast.success('Message sent! I\'ll get back to you soon.');
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="section-label">Reach Out</div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mb-4">
            Let's <span className="gold-text italic">Connect</span>
          </h1>
          <p className="font-body text-muted max-w-lg">
            Have a project in mind or just want to say hello? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Contact Details</p>
              <div className="space-y-6">
                <a
                  href="mailto:contact@creatographix.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center text-gold shrink-0 transition-colors">
                    <HiMail size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-wider mb-1">Email</p>
                    <p className="font-body text-sm text-paper group-hover:text-gold transition-colors">contact@creatographix.com</p>
                  </div>
                </a>

                <a
                  href="tel:+916396799414"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center text-gold shrink-0 transition-colors">
                    <HiPhone size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-wider mb-1">Phone</p>
                    <p className="font-body text-sm text-paper group-hover:text-gold transition-colors">+91 6396799414</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/916396799414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center text-gold shrink-0 transition-colors">
                    <FaWhatsapp size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-wider mb-1">WhatsApp</p>
                    <p className="font-body text-sm text-paper group-hover:text-gold transition-colors">Chat with me directly</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border-t border-border pt-10">
              <p className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Documents</p>
              <a
                href="/documents/cv.pdf"
                download
                className="btn-outline text-xs py-3"
              >
                Download CV <HiDownload />
              </a>
            </div>

            {/* Decorative */}
            <div className="border border-border p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" aria-hidden="true" />
              <p className="font-display text-2xl font-semibold italic text-paper relative z-10 mb-2">
                Open to Freelance
              </p>
              <p className="font-body text-sm text-muted relative z-10">
                Currently accepting new projects. Let's build something remarkable together.
              </p>
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">Available now</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20 border border-gold/20"
              >
                <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">Message Sent!</h3>
                <p className="font-body text-muted max-w-xs">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline text-xs mt-8 py-2.5"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={inputClass('name')}
                      aria-label="Your name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={inputClass('email')}
                      aria-label="Your email"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <input
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={inputClass('subject')}
                    aria-label="Subject"
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={8}
                    className={`${inputClass('message')} resize-none`}
                    aria-label="Message"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="font-mono text-xs text-red-400 mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}