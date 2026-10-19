"use client";

export function PalaceHeartRule() {
  return (
    <div className="pp-heart-rule" aria-hidden="true">
      <span className="pp-heart-rule-line" />
      <span className="pp-heart-rule-gem">♥</span>
      <span className="pp-heart-rule-line is-flip" />
    </div>
  );
}

export function PalaceOliveTwigs({ label }: { label?: string }) {
  return (
    <div className="pp-olive-row" aria-hidden={!label}>
      <svg className="pp-olive is-flip" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17 8C8 10 5 16 5 21M9 13C12 11 16 7 17 3M12 17C15 15 19 13 21 9" />
      </svg>
      {label ? <span className="pp-olive-label">{label}</span> : null}
      <svg className="pp-olive" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17 8C8 10 5 16 5 21M9 13C12 11 16 7 17 3M12 17C15 15 19 13 21 9" />
      </svg>
    </div>
  );
}

/** Timeline milestone icons — code-drawn, keyed by loveStoryItems.icon */
export function PalaceStoryIcon({ kind }: { kind?: string }) {
  const k = (kind || "meet").toLowerCase();
  if (k.includes("chat") || k.includes("message")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    );
  }
  if (k.includes("date") || k.includes("heart")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    );
  }
  if (k.includes("engage") || k.includes("ring") || k.includes("diamond")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="14" r="7" />
        <path d="M9 5l3-3 3 3-3 2-3-2z" />
      </svg>
    );
  }
  if (k.includes("wedding") || k.includes("home") || k.includes("mandap")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
