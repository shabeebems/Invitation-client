"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "idle" | "opening" | "done";

export default function VelvetOpening({
  brandLabel,
  tagline,
  scriptLine,
  openLabel,
  skipLabel,
  sealInitials,
  onCoverChange,
}: {
  brandLabel?: ReactNode;
  tagline?: ReactNode;
  scriptLine?: ReactNode;
  openLabel?: string;
  skipLabel?: string;
  sealInitials: string;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
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

  function finish() {
    setPhase("done");
  }

  function beginOpen() {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setPhase("opening");
    window.setTimeout(finish, 1000);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase === "done") return;
      if (event.key === "Escape") setPhase("done");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  function skip() {
    if (phase === "done") return;
    finish();
  }

  if (!covering) {
    return null;
  }

  return (
    <div
      className={`vh-intro${phase === "opening" ? " is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation opening"
    >
      <div className="vh-intro-topbar">
        <span className="vh-cap-title vh-intro-brand">{brandLabel || "Our Wedding"}</span>
        <button type="button" className="vh-cap-title vh-skip-btn" onClick={skip}>
          {skipLabel || "Skip →"}
        </button>
      </div>

      <div className="vh-petals" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="vh-petal"
            style={{
              left: `${(index * 6.2) % 100}%`,
              animationDuration: `${7 + (index % 5)}s`,
              animationDelay: `-${(index % 10) * 0.7}s`,
              transform: `scale(${0.5 + (index % 7) * 0.08})`,
            }}
          />
        ))}
      </div>

      <div
        className={`vh-envelope-wrap${phase === "opening" ? " is-opening" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Open the wedding invitation"
        onClick={beginOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            beginOpen();
          }
        }}
      >
        <div className="vh-envelope-fallback" aria-hidden="true" />
        <div className="vh-wax-seal" aria-hidden="true">
          {sealInitials}
        </div>
      </div>

      <div className="vh-intro-captions">
        <div className="vh-cap-title vh-intro-tagline">{tagline || "A Journey of Two Hearts"}</div>
        <div className="vh-script">{scriptLine || "Together Forever"}</div>
        <button type="button" className="vh-cap-title vh-open-btn" onClick={beginOpen}>
          {openLabel || "Open Invitation"}
        </button>
      </div>
    </div>
  );
}
