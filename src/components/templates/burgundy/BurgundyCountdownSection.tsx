"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import BurgundyPetals from "./BurgundyPetals";
import BurgundyFloralDivider from "./BurgundyFloralDivider";

interface BurgundyCountdownSectionProps {
  eventDateIso?: string;
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  bgPattern?: string;
}

export default function BurgundyCountdownSection({
  eventDateIso = "2026-09-05T10:45:00+05:30",
  field,
  bgPattern = "/templates/burgundy-bloom/bloom-bg.jpg",
}: BurgundyCountdownSectionProps) {
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
    <section className="relative overflow-hidden bg-[var(--ab-velvet-dark)] py-28 text-center text-[var(--ab-cream)]">
      {/* Dimmed Floral Tapestry Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${bgPattern}')` }}
      />

      {/* Floating Petals in Dark Velvet Void */}
      <BurgundyPetals />

      {/* Glassmorphism Card */}
      <div className="relative z-30 mx-auto max-w-lg px-6">
        <div className="ab-card-hover rounded-2xl border border-[var(--ab-card-border)] bg-[var(--ab-card-bg)] p-8 text-center shadow-[var(--ab-card-shadow)] backdrop-blur-xl sm:p-10">
          <BurgundyFloralDivider className="mb-5 max-w-xs" />

          {/* Heading */}
          <span className="ab-font-cinzel mb-6 block text-xs font-semibold tracking-[0.24em] text-[var(--ab-burgundy)] uppercase">
            {field("countdownHeading", "ab-font-cinzel text-xs font-semibold tracking-[0.24em] text-[var(--ab-burgundy)] uppercase")}
          </span>

          {/* 4 Rolling Countdown Tiles */}
          <div className="my-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[64px] flex-1 flex-col items-center rounded-xl border border-[var(--ab-burgundy)]/25 bg-[var(--ab-burgundy)]/10 px-3 py-3.5 text-center sm:min-w-[76px]"
              >
                <span className="ab-font-cormorant text-3xl font-normal italic text-[var(--ab-burgundy)] tabular-nums sm:text-4xl animate-[ab-flip_0.3s_ease]">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="ab-font-cinzel mt-1 text-[8px] tracking-[0.18em] text-[var(--ab-wine-dark)]/70 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ceremony Subtitle */}
          <p className="ab-font-cinzel mt-4 text-[9px] tracking-[0.2em] text-[var(--ab-wine-dark)]/65 uppercase sm:text-[10px]">
            {field("dayNote", "ab-font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] text-[var(--ab-wine-dark)]/65 uppercase")}
          </p>
        </div>

        {/* Outro Monogram & Branding */}
        <div className="mt-14 space-y-3">
          <BurgundyFloralDivider className="max-w-[200px]" />
          <h2 className="ab-font-cormorant text-2xl font-normal italic text-[var(--ab-cream)] sm:text-3xl drop-shadow-md">
            {field("coverTitle", "ab-font-cormorant text-2xl sm:text-3xl italic text-[var(--ab-cream)]")}
          </h2>
          <div className="ab-font-cinzel text-[9px] tracking-[0.22em] text-[var(--ab-cream)]/50 uppercase">
            {field("footer", "ab-font-cinzel text-[9px] tracking-[0.22em] text-[var(--ab-cream)]/50 uppercase")}
          </div>
        </div>
      </div>
    </section>
  );
}
