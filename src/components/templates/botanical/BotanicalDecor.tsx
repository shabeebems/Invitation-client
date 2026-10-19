"use client";

import type { CSSProperties, ReactNode } from "react";

/** Fixed side botanical sprigs (SVG — not Cloudinary media). */
export function BotanicalSprigs() {
  return (
    <div className="bs-sprigs" aria-hidden="true">
      <svg className="bs-sprig bs-sprig-tl" viewBox="0 0 100 200" fill="currentColor">
        <path d="M10,180 Q30,120 70,80 T90,10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M40,140 Q20,135 15,115 Q35,115 45,135 Z" fill="#697652" opacity="0.6" />
        <path d="M52,118 Q72,105 82,120 Q65,130 54,122 Z" fill="#75825E" opacity="0.7" />
        <path d="M68,88 Q50,75 42,55 Q62,55 72,82 Z" fill="#64724E" opacity="0.6" />
        <path d="M80,50 Q100,42 98,22 Q82,32 78,48 Z" fill="#788562" opacity="0.8" />
      </svg>
      <svg className="bs-sprig bs-sprig-mr" viewBox="0 0 100 200" fill="currentColor">
        <path d="M90,190 Q70,120 30,80 T10,10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M60,145 Q80,140 85,120 Q65,120 55,140 Z" fill="#697652" opacity="0.6" />
        <path d="M48,118 Q28,105 18,120 Q35,130 46,122 Z" fill="#75825E" opacity="0.7" />
        <path d="M32,88 Q50,75 58,55 Q38,55 28,82 Z" fill="#64724E" opacity="0.6" />
        <path d="M20,50 Q0,42 2,22 Q18,32 22,48 Z" fill="#788562" opacity="0.8" />
      </svg>
      <svg className="bs-sprig bs-sprig-br" viewBox="0 0 100 200" fill="currentColor">
        <path d="M90,10 Q60,80 40,130 T10,195" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M65,55 Q85,50 90,30 Q70,30 60,50 Z" fill="#697652" opacity="0.6" />
        <path d="M52,85 Q32,70 22,85 Q39,95 50,87 Z" fill="#75825E" opacity="0.7" />
        <path d="M38,125 Q56,112 64,92 Q44,92 34,119 Z" fill="#64724E" opacity="0.6" />
      </svg>
    </div>
  );
}

export function FlourishRule({ children }: { children?: ReactNode }) {
  return <div className="bs-flourish">{children}</div>;
}

export function Reveal({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`bs-reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

export function LeafTwig({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M10,80 Q40,40 85,15" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="30" cy="55" fill="#6B7A55" r="7" />
      <circle cx="50" cy="38" fill="#788860" r="6" />
      <circle cx="70" cy="24" fill="#889870" r="5" />
    </svg>
  );
}

export function HeartMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}
