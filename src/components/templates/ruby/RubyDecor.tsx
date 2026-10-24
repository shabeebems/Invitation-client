"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";

export function RubyOrnament() {
  return (
    <svg className="rb-orn" viewBox="0 0 150 14" aria-hidden="true">
      <path pathLength={1} d="M0 7H62M88 7H150M75 1L81 7L75 13L69 7Z" />
    </svg>
  );
}

export function RubyDiya() {
  return (
    <svg className="rb-diya" viewBox="0 0 70 60" aria-hidden="true">
      <path d="M8 34Q35 66 62 34Z" fill="var(--rb-gold)" />
      <path className="rb-fire" d="M35 8Q46 22 35 32Q24 22 35 8Z" fill="#ffb83a" />
    </svg>
  );
}

/** Procedural gold mandala rings from the reference (SVG, not media). */
export function RubyMandala() {
  const rings = useMemo(
    () =>
      [
        [70, 8, 28],
        [120, 12, 34],
        [185, 16, 40],
        [260, 24, 38],
        [330, 32, 34],
      ] as const,
    []
  );

  return (
    <svg className="rb-mandala" viewBox="-400 -400 800 800" aria-hidden="true">
      <g className="rb-mandala-a">
        {rings
          .filter((_, i) => i % 2 === 0)
          .map((r, idx) => (
            <MandalaRing key={`a-${idx}`} R={r[0]} n={r[1]} h={r[2]} k={idx * 2} />
          ))}
      </g>
      <g className="rb-mandala-b">
        {rings
          .filter((_, i) => i % 2 === 1)
          .map((r, idx) => (
            <MandalaRing key={`b-${idx}`} R={r[0]} n={r[1]} h={r[2]} k={idx * 2 + 1} />
          ))}
      </g>
    </svg>
  );
}

function MandalaRing({ R, n, h, k }: { R: number; n: number; h: number; k: number }) {
  return (
    <>
      <circle r={R} cx={0} cy={0} pathLength={1} style={{ ["--k" as string]: k }} />
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          pathLength={1}
          transform={`rotate(${(360 / n) * i})`}
          d={`M0 ${-R}C${h * 0.5} ${-R - h * 0.3},${h * 0.5} ${-R - h * 0.8},0 ${-R - h * 1.3}C${-h * 0.5} ${-R - h * 0.8},${-h * 0.5} ${-R - h * 0.3},0 ${-R}Z`}
          style={{ ["--k" as string]: k + 0.4 }}
        />
      ))}
    </>
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
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rb-fd ${className}`.trim()} style={delay ? { ["--d" as string]: delay } : undefined}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);

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
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <h2 ref={ref} className="rb-h2 rb-mc">
        {children}
      </h2>
      <RubyOrnament />
    </>
  );
}
