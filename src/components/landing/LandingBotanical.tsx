const LEAF = "M0 0C4-6.4 13.4-8.6 22.4-5.2C15.4 2.4 6.4 3.4 0 0Z";

const LEAVES: [number, number, number, number, string][] = [
  [62, 188, -128, 1.5, "#8FA889"],
  [64, 182, -40, 1.4, "#6F8E6A"],
  [60, 160, -146, 1.45, "#A9BDA2"],
  [62, 152, -30, 1.5, "#5D7B59"],
  [57, 126, -150, 1.35, "#6F8E6A"],
  [58, 118, -24, 1.35, "#8FA889"],
  [52, 92, -140, 1.25, "#5D7B59"],
  [54, 86, -36, 1.2, "#A9BDA2"],
  [50, 58, -128, 1.1, "#8FA889"],
  [53, 50, -52, 1.05, "#6F8E6A"],
  [58, 26, -78, 1, "#A9BDA2"],
  [82, 136, -60, 1.2, "#8FA889"],
  [90, 132, 18, 1.1, "#5D7B59"],
  [118, 116, -24, 1.15, "#6F8E6A"],
  [36, 104, -112, 1.1, "#A9BDA2"],
  [30, 106, 158, 1.05, "#6F8E6A"],
  [12, 96, -164, 1.05, "#8FA889"],
];

const ROUND_LEAVES: [number, number, number][] = [
  [104, 128, -22],
  [112, 120, -36],
  [70, 70, -28],
  [80, 62, -40],
  [88, 54, -52],
];

function Blossom({
  x,
  y,
  scale,
  rotate,
  tone,
}: {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  tone: "peach" | "ivory";
}) {
  const fill = tone === "peach" ? "#F6D0BC" : "#FFFBF3";
  const stroke = tone === "peach" ? "#E8AE94" : "#E4D7C1";

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M0 0C-8-5-9.5-17 0-22C9.5-17 8-5 0 0Z"
          transform={`rotate(${angle})`}
          fill={fill}
          stroke={stroke}
          strokeWidth="0.8"
        />
      ))}
      <circle r="4.2" fill={tone === "peach" ? "#E9A27F" : "#DDBE77"} />
      <circle r="1.8" fill="#A8844F" />
    </g>
  );
}

/** Watercolour-style sprig of sage leaves with peach and ivory blossoms. */
export default function LandingBotanical({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 200" className={className} fill="none" aria-hidden="true">
      <g stroke="#6B8865" strokeWidth="1.5" strokeLinecap="round">
        <path d="M66 198C58 160 66 120 54 82C48 60 50 38 60 10" />
        <path d="M60 142C76 132 98 124 122 114" />
        <path d="M56 112C42 104 26 100 10 94" />
        <path d="M52 76C64 68 78 60 92 50" />
      </g>
      {LEAVES.map(([x, y, rotate, scale, fill]) => (
        <path
          key={`${x}-${y}`}
          d={LEAF}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
          fill={fill}
          fillOpacity="0.88"
        />
      ))}
      {ROUND_LEAVES.map(([x, y, rotate]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="7"
          ry="5"
          transform={`rotate(${rotate} ${x} ${y})`}
          fill="#B4C5AC"
          fillOpacity="0.9"
        />
      ))}
      <Blossom x={70} y={138} scale={1} rotate={8} tone="peach" />
      <Blossom x={34} y={100} scale={0.8} rotate={-16} tone="ivory" />
      <Blossom x={66} y={66} scale={0.7} rotate={24} tone="peach" />
      <Blossom x={100} y={44} scale={0.5} rotate={10} tone="ivory" />
    </svg>
  );
}
