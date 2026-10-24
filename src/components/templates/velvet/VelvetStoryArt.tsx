import type { SVGProps } from "react";

/**
 * Ornate milestone icon matching Panel 05 Modern Strip
 * (Heart -> Chat -> Calendar -> Ring -> Wedding Chapel)
 */
export function VelvetStoryMilestoneIcon({
  kind,
  index = 0,
  className = "",
  ...props
}: {
  kind?: string;
  index?: number;
  className?: string;
} & SVGProps<SVGSVGElement>) {
  const normalized = (kind || "").toLowerCase();

  // Determine icon type by explicit string or fallback to index order (0: heart, 1: chat, 2: date, 3: ring, 4: wedding)
  let type = "heart";
  if (normalized.includes("chat") || normalized.includes("message")) {
    type = "chat";
  } else if (
    normalized.includes("date") ||
    normalized.includes("coffee") ||
    normalized.includes("calendar")
  ) {
    type = "date";
  } else if (
    normalized.includes("ring") ||
    normalized.includes("engag") ||
    normalized.includes("diamond") ||
    normalized.includes("propos")
  ) {
    type = "ring";
  } else if (
    normalized.includes("wedding") ||
    normalized.includes("marry") ||
    normalized.includes("vow") ||
    normalized.includes("church") ||
    normalized.includes("chapel") ||
    normalized.includes("arch")
  ) {
    type = "wedding";
  } else if (normalized.includes("meet") || normalized.includes("love") || normalized.includes("heart")) {
    type = "heart";
  } else {
    const cycle = ["heart", "chat", "date", "ring", "wedding"];
    type = cycle[index % cycle.length];
  }

  if (type === "chat") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" />
        <circle cx="12" cy="11.5" r="0.9" fill="currentColor" />
        <circle cx="15.5" cy="11.5" r="0.9" fill="currentColor" />
      </svg>
    );
  }

  if (type === "date") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <rect x="3" y="4" width="18" height="17" rx="2.5" />
        <line x1="16" y1="2" x2="16" y2="5" />
        <line x1="8" y1="2" x2="8" y2="5" />
        <line x1="3" y1="9.5" x2="21" y2="9.5" />
        <circle cx="8" cy="13.5" r="1" fill="currentColor" />
        <circle cx="12" cy="13.5" r="1" fill="currentColor" />
        <circle cx="16" cy="13.5" r="1" fill="currentColor" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "ring") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <circle cx="12" cy="15" r="6.2" />
        {/* Diamond crown */}
        <polygon points="12,2.8 15.5,5.8 12,8.2 8.5,5.8" strokeWidth="1.4" />
        <line x1="8.5" y1="5.8" x2="15.5" y2="5.8" strokeWidth="1.2" />
        <line x1="12" y1="2.8" x2="12" y2="8.2" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === "wedding") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <path d="M3 10.5L12 3.5l9 7V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
        {/* Archway door */}
        <path d="M9 22v-6a3 3 0 0 1 6 0v6" />
        {/* Cross or top finial */}
        <line x1="12" y1="1.8" x2="12" y2="3.5" strokeWidth="1.4" />
      </svg>
    );
  }

  // default: heart
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/**
 * Top decorative ornament for Vertical Flow timeline line
 */
export function VelvetVerticalFlowPin({ className = "" }: { className?: string }) {
  return (
    <div className={`vh-vf-pin ${className}`.trim()} aria-hidden="true">
      <span className="vh-vf-pin-dot" />
      <span className="vh-vf-pin-stem" />
    </div>
  );
}

/**
 * Botanical corner foliage for bottom-left and bottom-right of Flowing Curve (Panel 04)
 */
export function VelvetCurveCornerLeaf({
  side = "left",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={`vh-curve-corner is-${side} ${className}`.trim()}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Main arching stem */}
      <path
        d="M6 114 C20 90 40 50 82 24 C96 16 108 12 114 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Secondary branch */}
      <path
        d="M26 86 C42 76 64 68 86 64"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Leaf 1 */}
      <path
        d="M114 8 C108 2 96 6 94 14 C92 22 104 20 114 8Z"
        fill="currentColor"
        opacity="0.75"
      />
      {/* Leaf 2 */}
      <path
        d="M86 22 C78 16 68 20 68 28 C68 36 78 34 86 22Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Leaf 3 */}
      <path
        d="M62 40 C52 34 44 40 44 48 C44 56 54 54 62 40Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Leaf 4 on secondary branch */}
      <path
        d="M86 64 C88 56 80 50 72 52 C66 54 74 64 86 64Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Leaf 5 */}
      <path
        d="M50 72 C42 66 34 70 34 78 C34 84 44 82 50 72Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* Delicate accent berries / dots */}
      <circle cx="82" cy="24" r="2.2" fill="currentColor" opacity="0.85" />
      <circle cx="64" cy="68" r="1.8" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/**
 * Bottom ornate divider matching Panel 05 Modern Strip
 * (Left botanical sprig ─── ♥ ─── Right botanical sprig)
 */
