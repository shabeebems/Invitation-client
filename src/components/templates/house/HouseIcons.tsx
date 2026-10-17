export function Flower({ className = "" }: { className?: string }) {
  return <span className={className}>❀</span>;
}

export function HouseIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4.5l2.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 15h16v3a1 1 0 0 1-1 1h-1.5M6.5 19H5a1 1 0 0 1-1-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 15 5.5 9.5A2 2 0 0 1 7.4 8h9.2a2 2 0 0 1 1.9 1.5L20 15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ShareIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 13.2 16 17.5M16 6.5 8 10.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MapFoldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M9 5.5 4.5 7.2v11.5L9 17M9 5.5l6 2.2M9 17l6 2.2M15 7.7l4.5-1.7v11.5L15 19.2M15 7.7V19.2M9 5.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function NavArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 3.5 20 19.5l-8-3.5-8 3.5L12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ExpandIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LeafFlourish({ className = "h-5 w-8", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 20"
      className={`${className} ${flip ? "-scale-x-100" : ""}`.trim()}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 14c6-1 10-6 14-10 1.5 5 1 9-1 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16 6c3 .5 7 1.5 12 1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path d="M12 10c2.5 1 4 3 4.5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function CornerVine({ className = "h-28 w-28", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${flip ? "-scale-x-100" : ""}`.trim()}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 112c18-8 34-28 40-52 4-16 2-34-8-48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M40 72c8-2 16-2 24 2M28 90c10-4 18-6 28-4M48 48c6 2 12 8 14 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <ellipse cx="52" cy="38" rx="7" ry="3.5" transform="rotate(-35 52 38)" fill="currentColor" opacity="0.28" />
      <ellipse cx="34" cy="78" rx="8" ry="3.5" transform="rotate(20 34 78)" fill="currentColor" opacity="0.22" />
      <ellipse cx="62" cy="62" rx="6" ry="2.8" transform="rotate(-10 62 62)" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function TripleLeaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="3.2" ry="5.5" opacity="0.85" />
      <ellipse cx="7" cy="14" rx="3" ry="5" transform="rotate(-40 7 14)" opacity="0.7" />
      <ellipse cx="17" cy="14" rx="3" ry="5" transform="rotate(40 17 14)" opacity="0.7" />
    </svg>
  );
}

export function CupIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 9h2.2a2.3 2.3 0 0 1 0 4.6H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 4.5c.4.8.4 1.6 0 2.4M11 4.5c.4.8.4 1.6 0 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6.5 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function UtensilsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 4v7M5 4v4.5a2 2 0 0 0 2 2V20M9 4v4.5a2 2 0 0 1-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 4v16M16 4c2.2 0 3.5 1.6 3.5 4S18.2 12 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SideBotanical({ className = "h-full w-24", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 90 440"
      className={`${className} ${flip ? "-scale-x-100" : ""}`.trim()}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M48 8c-3 42-16 86-20 132-4 42 5 84 3 128-2 44-14 86-20 140"
        stroke="#7a8a58"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M52 40c8 18 10 40 6 62M44 180c10 14 12 36 8 58M40 300c9 16 10 38 6 56"
        stroke="#8a7348"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse cx="30" cy="68" rx="16" ry="6.5" transform="rotate(-52 30 68)" fill="#6f8150" opacity="0.32" />
      <ellipse cx="56" cy="108" rx="13" ry="5.5" transform="rotate(38 56 108)" fill="#7a8a58" opacity="0.28" />
      <ellipse cx="28" cy="158" rx="17" ry="7" transform="rotate(-48 28 158)" fill="#6a7d4a" opacity="0.3" />
      <ellipse cx="58" cy="208" rx="14" ry="6" transform="rotate(32 58 208)" fill="#7a8a58" opacity="0.26" />
      <ellipse cx="26" cy="258" rx="15" ry="6.5" transform="rotate(-44 26 258)" fill="#6f8150" opacity="0.3" />
      <ellipse cx="54" cy="308" rx="13" ry="5.5" transform="rotate(36 54 308)" fill="#7a8a58" opacity="0.26" />
      <ellipse cx="24" cy="358" rx="14" ry="6" transform="rotate(-48 24 358)" fill="#6a7d4a" opacity="0.28" />
      <ellipse cx="50" cy="400" rx="12" ry="5" transform="rotate(30 50 400)" fill="#7a8a58" opacity="0.24" />
      <circle cx="40" cy="92" r="3.2" fill="#c47a5a" opacity="0.65" />
      <circle cx="44" cy="192" r="2.8" fill="#b86a4e" opacity="0.55" />
      <circle cx="38" cy="282" r="3.1" fill="#c47a5a" opacity="0.6" />
      <circle cx="42" cy="338" r="2.5" fill="#b86a4e" opacity="0.5" />
      <circle cx="36" cy="385" r="2.7" fill="#c47a5a" opacity="0.45" />
    </svg>
  );
}
