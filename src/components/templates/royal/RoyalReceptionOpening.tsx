"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Phase = "idle" | "breaking" | "opening" | "revealing" | "done";

const GOLD = "#e7d3a4";
const GOLD_PALE = "#f3e8cd";
const GOLD_DEEP = "#b9893e";

const goldText: CSSProperties = {
  color: GOLD,
  WebkitTextFillColor: GOLD,
};

export default function RoyalReceptionOpening({
  groomName,
  brideName,
  groomInitial,
  brideInitial,
  bismillah,
  weekday,
  day,
  monthYear,
  tagline = "An invitation awaits",
  openHint = "Tap the seal to open",
  editable = false,
  onCoverChange,
}: {
  groomName: string;
  brideName: string;
  groomInitial: string;
  brideInitial: string;
  bismillah?: ReactNode;
  weekday?: string;
  day?: string;
  monthYear?: string;
  tagline?: ReactNode;
  openHint?: string;
  editable?: boolean;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const covering = phase !== "done";

  useEffect(() => {
    onCoverChange?.(covering);
  }, [covering, onCoverChange]);

  useEffect(() => {
    if (!covering) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyHeight = document.body.style.height;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.height = prevBodyHeight;
    };
  }, [covering]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, []);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function finish() {
    setPhase("done");
  }

  function beginOpen() {
    if (phase !== "idle") return;
    clearTimers();
    setPhase("breaking");

    timers.current.push(
      window.setTimeout(() => setPhase("opening"), 520),
      window.setTimeout(() => setPhase("revealing"), 1680),
      window.setTimeout(() => finish(), 2480)
    );
  }

  function replay() {
    clearTimers();
    setPhase("idle");
  }

  if (phase === "done") {
    if (!editable) return null;
    return (
      <button
        type="button"
        className="rr-replay-btn"
        onClick={replay}
        aria-label="Replay invitation opening"
        style={goldText}
      >
        Replay opening
      </button>
    );
  }

  const isBreaking = phase === "breaking" || phase === "opening" || phase === "revealing";
  const isOpening = phase === "opening" || phase === "revealing";
  const isRevealing = phase === "revealing";

  return (
    <div
      className={`rr-opening ${isRevealing ? "is-revealing" : ""} ${isOpening ? "is-opening" : ""} ${
        isBreaking ? "is-breaking" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Open invitation"
      style={{
        color: GOLD,
        WebkitTextFillColor: GOLD,
      }}
    >
      <div className="rr-opening-glow" aria-hidden="true" />

      <div className="rr-opening-copy">
        <p
          className="rr-opening-bismillah font-arabic"
          style={goldText}
          onClick={(event) => {
            if (editable) {
              event.stopPropagation();
            }
          }}
        >
          {bismillah}
        </p>
        <p
          className="rr-opening-tagline font-caps"
          style={{ ...goldText, letterSpacing: "0.28em", textTransform: "uppercase" }}
          onClick={(event) => {
            if (editable) {
              event.stopPropagation();
            }
          }}
        >
          {tagline}
        </p>
      </div>

      <div className="rr-stage">
        <div className="rr-envelope" aria-hidden={isOpening}>
          <div className="rr-envelope-pocket" />
          <div className="rr-envelope-flap" />
          <div className="rr-envelope-border" />

          <article className="rr-card">
            <div className="rr-card-inner">
              <p className="rr-card-mono font-caps" style={goldText}>
                {groomInitial}
                <span style={{ color: GOLD_DEEP }}>&</span>
                {brideInitial}
              </p>
              <h2 className="rr-card-names font-names" style={goldText}>
                {groomName}
                <span className="font-invite-serif" style={{ color: GOLD_DEEP }}>
                  {" "}
                  &{" "}
                </span>
                {brideName}
              </h2>
              <p className="rr-card-date font-caps" style={{ color: GOLD_PALE, WebkitTextFillColor: GOLD_PALE }}>
                {[weekday, day, monthYear].filter(Boolean).join(" · ")}
              </p>
              <p className="rr-card-note font-invite-serif" style={{ color: GOLD_DEEP, WebkitTextFillColor: GOLD_DEEP }}>
                With joy, we invite you
              </p>
            </div>
          </article>

          <button
            type="button"
            className="rr-wax"
            onClick={beginOpen}
            aria-label="Break wax seal and open invitation"
            disabled={phase !== "idle"}
          >
            <span
              className="rr-wax-crest"
              aria-hidden="true"
              style={{ color: GOLD_PALE, WebkitTextFillColor: GOLD_PALE }}
            >
              {groomInitial}
              <i style={{ color: GOLD, WebkitTextFillColor: GOLD }}>&</i>
              {brideInitial}
            </span>
            <span className="rr-wax-crack" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p
        className="rr-opening-hint font-caps"
        style={{
          ...goldText,
          border: `1px solid ${GOLD}`,
          background: "color-mix(in srgb, var(--night-deep) 75%, transparent)",
        }}
      >
        {phase === "idle" ? openHint : "Opening…"}
      </p>
    </div>
  );
}
