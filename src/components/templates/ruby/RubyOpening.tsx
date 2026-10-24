"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type Phase = "idle" | "opening" | "revealing" | "done";

const OPEN_MS = 3700;
const REVEAL_MS = 1000;

function CornerFloral({ className }: { className: string }) {
  return (
    <svg className={`rb-open-floral ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M4 4 C 22 6, 34 14, 40 30" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M4 4 C 6 22, 14 34, 30 40" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M20 8 C 24 2, 32 2, 34 8 C 30 12, 24 12, 20 8 Z" className="is-fill" strokeWidth="0.9" />
      <path d="M8 20 C 2 24, 2 32, 8 34 C 12 30, 12 24, 8 20 Z" className="is-fill" strokeWidth="0.9" />
      <path d="M30 16 C 36 12, 42 14, 42 20 C 36 22, 32 20, 30 16 Z" className="is-fill" strokeWidth="0.9" />
      <path d="M16 30 C 12 36, 14 42, 20 42 C 22 36, 20 32, 16 30 Z" className="is-fill" strokeWidth="0.9" />
      <circle cx="22" cy="22" r="6.5" strokeWidth="1" />
      <circle cx="22" cy="22" r="2.6" className="is-dot" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="22"
          cy="13.5"
          rx="2.4"
          ry="3.6"
          strokeWidth="0.8"
          transform={`rotate(${angle} 22 22)`}
        />
      ))}
      <path d="M40 30 C 46 34, 52 34, 56 30" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M30 40 C 34 46, 34 52, 30 56" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="58" cy="29" r="1.4" className="is-dot" />
      <circle cx="29" cy="58" r="1.4" className="is-dot" />
    </svg>
  );
}

function Rings() {
  return (
    <svg className="rb-open-rings" viewBox="0 0 64 44" fill="none" aria-hidden="true">
      <circle cx="24" cy="26" r="13" strokeWidth="3.2" />
      <circle cx="40" cy="26" r="13" strokeWidth="3.2" />
      <path d="M24 9.5 l3 -5 l3 5 l-3 3 z" className="is-fill" />
      <path d="M52 8 l1.2 2.6 l2.6 1.2 l-2.6 1.2 l-1.2 2.6 l-1.2 -2.6 l-2.6 -1.2 l2.6 -1.2 z" className="is-fill" />
    </svg>
  );
}

function LeafSprig() {
  return (
    <svg className="rb-open-leaf" viewBox="0 0 70 40" fill="none" aria-hidden="true">
      <path d="M4 34 C 22 26, 42 16, 66 6" strokeWidth="1.2" strokeLinecap="round" />
      {[
        [16, 28, -30],
        [26, 23, 20],
        [36, 18, -30],
        [46, 14, 20],
        [56, 10, -30],
      ].map(([x, y, r]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0 C 3 -5, 9 -6, 12 -3 C 9 1, 3 2, 0 0 Z"
          className="is-fill"
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
    </svg>
  );
}

function Sprig() {
  return (
    <svg className="rb-open-sprig" viewBox="0 0 60 16" fill="none" aria-hidden="true">
      <path d="M4 10 C 18 6, 42 6, 56 10" strokeWidth="1" strokeLinecap="round" />
      <path d="M30 8 C 27 4, 27 1, 30 0 C 33 1, 33 4, 30 8 Z" className="is-fill" />
      <path d="M22 9 C 18 5, 14 6, 13 9 C 16 11, 20 11, 22 9 Z" className="is-fill" />
      <path d="M38 9 C 42 5, 46 6, 47 9 C 44 11, 40 11, 38 9 Z" className="is-fill" />
    </svg>
  );
}

export default function RubyOpening({
  tagline,
  title,
  cardLine,
  hint,
  monogram,
  saveLabel = "Save the Date",
  hostLine,
  coupleLine,
  dateLine,
  placeLine,
  editable = false,
  onCoverChange,
}: {
  tagline: ReactNode;
  title: ReactNode;
  cardLine: ReactNode;
  hint: ReactNode;
  monogram: [string, string];
  saveLabel?: string;
  hostLine?: string;
  coupleLine: string;
  dateLine?: string;
  placeLine?: string;
  editable?: boolean;
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("rb-lock");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("rb-lock");
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
    if (phase === "done" || phase === "revealing") return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    reveal();
  }

  function onBoxClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("[contenteditable='true']")) return;
    beginOpen();
  }

  useEffect(() => {
    if (!covering) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") skip();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!covering) return null;

  return (
    <div
      className={`rb-open is-${phase}${unboxed ? " is-unboxed" : ""}${editable ? " is-editing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Open the wedding invitation"
    >
      <div className="rb-open-stage">
        <div className="rb-open-head">
          <p className="rb-mc rb-open-tagline">{tagline}</p>
          <p className="rb-gv rb-open-title">{title}</p>
          <span className="rb-open-rule" aria-hidden="true">
            <span>♥</span>
          </span>
        </div>

        <div
          className="rb-open-box"
          role="button"
          tabIndex={0}
          aria-label="Slide the box to open the invitation"
          onClick={onBoxClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              if ((event.target as HTMLElement).closest("[contenteditable='true']")) return;
              event.preventDefault();
              beginOpen();
            }
          }}
        >
          <span className="rb-open-glow" aria-hidden="true" />
          <span className="rb-open-shadow" aria-hidden="true" />

          <span className="rb-open-ribbon" aria-hidden="true" />

          <div className="rb-open-drawer" aria-hidden="true">
            <span className="rb-open-well" />
            <div className="rb-open-tray">
              <span className="rb-open-tissue" />
              <LeafSprig />
              <div className="rb-open-note">
                <span className="rb-gv rb-open-note-title">{saveLabel}</span>
                <span className="rb-open-note-rule" />
                {dateLine ? <span className="rb-mc rb-open-note-date">{dateLine}</span> : null}
              </div>
              <Rings />
              {[0, 1, 2, 3, 4].map((index) => (
                <span key={index} className={`rb-open-petal is-p${index}`} />
              ))}
            </div>
          </div>

          <div className="rb-open-card">
            <CornerFloral className="is-tr" />
            <CornerFloral className="is-br" />
            <div className="rb-open-card-copy">
              <span className="rb-gv rb-open-card-line">{cardLine}</span>
              <span className="rb-open-card-heart" aria-hidden="true">
                ♥
              </span>
            </div>
          </div>

          <div className="rb-open-sleeve" aria-hidden="true">
            <span className="rb-open-frame" />
            <CornerFloral className="is-tl" />
            <CornerFloral className="is-tr" />
            <CornerFloral className="is-bl" />
            <CornerFloral className="is-br" />
            <div className="rb-open-mono">
              <span className="rb-gv rb-foil rb-open-mono-text">
                {monogram[0]}
                <small>&amp;</small>
                {monogram[1]}
              </span>
              <Sprig />
            </div>
          </div>

          <div className="rb-open-reveal" aria-hidden="true">
            <CornerFloral className="is-tl" />
            <CornerFloral className="is-tr" />
            <CornerFloral className="is-bl" />
            <CornerFloral className="is-br" />
            <div className="rb-open-reveal-copy">
              {hostLine ? <span className="rb-mc rb-open-reveal-host">{hostLine}</span> : null}
              <span className="rb-gv rb-open-reveal-names">{coupleLine}</span>
              <span className="rb-open-reveal-orn">
                <span>♥</span>
              </span>
              {dateLine ? <span className="rb-mc rb-open-reveal-date">{dateLine}</span> : null}
              {placeLine ? <span className="rb-open-reveal-place">{placeLine}</span> : null}
            </div>
          </div>

          <span className="rb-open-burst" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                style={
                  {
                    "--rb-burst-angle": `${index * 22.5}deg`,
                    "--rb-burst-d": `${(index % 3) * 60}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </div>

        <div className="rb-open-actions">
          {editable ? (
            <div className="rb-open-hint">
              <span aria-hidden="true">→</span> {hint}
            </div>
          ) : (
            <button type="button" className="rb-open-hint" onClick={beginOpen}>
              <span aria-hidden="true">→</span> {hint}
            </button>
          )}
          <button type="button" className="rb-open-skip" onClick={skip}>
            Skip animation &amp; enter
          </button>
        </div>
      </div>
    </div>
  );
}
