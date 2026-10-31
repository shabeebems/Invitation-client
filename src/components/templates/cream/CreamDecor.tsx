"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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

export function DiamondRule({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 72 10" aria-hidden="true">
      <path d="M0 5h29M43 5h29" stroke="currentColor" strokeWidth="1" />
      <path d="M36 1.4L39.6 5 36 8.6 32.4 5Z" fill="currentColor" />
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
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`ce-rv${shown ? " in" : ""} ${className}`.trim()}
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
