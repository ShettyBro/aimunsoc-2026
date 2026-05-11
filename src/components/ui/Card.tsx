import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', animate = false }) => {
  const base =
    'bg-navy-light/80 backdrop-blur-md border border-gold/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,168,76,0.15)] hover:border-gold/50';

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${base} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
};

export default Card;
