import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

const CountdownTimer: React.FC = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  const boxes = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ];

  if (isExpired) {
    return (
      <div className="text-gold text-2xl font-serif">
        AiCon 2026 is here!
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-5 justify-center">
      {boxes.map(({ value, label }, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <div className="bg-navy-light border border-gold/30 rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[64px] md:min-w-[80px] text-center">
              <span className="font-serif text-3xl md:text-5xl text-gold font-bold tabular-nums">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-muted text-xs uppercase tracking-widest mt-2 font-sans">
              {label}
            </span>
          </div>
          {i < boxes.length - 1 && (
            <span className="text-gold text-2xl md:text-3xl font-serif pb-5 select-none">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
