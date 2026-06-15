import React, { useState, useEffect, useCallback } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import FeaturesSection from '../components/home/FeaturesSection';
import QuickLinks from '../components/home/QuickLinks';
import SectionDivider from '../components/ui/SectionDivider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── All available highlight images ──────────────────────────────────────────
const allImages = Array.from({ length: 30 }, (_, i) => `/HomePage/Picture${i + 1}.jpg`);

// Split into two pools for the two highlight blocks
const images1 = allImages.slice(0, 15);  // Picture1–15
const images2 = allImages.slice(15, 30); // Picture16–30

const highlights = [
  {
    images: images1,
    title: 'A Stage for Global Voices',
    text: "AiCon has brought together hundreds of delegates from across South India, creating a vibrant arena for debate, diplomacy, and meaningful dialogue on the world's most pressing issues.",
  },
  {
    images: images2,
    title: 'Legacy of Excellence',
    text: "Since our founding in 2023, AIMUNSOC has grown into one of Bangalore's most respected Model UN societies — producing award-winning delegates and fostering a lifelong passion for international relations.",
  },
];

// ── Slideshow Component ──────────────────────────────────────────────────────
interface SlideshowProps {
  images: string[];
  title: string;
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, title, interval = 3500 }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [paused, next, interval]);

  return (
    <div
      className="relative w-full h-72 rounded-xl overflow-hidden border border-gold/20 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} — photo ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Prev / Next arrows — visible on hover */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-gold w-4 h-1.5'
                : 'bg-white/40 hover:bg-white/70 w-1.5 h-1.5'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 bg-black/40 text-white/80 text-xs px-2 py-0.5 rounded-full font-sans z-10">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

// ── Home Page ────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  usePageTitle();
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />

      <SectionDivider label="Past Highlights" />

      {/* Alternating highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 w-full">
              <Slideshow images={h.images} title={h.title} />
            </div>
            <div className="flex-1">
              <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">
                AiCon Legacy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{h.title}</h2>
              <p className="text-muted leading-relaxed">{h.text}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <QuickLinks />
    </div>
  );
};

export default Home;
