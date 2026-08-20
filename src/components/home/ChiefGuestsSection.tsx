import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Globe } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface ChiefGuest {
  id: number;
  name: string;
  /** Chief Guest | Guest of Honour */
  role: string;
  /** Opening Ceremony | Closing Ceremony */
  ceremony: 'opening' | 'closing';
  designation: string;
  subDesignation: string;
  country: string;
  countryCode: string;
  description: string;
  photo?: string;
}

// ── Guest data ─────────────────────────────────────────────────────────────────
export const chiefGuests: ChiefGuest[] = [
  {
    id: 1,
    name: 'Tejasvi Surya',
    role: 'Chief Guest',
    ceremony: 'opening',
    designation: 'Member of Parliament',
    subDesignation: 'Bengaluru South',
    country: 'India',
    countryCode: 'IN',
    photo: '/Tejasvi Surya.jpeg',
    description:
      'Tejasvi Surya is the Member of Parliament from Bengaluru South, a dynamic young leader known for his advocacy for technology, youth empowerment, and national development.',
  },
  {
    id: 2,
    name: 'Ms. Hema Sanjay',
    role: 'Guest of Honour',
    ceremony: 'opening',
    designation: 'Country Manager',
    subDesignation: 'PUM Netherlands',
    country: 'Netherlands',
    countryCode: 'NL',
    photo: '/Hema Sanjay.jpeg',
    description:
      'Ms. Hema Sanjay serves as Country Manager for PUM Netherlands, facilitating enterprise development and knowledge transfer between the Netherlands and India.',
  },
  {
    id: 3,
    name: 'H.R.H. Yaduveer Krishnadatta Chamaraja Wadiyar',
    role: 'Chief Guest',
    ceremony: 'closing',
    designation: 'Maharaja of Mysuru',
    subDesignation: 'Member of Parliament, Mysuru & Kodagu',
    country: 'India',
    countryCode: 'IN',
    photo: '/Yaduveer Krishnadatta.jpeg',
    description:
      'His Royal Highness Yaduveer Krishnadatta Chamaraja Wadiyar is the reigning Maharaja of Mysuru and Member of Parliament for Mysuru & Kodagu, carrying forward the illustrious legacy of the Wadiyar royal dynasty.',
  },
  {
    id: 4,
    name: 'Mr. Balaji Venkataraman',
    role: 'Guest of Honour',
    ceremony: 'closing',
    designation: 'Area Director, South India',
    subDesignation: 'Embassy of the Kingdom of Netherlands',
    country: 'Netherlands',
    countryCode: 'NL',
    photo: '/Balaji Venkatraman.jpeg',
    description:
      'Mr. Balaji Venkataraman serves as Area Director for South India at the Embassy of the Kingdom of Netherlands, fostering diplomatic and economic ties between the Netherlands and India.',
  },
];

// ── Corner ornament SVG ────────────────────────────────────────────────────────
const CornerOrn: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className={`text-gold/40 ${className}`}>
    <path d="M2 2 L2 18 M2 2 L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="2" cy="2" r="2" fill="currentColor" />
    <path d="M8 8 L8 14 M8 8 L14 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ── Floating crown divider ─────────────────────────────────────────────────────
const CrownDivider: React.FC = () => (
  <div className="flex items-center gap-4 mb-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Crown size={20} className="text-gold" style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.9))' }} />
    </motion.div>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
  </div>
);

