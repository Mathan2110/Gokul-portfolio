import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', to: '/', hash: null },
  { label: 'About', to: '/#about', hash: 'about' },
  { label: 'Services', to: '/#services', hash: 'services' },
  { label: 'Portfolio', to: '/portfolio', hash: null },
  { label: 'Contact', to: '/contact', hash: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.hash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-semibold text-paper tracking-wide"
          aria-label="CreatoGraphix Home"
        >
          <span className="gold-text">Creato</span>
          <span className="text-paper opacity-70">Graphix</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.hash ? (
                <button
                  onClick={() => handleNavClick(link)}
                  className="font-body text-sm text-muted hover:text-paper transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.to}
                  className={`font-body text-sm transition-colors duration-200 tracking-wide ${
                    location.pathname === link.to ? 'text-gold' : 'text-muted hover:text-paper'
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/admin" className="font-mono text-xs text-gold tracking-widest uppercase">Dashboard</Link>
              <button onClick={logout} className="btn-outline text-xs py-2 px-4">Logout</button>
            </>
          ) : (
            <a
              href="https://wa.me/916396799414"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2.5 px-6"
            >
              Hire Me
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-paper p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-ink/98 border-t border-border px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) =>
            link.hash ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left font-body text-sm text-muted hover:text-paper transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-body text-sm transition-colors ${
                  location.pathname === link.to ? 'text-gold' : 'text-muted hover:text-paper'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
            <a
            href="https://wa.me/916396799414"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-3 justify-center mt-2"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}