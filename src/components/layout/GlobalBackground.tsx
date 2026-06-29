import React, { useMemo } from 'react';

function makeStars(count: number) {
  let seed = 137;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() > 0.93 ? 1.5 : rand() > 0.75 ? 1.0 : 0.55,
    opacity: 0.2 + rand() * 0.6,
    dur: 2 + rand() * 5,
    delay: -(rand() * 8),
    gold: rand() > 0.93,
  }));
}

// AiCon logo used as a ghosted watermark
const UN_EMBLEM_URL = '/aicon logo.png';

const UNEmblem: React.FC = () => (
  <img
    src={UN_EMBLEM_URL}
    alt=""
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: 'min(110vw, 1100px)',
      height: 'min(110vw, 1100px)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.07,
      filter: 'blur(0.5px) brightness(1.4)',
      objectFit: 'contain',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  />
);

const GlobalBackground: React.FC = () => {
  const stars = useMemo(() => makeStars(200), []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── 1. Deep space base (nudged toward UN blue) ─────────────── */}
      <div className="absolute inset-0" style={{
        background:
          'linear-gradient(160deg, #020A14 0%, #060F1E 30%, #091828 60%, #050E1C 85%, #020A14 100%)',
      }} />

      {/* ── 2. UN-blue ambient wash ────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(75,146,219,0.07) 0%, transparent 70%)',
      }} />

      {/* ── 3. Ambient glow orbs ──────────────────────────────────── */}
      <div className="orb orb-gold" />
      <div className="orb orb-teal" />
      {/* Blue orb tinted to UN blue */}
      <div className="orb orb-blue" style={{
        background: 'radial-gradient(circle, rgba(75,146,219,0.16) 0%, transparent 70%)',
      }} />

      {/* ── 4. Dot geo-grid ───────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage:
          'radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* ── 5. UN Emblem watermark ─────────────────────────────────── */}
      <UNEmblem />

      {/* ── 6. Star field ─────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.07}
            fill={s.gold ? 'rgba(220,185,100,0.9)' : 'white'}
          >
            <animate
              attributeName="opacity"
              values={`${s.opacity};1;${s.opacity * 0.3};${s.opacity}`}
              dur={`${s.dur}s`}
              begin={`${Math.abs(s.delay)}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </circle>
        ))}
      </svg>

      {/* ── 7. Shooting stars ─────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <line x1="15" y1="18" x2="15" y2="18" stroke="white" strokeWidth="0.06" strokeLinecap="round">
          <animate attributeName="x2" values="15;30" dur="1.2s" begin="4s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="y2" values="18;28" dur="1.2s" begin="4s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="4s" repeatCount="indefinite" />
        </line>
        <line x1="72" y1="12" x2="72" y2="12" stroke="rgba(201,168,76,0.8)" strokeWidth="0.05" strokeLinecap="round">
          <animate attributeName="x2" values="72;84" dur="1s" begin="9s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="y2" values="12;22" dur="1s" begin="9s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="9s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* ── 8. Vignette ───────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        background:
          'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(2,7,16,0.55) 80%, rgba(2,7,16,0.92) 100%)',
      }} />

      {/* ── 9. Top horizon accent (UN blue tint) ──────────────────── */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: 1,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(75,146,219,0.3) 30%, rgba(201,168,76,0.2) 70%, transparent 100%)',
      }} />
    </div>
  );
};

export default GlobalBackground;
