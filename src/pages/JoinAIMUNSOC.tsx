import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, Award, Globe } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

const cards = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'Empowering students through diplomatic education — building the next generation of global thinkers, communicators, and leaders.',
  },
  {
    icon: Users,
    title: 'Our Community',
    desc: 'A vibrant network of future diplomats and global leaders united by a passion for international affairs and meaningful debate.',
  },
  {
    icon: Award,
    title: 'Our Achievements',
    desc: 'Recognised excellence at MUN conferences across India. AIMUNSOC delegates consistently bring home top awards.',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    desc: 'Contributing to international understanding by simulating real-world diplomatic challenges and shaping policy-minded graduates.',
  },
];

const JoinAIMUNSOC: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Join AIMUNSOC"
        subtitle="Become part of Acharya Institutes' premier diplomatic community."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex gap-5"
            >
              <div className="bg-gold/10 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                <c.icon className="text-gold" size={26} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white mb-2">{c.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center glass-card p-12">
          <h2 className="font-serif text-3xl text-white mb-4">Interested in joining?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Reach out to us and we'll get you started on your AIMUNSOC journey.
          </p>
          <Link
            to="/contact"
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-md hover:bg-gold-light transition-all duration-200 text-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinAIMUNSOC;
