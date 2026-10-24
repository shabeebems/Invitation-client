"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Film grain overlay — SVG data URI (not Cloudinary media). */
export function AureliaGrain() {
  return <div className="au-grain" aria-hidden="true" />;
}

/** Lake landscape SVG scene used when no hero/final image is uploaded. */
export function AureliaScene({ id = "h" }: { id?: string }) {
  return (
    <div className="au-scene" aria-hidden="true">
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="au-drift">
        <defs>
          <linearGradient id={`au-s${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--au-sky-1)" }} />
            <stop offset=".45" style={{ stopColor: "var(--au-sky-2)" }} />
            <stop offset=".62" style={{ stopColor: "var(--au-sky-3)" }} />
            <stop offset=".72" style={{ stopColor: "var(--au-sky-4)" }} />
          </linearGradient>
          <linearGradient id={`au-l${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--au-lake-1)" }} />
            <stop offset="1" style={{ stopColor: "var(--au-lake-2)" }} />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill={`url(#au-s${id})`} />
        <circle cx="520" cy="600" r="70" style={{ fill: "var(--au-moon)" }} opacity=".85" />
        <path
          d="M0 640l120-90 90 60 130-120 140 110 110-70 210 120v350H0z"
          style={{ fill: "var(--au-hill-1)" }}
          opacity=".85"
        />
        <path d="M0 690l160-70 140 60 180-90 170 80 150-40v370H0z" style={{ fill: "var(--au-hill-2)" }} />
        <rect y="720" width="800" height="280" fill={`url(#au-l${id})`} opacity=".9" />
        <g style={{ stroke: "var(--au-moon)" }} opacity=".35">
          <path d="M440 740h160M470 760h100M455 785h130" />
        </g>
      </svg>
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`au-rv${shown ? " in" : ""} ${className}`.trim()}
      style={delay ? { ["--d" as string]: delay } : undefined}
    >
      {children}
    </div>
  );
}

export function AureliaLotus({ className = "au-cp-lotus" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 26" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20 3c4 4.6 4.2 10.4 0 15.6C15.8 13.4 16 7.6 20 3z" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M19 19c-5.6-.6-9.4-5-9.8-10.6 4.6.8 8.2 4.4 9.8 10.6z" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M21 19c5.6-.6 9.4-5 9.8-10.6-4.6.8-8.2 4.4-9.8 10.6z" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M18 20.2c-5.8.8-11.2-1.6-14.6-6.6 5.2-.4 10.4 2 14.6 6.6z" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M22 20.2c5.8.8 11.2-1.6 14.6-6.6-5.2-.4-10.4 2-14.6 6.6z" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M11 23h18" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function AureliaSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`au-cp-sprig ${className}`.trim()} viewBox="0 0 60 120" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M30 118C30 88 28 56 36 4" strokeWidth="1.1" strokeLinecap="round" />
      {[22, 44, 66, 88].map((y) => (
        <g key={y}>
          <path d={`M31 ${y}c-8-2-14-8-15-16 8 1 13 7 15 16z`} strokeWidth="1" strokeLinejoin="round" />
          <path d={`M31.6 ${y + 10}c8-2 14-8 15-16-8 1-13 7-15 16z`} strokeWidth="1" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

export function EventIcon({ kind }: { kind: string }) {
  if (kind === "glass") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 6h20c0 12-4 18-10 18S14 18 14 6zM24 24v16M16 42h16" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="30" r="12" />
      <path d="M18 12l6-6 6 6-6 6z" />
    </svg>
  );
}
