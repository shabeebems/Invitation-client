"use client";

import { useEffect, useState } from "react";

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

export function useCountdown(isoDate?: string): CountdownState {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!isoDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const target = new Date(isoDate).getTime();
  if (Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: diff <= 0,
  };
}
