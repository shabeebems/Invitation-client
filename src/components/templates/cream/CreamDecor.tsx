"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CreamGrain() {
  return <div className="ce-grain" aria-hidden="true" />;
}

export function CreamOrnament() {
  return (
    <svg className="ce-orn" viewBox="0 0 120 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M4 12h42M74 12h42" />
        <path d="M60 4c-4 4-4 12 0 16 4-4 4-12 0-16zM52 12c4-4 0-8-4-8M68 12c-4-4 0-8 4-8" />
      </g>
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
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ce-rv ${className}`.trim()}
      style={delay ? { ["--d" as string]: delay } : undefined}
    >
      {children}
    </div>
  );
}

/** Gradient placeholder when no Cloudinary image is set. */
export function CreamPh({
  colors,
  label,
  className = "",
}: {
  colors: [string, string];
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`ce-ph ${className}`.trim()}
      data-l={label || ""}
      role="img"
      aria-label={label || "Photo placeholder"}
      style={{
        backgroundImage: `radial-gradient(circle at 70% 20%,#fff6 0,transparent 40%),linear-gradient(160deg,${colors[0]},${colors[1]})`,
      }}
    />
  );
}
