"use client";

import {
  ROYAL_AMBIANCE_EFFECTS,
  normalizeAmbianceEffect as normalizeAmbianceForFamily,
  type AmbianceEffect as SharedAmbianceEffect,
} from "@/lib/template-ambiance";

export type AmbianceEffect = Exclude<SharedAmbianceEffect, "leaves" | "dust">;

export const AMBIANCE_EFFECTS = ROYAL_AMBIANCE_EFFECTS as { id: AmbianceEffect; label: string }[];

export function normalizeAmbianceEffect(value: string | undefined): AmbianceEffect {
  return normalizeAmbianceForFamily(value, "royal") as AmbianceEffect;
}

const fallSlots = [
  { left: "2%", delay: "1.2s", duration: "17s", sway: "-50px", spin: "534deg", size: 13 },
  { left: "10%", delay: "2.4s", duration: "12s", sway: "46px", spin: "443deg", size: 15 },
  { left: "18%", delay: "0.6s", duration: "15s", sway: "-28px", spin: "310deg", size: 12 },
  { left: "26%", delay: "3.5s", duration: "12s", sway: "-60px", spin: "218deg", size: 15 },
  { left: "36%", delay: "4.4s", duration: "16s", sway: "9px", spin: "203deg", size: 18 },
  { left: "48%", delay: "5.1s", duration: "12s", sway: "36px", spin: "270deg", size: 16 },
  { left: "55%", delay: "1.8s", duration: "14s", sway: "-40px", spin: "400deg", size: 11 },
  { left: "62%", delay: "6.7s", duration: "18s", sway: "50px", spin: "258deg", size: 11 },
  { left: "76%", delay: "3.8s", duration: "19s", sway: "22px", spin: "534deg", size: 12 },
  { left: "84%", delay: "2.9s", duration: "13s", sway: "-18px", spin: "360deg", size: 14 },
  { left: "90%", delay: "7.9s", duration: "18s", sway: "53px", spin: "472deg", size: 20 },
  { left: "96%", delay: "4.8s", duration: "16s", sway: "30px", spin: "280deg", size: 10 },
];

const petalFills = [
  "var(--maroon)",
  "var(--maroon-soft)",
  "var(--maroon-deep)",
  "var(--gold)",
  "var(--maroon)",
  "var(--maroon-soft)",
  "var(--maroon-deep)",
  "var(--gold)",
  "var(--maroon)",
  "var(--gold)",
  "var(--maroon-soft)",
  "var(--maroon)",
];

const sparkleSlots = [
  { left: "8%", top: "12%", size: 3, delay: "0s", duration: "2.4s" },
  { left: "18%", top: "38%", size: 2, delay: "0.4s", duration: "3.1s" },
  { left: "37%", top: "53%", size: 3, delay: "0.35s", duration: "2.8s" },
  { left: "74%", top: "6%", size: 4, delay: "0.7s", duration: "3.2s" },
  { left: "11%", top: "59%", size: 5, delay: "1.05s", duration: "3.6s" },
  { left: "48%", top: "12%", size: 2, delay: "1.4s", duration: "4s" },
  { left: "85%", top: "65%", size: 3, delay: "1.75s", duration: "2.4s" },
  { left: "22%", top: "18%", size: 4, delay: "2.1s", duration: "2.8s" },
  { left: "59%", top: "71%", size: 5, delay: "2.45s", duration: "3.2s" },
  { left: "42%", top: "28%", size: 3, delay: "0.9s", duration: "2.6s" },
  { left: "68%", top: "44%", size: 2, delay: "1.6s", duration: "3.4s" },
  { left: "91%", top: "22%", size: 4, delay: "2.2s", duration: "2.9s" },
  { left: "5%", top: "78%", size: 3, delay: "1.1s", duration: "3.5s" },
  { left: "33%", top: "86%", size: 2, delay: "2.7s", duration: "3s" },
  { left: "77%", top: "82%", size: 4, delay: "0.55s", duration: "2.7s" },
  { left: "52%", top: "48%", size: 3, delay: "1.9s", duration: "3.8s" },
];

