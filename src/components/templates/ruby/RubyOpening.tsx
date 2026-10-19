"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "idle" | "opening" | "done";

export default function RubyOpening({
  hostLabel,
  names,
  dateLine,
  sealInitial,
  tapHint,
  editable = false,
  onCoverChange,
}: {
  hostLabel: ReactNode;
  names: ReactNode;
  dateLine: ReactNode;
  sealInitial: string;
  tapHint?: string;
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
    document.body.classList.add("rb-lock");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("rb-lock");
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
    window.setTimeout(finish, 2800);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase === "done") return;
      if (event.key === "Escape") finish();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  if (!covering) return null;

  return (
    <div
      className={`rb-stage${phase === "opening" ? " is-opening is-opened" : ""}${editable ? " is-editing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Open the wedding invitation"
    >
      <div className={`rb-env${phase === "opening" ? " is-open" : ""}`}>
        <div className="rb-env-back" />
        <div className="rb-env-card">
          <div>
            <small>{hostLabel}</small>
            <span className="rb-gv rb-env-names">{names}</span>
            <small>{dateLine}</small>
          </div>
        </div>
        <div className="rb-env-pocket" />
        <div className="rb-env-flap" />
        <button
          type="button"
          className="rb-seal rb-gv"
          aria-label="Open the invitation"
          onClick={beginOpen}
        >
          {sealInitial}
        </button>
      </div>
      <div className="rb-tap">{tapHint || "TAP THE SEAL"}</div>
    </div>
  );
}
