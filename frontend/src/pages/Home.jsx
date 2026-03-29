import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { portfolioApi, reviewApi, serviceApi } from '../services/api';
import { SkeletonCard, SkeletonServiceCard, SkeletonReview } from '../components/SkeletonCard';

// ─── Animation Variants ───────────────────────────────────────
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Service icon map (using Heroicons path data) ─────────────
const iconMap = {
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  image: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  'device-phone-mobile': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  'credit-card': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  'clipboard-list': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  ),
  'book-open': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
};

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  const roles = ['Graphic Designer', 'UI/UX Designer', 'Logo Creator', 'Brand Strategist'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] border border-gold/5 rounded-full translate-x-1/2" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] border border-gold/8 rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-px h-48 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            Creative Portfolio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6"
          >
            Hello, I'm
            <br />
            <span className="gold-text italic">Aanchal</span>
            <br />
            <span className="text-paper/80">Goyal</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-8 mb-8 overflow-hidden"
          >
            <p
              key={roleIndex}
              className="font-mono text-sm tracking-[0.2em] uppercase text-gold animate-fade-up"
            >
              {roles[roleIndex]}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body text-muted leading-relaxed max-w-md mb-10"
          >
            Bringing creativity to life in every design project. Based in Ramnagar, Uttarakhand — crafting visual stories that captivate and communicate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://wa.me/916396799414"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Hire Me <HiArrowRight />
            </a>
            <a
              href="/documents/cv.pdf"
              download
              className="btn-outline"
            >
              Download CV <HiDownload />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-12 mt-16"
          >
            {[
              { num: '5+', label: 'Years Experience' },
              { num: '100+', label: 'Projects Done' },
              { num: '30+', label: 'Happy Clients' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-semibold text-gradient-gold">{num}</p>
                <p className="font-mono text-xs text-muted tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Gold frame accent */}
            <div className="absolute -inset-4 border border-gold/20 z-0" aria-hidden="true" />
            <div className="absolute -inset-8 border border-gold/8 z-0" aria-hidden="true" />

            <div className="relative z-10 w-72 h-96 sm:w-80 sm:h-[420px] overflow-hidden bg-surface">
              <img
                src="https://res.cloudinary.com/dailyjoy/image/upload/v1704300023/about%20pic.png"
                alt="Aanchal Goyal – Graphic & UI/UX Designer"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-surface border border-gold/40 px-5 py-3 z-20">
              <p className="font-mono text-xs text-gold tracking-widest uppercase">Available for Freelance</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-xs text-muted">Open to work</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = {
    skills: [
      { name: 'Graphic Designing', desc: 'Transforming creativity into captivating graphic designs with stunning solutions.', level: 90 },
      { name: 'UI/UX Designing', desc: 'Crafting user-centric designs with a perfect blend of aesthetics and functionality.', level: 85 },
      { name: 'Logo Designing', desc: 'Transforming ideas into impactful logos that speak volumes in simplicity.', level: 95 },
    ],
    education: [
      { year: '2016 – 2019', title: 'Bachelors in Design & Animation', org: 'Gyanarthi Media College' },
      { year: '2016', title: 'Intermediate Certification', org: 'G.P.P Inter College' },
    ],
    experience: [
      { year: '2021 – Present', title: 'UI/UX & Graphics Designer', org: 'Optus' },
      { year: '2020 – 2023', title: 'Graphics Designer', org: 'COXCO' },
      { year: '2020 – 2022', title: 'Graphics Designer', org: 'Startupmed' },
    ],
  };

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left: image + quote */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="relative w-full max-w-sm">
            <img
              src="https://res.cloudinary.com/dailyjoy/image/upload/v1704300023/about%20pic.png"
              alt="About Aanchal"
              className="w-full aspect-[3/4] object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent mix-blend-overlay" />
          </div>

          {/* Quote card */}
          <div className="absolute -bottom-8 -right-8 bg-surface border border-gold/30 p-6 max-w-xs">
            <p className="font-display text-sm italic text-paper/80 leading-relaxed">
              "Creativity is intelligence having fun."
            </p>
            <p className="font-mono text-xs text-gold mt-3">— Albert Einstein</p>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          custom={1}
        >
          <div className="section-label">About Me</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
            A Designer Who <br />
            <span className="gold-text italic">Lives for</span> Craft
          </h2>
          <p className="font-body text-muted leading-relaxed mb-10">
            Hello, I'm Aanchal Goyal, a skilled Graphics and UI/UX Designer based in Ramnagar, Uttarakhand, India. With over 5 years of professional experience, I bring creativity to life in every design project — blending form and function to deliver visually stunning solutions that captivate and communicate.
          </p>

          {/* Tabs */}
          <div className="flex gap-0 mb-8 border-b border-border">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-xs tracking-widest uppercase py-3 px-5 transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-gold border-gold'
                    : 'text-muted border-transparent hover:text-paper'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="space-y-6">
            {activeTab === 'skills' &&
              tabs.skills.map(({ name, desc, level }) => (
                <div key={name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body font-medium text-sm text-paper">{name}</span>
                    <span className="font-mono text-xs text-gold">{level}%</span>
                  </div>
                  <div className="h-px bg-border relative">
                    <div
                      className="h-px bg-gold transition-all duration-1000"
                      style={{ width: isVisible ? `${level}%` : '0%' }}
                    />
                  </div>
                  <p className="font-body text-xs text-muted mt-2">{desc}</p>
                </div>
              ))}

            {activeTab === 'education' &&
              tabs.education.map(({ year, title, org }) => (
                <div key={title} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mt-1.5 group-hover:scale-150 transition-transform" />
                    <div className="flex-1 w-px bg-border mt-2" />
                  </div>
                  <div className="pb-6">
                    <p className="font-mono text-xs text-gold tracking-wider mb-1">{year}</p>
                    <p className="font-body font-medium text-paper">{title}</p>
                    <p className="font-body text-sm text-muted">{org}</p>
                  </div>
                </div>
              ))}

            {activeTab === 'experience' &&
              tabs.experience.map(({ year, title, org }) => (
                <div key={title} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mt-1.5 group-hover:scale-150 transition-transform" />
                    <div className="flex-1 w-px bg-border mt-2" />
                  </div>
                  <div className="pb-6">
                    <p className="font-mono text-xs text-gold tracking-wider mb-1">{year}</p>
                    <p className="font-body font-medium text-paper">{title}</p>
                    <p className="font-body text-sm text-muted">{org}</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────
function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceApi.getAll()
      .then(res => setServices(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-32 px-6 bg-surface/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <div className="section-label justify-center">What I Do</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">
            My <span className="gold-text italic">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-ink p-8">
                  <SkeletonServiceCard />
                </div>
              ))
            : services.map((service, i) => (
                <motion.div
                  key={service._id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  custom={i * 0.5}
                  className="bg-ink p-8 group hover:bg-surface transition-colors duration-300 cursor-default"
                >
                  <div className="w-12 h-12 border border-border group-hover:border-gold/40 flex items-center justify-center text-gold mb-6 transition-colors duration-300">
                    {iconMap[service.icon] || iconMap.palette}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-paper mb-3 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Preview ────────────────────────────────────────
function PortfolioPreview() {
  const { ref, isVisible } = useScrollAnimation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    portfolioApi.getFeatured()
      .then(res => setItems(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio-preview" className="py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <div className="section-label">Featured Work</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">
              Selected <span className="gold-text italic">Projects</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-outline text-xs shrink-0">
            View All <HiArrowRight />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-ink aspect-square">
                  <SkeletonCard />
                </div>
              ))
            : items.map((item, i) => (
                <motion.button
                  key={item._id}
                  onClick={() => setLightbox(item)}
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  custom={i * 0.3}
                  className="group relative aspect-square overflow-hidden bg-surface focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-all duration-300 flex items-end p-5">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-mono text-xs text-gold tracking-wider">{item.category}</p>
                      <p className="font-display text-sm font-semibold text-paper">{item.title}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-ink/95 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <button
            className="absolute top-6 right-6 text-muted hover:text-paper font-mono text-xs tracking-widest"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            [ESC]
          </button>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="w-full max-h-[75vh] object-contain"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-semibold text-paper">{lightbox.title}</p>
                <p className="font-mono text-xs text-gold tracking-wider mt-1">{lightbox.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────
function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewApi.getAll()
      .then(res => setReviews(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-32 px-6 bg-surface/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Client Love</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            What Clients <span className="gold-text italic">Say</span>
          </h2>
          <Link
            to="/submit-review"
            className="font-mono text-xs text-gold tracking-widest uppercase hover:underline"
          >
            + Add Your Review
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-ink p-8">
                  <SkeletonReview />
                </div>
              ))
            : reviews.map((review, i) => (
                <motion.div
                  key={review._id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  custom={i * 0.4}
                  className="bg-ink p-8 group hover:bg-surface transition-colors duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FaStar
                        key={s}
                        size={12}
                        className={s < review.rating ? 'text-gold' : 'text-border'}
                      />
                    ))}
                  </div>

                  <p className="font-body text-sm text-muted leading-relaxed mb-8 italic">
                    "{review.review}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar || 'https://cdn-icons-png.flaticon.com/512/2115/2115958.png'}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-body font-semibold text-sm text-paper">{review.name}</p>
                      <p className="font-mono text-xs text-gold">{review.designation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────
function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className="section-label justify-center">Ready to Start?</div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold mb-6 leading-tight">
            Let's Create Something <br />
            <span className="gold-text italic">Extraordinary</span>
          </h2>
          <p className="font-body text-muted max-w-md mx-auto mb-10">
            Have a project in mind? Let's collaborate and bring your vision to life with thoughtful, purposeful design.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Start a Project <HiArrowRight />
            </Link>
            <Link to="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}