// ── Golden ring SVG (spins via parent motion.div) ──────────────────────────────
const GoldenRing: React.FC<{ active: boolean }> = ({ active }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" fill="none">
    {/* Outer dashed halo */}
    <circle
      cx="100" cy="100" r="96"
      stroke="url(#cgGrad)"
      strokeWidth={active ? '2.5' : '1.5'}
      strokeDasharray="6 4"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(201,168,76,0.75))' : 'none', transition: 'all 0.4s' }}
    />
    {/* Inner solid ring */}
    <circle
      cx="100" cy="100" r="86"
      stroke="url(#cgGrad)"
      strokeWidth={active ? '3' : '2'}
      style={{ filter: active ? 'drop-shadow(0 0 10px rgba(201,168,76,0.9))' : 'none', transition: 'all 0.4s' }}
    />
    {/* Cardinal gem ornaments */}
    {[0, 90, 180, 270].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 100 + 86 * Math.sin(rad);
      const cy = 100 - 86 * Math.cos(rad);
      return (
        <g key={deg}>
          <circle cx={cx} cy={cy} r="4" fill="#C9A84C" opacity={active ? 1 : 0.5} style={{ transition: 'opacity 0.4s' }} />
          <circle cx={cx} cy={cy} r="1.8" fill="#FFF3C4" opacity={active ? 0.9 : 0.35} style={{ transition: 'opacity 0.4s' }} />
        </g>
      );
    })}
    <defs>
      <linearGradient id="cgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#C9A84C" />
        <stop offset="35%"  stopColor="#E8C97A" />
        <stop offset="65%"  stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#9A7030" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Flag emoji helper ──────────────────────────────────────────────────────────
