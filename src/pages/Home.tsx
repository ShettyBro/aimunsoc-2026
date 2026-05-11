import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import FeaturesSection from '../components/home/FeaturesSection';
import QuickLinks from '../components/home/QuickLinks';
import SectionDivider from '../components/ui/SectionDivider';
import { motion } from 'framer-motion';

const highlights = [
  {
    image: '/HomePage/Picture1.jpg',
    title: 'A Stage for Global Voices',
    text: 'AiCon has brought together hundreds of delegates from across South India, creating a vibrant arena for debate, diplomacy, and meaningful dialogue on the world\'s most pressing issues.',
  },
  {
    image: '/HomePage/Picture2.jpg',
    title: 'Legacy of Excellence',
    text: 'Since our founding in 2023, AIMUNSOC has grown into one of Bangalore\'s most respected Model UN societies — producing award-winning delegates and fostering a lifelong passion for international relations.',
  },
];

const Home: React.FC = () => {
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
            <div className="flex-1">
              <img
                src={h.image}
                alt={h.title}
                className="w-full h-72 object-cover rounded-xl border border-gold/20"
              />
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
