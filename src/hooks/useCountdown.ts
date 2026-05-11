import { useState, useEffect } from 'react';
import { CONFERENCE_DATE } from '../data/pricing';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(): Countdown {
  const getTimeLeft = (): Countdown => {
    const now = new Date().getTime();
    const target = CONFERENCE_DATE.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isExpired: false,
    };
  };

  const [countdown, setCountdown] = useState<Countdown>(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return countdown;
}
