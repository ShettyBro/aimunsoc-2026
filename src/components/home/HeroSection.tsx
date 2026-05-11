import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from '../ui/CountdownTimer';

// Floating particle
const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: 2, height: 2, background: 'rgba(201,168,76,0.3)', ...style }}
    animate={{
      x: [0, Math.random() * 40 - 20, Math.random() * -30, 0],
      y: [0, Math.random() * -40, Math.random() * 30, 0],
      opacity: [0.2, 0.5, 0.3, 0.2],
    }}
    transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// World map SVG overlay
const WorldMapOverlay = () => (
  <svg
    viewBox="0 0 1000 500"
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
    fill="none"
    stroke="#C9A84C"
    strokeWidth="0.7"
  >
    <path d="M 120 160 Q 130 140 160 130 Q 200 120 220 140 Q 240 160 230 180 Q 210 200 180 195 Q 140 185 120 160 Z" />
    <path d="M 160 200 Q 175 210 185 230 Q 180 255 165 260 Q 145 255 140 240 Q 138 220 160 200 Z" />
    <path d="M 290 120 Q 340 100 400 110 Q 440 120 460 140 Q 470 160 455 180 Q 430 200 390 195 Q 340 185 310 165 Q 280 145 290 120 Z" />
    <path d="M 310 200 Q 350 210 370 240 Q 375 270 355 290 Q 325 305 295 290 Q 270 275 275 250 Q 285 225 310 200 Z" />
    <path d="M 530 100 Q 580 80 650 90 Q 710 100 750 130 Q 780 155 775 185 Q 760 215 720 225 Q 670 235 620 220 Q 570 200 545 170 Q 520 140 530 100 Z" />
    <path d="M 570 250 Q 610 240 660 255 Q 700 270 715 305 Q 720 340 695 360 Q 660 375 620 365 Q 580 350 565 315 Q 550 280 570 250 Z" />
    <path d="M 780 120 Q 820 105 860 120 Q 890 135 895 165 Q 895 195 870 210 Q 840 220 810 208 Q 780 193 775 165 Q 772 140 780 120 Z" />
    <path d="M 820 240 Q 855 230 880 250 Q 900 270 895 300 Q 885 325 860 330 Q 835 330 820 310 Q 808 290 815 265 Q 818 250 820 240 Z" />
    <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="0.3" opacity="0.3" />
    <line x1="500" y1="0" x2="500" y2="500" strokeWidth="0.3" opacity="0.3" />
    <circle cx="500" cy="250" r="200" strokeWidth="0.3" opacity="0.15" />
    <circle cx="500" cy="250" r="400" strokeWidth="0.3" opacity="0.1" />
  </svg>
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  },
}));

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob-1 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #1A3A5C 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
        />
        <div
          className="blob-2 absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #112240 0%, transparent 70%)',
            bottom: '5%',
            right: '-5%',
          }}
        />
        <div
          className="blob-3 absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #1A3A5C 0%, transparent 70%)',
            top: '40%',
            left: '40%',
          }}
        />
      </div>

      {/* World map */}
      <WorldMapOverlay />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={p.style} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold text-sm uppercase tracking-[0.3em] font-sans mb-4"
        >
          AIMUNSOC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-7xl md:text-9xl font-bold text-white leading-none mb-4"
        >
          AiCon 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted text-xl italic font-sans mb-10"
        >
          Debate · Diplomacy · Distinction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-12"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/register"
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-md hover:bg-gold-light transition-all duration-200 text-lg"
          >
            Register Now
          </Link>
          <Link
            to="/about"
            className="border border-gold text-gold px-8 py-4 rounded-md hover:bg-gold/10 transition-all duration-200 text-lg"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-slow text-gold/50">
        <ChevronDown size={28} />
      </div>
    </section>
  );
};

export default HeroSection;
