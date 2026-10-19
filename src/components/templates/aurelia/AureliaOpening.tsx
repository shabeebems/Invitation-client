"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "idle" | "done";

export default function AureliaOpening({
  sealLabel,
  eyebrow,
  title,
  openLabel,
  editable = false,
  onCoverChange,
}: {
  sealLabel: string;
  eyebrow: ReactNode;
  title: ReactNode;
  openLabel?: string;
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
    document.body.classList.add("au-locked");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("au-locked");
    };
  }, [covering]);

  function open() {
    if (phase !== "idle") return;
    setPhase("done");
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase === "done") return;
      if (event.key === "Escape") setPhase("done");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  if (!covering) return null;

  return (
    <div
      className={`au-gate${editable ? " is-editing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Invitation"
    >
      <div className="au-seal">{sealLabel}</div>
      <p className="au-eyebrow">{eyebrow}</p>
      <h1 className="au-gate-title">{title}</h1>
      <button type="button" className="au-btn" onClick={open}>
        {openLabel || "Open the invitation"}
      </button>
    </div>
  );
}
