"use client";

import { useEffect, useRef, type ReactNode } from "react";

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
            <stop offset="0" stopColor="#0b1226" />
            <stop offset=".45" stopColor="#4a4a73" />
            <stop offset=".62" stopColor="#c9a29b" />
            <stop offset=".72" stopColor="#dcc9a6" />
          </linearGradient>
          <linearGradient id={`au-l${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b79a86" />
            <stop offset="1" stopColor="#121b36" />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill={`url(#au-s${id})`} />
        <circle cx="520" cy="600" r="70" fill="#f5efe4" opacity=".85" />
        <path
          d="M0 640l120-90 90 60 130-120 140 110 110-70 210 120v350H0z"
          fill="#1b2548"
          opacity=".85"
        />
        <path d="M0 690l160-70 140 60 180-90 170 80 150-40v370H0z" fill="#121b36" />
        <rect y="720" width="800" height="280" fill={`url(#au-l${id})`} opacity=".9" />
        <g stroke="#f5efe4" opacity=".35">
          <path d="M440 740h160M470 760h100M455 785h130" />
        </g>
      </svg>
    </div>
  );
}

export function AureliaMap() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-label="Stylised map"
    >
      <rect width="800" height="500" fill="#0f1830" />
      <path d="M0 300C150 260 220 360 360 300S560 140 800 200V500H0z" fill="#1b2a52" />
      <path
        d="M300 0c40 120 120 160 100 300s60 160 80 200"
        stroke="#2b3a67"
        strokeWidth="46"
        fill="none"
      />
      <g stroke="#dcc9a6" opacity=".25" fill="none">
        <circle cx="400" cy="250" r="60" />
        <circle cx="400" cy="250" r="120" />
      </g>
      <circle cx="400" cy="250" r="9" fill="#c9a29b" />
      <circle cx="400" cy="250" r="22" fill="none" stroke="#c9a29b" opacity=".6" />
    </svg>
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`au-rv ${className}`.trim()}
      style={delay ? { ["--d" as string]: delay } : undefined}
    >
      {children}
    </div>
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
