import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

// Simplified inline world map SVG (just outlines, very low opacity)
const WorldMapSVG = () => (
  <svg
    viewBox="0 0 1000 500"
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
    fill="none"
    stroke="#C9A84C"
    strokeWidth="0.8"
  >
    {/* Simplified continent outlines */}
    <path d="M 120 160 Q 130 140 160 130 Q 200 120 220 140 Q 240 160 230 180 Q 210 200 180 195 Q 140 185 120 160 Z" />
    <path d="M 160 200 Q 175 210 185 230 Q 180 255 165 260 Q 145 255 140 240 Q 138 220 160 200 Z" />
    <path d="M 290 120 Q 340 100 400 110 Q 440 120 460 140 Q 470 160 455 180 Q 430 200 390 195 Q 340 185 310 165 Q 280 145 290 120 Z" />
    <path d="M 310 200 Q 350 210 370 240 Q 375 270 355 290 Q 325 305 295 290 Q 270 275 275 250 Q 285 225 310 200 Z" />
    <path d="M 530 100 Q 580 80 650 90 Q 710 100 750 130 Q 780 155 775 185 Q 760 215 720 225 Q 670 235 620 220 Q 570 200 545 170 Q 520 140 530 100 Z" />
    <path d="M 570 250 Q 610 240 660 255 Q 700 270 715 305 Q 720 340 695 360 Q 660 375 620 365 Q 580 350 565 315 Q 550 280 570 250 Z" />
    <path d="M 780 120 Q 820 105 860 120 Q 890 135 895 165 Q 895 195 870 210 Q 840 220 810 208 Q 780 193 775 165 Q 772 140 780 120 Z" />
    <path d="M 820 240 Q 855 230 880 250 Q 900 270 895 300 Q 885 325 860 330 Q 835 330 820 310 Q 808 290 815 265 Q 818 250 820 240 Z" />
    {/* Grid lines */}
    <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="0.3" opacity="0.3" />
    <line x1="500" y1="0" x2="500" y2="500" strokeWidth="0.3" opacity="0.3" />
    <circle cx="500" cy="250" r="200" strokeWidth="0.3" opacity="0.2" />
    <circle cx="500" cy="250" r="400" strokeWidth="0.3" opacity="0.15" />
  </svg>
);

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, children }) => {
  return (
    <section className="relative bg-navy-light overflow-hidden py-24 md:py-32">
      <WorldMapSVG />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted text-lg md:text-xl max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
