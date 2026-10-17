"use client";

import type { AmbianceEffect } from "@/lib/template-ambiance";

/* -------------------------------------------------------------------------- */
/* 1. STARRY GLOW                                                             */
/* -------------------------------------------------------------------------- */

const hangingOrnaments = [
  { left: "6%", chain: 38, type: "lantern", delay: "0s", duration: "4.2s" },
  { left: "22%", chain: 52, type: "crescent", delay: "0.8s", duration: "5s" },
  { left: "78%", chain: 44, type: "lantern", delay: "1.4s", duration: "4.6s" },
  { left: "92%", chain: 36, type: "crescent", delay: "0.3s", duration: "4.8s" },
];

const starSlots = [
  { left: "10%", top: "14%", size: 7, delay: "0s", duration: "2.8s" },
  { left: "18%", top: "34%", size: 5, delay: "0.6s", duration: "3.2s" },
  { left: "32%", top: "18%", size: 8, delay: "1.2s", duration: "2.6s" },
  { left: "44%", top: "42%", size: 6, delay: "1.8s", duration: "3.4s" },
  { left: "58%", top: "16%", size: 7, delay: "0.4s", duration: "2.9s" },
  { left: "68%", top: "38%", size: 5, delay: "2.1s", duration: "3.1s" },
  { left: "82%", top: "20%", size: 8, delay: "1.5s", duration: "2.7s" },
  { left: "90%", top: "46%", size: 6, delay: "0.9s", duration: "3.3s" },
  { left: "26%", top: "58%", size: 5, delay: "2.4s", duration: "3s" },
  { left: "74%", top: "62%", size: 6, delay: "1.7s", duration: "3.5s" },
  { left: "48%", top: "68%", size: 5, delay: "0.2s", duration: "2.8s" },
  { left: "86%", top: "74%", size: 7, delay: "2.6s", duration: "3.2s" },
];

const sparkleSlots = [
  { left: "8%", top: "24%", size: 3, delay: "0s", duration: "2.5s" },
  { left: "28%", top: "48%", size: 2.5, delay: "0.7s", duration: "3.1s" },
  { left: "52%", top: "28%", size: 3.5, delay: "1.3s", duration: "2.8s" },
  { left: "64%", top: "54%", size: 2.5, delay: "0.4s", duration: "3.3s" },
  { left: "84%", top: "32%", size: 3, delay: "1.9s", duration: "2.6s" },
  { left: "16%", top: "68%", size: 2.5, delay: "1.1s", duration: "3.4s" },
  { left: "40%", top: "78%", size: 3, delay: "2.3s", duration: "2.9s" },
  { left: "72%", top: "72%", size: 2.5, delay: "0.5s", duration: "3.2s" },
];

