import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioApi } from '../services/api';
import { SkeletonCard } from '../components/SkeletonCard';

const CATEGORIES = ['All', 'Logo Designs', 'Poster Designs', 'Social Media Post', 'Business Card', 'Infographics'];

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const fetchItems = useCallback(async (category) => {
    setLoading(true);
    try {
      const res = await portfolioApi.getAll(category);
      setItems(res.data.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(activeCategory);
  }, [activeCategory]);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label">Creative Work</div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mb-4">
            Project <span className="gold-text italic">Gallery</span>
          </h1>
          <p className="font-body text-muted max-w-lg">
            A curated selection of design work spanning branding, digital, print, and beyond.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-gold text-gold bg-gold/10'
                  : 'border-border text-muted hover:border-muted hover:text-paper'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border"
          >
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-ink">
                    <div className="aspect-square skeleton" aria-hidden="true" />
                  </div>
                ))
              : items.length === 0
              ? (
                <div className="col-span-full py-20 text-center bg-ink">
                  <p className="font-mono text-xs tracking-widest uppercase text-muted">No items found</p>
                </div>
              )
              : items.map((item, i) => (
                  <motion.button
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setLightbox(item)}
                    className="group relative aspect-square overflow-hidden bg-surface focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label={`View ${item.title}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/75 transition-all duration-300 flex items-end p-4">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-left">
                        <p className="font-mono text-[10px] text-gold tracking-widest uppercase">{item.category}</p>
                        <p className="font-display text-sm font-semibold text-paper">{item.title}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/96 z-50 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-6 right-6 text-muted hover:text-paper font-mono text-xs tracking-widest transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              [ESC] Close
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.imageUrl}
                alt={lightbox.title}
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <p className="font-display text-xl font-semibold text-paper">{lightbox.title}</p>
                  <p className="font-mono text-xs text-gold tracking-widest uppercase mt-1">{lightbox.category}</p>
                </div>
                <a
                  href="https://wa.me/916396799414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  Inquire
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}