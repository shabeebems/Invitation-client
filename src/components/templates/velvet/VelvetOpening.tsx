"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Phase = "idle" | "opening" | "revealing" | "done";

const OPEN_MS = 3300;
const REVEAL_MS = 1000;

function Filigree({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`vh-scroll-filigree is-${side}`}
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M8 40 C 22 40, 30 30, 30 20 C 30 12, 22 9, 17 14 C 13 18, 16 25, 22 24" strokeWidth="1.3" />
      <path d="M8 40 C 22 40, 30 50, 30 60 C 30 68, 22 71, 17 66 C 13 62, 16 55, 22 56" strokeWidth="1.3" />
      <path d="M8 40 H 64" strokeWidth="1.1" />
      <path d="M40 40 C 50 26, 64 22, 76 26" strokeWidth="1.1" />
      <path d="M40 40 C 50 54, 64 58, 76 54" strokeWidth="1.1" />
      <path d="M64 40 C 74 34, 84 34, 92 40 C 84 46, 74 46, 64 40 Z" fill="currentColor" fillOpacity="0.35" strokeWidth="1" />
      <path d="M76 26 C 82 20, 90 20, 94 24 C 89 28, 82 28, 76 26 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />
      <path d="M76 54 C 82 60, 90 60, 94 56 C 89 52, 82 52, 76 54 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />
      <circle cx="98" cy="40" r="2.2" fill="currentColor" />
      <circle cx="46" cy="30" r="1.4" fill="currentColor" />
      <circle cx="46" cy="50" r="1.4" fill="currentColor" />
    </svg>
  );
}

function SealSprig() {
  return (
    <svg className="vh-scroll-seal-sprig" viewBox="0 0 24 32" aria-hidden="true">
      <path d="M12 30 V8" fill="none" strokeLinecap="round" strokeWidth="1.3" />
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

function Rod({ className }: { className: string }) {
  return (
    <span className={`vh-rod ${className}`} aria-hidden="true">
      <span className="vh-rod-cap is-left" />
      <span className="vh-rod-cap is-right" />
    </span>
  );
}

export default function VelvetOpening({
  tagline,
  scriptLine,
  coupleLine,
  dateLine,
  placeLine,
  hint,
  skipLabel,
  onCoverChange,
}: {
  tagline?: ReactNode;
  scriptLine?: ReactNode;
  coupleLine: string;
  dateLine?: string;
  placeLine?: string;
  hint?: string;
  skipLabel?: string;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [unrolled, setUnrolled] = useState(false);
  const timers = useRef<number[]>([]);
  const covering = phase !== "done";

  useEffect(() => {
    onCoverChange?.(covering);
  }, [covering, onCoverChange]);

  useEffect(() => {
    if (!covering) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.classList.add("vh-lock");
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.classList.remove("vh-lock");
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
    setUnrolled(true);
    setPhase("opening");
    timers.current.push(window.setTimeout(reveal, OPEN_MS));
  }

  function skip() {
    if (phase === "done" || phase === "revealing") return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    reveal();
  }

  useEffect(() => {
    if (!covering) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") skip();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!covering) {
    return null;
  }

  return (
    <div
      className={`vh-intro is-${phase}${unrolled ? " is-unrolled" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation opening"
    >
      <div className="vh-petals" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="vh-petal"
            style={{
              left: `${(index * 8.3 + 3) % 100}%`,
              animationDuration: `${8 + (index % 5)}s`,
              animationDelay: `-${(index % 10) * 0.8}s`,
              transform: `scale(${0.45 + (index % 6) * 0.08})`,
            }}
          />
        ))}
      </div>

      <div className="vh-intro-stage">
        <div className="vh-intro-head">
          <div className="vh-cap-title vh-intro-tagline">{tagline || "A Journey of Two Hearts"}</div>
          <div className="vh-script vh-intro-script">{scriptLine || "Together Forever"}</div>
          <div className="vh-intro-rule" aria-hidden="true">
            <span>♥</span>
          </div>
        </div>

        <div
          className="vh-scroll"
          role="button"
          tabIndex={0}
          aria-label="Open the wedding invitation scroll"
          onClick={beginOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              beginOpen();
            }
          }}
        >
          <span className="vh-scroll-glow" aria-hidden="true" />

          <div className="vh-scroll-sheet" aria-hidden="true">
            <div className="vh-scroll-sheet-inner">
              <span className="vh-scroll-kicker">Together with their families</span>
              <span className="vh-scroll-names">{coupleLine}</span>
              <span className="vh-scroll-line">invite you to celebrate their wedding</span>
              <span className="vh-scroll-ornament">
                <span>❖</span>
              </span>
              {dateLine ? <span className="vh-scroll-date">{dateLine}</span> : null}
              {placeLine ? <span className="vh-scroll-place">{placeLine}</span> : null}
            </div>
          </div>

          <Rod className="is-top" />
          <Rod className="is-bottom" />

          <div className="vh-scroll-roll" aria-hidden="true">
            <span className="vh-rod-cap is-left" />
            <span className="vh-rod-cap is-right" />
            <Filigree side="left" />
            <Filigree side="right" />
          </div>

          <span className="vh-scroll-tail is-left" aria-hidden="true" />
          <span className="vh-scroll-tail is-right" aria-hidden="true" />
          <span className="vh-scroll-band" aria-hidden="true" />
          <span className="vh-scroll-seal" aria-hidden="true">
            <span className="vh-scroll-seal-face">
              <SealSprig />
            </span>
          </span>
        </div>

        <div className="vh-intro-actions">
          <button type="button" className="vh-intro-hint" onClick={beginOpen}>
            <span aria-hidden="true">→</span> {hint || "Tap the scroll to open your invitation"}
          </button>
          <button type="button" className="vh-intro-skip" onClick={skip}>
            {skipLabel || "Skip animation & enter"}
          </button>
        </div>
      </div>
    </div>
  );
}
