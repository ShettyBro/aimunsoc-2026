import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy border-t border-gold/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-12 w-auto" />
              <span className="font-serif text-2xl text-white">AIMUNSOC</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Acharya Institutes' Model United Nations Society — fostering diplomacy,
              dialogue, and global leadership since 2023.
            </p>
            <p className="text-gold text-sm italic font-serif mt-3">
              Debate · Diplomacy · Distinction.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gold font-sans text-xs uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About AiCon' },
                { to: '/committees', label: 'Committees' },
                { to: '/register', label: 'Register' },
                { to: '/board', label: 'Board' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-sans text-xs uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:aitmunsoc@acharya.ac.in"
                  className="flex items-start gap-2 text-muted hover:text-gold transition-colors text-sm"
                >
                  <Mail size={15} className="shrink-0 mt-0.5" />
                  aitmunsoc@acharya.ac.in
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-muted text-sm">
                  <MapPin size={15} className="shrink-0 mt-0.5" />
                  <span>
                    Acharya Institute of Technology,
                    <br />
                    Bengaluru – 560107
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="https://instagram.com/aimunsoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
                >
                  <Instagram size={15} />
                  @aimunsoc
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10 pt-6 text-center">
          <p className="text-muted text-xs">
            © 2026 AIMUNSOC · Acharya Institutes · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
