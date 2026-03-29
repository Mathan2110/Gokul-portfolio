import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaBehance, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const socials = [
  { icon: FaWhatsapp, href: 'https://wa.me/916396799414', label: 'WhatsApp' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">
              <span className="gold-text">Creato</span>
              <span className="text-paper opacity-60">Graphix</span>
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
              Transforming brands through the power of creative design. Every pixel tells your story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Navigation</h4>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Home', to: '/' },
                { label: 'Portfolio', to: '/portfolio' },
                { label: 'Contact', to: '/contact' },
                { label: 'Submit Review', to: '/submit-review' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-muted hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@creatographix.com"
                className="flex items-center gap-3 font-body text-sm text-muted hover:text-gold transition-colors"
              >
                <HiMail className="text-gold" size={16} />
                contact@creatographix.com
              </a>
              <div className="flex items-center gap-4 mt-6">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} CreatoGraphix. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/50">
            Designed with ♥ by Aanchal Goyal
          </p>
        </div>
      </div>
    </footer>
  );
}