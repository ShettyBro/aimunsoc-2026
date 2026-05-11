import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Expert Mentorship',
    description:
      'Guided by experienced MUNers, chairs, and moderators who provide real-time feedback and coach you through every aspect of diplomatic negotiation.',
  },
  {
    icon: Award,
    title: 'Prestigious Recognition',
    description:
      'Win awards across 7 diverse committees. AiCon has a proven track record of producing best delegates who go on to excel at top-tier MUNs nationwide.',
  },
  {
    icon: Globe,
    title: 'Comprehensive Training',
    description:
      'Pre-conference workshops, background guides, and the Matrix spreadsheet prepare you thoroughly — whether you are a first-timer or a seasoned delegate.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Why AIMUNSOC</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Built for Future Leaders</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card p-8 text-center group"
            >
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <f.icon className="text-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
