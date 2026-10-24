"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "idle" | "opening" | "revealing" | "done";

const OPEN_MS = 2300;
const REVEAL_MS = 900;

function WreathArc({ flip = false }: { flip?: boolean }) {
  const leaves = [
    { x: 30, y: 62, r: -62 },
    { x: 41, y: 47, r: -44 },
    { x: 55, y: 35, r: -28 },
    { x: 71, y: 27, r: -12 },
    { x: 129, y: 27, r: 12 },
    { x: 145, y: 35, r: 28 },
    { x: 159, y: 47, r: 44 },
    { x: 170, y: 62, r: 62 },
  ];
  return (
    <svg
      className={`bs-open-wreath${flip ? " is-bottom" : ""}`}
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
    >
      <path className="bs-open-wreath-vine" d="M22 72 C 46 30, 80 18, 100 18 C 120 18, 154 30, 178 72" />
      {leaves.map((leaf, index) => (
        <g key={index} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <path className="bs-open-leaf" d="M0 0 C -4.5 -5, -4.5 -12, 0 -16 C 4.5 -12, 4.5 -5, 0 0 Z" />
          <path className="bs-open-leaf is-alt" d="M0 0 C 5 -2, 10 -1, 13 3 C 8 5, 3 4, 0 0 Z" />
        </g>
      ))}
      <g className="bs-open-bloom" transform="translate(100 18)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cx="0" cy="-5.2" rx="3.6" ry="5.2" transform={`rotate(${angle})`} />
        ))}
        <circle className="bs-open-bloom-heart" cx="0" cy="0" r="2.6" />
      </g>
    </svg>
  );
}

function SealSprig() {
  return (
    <svg className="bs-open-seal-sprig" viewBox="0 0 24 32" fill="none" aria-hidden="true">
      <path d="M12 30 V8" strokeLinecap="round" strokeWidth="1.3" />
      {[24, 19, 14, 9].map((y) => (
        <g key={y}>
          <path d={`M12 ${y} C 8 ${y - 1}, 6 ${y - 4}, 7 ${y - 7} C 10 ${y - 6}, 12 ${y - 3}, 12 ${y} Z`} />
          <path d={`M12 ${y} C 16 ${y - 1}, 18 ${y - 4}, 17 ${y - 7} C 14 ${y - 6}, 12 ${y - 3}, 12 ${y} Z`} />
        </g>
      ))}
      <path d="M12 8 C 10 6, 10 3, 12 1.5 C 14 3, 14 6, 12 8 Z" />
    </svg>
  );
}

export default function BotanicalOpening({
  title,
  tagline,
  coupleLine,
  dateLine,
  hint,
  skipLabel,
  onCoverChange,
}: {
  title?: string;
  tagline?: string;
  coupleLine: string;
  dateLine?: string;
  hint?: string;
  skipLabel?: string;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [unboxed, setUnboxed] = useState(false);
  const timers = useRef<number[]>([]);
  const covering = phase !== "done";

  useEffect(() => {
    onCoverChange?.(covering);
  }, [covering, onCoverChange]);

  useEffect(() => {
    if (!covering) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [covering]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  function finish() {
    setPhase("done");
    window.scrollTo({ top: 0 });
  }

  function reveal() {
    setPhase("revealing");
    timers.current.push(window.setTimeout(finish, REVEAL_MS));
  }

  function beginOpen() {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setUnboxed(true);
    setPhase("opening");
    timers.current.push(window.setTimeout(reveal, OPEN_MS));
  }

  function skip() {
    if (phase === "done") return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    reveal();
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") skip();
    }
    if (!covering) return;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!covering) return null;

  return (
    <div
      className={`bs-open is-${phase}${unboxed ? " is-unboxed" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation opening"
    >
      <div className="bs-open-drift" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="bs-open-drift-leaf"
            style={
              {
                left: `${(index * 8.7 + 4) % 100}%`,
                animationDuration: `${11 + (index % 5) * 1.6}s`,
                animationDelay: `-${(index % 6) * 1.9}s`,
                "--bs-drift-scale": 0.55 + (index % 4) * 0.16,
                "--bs-drift-turn": `${index % 2 ? 260 : -220}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="bs-open-stage">
        <div className="bs-open-head">
          <p className="bs-open-title">{title || "Open the box"}</p>
          <span className="bs-open-rule" aria-hidden="true">
            <span />
          </span>
          {tagline ? <p className="bs-open-tagline">{tagline}</p> : null}
        </div>

        <div
          className="bs-open-box"
          role="button"
          tabIndex={0}
          aria-label="Open the wedding invitation box"
          onClick={beginOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              beginOpen();
            }
          }}
        >
          <span className="bs-open-glow" aria-hidden="true" />
          <span className="bs-open-shadow" aria-hidden="true" />

          <div className="bs-open-base" aria-hidden="true">
            <div className="bs-open-well">
              <div className="bs-open-card">
                <span className="bs-open-card-kicker">The wedding of</span>
                <span className="bs-open-card-names">{coupleLine}</span>
                {dateLine ? <span className="bs-open-card-date">{dateLine}</span> : null}
              </div>
            </div>
          </div>

          <div className="bs-open-lid" aria-hidden="true">
            <span className="bs-open-lid-rim" />
            <div className="bs-open-lid-face">
              <WreathArc />
              <WreathArc flip />
              <span className="bs-open-ribbon is-left" />
              <span className="bs-open-ribbon is-right" />
            </div>
          </div>

          <span className="bs-open-seal" aria-hidden="true">
            <span className="bs-open-seal-face">
              <SealSprig />
            </span>
          </span>

          <span className="bs-open-burst" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={index}
                className="bs-open-burst-leaf"
                style={
                  {
                    "--bs-burst-angle": `${index * (360 / 14)}deg`,
                    "--bs-burst-distance": `${9 + (index % 3) * 2.6}rem`,
                    "--bs-burst-delay": `${(index % 4) * 40}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </div>

        <div className="bs-open-actions">
          <button type="button" className="bs-open-hint" onClick={beginOpen}>
            <span aria-hidden="true">→</span> {hint || "Tap the box to unveil your invitation"}
          </button>
          <button type="button" className="bs-open-skip" onClick={skip}>
            {skipLabel || "Skip animation & enter"}
          </button>
        </div>
      </div>
    </div>
  );
}
