"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import CrimsonFloralDivider from "./CrimsonFloralDivider";

interface CrimsonCountdownSectionProps {
  eventDateIso?: string;
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}

export default function CrimsonCountdownSection({
  eventDateIso = "2026-08-02T11:00:00+05:30",
  field,
}: CrimsonCountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculateTime() {
      const target = new Date(eventDateIso).getTime();
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [eventDateIso]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--cr-velvet-dark)] py-28 text-center text-[var(--cr-cream)]">
      {/* Subtle Dark Velvet Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/templates/crimson-scroll/crimson-bg.jpg')` }}
      />

      {/* Glassmorphism Card */}
      <div className="relative z-30 mx-auto max-w-lg px-6">
        <div className="cr-card-hover rounded-2xl border border-[var(--cr-card-border)] bg-[var(--cr-card-bg)] p-8 text-center shadow-[var(--cr-card-shadow)] backdrop-blur-xl sm:p-10">
          <CrimsonFloralDivider className="mb-5 max-w-xs" />

          {/* Heading */}
          <span className="cr-font-cinzel mb-6 block text-xs font-semibold tracking-[0.24em] text-[var(--cr-crimson)] uppercase">
            {field("countdownHeading", "cr-font-cinzel text-xs font-semibold tracking-[0.24em] text-[var(--cr-crimson)] uppercase")}
          </span>

          {/* 4 Rolling Countdown Tiles */}
          <div className="my-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[64px] flex-1 flex-col items-center rounded-xl border border-[var(--cr-crimson)]/25 bg-[var(--cr-crimson)]/10 px-3 py-3.5 text-center sm:min-w-[76px]"
              >
                <span className="cr-font-cormorant text-3xl font-normal italic text-[var(--cr-crimson)] tabular-nums sm:text-4xl animate-[cr-flip_0.3s_ease]">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="cr-font-cinzel mt-1 text-[8px] tracking-[0.18em] text-[var(--cr-crimson-dark)]/70 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ceremony Subtitle */}
          <p className="cr-font-cinzel mt-4 text-[9px] tracking-[0.2em] text-[var(--cr-crimson-dark)]/65 uppercase sm:text-[10px]">
            Sunday · 2 August 2026 · 11:00 AM
          </p>
        </div>

        {/* Outro Monogram & Branding */}
        <div className="mt-14 space-y-3">
          <CrimsonFloralDivider className="max-w-[200px]" />
          <h2 className="cr-font-cormorant text-2xl font-normal italic text-[var(--cr-cream)] sm:text-3xl drop-shadow-md">
            {field("coverTitle", "cr-font-cormorant text-2xl sm:text-3xl italic text-[var(--cr-cream)]")}
          </h2>
          <div className="cr-font-cinzel text-[9px] tracking-[0.22em] text-[var(--cr-cream)]/50 uppercase">
            {field("footer", "cr-font-cinzel text-[9px] tracking-[0.22em] text-[var(--cr-cream)]/50 uppercase")}
          </div>
        </div>
      </div>
    </section>
  );
}