function getFlagEmoji(code: string): string {
  return code.toUpperCase().split('').map((c) =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join('');
}

// ── Guest Card ─────────────────────────────────────────────────────────────────
const GuestCard: React.FC<{ guest: ChiefGuest }> = ({ guest }) => {
  const [hovered, setHovered] = useState(false);
  const isOpening = guest.ceremony === 'opening';
  // Long names (>30 chars) get a smaller font
  const nameFontSize = guest.name.length > 32 ? 'text-[13px]' : guest.name.length > 22 ? 'text-[15px]' : 'text-[17px]';

  return (
    <div
      className="flex flex-col items-center text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ceremony badge above the ring */}
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-[10px] font-sans uppercase tracking-widest border transition-all duration-300"
        style={{
          borderColor: isOpening ? 'rgba(201,168,76,0.45)' : 'rgba(139,174,210,0.45)',
          background: isOpening ? 'rgba(201,168,76,0.08)' : 'rgba(30,90,160,0.12)',
          color: isOpening ? '#C9A84C' : '#8BAED2',
          boxShadow: hovered
            ? isOpening
              ? '0 0 12px rgba(201,168,76,0.2)'
              : '0 0 12px rgba(30,90,160,0.2)'
            : 'none',
        }}
      >
        <span style={{ fontSize: '9px', lineHeight: 1 }}>✦</span>
        {isOpening ? 'Opening Ceremony' : 'Closing Ceremony'}
      </div>

      {/* Ring + photo */}
      <div className="relative w-44 h-44 mb-5 flex-shrink-0">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 14 : 32, repeat: Infinity, ease: 'linear' }}
        >
          <GoldenRing active={hovered} />
        </motion.div>

        {/* Photo circle */}
        <div
          className="absolute rounded-full overflow-hidden border-2 transition-all duration-500"
          style={{
            inset: '13px',
            borderColor: hovered ? 'rgba(232,201,122,0.85)' : 'rgba(201,168,76,0.35)',
            boxShadow: hovered
              ? '0 0 36px rgba(201,168,76,0.45), 0 0 72px rgba(201,168,76,0.18), inset 0 0 18px rgba(201,168,76,0.07)'
              : 'none',
          }}
        >
          {guest.photo ? (
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center 15%',
                transform: hovered ? 'scale(1.06)' : 'scale(1.02)',
                transition: 'transform 0.6s ease',
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1A3A5C] to-[#112240]">
              <Crown
                size={32}
                className="text-gold mb-1 opacity-80"
                style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.7))' }}
              />
              <span className="text-gold/40 text-[10px] font-sans tracking-widest uppercase">Photo</span>
              <span className="text-gold/25 text-[9px] font-sans">Coming Soon</span>
            </div>
          )}

          {/* Shimmer sweep on hover */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.28, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ background: 'linear-gradient(135deg, transparent 20%, rgba(232,201,122,0.4) 50%, transparent 80%)' }}
            />
          )}
        </div>

        {/* Country flag badge */}
        <div
          className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center border-2 border-gold/55 z-10 transition-shadow duration-300"
          style={{
            background: 'rgba(8,18,36,0.97)',
            boxShadow: hovered ? '0 0 12px rgba(201,168,76,0.5)' : 'none',
          }}
          title={guest.country}
        >
          {guest.countryCode === 'UN'
            ? <Globe size={14} className="text-gold" />
            : <span className="text-sm leading-none">{getFlagEmoji(guest.countryCode)}</span>
          }
        </div>
      </div>

      {/* Info card */}
      <div
        className="glass-card px-5 py-4 w-full transition-all duration-300"
        style={{
          maxWidth: '230px',
          borderColor: hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)',
          boxShadow: hovered ? '0 0 28px rgba(201,168,76,0.1)' : 'none',
        }}
      >
        {/* Role pill */}
        <div className="flex justify-center mb-2.5">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-sans uppercase tracking-widest border"
            style={{
              borderColor: guest.role === 'Chief Guest' ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.25)',
              background: guest.role === 'Chief Guest' ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.05)',
              color: '#C9A84C',
            }}
          >
            <Crown size={8} />
            {guest.role}
          </span>
        </div>

        {/* Name — adaptive size for long royal names */}
        <h3 className={`font-serif ${nameFontSize} text-white leading-snug mb-1.5`}>{guest.name}</h3>

        {/* Designation */}
        <p className="text-gold text-[10px] uppercase tracking-wider font-sans leading-snug mb-1">
          {guest.designation}
        </p>
        <p className="text-muted text-[10px] font-sans leading-snug mb-2">
          {guest.subDesignation}
        </p>

        {/* Country */}
        <div className="flex items-center justify-center gap-1 text-muted/70 text-[10px] font-sans">
          <Globe size={8} className="text-gold/40 flex-shrink-0" />
          <span>{guest.country}</span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-muted text-[11px] leading-relaxed overflow-hidden border-t border-gold/15 pt-2.5 mt-2.5"
            >
              {guest.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
// NOTE: NO overflow-hidden on <section> — that was what was clipping the bottom cards.
// Decorative layers are clipped inside their own inner wrapper instead.
const ChiefGuestsSection: React.FC = () => (
  <section className="relative py-24">

    {/* Decorative layer — self-contained so it doesn't clip card content */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.02,
        backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

      {/* Header — single block animation, no stagger */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <CrownDivider />
        <p className="text-gold text-[11px] uppercase tracking-[0.32em] font-sans mb-3">
          AiCon 2026 · Royal Presence
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-4 leading-tight">
          Chief Guests
        </h2>
        <p className="text-muted text-[15px] max-w-lg mx-auto leading-relaxed font-sans">
          We are deeply honoured to welcome distinguished royalty from across the globe —
          members of reigning royal bloodlines who grace AiCon 2026 with their sovereign
          presence and wisdom.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold/55" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gold"
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.65, 1, 0.65] }}
                transition={{ duration: 2.2, delay: i * 0.38, repeat: Infinity }}
              />
            ))}
          </div>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold/55" />
        </div>
      </motion.div>

      {/* Cards — all 4 in one clean row */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CornerOrn className="absolute -top-5 -left-3" />
        <CornerOrn className="absolute -top-5 -right-3 rotate-90" />
        <CornerOrn className="absolute -bottom-5 -left-3 -rotate-90" />
        <CornerOrn className="absolute -bottom-5 -right-3 rotate-180" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 py-2">
          {chiefGuests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      </motion.div>



      {/* Footer seal */}
      <motion.div
        className="flex items-center justify-center gap-4 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/35" />
        <div className="flex items-center gap-2 text-gold/45 text-[11px] font-sans uppercase tracking-[0.2em]">
          <Crown size={11} />
          <span>Royal Guests of Honour</span>
          <Crown size={11} />
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/35" />
      </motion.div>

    </div>
  </section>
);

export default ChiefGuestsSection;
