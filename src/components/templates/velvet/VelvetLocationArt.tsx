import type { SVGProps } from "react";

/**
 * Location pin icon with inner dot matching reference image
 */
export function VelvetLocationPinIcon({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Paper airplane / navigation arrow icon matching Panel 02 and Panel 03 button
 */
export function VelvetNavArrowIcon({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

/**
 * Delicate horizontal gold divider with center knot/diamond
 */
export function VelvetVenueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`vh-venue-divider ${className}`.trim()} aria-hidden="true">
      <span className="vh-venue-divider-line" />
      <span className="vh-venue-divider-knot">❖</span>
      <span className="vh-venue-divider-line" />
    </div>
  );
}

/**
 * Indian heritage temple / pavilion / mandap architectural illustration matching Panel 03
 */
export function VelvetHeritageTempleEmblem({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Top spire / finial */}
      <path d="M24 2v4" strokeWidth="1.5" />
      <circle cx="24" cy="2" r="1" fill="currentColor" />

      {/* Top tiered pagoda roof */}
      <path d="M20 7l4-2 4 2v1h-8V7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M16 11l8-4 8 4-1 1H17l-1-1z" fill="currentColor" fillOpacity="0.25" />

      {/* Main sweeping curved heritage roof */}
      <path
        d="M9 17c3-3 8-5 15-5s12 2 15 5l-1 2H10l-1-2z"
        fill="currentColor"
        fillOpacity="0.3"
      />

      {/* Roof eave curves with decorative upturned tips */}
      <path d="M8 18c1-1 3-1 4 0M36 18c1-1 3-1 4 0" />

      {/* Pillars / Columns */}
      <line x1="13" y1="19" x2="13" y2="29" strokeWidth="1.4" />
      <line x1="17" y1="19" x2="17" y2="29" strokeWidth="1.1" />
      <line x1="21" y1="19" x2="21" y2="29" strokeWidth="1.1" />
      <line x1="24" y1="19" x2="24" y2="29" strokeWidth="1.1" />
      <line x1="27" y1="19" x2="27" y2="29" strokeWidth="1.1" />
      <line x1="31" y1="19" x2="31" y2="29" strokeWidth="1.1" />
      <line x1="35" y1="19" x2="35" y2="29" strokeWidth="1.4" />

      {/* Plinth & Steps */}
      <rect x="11" y="29" width="26" height="2" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      <rect x="8" y="31" width="32" height="2" rx="0.5" fill="currentColor" fillOpacity="0.5" />
      <line x1="6" y1="33" x2="42" y2="33" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Stylized illustrated map panel matching Panel 02
 */
export function VenueIllustratedMap({ venueName }: { venueName: string }) {
  return (
    <svg
      className="vh-venue-map-svg"
      viewBox="0 0 420 280"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="vhMapCreamGrad" cx="0.5" cy="0.4" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7EBDC" />
        </radialGradient>
      </defs>
      <rect width="420" height="280" fill="url(#vhMapCreamGrad)" />

      {/* Sea Coastline on Left */}
      <path
        d="M 0 0 C 60 40 45 140 70 200 C 85 240 60 260 65 280 L 0 280 Z"
        fill="#E4F0F5"
        opacity="0.95"
      />
      <path
        d="M 70 0 C 60 40 45 140 70 200 C 85 240 60 260 65 280"
        fill="none"
        stroke="#B8D7E3"
        strokeWidth="2.5"
      />
      <text
        x="24"
        y="145"
        fill="#759BA8"
        fontFamily="Cinzel, Georgia, serif"
        fontSize="10"
        letterSpacing="2.5"
      >
        ARABIAN SEA
      </text>

      {/* City Blocks */}
      <g fill="#EFE5D5" opacity="0.75">
        <rect x="95" y="18" width="85" height="52" rx="4" />
        <rect x="200" y="24" width="105" height="46" rx="4" />
        <rect x="325" y="30" width="75" height="55" rx="4" />
        <rect x="100" y="95" width="60" height="65" rx="4" />
        <rect x="290" y="105" width="110" height="55" rx="4" />
        <rect x="110" y="190" width="95" height="60" rx="4" />
        <rect x="225" y="185" width="85" height="65" rx="4" />
      </g>

      {/* White Street Background Lines */}
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="12">
        <path d="M 70 50 L 420 50" />
        <path d="M 70 145 L 420 145" />
        <path d="M 90 240 L 420 240" />
        <path d="M 180 0 L 180 280" />
        <path d="M 280 0 L 280 280" />
      </g>

      {/* Gold Street Center Lines */}
      <g fill="none" stroke="#DFC8A6" strokeLinecap="round" strokeWidth="2.5">
        <path d="M 70 50 L 420 50" />
        <path d="M 70 145 L 420 145" />
        <path d="M 90 240 L 420 240" />
        <path d="M 180 0 L 180 280" />
        <path d="M 280 0 L 280 280" />
      </g>

      {/* Location Pin Halo & Teardrop Pin */}
      <circle cx="230" cy="116" r="16" fill="#C29653" opacity="0.25" />
      <ellipse cx="230" cy="138" rx="12" ry="4" fill="#430B0B" opacity="0.2" />
      <path
        d="M 230 84 C 217 84 206 95 206 108 C 206 124 230 140 230 140 C 230 140 254 124 254 108 C 254 95 243 84 230 84 Z"
        fill="#8C1A22"
        stroke="#C29653"
        strokeWidth="2"
      />
      <circle cx="230" cy="107" r="6" fill="#FFF2DF" />

      {/* Venue Name Label Pill */}
      <rect
        x="145"
        y="152"
        width="170"
        height="28"
        rx="14"
        fill="#FFFFFF"
        stroke="#C29653"
        strokeWidth="1.3"
      />
      <text
        x="230"
        y="171"
        textAnchor="middle"
        fill="#430B0B"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="12.5"
        fontWeight="700"
      >
        {(venueName || "Venue").slice(0, 26)}
      </text>
    </svg>
  );
}
