import React, { useMemo } from 'react';

function makeStars(count: number) {
  let seed = 137;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,          // % of viewBox
    y: rand() * 100,
    r: rand() > 0.93 ? 1.5 : rand() > 0.75 ? 1.0 : 0.55,
    opacity: 0.2 + rand() * 0.6,
    dur: 2 + rand() * 5,       // twinkle duration seconds
    delay: -(rand() * 8),      // negative = already in progress on mount
    gold: rand() > 0.93,
  }));
}

const GlobalBackground: React.FC = () => {
  const stars = useMemo(() => makeStars(200), []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── 1. Deep space base ──────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        background:
          'linear-gradient(160deg, #020710 0%, #060D1B 30%, #091525 60%, #050C18 85%, #020710 100%)',
      }} />

      {/* ── 2. Ambient glow orbs (GPU-composited) ───────────────────── */}
      <div className="orb orb-gold" />
      <div className="orb orb-teal" />
      <div className="orb orb-blue" />

      {/* ── 3. Dot geo-grid ─────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage:
          'radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* ── 4. Star field (pure SVG, no CSS-variable timing) ────────── */}
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

      {/* ── 5. Shooting stars ───────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Shooting star 1 */}
        <line x1="15" y1="18" x2="15" y2="18" stroke="white" strokeWidth="0.06" strokeLinecap="round">
          <animate attributeName="x2" values="15;30" dur="1.2s" begin="4s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="y2" values="18;28" dur="1.2s" begin="4s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="4s" repeatCount="indefinite" />
        </line>
        {/* Shooting star 2 */}
        <line x1="72" y1="12" x2="72" y2="12" stroke="rgba(201,168,76,0.8)" strokeWidth="0.05" strokeLinecap="round">
          <animate attributeName="x2" values="72;84" dur="1s" begin="9s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="y2" values="12;22" dur="1s" begin="9s" repeatCount="indefinite" keyTimes="0;1" calcMode="spline" keySplines="0.2 0 0.8 1" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="9s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* ── 6. Vignette ─────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        background:
          'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(2,7,16,0.55) 80%, rgba(2,7,16,0.92) 100%)',
      }} />

      {/* ── 7. Top horizon accent ────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: 1,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 30%, rgba(26,107,107,0.25) 70%, transparent 100%)',
      }} />
    </div>
  );
};

export default GlobalBackground;
