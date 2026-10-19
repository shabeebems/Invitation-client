"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "idle" | "opening" | "gone";

export default function CreamOpening({
  mono,
  eyebrow,
  title,
  dateLine,
  openLabel,
  editable = false,
  onCoverChange,
}: {
  mono: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  dateLine: ReactNode;
  openLabel?: string;
  editable?: boolean;
  onCoverChange?: (covering: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const covering = phase !== "gone";

  useEffect(() => {
    onCoverChange?.(covering);
  }, [covering, onCoverChange]);

  useEffect(() => {
    if (!covering) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("ce-locked");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("ce-locked");
    };
  }, [covering]);

  function open() {
    if (phase !== "idle") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("gone"), 1300);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase === "gone") return;
      if (event.key === "Escape") {
        setPhase("opening");
        window.setTimeout(() => setPhase("gone"), 1300);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  if (!covering) return null;

  return (
    <div
      className={`ce-cover${phase === "opening" ? " is-open" : ""}${editable ? " is-editing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation cover"
    >
      <div className="ce-half ce-half-l" aria-hidden="true" />
      <div className="ce-half ce-half-r" aria-hidden="true" />
      <div className="ce-cover-card">
        <div className="ce-mono">{mono}</div>
        <p className="ce-eyebrow" style={{ marginTop: "1.2rem" }}>
          {eyebrow}
        </p>
        <h1 className="ce-cover-title">{title}</h1>
        <p className="ce-cover-date">{dateLine}</p>
        <button type="button" className="ce-btn ce-btn-fill" onClick={open}>
          {openLabel || "Open Invitation"}
        </button>
      </div>
    </div>
  );
}
