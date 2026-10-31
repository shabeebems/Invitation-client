"use client";

import { useId } from "react";

const LEAF = "M0 0C3.4-3.8 9.6-4.6 14 0 9.6 4.6 3.4 3.8 0 0Z";
const LEAF_RIB = "M1 0Q7-.4 12.6 0";
const PETAL = "M0 0C-4.6-2-6.2-8.2-3.2-11.2-1.6-12.6 1.6-12.6 3.2-11.2 6.2-8.2 4.6-2 0 0Z";
const PETAL_VEIN = "M0-1.8Q-.4-6 0-9.4";
const BUD = "M0 0C-2.4-1.8-2.6-5.6 0-8 2.6-5.6 2.4-1.8 0 0Z";
const CALYX = "M0 .4C-2.2-.4-3-2.4-2.5-4.4-1.5-3.2-.6-2.8 0-2.7.6-2.8 1.5-3.2 2.5-4.4 3-2.4 2.2-.4 0 .4Z";
const STAMENS: [number, number][] = [
  [3.4, 0],
  [2.14, 2.64],
  [-0.77, 3.31],
  [-3.06, 1.48],
  [-3.05, -1.49],
  [-0.75, -3.32],
  [2.14, -2.64],
];
const HEART =
  "M5 8.8C2.4 7 .4 5.2.4 3.1.4 1.6 1.6.4 3 .4c.9 0 1.6.4 2 1.1.4-.7 1.1-1.1 2-1.1 1.4 0 2.6 1.2 2.6 2.7 0 2.1-2 3.9-4.6 5.7z";
const WAX =
  "M95.60 8.16Q100.00 6.60 104.38 8.20Q108.76 9.80 112.90 12.10Q117.04 14.41 118.56 18.91Q120.08 23.42 120.38 28.07Q120.67 32.72 118.11 36.56Q115.56 40.41 112.53 44.07Q109.50 47.73 104.75 48.07Q100.00 48.40 95.38 47.80Q90.76 47.19 87.52 43.86Q84.29 40.53 81.56 36.68Q78.84 32.83 79.43 28.13Q80.01 23.44 81.76 19.14Q83.50 14.84 87.35 12.28Q91.19 9.71 95.60 8.16Z";

type LeafSpec = [x: number, y: number, rot: number, scale?: number, alt?: boolean];
type BloomSpec = [x: number, y: number, scale: number, rot?: number];
type BudSpec = [x: number, y: number, rot: number, scale?: number];

function leaves(specs: LeafSpec[]) {
  return specs.map(([x, y, rot, scale = 1, alt], i) => (
    <g key={`l${i}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path className={alt ? "cwa-leaf is-alt" : "cwa-leaf"} d={LEAF} />
      <path className="cwa-rib" d={LEAF_RIB} />
    </g>
  ));
}

function blooms(specs: BloomSpec[]) {
  return specs.map(([x, y, scale, rot = 0], i) => (
    <g key={`b${i}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path className="cwa-petal" d={PETAL} />
          <path className="cwa-vein" d={PETAL_VEIN} />
        </g>
      ))}
      <circle className="cwa-core" r="2.5" />
      {STAMENS.map(([sx, sy], j) => (
        <circle key={j} className="cwa-stamen" cx={sx} cy={sy} r=".6" />
      ))}
    </g>
  ));
}

