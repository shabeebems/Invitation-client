"use client";

interface BurgundyFloralDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BurgundyFloralDivider({
  className = "",
  style,
}: BurgundyFloralDividerProps) {
  return (
    <div
      style={style}
      className={`mx-auto flex items-center justify-center gap-3.5 ${className}`}
    >
      {/* Left line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--ab-burgundy)]/40" />

      {/* Center Floral Medallion */}
      <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        className="shrink-0 transition-transform duration-700"
      >
        <circle cx={11} cy={11} r={4.5} fill="var(--ab-burgundy)" opacity={0.22} />
        <path d="M11 4 C13 7, 14 9, 11 11 C8 9, 9 7, 11 4Z" fill="var(--ab-burgundy)" opacity={0.65} />
        <path d="M18 11 C15 13, 13 14, 11 11 C13 8, 15 9, 18 11Z" fill="var(--ab-burgundy)" opacity={0.65} />
        <path d="M11 18 C9 15, 8 13, 11 11 C14 13, 13 15, 11 18Z" fill="var(--ab-burgundy)" opacity={0.65} />
        <path d="M4 11 C7 9, 9 8, 11 11 C9 14, 7 13, 4 11Z" fill="var(--ab-burgundy)" opacity={0.65} />
        <circle cx={11} cy={11} r={2} fill="var(--ab-gold)" opacity={0.85} />
      </svg>

      {/* Right line */}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--ab-burgundy)]/40" />
    </div>
  );
}