export function VelvetModernStripFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`vh-strip-bottom-flourish ${className}`.trim()} aria-hidden="true">
      {/* Left botanical sprig */}
      <svg
        className="vh-strip-flourish-foliage is-left"
        viewBox="0 0 100 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M96 12 C74 12 50 14 10 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Leaf pairs */}
        <path
          d="M80 12 C76 6 66 7 68 12 C66 17 76 18 80 12Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M58 12 C54 7 46 8 48 12 C46 16 54 17 58 12Z"
          fill="currentColor"
          opacity="0.75"
        />
        <path
          d="M36 12 C32 8 26 9 28 12 C26 15 32 16 36 12Z"
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx="10" cy="12" r="2" fill="currentColor" />
      </svg>

      {/* Horizontal connector line */}
      <span className="vh-strip-flourish-line" />

      {/* Center golden heart */}
      <span className="vh-strip-flourish-heart">♥</span>

      {/* Horizontal connector line */}
      <span className="vh-strip-flourish-line" />

      {/* Right botanical sprig (symmetrical) */}
      <svg
        className="vh-strip-flourish-foliage is-right"
        viewBox="0 0 100 24"
        fill="none"
        aria-hidden="true"
        style={{ transform: "scaleX(-1)" }}
      >
        <path
          d="M96 12 C74 12 50 14 10 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M80 12 C76 6 66 7 68 12 C66 17 76 18 80 12Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M58 12 C54 7 46 8 48 12 C46 16 54 17 58 12Z"
          fill="currentColor"
          opacity="0.75"
        />
        <path
          d="M36 12 C32 8 26 9 28 12 C26 15 32 16 36 12Z"
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx="10" cy="12" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Continuous flowing SVG S-curve for Flowing Curve layout (Panel 04).
 * Weaves smoothly across photo cards and heart milestone nodes.
 */
export function VelvetFlowingWindingCurve({
  itemCount,
  className = "",
}: {
  itemCount: number;
  className?: string;
}) {
  const count = Math.max(2, itemCount);

  // Generate cubic bezier path through the rows
  // X coordinates (0-100%):
  // Even rows: Photo Left (~24%), Heart Center-Right (~50%), Text Right (~75%)
  // Odd rows: Text Left (~25%), Heart Center-Left (~50%), Photo Right (~76%)
  const segments: string[] = [];

  // Start point above first row
  segments.push("M 25 2");

  for (let i = 0; i < count; i++) {
    const isEven = i % 2 === 0;
    const rowY = ((i + 0.5) / count) * 96 + 2;
    const nextY = ((i + 1.5) / count) * 96 + 2;

    if (i === 0) {
      // Loop over photo 0 on the left and sweep down-right across through heart 0
      segments.push(`C 35 2, 54 ${rowY - 8}, 50 ${rowY}`);
    } else {
      const prevIsEven = (i - 1) % 2 === 0;
      const prevY = ((i - 0.5) / count) * 96 + 2;
      const midY = (prevY + rowY) / 2;

      if (prevIsEven) {
        // From Heart 0 (X ~ 50%) curving wide towards Photo 1 (X ~ 78%) then sweeping in through Heart 1 (X ~ 50%)
        segments.push(`C 68 ${midY - 4}, 82 ${midY + 2}, 50 ${rowY}`);
      } else {
        // From Heart 1 (X ~ 50%) curving wide towards Photo 2 (X ~ 22%) then sweeping in through Heart 2 (X ~ 50%)
        segments.push(`C 32 ${midY - 4}, 18 ${midY + 2}, 50 ${rowY}`);
      }
    }

    // After the last item, curve gently down to the bottom
    if (i === count - 1) {
      const finalCurveX = isEven ? 45 : 55;
      segments.push(`C 50 ${rowY + 6}, ${finalCurveX} 96, 50 99`);
    }
  }

  const pathData = segments.join(" ");

  return (
    <svg
      className={`vh-flowing-svg-curve ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vhGoldWindingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f2deb4" stopOpacity="0.75" />
          <stop offset="15%" stopColor="#d7b77c" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#f2deb4" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#d7b77c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b58a4a" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d={pathData}
        stroke="url(#vhGoldWindingGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
