"use client";

/** Gold filigree used above the countdown title. */
export function VelvetCdFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-flourish ${className}`.trim()}
      viewBox="0 0 180 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 14 C28 14 34 6 52 10 C62 12 68 14 78 14"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M172 14 C152 14 146 6 128 10 C118 12 112 14 102 14"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M22 14 C30 10 38 10 44 14"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M158 14 C150 10 142 10 136 14"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path d="M90 6 L94 14 L90 22 L86 14 Z" fill="currentColor" />
      <circle cx="90" cy="14" r="2.1" fill="#fff8ee" />
      <circle cx="78" cy="14" r="1.4" fill="currentColor" />
      <circle cx="102" cy="14" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function VelvetCdDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-divider ${className}`.trim()}
      viewBox="0 0 140 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 8 H52" stroke="currentColor" strokeWidth="1" />
      <path d="M88 8 H132" stroke="currentColor" strokeWidth="1" />
      <path d="M70 2 L76 8 L70 14 L64 8 Z" fill="currentColor" />
      <circle cx="58" cy="8" r="1.3" fill="currentColor" />
      <circle cx="82" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function VelvetCdHeart({ className = "" }: { className?: string }) {
  return (
    <svg className={`vh-cd-heart ${className}`.trim()} viewBox="0 0 18 16" aria-hidden="true">
      <path
        d="M9 14.2 C4.2 10.4 1.4 8 1.4 4.9 C1.4 2.8 3 1.4 4.9 1.4 C6.2 1.4 7.4 2 9 3.4 C10.6 2 11.8 1.4 13.1 1.4 C15 1.4 16.6 2.8 16.6 4.9 C16.6 8 13.8 10.4 9 14.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function VelvetCdGoldVine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-gold-vine ${className}`.trim()}
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 12 C48 18 62 58 102 74 C138 90 148 44 196 52 C214 56 226 86 232 108"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M8 12 C22 52 64 46 102 74 C58 98 52 140 58 172"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path d="M78 38 C90 24 114 32 112 52 C110 68 90 66 84 54 C78 42 78 38 78 38Z" fill="currentColor" opacity="0.55" />
      <path d="M128 88 C142 72 168 82 164 106 C160 126 136 122 130 108 C124 94 128 88 128 88Z" fill="currentColor" opacity="0.45" />
      <path d="M48 86 C58 74 78 80 76 98 C74 112 56 110 50 100 C44 90 48 86 48 86Z" fill="currentColor" opacity="0.4" />
      <circle cx="102" cy="74" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function VelvetCdLeafWreath({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-leaf-wreath ${className}`.trim()}
      viewBox="0 0 80 48"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 28 C22 18 34 16 46 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 32 C32 24 46 22 62 30" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
      <path d="M16 22 C22 14 32 14 34 22 C28 24 20 24 16 22Z" fill="currentColor" opacity="0.75" />
      <path d="M30 18 C36 10 48 12 48 20 C42 22 32 22 30 18Z" fill="currentColor" opacity="0.7" />
      <path d="M44 22 C52 14 64 18 62 26 C54 28 46 26 44 22Z" fill="currentColor" opacity="0.65" />
      <path d="M24 30 C30 24 40 24 42 32 C34 34 26 34 24 30Z" fill="currentColor" opacity="0.7" />
      <path d="M42 32 C50 26 62 28 64 36 C54 38 44 36 42 32Z" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function VelvetCdLantern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-lantern ${className}`.trim()}
      viewBox="0 0 48 92"
      fill="none"
      aria-hidden="true"
    >
      <path d="M24 0 V18" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.6 2.2" />
      <circle cx="24" cy="18" r="2" fill="currentColor" />
      <path d="M16 22 H32 L36 30 H12 Z" fill="currentColor" />
      <path d="M12 30 L8 44 L16 70 H32 L40 44 L36 30 Z" fill="#c9a05a" />
      <path d="M12 30 L8 44 L16 70 H32 L40 44 L36 30 Z" fill="#e8c888" opacity="0.55" />
      <path d="M14 34 H34 M13 42 H35 M14.5 52 H33.5 M16 62 H32" stroke="#7a1c22" strokeWidth="0.7" opacity="0.45" />
      <path d="M16 70 H32 L28 78 H20 Z" fill="currentColor" />
      <ellipse cx="24" cy="46" rx="10" ry="14" fill="#f6e0a8" opacity="0.4" />
    </svg>
  );
}

export function VelvetCdHexFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`vh-cd-hex-frame ${className}`.trim()}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path d="M30 6 L70 6 L94 30 L94 70 L70 94 L30 94 L6 70 L6 30 Z" fill="#2c070a" />
      <path
        d="M30 6 L70 6 L94 30 L94 70 L70 94 L30 94 L6 70 L6 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M33 12 L67 12 L88 33 L88 67 L67 88 L33 88 L12 67 L12 33 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path d="M50 6 L52.4 10.2 L50 12.2 L47.6 10.2 Z" fill="currentColor" />
      <path d="M50 94 L52.4 89.8 L50 87.8 L47.6 89.8 Z" fill="currentColor" />
      <circle cx="30" cy="6" r="1.4" fill="currentColor" />
      <circle cx="70" cy="6" r="1.4" fill="currentColor" />
      <circle cx="30" cy="94" r="1.4" fill="currentColor" />
      <circle cx="70" cy="94" r="1.4" fill="currentColor" />
    </svg>
  );
}

