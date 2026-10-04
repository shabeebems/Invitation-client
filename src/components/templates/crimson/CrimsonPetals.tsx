"use client";

import { useMemo } from "react";

export default function CrimsonPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, t) => ({
        id: t,
        left: ((67 * t + 11) % 95) + 2,
        dx: ((11 * t + 7) % 44) * (t % 2 === 0 ? 1 : -1),
        dr: (t % 2 === 0 ? 180 : -180) + ((23 * t) % 140),
        dur: 6 + (t % 6) * 0.7,
        del: (0.55 * t) % 10,
        w: 9 + (t % 4) * 3,
        col: t % 5,
      })),
    []
  );

  const colors = [
    "var(--cr-crimson)",
    "var(--cr-crimson-dark)",
    "var(--cr-crimson-vibrant)",
    "#720D16",
    "#9e1420",
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {petals.map((p) => {
        const height = Math.round(1.75 * p.w);
        return (
          <div
            key={p.id}
            style={
              {
                position: "absolute",
                left: `${p.left}%`,
                top: 0,
                width: p.w,
                height: height,
                "--dx": `${p.dx}px`,
                "--dr": `${p.dr}deg`,
                animation: `cr-fall ${p.dur}s ease-in ${p.del}s infinite`,
                opacity: 0,
              } as React.CSSProperties
            }
          >
            <svg
              width={p.w}
              height={height}
              viewBox="0 0 20 35"
              fill="none"
            >
              <path
                d="M 10 1 C 17 5, 19 14, 16 23 C 14 29, 10 34, 10 34 C 10 34, 6 29, 4 23 C 1 14, 3 5, 10 1 Z"
                fill={colors[p.col]}
                opacity={0.82}
              />
              <path
                d="M 10 3 Q 10 16, 10 32"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={0.6}
                fill="none"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