const butterflySlots = [
  { cx: "22%", cy: "28%", rx: "18vw", ry: "14vh", delay: "0s", duration: "22s", size: 28, reverse: false },
  { cx: "68%", cy: "22%", rx: "16vw", ry: "12vh", delay: "2.5s", duration: "18s", size: 24, reverse: true },
  { cx: "48%", cy: "55%", rx: "28vw", ry: "18vh", delay: "1s", duration: "26s", size: 30, reverse: false },
  { cx: "78%", cy: "62%", rx: "14vw", ry: "16vh", delay: "4s", duration: "20s", size: 22, reverse: true },
  { cx: "18%", cy: "70%", rx: "20vw", ry: "11vh", delay: "6s", duration: "24s", size: 26, reverse: false },
  { cx: "55%", cy: "38%", rx: "12vw", ry: "20vh", delay: "3s", duration: "17s", size: 20, reverse: true },
  { cx: "36%", cy: "78%", rx: "22vw", ry: "10vh", delay: "8s", duration: "21s", size: 25, reverse: false },
  { cx: "84%", cy: "40%", rx: "10vw", ry: "14vh", delay: "5s", duration: "19s", size: 23, reverse: true },
  { cx: "40%", cy: "18%", rx: "24vw", ry: "9vh", delay: "9s", duration: "23s", size: 21, reverse: false },
  { cx: "62%", cy: "72%", rx: "15vw", ry: "13vh", delay: "7s", duration: "16s", size: 27, reverse: true },
];

function ButterflyMark({ size }: { size: number }) {
  return (
    <svg className="rr-fx-butterfly-mark" viewBox="0 0 64 56" width={size} height={(size * 56) / 64} aria-hidden="true">
      <g className="rr-fx-wing rr-fx-wing-l">
        <path
          fill="var(--gold-light)"
          opacity="0.88"
          d="M30 28 C18 8 2 6 3 20 C4 30 14 34 30 28 Z"
        />
        <path
          fill="var(--gold)"
          opacity="0.72"
          d="M30 30 C20 34 8 40 10 48 C14 54 24 46 30 34 Z"
        />
        <circle cx="14" cy="18" r="2.2" fill="var(--maroon-soft)" opacity="0.55" />
      </g>
      <g className="rr-fx-wing rr-fx-wing-r">
        <path
          fill="var(--gold-light)"
          opacity="0.88"
          d="M34 28 C46 8 62 6 61 20 C60 30 50 34 34 28 Z"
        />
        <path
          fill="var(--gold)"
          opacity="0.72"
          d="M34 30 C44 34 56 40 54 48 C50 54 40 46 34 34 Z"
        />
        <circle cx="50" cy="18" r="2.2" fill="var(--maroon-soft)" opacity="0.55" />
      </g>
      <ellipse cx="32" cy="30" rx="2.2" ry="11" fill="var(--gold)" />
      <path
        stroke="var(--gold-light)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        d="M30 20 C28 12 24 8 22 6 M34 20 C36 12 40 8 42 6"
      />
      <circle cx="22" cy="6" r="1.2" fill="var(--gold-light)" />
      <circle cx="42" cy="6" r="1.2" fill="var(--gold-light)" />
    </svg>
  );
}

const starSlots = [
  { left: "6%", top: "10%", size: 10, delay: "0s", duration: "2.8s" },
  { left: "22%", top: "24%", size: 7, delay: "0.5s", duration: "3.2s" },
  { left: "40%", top: "8%", size: 12, delay: "1s", duration: "2.6s" },
  { left: "58%", top: "32%", size: 8, delay: "0.3s", duration: "3.6s" },
  { left: "74%", top: "14%", size: 11, delay: "1.4s", duration: "2.9s" },
  { left: "88%", top: "40%", size: 7, delay: "0.8s", duration: "3.1s" },
  { left: "12%", top: "55%", size: 9, delay: "1.7s", duration: "2.5s" },
  { left: "35%", top: "68%", size: 6, delay: "0.2s", duration: "3.4s" },
  { left: "52%", top: "48%", size: 10, delay: "1.1s", duration: "2.7s" },
  { left: "69%", top: "72%", size: 8, delay: "1.9s", duration: "3.3s" },
  { left: "84%", top: "58%", size: 11, delay: "0.6s", duration: "2.4s" },
  { left: "95%", top: "20%", size: 6, delay: "2.2s", duration: "3s" },
  { left: "28%", top: "42%", size: 7, delay: "1.5s", duration: "2.8s" },
  { left: "46%", top: "86%", size: 9, delay: "0.9s", duration: "3.5s" },
  { left: "78%", top: "88%", size: 7, delay: "2s", duration: "2.6s" },
];

const shootSlots = [
  { top: "18%", delay: "2s", duration: "3.2s" },
  { top: "42%", delay: "7s", duration: "2.8s" },
  { top: "66%", delay: "12s", duration: "3.5s" },
];

