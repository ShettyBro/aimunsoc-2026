import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/join', label: 'Join' },
  { to: '/committees', label: 'Committees' },
  { to: '/register', label: 'Register' },
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

  const activeLinkClass = 'text-gold border-b-2 border-gold pb-0.5';
  const defaultLinkClass = 'text-white/80 hover:text-gold transition-colors duration-200 pb-0.5';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy/90 backdrop-blur-md border-b border-gold/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-10 w-auto" />
              <span className="font-serif text-xl text-white hidden sm:block">AIMUNSOC</span>
            </Link>

            {/* Desktop nav */}
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

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/register')}
                className="hidden sm:inline-flex items-center bg-gold text-navy font-semibold px-4 py-2 rounded-md hover:bg-gold-light transition-all duration-200 text-sm"
              >
                Register Now
              </button>
              <button
                className="lg:hidden text-white p-1"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-navy/98 flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-gold/20">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
              <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-10 w-auto" />
              <span className="font-serif text-xl text-white">AIMUNSOC</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="text-white" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-serif text-3xl ${isActive ? 'text-gold' : 'text-white/80 hover:text-gold'} transition-colors`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
              className="mt-4 bg-gold text-navy font-semibold px-8 py-3 rounded-md hover:bg-gold-light transition-all text-lg"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