function LanternMark({ width = 16, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 24 36" width={width} height={height} fill="none" aria-hidden="true">
      {/* Top ring & cap */}
      <circle cx="12" cy="3" r="2" stroke="var(--color-gold-light)" strokeWidth="1" />
      <path d="M7 6 L17 6 L15 10 L9 10 Z" fill="var(--color-gold)" />
      {/* Glass lamp body with warm glow */}
      <path
        d="M9 10 L15 10 L17 22 L7 22 Z"
        fill="url(#lantern-glow)"
        stroke="var(--color-gold-light)"
        strokeWidth="0.8"
      />
      {/* Inner flame candle */}
      <circle cx="12" cy="16" r="2" fill="#fff7d6" filter="drop-shadow(0 0 3px #ffc107)" />
      {/* Base & finial */}
      <path d="M8 22 L16 22 L14 26 L10 26 Z" fill="var(--color-gold)" />
      <circle cx="12" cy="28" r="1.2" fill="var(--color-gold-light)" />
      <defs>
        <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f7c844" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ab4f31" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function CrescentMark({ width = 18, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 28 36" width={width} height={height} fill="none" aria-hidden="true">
      {/* Top hanger cord */}
      <line x1="14" y1="0" x2="14" y2="4" stroke="var(--color-gold-light)" strokeWidth="0.8" />
      {/* Crescent moon */}
      <path
        d="M14 4 C20 4, 25 9, 25 16 C25 23, 20 28, 14 28 C12 28, 10.2 27.5, 8.6 26.5 C12 25, 14.5 21, 14.5 16 C14.5 11, 12 7, 8.6 5.5 C10.2 4.5, 12 4, 14 4 Z"
        fill="var(--color-gold-light)"
        filter="drop-shadow(0 0 4px rgba(228, 190, 87, 0.6))"
      />
      {/* Dangling star on fine cord */}
      <line x1="17" y1="16" x2="17" y2="28" stroke="var(--color-gold-light)" strokeWidth="0.6" strokeDasharray="1 1" />
      <path
        d="M17 28 L17.8 30.2 L20 30.4 L18.3 31.8 L18.8 34 L17 32.8 L15.2 34 L15.7 31.8 L14 30.4 L16.2 30.2 Z"
        fill="var(--color-gold-light)"
      />
    </svg>
  );
}

function StarryGlowEffect() {
  return (
    <>
      {/* Hanging lanterns and crescents from top edge */}
      {hangingOrnaments.map((ornament, idx) => (
        <div
          key={`hw-ornament-${idx}`}
          className="hw-fx-lantern-chain flex flex-col items-center"
          style={{
            left: ornament.left,
            animationDelay: ornament.delay,
            animationDuration: ornament.duration,
          }}
        >
          {/* Thin hanging string */}
          <span
            className="w-px bg-gradient-to-b from-[var(--color-gold-light)] to-[color-mix(in_srgb,var(--color-gold)_70%,transparent)]"
            style={{ height: ornament.chain }}
          />
          {ornament.type === "lantern" ? (
            <LanternMark width={16} height={24} />
          ) : (
            <CrescentMark width={18} height={24} />
          )}
        </div>
      ))}

      {/* Twinkling 4-point diamond stars */}
      {starSlots.map((star, idx) => (
        <svg
          key={`hw-star-${idx}`}
          className="hw-fx-star text-[var(--color-gold-light)]"
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
            d="M12 2 L13.8 9.5 L21 12 L13.8 14.5 L12 22 L10.2 14.5 L3 12 L10.2 9.5 Z"
          />
        </svg>
      ))}

      {/* Soft warm sparkle motes */}
      {sparkleSlots.map((sparkle, idx) => (
        <span
          key={`hw-sparkle-${idx}`}
          className="hw-fx-sparkle rounded-full"
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

/* -------------------------------------------------------------------------- */
/* 2. BUTTERFLIES                                                             */
/* -------------------------------------------------------------------------- */

const butterflySlots = [
  { cx: "20%", cy: "24%", rx: "15vw", ry: "11vh", delay: "0s", duration: "20s", size: 16, reverse: false },
  { cx: "74%", cy: "20%", rx: "14vw", ry: "10vh", delay: "2.2s", duration: "17s", size: 14, reverse: true },
  { cx: "46%", cy: "48%", rx: "22vw", ry: "14vh", delay: "1s", duration: "24s", size: 18, reverse: false },
  { cx: "80%", cy: "58%", rx: "12vw", ry: "13vh", delay: "3.6s", duration: "19s", size: 14, reverse: true },
  { cx: "16%", cy: "68%", rx: "16vw", ry: "9vh", delay: "5.4s", duration: "22s", size: 15, reverse: false },
  { cx: "56%", cy: "34%", rx: "11vw", ry: "16vh", delay: "2.8s", duration: "16s", size: 13, reverse: true },
  { cx: "34%", cy: "78%", rx: "18vw", ry: "8vh", delay: "7.2s", duration: "21s", size: 16, reverse: false },
  { cx: "86%", cy: "36%", rx: "9vw", ry: "12vh", delay: "4.5s", duration: "18s", size: 14, reverse: true },
];

function ButterflyMark({ size = 16 }: { size?: number }) {
  const height = (size * 52) / 60;
  return (
    <svg className="hw-fx-butterfly-mark" viewBox="0 0 60 52" width={size} height={height} aria-hidden="true">
      <defs>
        <linearGradient id="hw-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-terracotta-light)" />
          <stop offset="55%" stopColor="var(--color-terracotta)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>
      {/* Left Wing */}
      <g className="hw-fx-wing-l">
        <path
          fill="url(#hw-wing-grad)"
          opacity="0.92"
          d="M28 26 C16 8 2 6 3 19 C4 28 14 32 28 26 Z"
        />
        <path
          fill="var(--color-gold-light)"
          opacity="0.7"
          d="M28 28 C18 32 7 37 9 45 C13 50 22 43 28 32 Z"
        />
        <circle cx="13" cy="17" r="1.8" fill="var(--color-gold-light)" opacity="0.65" />
      </g>
      {/* Right Wing */}
      <g className="hw-fx-wing-r">
        <path
          fill="url(#hw-wing-grad)"
          opacity="0.92"
          d="M32 26 C44 8 58 6 57 19 C56 28 46 32 32 26 Z"
        />
        <path
          fill="var(--color-gold-light)"
          opacity="0.7"
          d="M32 28 C42 32 53 37 51 45 C47 50 38 43 32 32 Z"
        />
        <circle cx="47" cy="17" r="1.8" fill="var(--color-gold-light)" opacity="0.65" />
      </g>
      {/* Slender Body */}
      <ellipse cx="30" cy="27" rx="1.3" ry="8" fill="var(--color-terracotta-dark)" />
      <circle cx="30" cy="18" r="1.2" fill="var(--color-terracotta-dark)" />
    </svg>
  );
}

function ButterfliesEffect() {
  return (
    <>
      {butterflySlots.map((slot, idx) => (
        <span
          key={`hw-butterfly-${idx}`}
          className={`hw-fx-butterfly ${slot.reverse ? "is-reverse" : ""}`}
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
      {/* Subtle sparkle dust */}
      {sparkleSlots.slice(0, 5).map((sparkle, idx) => (
        <span
          key={`hw-bf-dust-${idx}`}
          className="hw-fx-sparkle rounded-full"
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

/* -------------------------------------------------------------------------- */
/* 3. FLORAL BLOOM                                                            */
/* -------------------------------------------------------------------------- */

const petalFallSlots = [
  { left: "4%", delay: "0.6s", duration: "15s", sway: "-35px", spin: "380deg", size: 11 },
  { left: "15%", delay: "2.4s", duration: "13s", sway: "30px", spin: "290deg", size: 10 },
  { left: "28%", delay: "1.1s", duration: "16s", sway: "-22px", spin: "340deg", size: 12 },
  { left: "42%", delay: "3.8s", duration: "14s", sway: "26px", spin: "410deg", size: 9 },
  { left: "56%", delay: "0.3s", duration: "17s", sway: "-30px", spin: "260deg", size: 11 },
  { left: "69%", delay: "2.9s", duration: "12s", sway: "38px", spin: "390deg", size: 10 },
  { left: "80%", delay: "4.5s", duration: "18s", sway: "-18px", spin: "310deg", size: 12 },
  { left: "92%", delay: "1.8s", duration: "15s", sway: "24px", spin: "360deg", size: 10 },
  { left: "35%", delay: "5.2s", duration: "14s", sway: "-28px", spin: "280deg", size: 11 },
  { left: "64%", delay: "6.1s", duration: "16s", sway: "32px", spin: "420deg", size: 9 },
];

function FloralBloomCornerTL() {
  return (
    <svg className="hw-fx-bloom-corner-tl" viewBox="0 0 110 90" fill="none" aria-hidden="true">
      {/* Delicate branch */}
      <path
        d="M-5 -5 C25 15, 55 20, 85 45 C95 55, 102 68, 105 82"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Blossom 1 */}
      <g transform="translate(42, 24)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5.5"
            ry="7"
            transform={`rotate(${angle})`}
            fill="#fae3da"
            stroke="var(--color-terracotta-light)"
            strokeWidth="0.5"
            opacity="0.88"
          />
        ))}
        <circle cx="0" cy="0" r="3.2" fill="var(--color-gold-light)" />
        <circle cx="0" cy="0" r="1.5" fill="var(--color-terracotta)" />
      </g>
      {/* Blossom 2 */}
      <g transform="translate(80, 48) scale(0.8)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5.5"
            ry="7"
            transform={`rotate(${angle})`}
            fill="#fae3da"
            stroke="var(--color-terracotta-light)"
            strokeWidth="0.5"
            opacity="0.88"
          />
        ))}
        <circle cx="0" cy="0" r="3.2" fill="var(--color-gold-light)" />
        <circle cx="0" cy="0" r="1.5" fill="var(--color-terracotta)" />
      </g>
      {/* Small bud */}
      <circle cx="102" cy="78" r="3.5" fill="var(--color-terracotta-light)" opacity="0.85" />
    </svg>
  );
}

function FloralBloomCornerBR() {
  return (
    <svg className="hw-fx-bloom-corner-br" viewBox="0 0 115 95" fill="none" aria-hidden="true">
      {/* Branch stem */}
      <path
        d="M120 100 C90 75, 60 70, 30 45 C18 35, 10 22, 5 8"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Blossom */}
      <g transform="translate(68, 64)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5.5"
            ry="7"
            transform={`rotate(${angle})`}
            fill="#fae3da"
            stroke="var(--color-terracotta-light)"
            strokeWidth="0.5"
            opacity="0.88"
          />
        ))}
        <circle cx="0" cy="0" r="3.2" fill="var(--color-gold-light)" />
        <circle cx="0" cy="0" r="1.5" fill="var(--color-terracotta)" />
      </g>
      {/* Smaller secondary blossom */}
      <g transform="translate(32, 42) scale(0.75)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5.5"
            ry="7"
            transform={`rotate(${angle})`}
            fill="#fae3da"
            stroke="var(--color-terracotta-light)"
            strokeWidth="0.5"
            opacity="0.88"
          />
        ))}
        <circle cx="0" cy="0" r="3.2" fill="var(--color-gold-light)" />
        <circle cx="0" cy="0" r="1.5" fill="var(--color-terracotta)" />
      </g>
    </svg>
  );
}

function FloralBloomEffect() {
  return (
    <>
      <FloralBloomCornerTL />
      <FloralBloomCornerBR />

      {/* Falling delicate blossom petals */}
      {petalFallSlots.map((slot, idx) => (
        <svg
          key={`hw-petal-${idx}`}
          className="hw-fx-petal-fall"
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
            d="M10 1 C 16 6, 19 13, 14 20 C 11.5 23.5, 7 23.5, 4.5 19.5 C 1 12.5, 4.5 6, 10 1 Z"
            fill={idx % 2 === 0 ? "var(--color-terracotta-light)" : "#f6d4c6"}
            opacity="0.82"
          />
        </svg>
      ))}

      {/* Delicate pollen sparkles */}
      {sparkleSlots.slice(0, 6).map((sparkle, idx) => (
        <span
          key={`hw-petal-sparkle-${idx}`}
          className="hw-fx-sparkle rounded-full"
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

/* -------------------------------------------------------------------------- */
/* 4. FLOATING LIGHTS                                                         */
/* -------------------------------------------------------------------------- */

const lanternRiseSlots = [
  { left: "8%", delay: "0.2s", duration: "18s", sway: "22px", width: 16, height: 21 },
  { left: "20%", delay: "3.5s", duration: "16s", sway: "-18px", width: 14, height: 19 },
  { left: "34%", delay: "1.2s", duration: "20s", sway: "28px", width: 17, height: 23 },
  { left: "48%", delay: "5.8s", duration: "17s", sway: "-24px", width: 15, height: 20 },
  { left: "62%", delay: "2.1s", duration: "19s", sway: "20px", width: 16, height: 22 },
  { left: "75%", delay: "4.4s", duration: "15s", sway: "-30px", width: 14, height: 18 },
  { left: "88%", delay: "0.8s", duration: "21s", sway: "25px", width: 18, height: 24 },
  { left: "27%", delay: "7.2s", duration: "18s", sway: "18px", width: 15, height: 20 },
  { left: "68%", delay: "8.6s", duration: "16s", sway: "-22px", width: 14, height: 19 },
];

function SkyLanternMark({ width = 16, height = 22 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 28 36" width={width} height={height} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="lantern-paper" cx="50%" cy="58%" r="55%">
          <stop offset="0%" stopColor="#fff9e6" />
          <stop offset="40%" stopColor="#ffd54f" />
          <stop offset="85%" stopColor="#f57c00" />
          <stop offset="100%" stopColor="#b23c17" />
        </radialGradient>
      </defs>
      {/* Parchment balloon body */}
      <path
        d="M6 30 C4 20, 3 10, 6 5 C9 1, 19 1, 22 5 C25 10, 24 20, 22 30 Z"
        fill="url(#lantern-paper)"
        opacity="0.95"
      />
      {/* Bottom ring */}
      <ellipse cx="14" cy="30" rx="8" ry="2" stroke="#ffe082" strokeWidth="0.8" fill="#e65100" />
      {/* Inner flame candle */}
      <circle cx="14" cy="27" r="2.2" fill="#ffffff" filter="drop-shadow(0 0 4px #ffeb3b)" />
    </svg>
  );
}

function FloatingLightsEffect() {
  return (
    <>
      {lanternRiseSlots.map((slot, idx) => (
        <div
          key={`hw-lantern-${idx}`}
          className="hw-fx-lantern-float"
          style={{
            left: slot.left,
            animationDelay: slot.delay,
            animationDuration: slot.duration,
            ["--sway" as string]: slot.sway,
          }}
        >
          <SkyLanternMark width={slot.width} height={slot.height} />
        </div>
      ))}

      {/* Soft warm rising embers */}
      {sparkleSlots.map((sparkle, idx) => (
        <span
          key={`hw-ember-${idx}`}
          className="hw-fx-sparkle rounded-full"
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

/* -------------------------------------------------------------------------- */
/* MAIN EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function HouseAmbiance({ effect }: { effect: AmbianceEffect }) {
  if (effect === "none") {
    return null;
  }

  return (
    <div className="hw-ambiance pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {effect === "starry-glow" ? <StarryGlowEffect /> : null}
      {effect === "butterflies" ? <ButterfliesEffect /> : null}
      {effect === "floral-bloom" ? <FloralBloomEffect /> : null}
      {effect === "floating-lights" ? <FloatingLightsEffect /> : null}
    </div>
  );
}
