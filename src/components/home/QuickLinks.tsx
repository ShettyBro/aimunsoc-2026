import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, PenLine, Camera, Phone, ArrowRight } from 'lucide-react';

const links = [
  { to: '/committees', label: 'Committees', desc: 'Explore 7 unique committees', icon: Users },
  { to: '/register', label: 'Register', desc: 'Secure your delegate spot', icon: PenLine },
  { to: '/board', label: 'Board', desc: 'Meet the team behind AiCon', icon: Users },
  { to: '/gallery', label: 'Gallery', desc: 'Moments from past conferences', icon: Camera },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const QuickLinks: React.FC = () => {
  return (
    <section className="py-20 bg-navy-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Explore</p>
          <h2 className="font-serif text-4xl text-white">Quick Access</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {links.map((link) => (
            <motion.div key={link.to} variants={item}>
              <Link
                to={link.to}
                className="glass-card p-6 flex flex-col gap-3 group block h-full"
              >
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <link.icon className="text-gold" size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-1">{link.label}</h3>
                  <p className="text-muted text-sm">{link.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-gold text-sm group-hover:gap-2 transition-all duration-200">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;
