"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "idle" | "opening" | "done";

export default function PalaceOpening({
  leftName,
  rightName,
  leftLabel,
  rightLabel,
  crestLeft,
  crestRight,
  latchHint,
  latchAction,
  skipLabel,
  sealInitials,
  editable = false,
  onCoverChange,
}: {
  leftName: ReactNode;
  rightName: ReactNode;
  leftLabel?: ReactNode;
  rightLabel?: ReactNode;
  crestLeft?: ReactNode;
  crestRight?: ReactNode;
  latchHint?: ReactNode;
  latchAction?: string;
  skipLabel?: string;
  sealInitials: string;
  editable?: boolean;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const covering = phase !== "done";

  useEffect(() => {
    onCoverChange?.(covering);
  }, [covering, onCoverChange]);

  useEffect(() => {
    if (!covering) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [covering]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setPhase("done"), 300);
      return () => window.clearTimeout(t);
    }
  }, []);

  function beginOpen() {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    setPhase("opening");
    window.setTimeout(() => setPhase("done"), 2200);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase !== "idle") return;
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        beginOpen();
      }
      if (event.key === "Escape") setPhase("done");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  if (!covering) return null;

  return (
    <div
      className={`pp-doors${phase === "opening" ? " is-opened" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Royal wedding palace gates"
    >
      <div className="pp-light-leak" aria-hidden="true" />
      <div className="pp-doors-topbar">
        <div className="pp-doors-brand">
          <span>Royal Palace Gateway</span>
          <span>✦</span>
          <span>{crestRight || "Udaipur"}</span>
        </div>
        <button type="button" className="pp-doors-skip" onClick={beginOpen}>
          {skipLabel || "Skip Intro →"}
        </button>
      </div>

      <div className="pp-door pp-door-left">
        <div className="pp-door-frame" aria-hidden="true">
          <div className="pp-door-frame-inner" />
          <div className="pp-jali" />
        </div>
        <div className="pp-door-ornament is-right">❦</div>
        <div className="pp-door-title is-right">
          <span className="pp-door-kicker">{leftLabel || "Cordially"}</span>
          <span className="pp-door-name">{leftName}</span>
        </div>
        <div className="pp-door-handle is-right" aria-hidden="true">
          <div className="pp-brass-ring">
            <div className="pp-brass-inner" />
          </div>
        </div>
        <div className="pp-door-crest is-right">{crestLeft || "The Royal Union"}</div>
      </div>

      <div className="pp-door pp-door-right">
        <div className="pp-door-frame" aria-hidden="true">
          <div className="pp-door-frame-inner" />
          <div className="pp-jali" />
        </div>
        <div className="pp-door-ornament is-left">❦</div>
        <div className="pp-door-title is-left">
          <span className="pp-door-kicker">{rightLabel || "Invited"}</span>
          <span className="pp-door-name">
            <span className="pp-door-amp">&amp; </span>
            {rightName}
          </span>
        </div>
        <div className="pp-door-handle is-left" aria-hidden="true">
          <div className="pp-brass-ring">
            <div className="pp-brass-inner" />
          </div>
        </div>
        <div className="pp-door-crest is-left">{crestRight}</div>
      </div>

      <div className="pp-latch">
        <p className="pp-latch-hint">{latchHint || "Open the doors to our forever"}</p>
        <button
          type="button"
          className="pp-latch-btn"
          aria-label="Open wedding invitation"
          onClick={beginOpen}
        >
          <span className="pp-latch-seal">
            <span className="pp-latch-mono">{sealInitials}</span>
            <span className="pp-latch-action">{latchAction || "Tap to Open"}</span>
          </span>
        </button>
        {!editable ? (
          <span className="pp-latch-keys">Press Enter or Space</span>
        ) : null}
      </div>
    </div>
  );
}