function buds(specs: BudSpec[]) {
  return specs.map(([x, y, rot, scale = 1], i) => (
    <g key={`u${i}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path className="cwa-petal" d={BUD} />
      <path className="cwa-leaf" d={CALYX} />
    </g>
  ));
}

/** Low cluster of open blossoms, buds and leaves; sits in a bottom-left corner. */
export function CreamBlossomCluster({ className = "" }: { className?: string }) {
  return (
    <svg className={`cwa ${className}`.trim()} viewBox="0 0 122 132" aria-hidden="true">
      <g className="cwa-stem">
        <path d="M40 106C44 94 46 86 48 78" />
        <path d="M40 106C36 102 31 99 26 98" />
        <path d="M40 106C50 104 60 100 70 96" />
        <path d="M40 106C46 86 54 62 64 40" />
        <path d="M40 106C60 108 82 102 104 92" />
        <path d="M40 106C30 98 20 88 13 78" />
        <path d="M40 106C34 114 26 122 14 130" />
        <path d="M54 66C50 56 44 48 36 42" />
      </g>
      {leaves([
        [40, 106, 150, 1.5],
        [38, 108, 122, 1.25, true],
        [40, 106, 196, 1.55, true],
        [30, 99, 214, 1.3],
        [20, 89, 226, 1.15, true],
        [44, 108, 34, 1.45],
        [58, 106, 6, 1.5, true],
        [76, 103, -14, 1.3],
        [92, 97, -30, 1.1, true],
        [86, 101, 22, 1],
        [38, 92, -118, 1.3, true],
        [46, 82, -100, 1],
        [56, 58, -40, 1.05, true],
        [58, 52, -112, 1],
        [44, 49, 214, 0.95, true],
        [62, 44, -18, 0.85],
        [20, 115, 160, 1.15, true],
      ])}
      {buds([
        [64, 40, 22, 1.1],
        [36, 42, -46, 1],
        [104, 92, 64, 0.95],
        [13, 78, -40, 0.95],
      ])}
      {blooms([
        [26, 97, 1.2, 22],
        [71, 95, 1.15, -12],
        [47, 76, 1.5, 6],
      ])}
    </svg>
  );
}

/** Tall spray climbing upward; blossoms mid-stem, buds at the tip. */
export function CreamBlossomSpray({ className = "" }: { className?: string }) {
  return (
    <svg className={`cwa ${className}`.trim()} viewBox="0 0 72 158" aria-hidden="true">
      <g className="cwa-stem">
        <path d="M30 156C28 122 32 90 38 62 42 42 44 24 42 6" />
        <path d="M31 106C28 101 26 97 24 92" />
        <path d="M35 86C38 81 41 77 45 74" />
        <path d="M43 34C46 30 48 28 51 25" />
        <path d="M40 46C36 42 33 38 29 34" />
      </g>
      {leaves([
        [30, 150, -146, 1.5],
        [30, 144, -30, 1.45, true],
        [29, 132, 204, 1.4, true],
        [30, 124, -20, 1.35],
        [30, 114, 216, 1.2],
        [31, 106, -36, 1.1, true],
        [33, 96, 228, 1, true],
        [36, 84, -18, 1],
        [37, 70, 214, 0.9],
        [38, 56, -30, 0.85, true],
        [40, 44, 220, 0.8],
        [42, 30, -40, 0.72, true],
        [42, 18, 214, 0.66],
      ])}
      {buds([
        [42, 6, -4, 1.1],
        [51, 25, 38, 0.95],
        [29, 34, -36, 0.9],
      ])}
      {blooms([
        [38, 58, 0.95, -15],
        [47, 76, 1.15, 12],
        [23, 93, 1.3, 6],
      ])}
    </svg>
  );
}

/** Slender stem with small flowers; used on the right edge. */
export function CreamBlossomTwig({ className = "" }: { className?: string }) {
  return (
    <svg className={`cwa ${className}`.trim()} viewBox="0 0 54 124" aria-hidden="true">
      <g className="cwa-stem">
        <path d="M8 122C16 96 26 64 44 10" />
        <path d="M31 52C36 47 40 43 46 41" />
        <path d="M21 82C15 75 11 69 9 61" />
        <path d="M38 28C34 24 32 21 30 16" />
      </g>
      {leaves([
        [12, 108, -110, 0.85],
        [14, 100, -40, 0.85, true],
        [18, 90, -118, 0.75, true],
        [24, 72, -38, 0.75],
        [27, 62, -112, 0.7],
        [34, 40, -32, 0.6, true],
      ])}
      {buds([
        [9, 61, -28, 0.75],
        [30, 16, -24, 0.7],
      ])}
      {blooms([
        [46, 40, 0.5, 10],
        [44, 10, 0.56, -12],
      ])}
    </svg>
  );
}

/** Tall single stem with one large bloom; runs the height of a column. */
export function CreamStemBloom({ className = "" }: { className?: string }) {
  return (
    <svg className={`cwa ${className}`.trim()} viewBox="0 0 90 300" aria-hidden="true">
      <g className="cwa-stem">
        <path d="M46 298C44 250 48 200 42 150 38 110 42 60 40 10" />
        <path d="M41 84C34 76 30 68 28 60" />
        <path d="M41 40C46 36 50 32 54 28" />
        <path d="M45 270C52 266 58 262 62 256" />
      </g>
      {leaves([
        [45, 288, -40, 1.3],
        [45, 282, 212, 1.2, true],
        [62, 256, -50, 1, true],
        [44, 264, -30, 1.6, true],
        [44, 252, 206, 1.65],
        [43, 234, -34, 1.85],
        [43, 222, 214, 1.85, true],
        [42, 200, -28, 1.95, true],
        [42, 190, 210, 1.85],
        [44, 176, -18, 1.7],
        [40, 178, 200, 1.6, true],
        [41, 120, -40, 1.4],
        [41, 110, 214, 1.4, true],
        [41, 96, -30, 1.15, true],
        [40, 72, 214, 1.1],
        [41, 50, -36, 0.95, true],
        [40, 24, 206, 0.85],
      ])}
      {buds([
        [40, 10, 0, 1.4],
        [54, 28, 40, 1.15],
      ])}
      {blooms([
        [28, 58, 1, -10],
        [42, 148, 2.5, 8],
      ])}
    </svg>
  );
}

/** Leaf-only sprig angled up and to the right. */
export function CreamLeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`cwa ${className}`.trim()} viewBox="0 0 52 60" aria-hidden="true">
      <path className="cwa-stem" d="M4 58C14 44 26 28 46 6" />
      {leaves([
        [10, 50, -98, 0.62, true],
        [13, 46, -14, 0.62],
        [18, 39, -102, 0.6],
        [22, 34, -18, 0.6, true],
        [28, 27, -104, 0.56, true],
        [32, 22, -20, 0.56],
        [38, 15, -100, 0.5],
        [46, 6, -48, 0.55, true],
      ])}
    </svg>
  );
}

const OLIVE_LEAF = "M0 0C2.2-2.2 6.4-2.6 9.6-.6 6.6 1.6 2.6 1.6 0 0Z";

function sprigSide() {
  const leafMarks: [number, number, number][] = [
    [44, 14.7, -152],
    [39, 15.5, 156],
    [33.5, 14.4, -156],
    [28, 15.3, 160],
    [22.5, 14.3, -160],
    [17.2, 15.1, 164],
  ];
  return (
    <g>
      <path d="M50 15C38 15.6 24 14.4 10 15" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
      {leafMarks.map(([x, y, rot]) => (
        <path key={x} d={OLIVE_LEAF} fill="currentColor" transform={`translate(${x} ${y}) rotate(${rot})`} />
      ))}
      <path d={OLIVE_LEAF} fill="currentColor" transform="translate(11 15) rotate(182) scale(1.05)" />
    </g>
  );
}

/** Interlocked wedding rings between two leaf sprigs. */
export function CreamRingsOrnament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 30" aria-hidden="true">
      {sprigSide()}
      <g transform="matrix(-1 0 0 1 132 0)">{sprigSide()}</g>
      <g fill="none" stroke="currentColor">
        <circle cx="60.5" cy="15" r="8.2" strokeWidth="1.6" />
        <circle cx="60.5" cy="15" r="6.4" strokeWidth=".5" opacity=".55" />
        <circle cx="71.5" cy="15" r="8.2" strokeWidth="1.6" />
        <circle cx="71.5" cy="15" r="6.4" strokeWidth=".5" opacity=".55" />
      </g>
    </svg>
  );
}

function laurelSide() {
  const leafMarks: [number, number, number][] = [
    [50, 11.4, -148],
    [46, 12.6, 150],
    [41, 10.9, -152],
    [36, 12.2, 154],
    [31, 10.6, -156],
    [26, 11.9, 158],
    [21, 10.6, -160],
  ];
  return (
    <g>
      <path d="M54 12C42 11.8 28 10.6 14 11.6" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
      {leafMarks.map(([x, y, rot]) => (
        <path key={x} d={OLIVE_LEAF} fill="currentColor" transform={`translate(${x} ${y}) rotate(${rot}) scale(1.08)`} />
      ))}
      <path d={OLIVE_LEAF} fill="currentColor" transform="translate(15 11.6) rotate(184) scale(1.1)" />
    </g>
  );
}

/** Heart framed by mirrored laurel sprigs. */
export function CreamLaurelHeart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 24" aria-hidden="true">
      {laurelSide()}
      <g transform="matrix(-1 0 0 1 132 0)">{laurelSide()}</g>
      <path d={HEART} fill="currentColor" transform="translate(59.5 7.4) scale(1.3)" />
    </svg>
  );
}

function dove() {
  return (
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M40.6 15.2L37.6 14.4C37 11.6 33.4 10.8 31.8 13 30.6 14.8 30 16.6 27.6 17.8 22 20.4 14 21 8 20.6L2 18.6 5 22 1.6 23.8 8.8 23.4C16 26.6 26 26 31.4 22.6 34.6 20.4 36.2 17.8 37.6 16.2Z"
        strokeWidth="1"
      />
      <path
        d="M27.4 17.2C24.6 12.6 20 7.8 12.6 4.2 14.6 7.4 15.4 9 15.8 10.4 13.8 10 12.4 10.2 11 10.8 14.4 13.6 18.6 16.8 22.4 18.8"
        strokeWidth="1"
      />
      <path d="M15.6 10.4C18.6 12.8 21.6 15 24.4 16.6M19.2 8C21.6 10.6 23.6 13 25.6 15" strokeWidth=".6" />
      <path d="M7.6 21.6L4.2 20.8M8.2 22.8L4.6 23.4" strokeWidth=".55" />
      <circle cx="34.8" cy="13.6" r=".7" fill="currentColor" stroke="none" />
    </g>
  );
}

/** Two line-art doves meeting beneath a small heart. */
export function CreamDovePair({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 28" aria-hidden="true">
      {dove()}
      <g transform="matrix(-1 0 0 1 84 0)">{dove()}</g>
      <path d={HEART} fill="currentColor" transform="translate(38.4 1.4) scale(.72)" />
    </svg>
  );
}

export function CreamHeart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 9.2" aria-hidden="true">
      <path d={HEART} fill="currentColor" />
    </svg>
  );
}

/** Wax seal threaded on a twine string. */
export function CreamWaxSeal({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wax = `cwa-wax-${uid}`;
  const sheen = `cwa-sheen-${uid}`;
  return (
    <svg className={className} viewBox="0 0 200 56" aria-hidden="true">
      <defs>
        <radialGradient id={wax} cx="38%" cy="32%" r="72%">
          <stop offset="0" className="cwa-wax-hi" />
          <stop offset=".5" className="cwa-wax-mid" />
          <stop offset="1" className="cwa-wax-lo" />
        </radialGradient>
        <radialGradient id={sheen} cx="50%" cy="40%" r="55%">
          <stop offset="0" className="cwa-wax-mid" />
          <stop offset="1" className="cwa-wax-lo" />
        </radialGradient>
      </defs>
      <g className="cwa-twine" fill="none">
        <path d="M2 33C38 23 62 24 82 27.4" />
        <path d="M4 35.2C40 25.4 62 26.4 82 29.4" opacity=".55" />
        <path d="M118 27.4C138 24.6 162 23 198 31" />
        <path d="M118 29.4C138 26.8 162 25.2 196 33.4" opacity=".55" />
      </g>
      <g transform="translate(100 28) scale(1.3) translate(-100 -28)">
        <path d={WAX} fill={`url(#${wax})`} />
        <circle cx="100" cy="28" r="14.2" fill={`url(#${sheen})`} />
        <circle cx="100.6" cy="28.8" r="14.2" fill="none" className="cwa-wax-glint" strokeWidth=".9" />
        <circle cx="100" cy="28" r="14.2" fill="none" className="cwa-wax-edge" strokeWidth="1" />
        <path d={HEART} className="cwa-wax-glint" fill="none" strokeWidth=".9" transform="translate(94.2 23.4) scale(1.2)" />
        <path d={HEART} className="cwa-wax-press" transform="translate(93.6 22.6) scale(1.2)" />
      </g>
    </svg>
  );
}

/** Hidden SVG filter that tears the edge of the letter card. */
export function CreamDeckleFilter({ id }: { id: string }) {
  return (
    <svg className="cwa-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id={id} x="-4%" y="-6%" width="108%" height="112%">
        <feTurbulence type="fractalNoise" baseFrequency="0.038" numOctaves="3" seed="11" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="11" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
