import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: '+', label: 'Delegates' },
  { value: 7, suffix: '', label: 'Committees' },
  { value: 30, suffix: '+', label: 'Colleges' },
  { value: 50, suffix: '+', label: 'Awards' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-gold">
      {count}{suffix}
    </span>
  );
}

const StatsBar: React.FC = () => {
  return (
    <section className="bg-navy-light/50 border-y border-gold/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted text-sm uppercase tracking-widest mt-1 font-sans">
                  {stat.label}
                </p>
              </motion.div>
              {index < stats.length - 1 && (
                <div className="hidden sm:block h-12 w-px bg-gold/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
