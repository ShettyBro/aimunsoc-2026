import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// ── "Register" removed — CTA button is the only registration entry point ──
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/join', label: 'Join' },
  { to: '/committees', label: 'Committees' },
  { to: '/board', label: 'Board' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const activeLinkClass = 'text-gold border-b-2 border-gold pb-0.5';
  const defaultLinkClass = 'text-white/80 hover:text-gold transition-colors duration-200 pb-0.5';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy/90 backdrop-blur-md border-b border-gold/20 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsMenuOpen(false)}>
              <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-10 w-auto" />
              <span className="font-serif text-xl text-white hidden sm:block">AIMUNSOC</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-sans ${isActive ? activeLinkClass : defaultLinkClass}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/register')}
                className="hidden sm:inline-flex items-center bg-gold text-navy font-semibold px-4 py-2 rounded-md hover:bg-gold-light transition-all duration-200 text-sm whitespace-nowrap"
              >
                Register Now
              </button>

              {/* Hamburger — visible on < lg */}
              <button
                className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-72 bg-navy border-l border-gold/20 flex flex-col shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-gold/20 shrink-0">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-8 w-auto" />
                  <span className="font-serif text-lg text-white">AIMUNSOC</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block font-sans text-lg py-3 px-3 rounded-lg transition-colors ${
                          isActive
                            ? 'text-gold bg-gold/10 font-semibold'
                            : 'text-white/80 hover:text-gold hover:bg-white/5'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-6 border-t border-gold/20 shrink-0">
                <button
                  onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                  className="w-full bg-gold text-navy font-semibold py-3 rounded-md hover:bg-gold-light transition-all text-base"
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
