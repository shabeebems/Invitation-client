"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Gold botanical corner — CSS/SVG decoration (not a media asset). */
export function VelvetFoliage({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-corner-foliage ${className}`.trim()}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 18 C48 22 58 64 92 78 C118 88 126 48 162 56 C178 60 186 88 192 102"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 18 C22 52 62 44 92 78 C48 98 54 142 62 182"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M78 40 C88 28 108 34 108 52 C108 66 90 66 84 56 C78 46 78 40 78 40Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M118 92 C130 78 152 86 150 108 C148 126 126 124 120 112 C114 100 118 92 118 92Z"
        fill="currentColor"
        opacity="0.45"
      />
      <circle cx="92" cy="78" r="3.2" fill="currentColor" />
      <circle cx="12" cy="18" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function VelvetGoldOrnament() {
  return (
    <div className="vh-gold-ornament" aria-hidden="true">
      ♥
    </div>
  );
}

/** Floral swag silhouette used around the arch / countdown (SVG, not Cloudinary). */
export function VelvetFloralSwag({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-floral-swag ${className}`.trim()}
      viewBox="0 0 180 120"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="90" cy="70" rx="70" ry="28" fill="currentColor" opacity="0.18" />
      <circle cx="48" cy="58" r="18" fill="currentColor" opacity="0.55" />
      <circle cx="78" cy="48" r="22" fill="currentColor" opacity="0.65" />
      <circle cx="112" cy="52" r="20" fill="currentColor" opacity="0.6" />
      <circle cx="140" cy="64" r="16" fill="currentColor" opacity="0.5" />
      <path
        d="M30 78 C55 95 90 100 120 92 C145 86 160 78 168 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`vh-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
