import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navBg = isHome
    ? scrolled
      ? 'bg-navy-950/95 backdrop-blur-md'
      : 'bg-transparent'
    : 'bg-navy-950';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${navBg}`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-terracotta-400 rounded"
          aria-label="TravelCo Home"
        >
          <div className="w-7 h-7 bg-terracotta-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <span className="font-display text-xl font-medium text-white tracking-wide">
            TravelCo
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] uppercase font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-400 rounded px-1 ${
                    isActive
                      ? 'text-terracotta-400'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/destinations"
            className="text-xs tracking-widest uppercase font-medium bg-terracotta-500 text-white px-5 py-2.5 hover:bg-terracotta-600 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Book a Tour
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-terracotta-400 rounded"
          onClick={() => setIsOpen(v => !v)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-white origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-navy-950 border-t border-white/10"
          >
            <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 text-sm tracking-[0.2em] uppercase font-medium transition-colors border-b border-white/10 last:border-0 ${
                        isActive ? 'text-terracotta-400' : 'text-white/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  to="/destinations"
                  className="block text-center text-xs tracking-widest uppercase font-medium bg-terracotta-500 text-white px-5 py-3.5 hover:bg-terracotta-600 transition-colors"
                >
                  Book a Tour
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