function SparkleField({ dense = false }: { dense?: boolean }) {
  const items = dense
    ? [
        ...sparkleSlots,
        { left: "15%", top: "70%", size: 3, delay: "0.2s", duration: "2.5s" },
        { left: "63%", top: "16%", size: 4, delay: "1.3s", duration: "3s" },
        { left: "80%", top: "50%", size: 2, delay: "2.4s", duration: "2.2s" },
        { left: "30%", top: "5%", size: 3, delay: "0.7s", duration: "3.3s" },
        { left: "95%", top: "75%", size: 4, delay: "1.8s", duration: "2.9s" },
        { left: "50%", top: "92%", size: 2, delay: "0.1s", duration: "2.7s" },
      ]
    : sparkleSlots;

  return (
    <>
      {items.map((sparkle, index) => (
        <span
          key={`sparkle-${index}`}
          className="rr-fx-sparkle absolute rounded-full bg-[radial-gradient(circle,#f3e8cd_0%,#b9893e_55%,transparent_70%)] shadow-[0_0_6px_rgba(231,211,164,0.7)]"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </>
  );
}

function PetalsEffect() {
  return (
    <>
      {fallSlots.map((slot, index) => (
        <svg
          key={`petal-${index}`}
          className="rr-fx-fall absolute top-[-30px]"
          viewBox="0 0 20 24"
          style={{
            left: slot.left,
            width: slot.size,
            animationDelay: slot.delay,
            animationDuration: slot.duration,
            ["--sway" as string]: slot.sway,
            ["--spin" as string]: slot.spin,
          }}
        >
          <path
            d="M10 1 C 16 6, 19 12, 15 19 C 12.5 23, 7.5 23, 5 19 C 1 12, 4 6, 10 1 Z"
            fill={petalFills[index % petalFills.length]}
            opacity="0.75"
          />
        </svg>
      ))}
      <SparkleField />
    </>
  );
}

function HeartsEffect() {
  return (
    <>
      {fallSlots.map((slot, index) => (
        <svg
          key={`heart-${index}`}
          className="rr-fx-fall absolute top-[-30px] text-[color:var(--gold-light)]"
          viewBox="0 0 24 24"
          style={{
            left: slot.left,
            width: slot.size + 4,
            animationDelay: slot.delay,
            animationDuration: slot.duration,
            ["--sway" as string]: slot.sway,
            ["--spin" as string]: slot.spin,
          }}
        >
          <path
            fill="currentColor"
            opacity="0.7"
            d="M12 21s-6.7-4.35-9.33-8.1C.8 10.1 1.2 6.6 3.9 5.1 6.1 3.9 8.7 4.6 12 7.2c3.3-2.6 5.9-3.3 8.1-2.1 2.7 1.5 3.1 5 1.23 7.8C18.7 16.65 12 21 12 21z"
          />
        </svg>
      ))}
      <SparkleField />
    </>
  );
}

function StarsEffect() {
  return (
    <>
      {starSlots.map((star, index) => (
        <svg
          key={`star-${index}`}
          className="rr-fx-star absolute text-[color:var(--gold-light)]"
          viewBox="0 0 24 24"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          <path
            fill="currentColor"
            d="M12 2.2l2.4 6.6h6.9l-5.6 4.1 2.1 6.7L12 15.8 5.2 19.6l2.1-6.7L1.7 8.8h6.9L12 2.2z"
          />
        </svg>
      ))}
      {shootSlots.map((shoot, index) => (
        <span
          key={`shoot-${index}`}
          className="rr-fx-shoot absolute"
          style={{
            top: shoot.top,
            animationDelay: shoot.delay,
            animationDuration: shoot.duration,
          }}
        />
      ))}
      <SparkleField />
    </>
  );
}

function ButterfliesEffect() {
  return (
    <>
      {butterflySlots.map((slot, index) => (
        <span
          key={`butterfly-${index}`}
          className={`rr-fx-butterfly absolute ${slot.reverse ? "is-reverse" : ""}`}
          style={{
            ["--bx" as string]: slot.cx,
            ["--by" as string]: slot.cy,
            ["--brx" as string]: slot.rx,
            ["--bry" as string]: slot.ry,
            animationDelay: slot.delay,
            animationDuration: slot.duration,
          }}
        >
          <ButterflyMark size={slot.size} />
        </span>
      ))}
      <SparkleField />
    </>
  );
}

export function SiteAmbiance({ effect }: { effect: AmbianceEffect }) {
  if (effect === "none") {
    return null;
  }

  return (
    <div className="rr-ambiance" aria-hidden="true">
      {effect === "petals" ? <PetalsEffect /> : null}
      {effect === "stars" ? <StarsEffect /> : null}
      {effect === "butterflies" ? <ButterfliesEffect /> : null}
      {effect === "sparkles" ? <SparkleField dense /> : null}
      {effect === "hearts" ? <HeartsEffect /> : null}
    </div>
  );
}
