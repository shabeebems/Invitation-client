"use client";

import { Fragment, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  RUBY_COUNTDOWN_LAYOUTS,
  type RubyCountdownLayout,
} from "@/components/templates/ruby/ruby-layouts";

const RINGS = [
  { key: "days" as const, label: "DAYS", max: 365 },
  { key: "hours" as const, label: "HOURS", max: 24 },
  { key: "minutes" as const, label: "MINUTES", max: 60 },
  { key: "seconds" as const, label: "SECONDS", max: 60 },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatEventDate(iso?: string) {
  const match = (iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "";
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return "";
  return `${Number(match[3])} ${month} ${match[1]}`;
}

function HeartRule({ className = "" }: { className?: string }) {
  return (
    <span className={`rb-cd-heart-rule ${className}`.trim()} aria-hidden="true">
      <span>♥</span>
    </span>
  );
}

function DateLine({ text, arrows = false }: { text: string; arrows?: boolean }) {
  if (!text) return null;
  return (
    <p className={`rb-mc rb-cd-date${arrows ? " has-arrows" : ""}`}>
      <span className="rb-cd-date-line" aria-hidden="true" />
      <span className="rb-cd-date-text">{text}</span>
      <span className="rb-cd-date-line is-end" aria-hidden="true" />
    </p>
  );
}

function ArchCrown() {
  return (
    <svg className="rb-cd-crown" viewBox="0 0 40 26" fill="none" aria-hidden="true">
      <path d="M20 2 C 15 8, 15 14, 20 20 C 25 14, 25 8, 20 2 Z" className="is-fill" strokeWidth="1" />
      <path d="M20 20 C 12 19, 8 12, 9 8 C 15 9, 18 14, 20 20 Z" className="is-fill" strokeWidth="0.9" />
      <path d="M20 20 C 28 19, 32 12, 31 8 C 25 9, 22 14, 20 20 Z" className="is-fill" strokeWidth="0.9" />
      <path d="M4 22 C 10 22, 14 20, 20 20 C 26 20, 30 22, 36 22" strokeWidth="1" strokeLinecap="round" />
      <circle cx="20" cy="22.5" r="1.4" className="is-dot" />
    </svg>
  );
}

function Blossom({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="rb-cd-blossom">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="0" cy={-r * 0.62} rx={r * 0.42} ry={r * 0.66} transform={`rotate(${angle})`} />
      ))}
      <circle r={r * 0.24} className="is-heart" />
    </g>
  );
}

function Laurel({ side }: { side: "left" | "right" }) {
  const leaves = [
    [32, 150, -50],
    [26, 128, -30],
    [24, 104, -40],
    [26, 80, -20],
    [32, 58, -30],
    [40, 36, -10],
    [42, 140, 40],
    [40, 116, 30],
    [40, 92, 40],
    [44, 68, 25],
    [48, 46, 30],
  ];
  return (
    <svg className={`rb-cd-laurel is-${side}`} viewBox="0 0 80 200" fill="none" aria-hidden="true">
      <path d="M60 196 C 30 170, 24 120, 32 80 C 36 56, 44 34, 54 10" className="rb-cd-stem" />
      {leaves.map(([x, y, r]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0 C 5 -9, 15 -11, 23 -7 C 16 1, 7 3, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          className="rb-cd-leaf"
        />
      ))}
      <circle cx="54" cy="10" r="2.6" className="rb-cd-bud" />
      <Blossom x={40} y={160} r={11} />
      <Blossom x={50} y={42} r={6} />
    </svg>
  );
}

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`rb-cd-sprig ${className}`.trim()} viewBox="0 0 60 120" fill="none" aria-hidden="true">
      <path d="M44 116 C 24 96, 18 64, 26 40 C 30 28, 36 16, 46 6" className="rb-cd-stem" />
      {[
        [26, 92, -40],
        [22, 70, -30],
        [26, 48, -20],
        [34, 30, -10],
        [34, 84, 40],
        [32, 60, 30],
        [38, 40, 25],
      ].map(([x, y, r]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0 C 3 -6, 10 -8, 15 -5 C 11 0, 5 2, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          className="rb-cd-leaf"
        />
      ))}
      <circle cx="46" cy="6" r="2.4" className="rb-cd-bud" />
      <circle cx="18" cy="104" r="2" className="rb-cd-bud" />
    </svg>
  );
}

function PlaqueCap({ side }: { side: "left" | "right" }) {
  return (
    <svg className={`rb-cd-cap is-${side}`} viewBox="0 0 56 120" fill="none" aria-hidden="true">
      <path
        d="M56 6 C 40 6, 30 18, 26 30 C 22 42, 10 52, 2 60 C 10 68, 22 78, 26 90 C 30 102, 40 114, 56 114"
        className="rb-cd-cap-body"
      />
      <path
        d="M56 14 C 44 14, 36 24, 32 34 C 28 46, 18 54, 12 60 C 18 66, 28 74, 32 86 C 36 96, 44 106, 56 106"
        className="rb-cd-cap-inner"
      />
      <g transform="translate(30 60)">
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={angle}
            d="M0 0 C -3 -4, -3 -9, 0 -11 C 3 -9, 3 -4, 0 0 Z"
            transform={`rotate(${angle + 45})`}
            className="rb-cd-cap-petal"
          />
        ))}
        <circle r="2.2" className="rb-cd-cap-dot" />
      </g>
    </svg>
  );
}

function TagShape() {
  return (
    <svg className="rb-cd-tag-shape" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M50 4 C 62 4, 70 12, 74 20 C 86 20, 96 30, 96 44 L 96 112 C 96 132, 76 146, 50 146 C 24 146, 4 132, 4 112 L 4 44 C 4 30, 14 20, 26 20 C 30 12, 38 4, 50 4 Z"
        className="rb-cd-tag-fill"
      />
      <path
        d="M50 11 C 59 11, 65 17, 68 25 C 80 25, 89 33, 89 45 L 89 110 C 89 127, 72 139, 50 139 C 28 139, 11 127, 11 110 L 11 45 C 11 33, 20 25, 32 25 C 35 17, 41 11, 50 11 Z"
        className="rb-cd-tag-line"
      />
    </svg>
  );
}

function TagOrnament() {
  return (
    <svg className="rb-cd-tag-orn" viewBox="0 0 40 16" fill="none" aria-hidden="true">
      <path d="M20 2 C 17 5, 17 9, 20 12 C 23 9, 23 5, 20 2 Z" className="is-fill" />
      <path d="M20 12 C 15 11, 12 8, 12 6 C 16 6, 19 8, 20 12 Z" className="is-fill" />
      <path d="M20 12 C 25 11, 28 8, 28 6 C 24 6, 21 8, 20 12 Z" className="is-fill" />
      <path d="M4 13 H 15 M25 13 H 36" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

function Vine({ side }: { side: "left" | "right" }) {
  return (
    <svg className={`rb-cd-vine is-${side}`} viewBox="0 0 70 190" fill="none" aria-hidden="true">
      <path d="M40 4 C 34 40, 46 80, 38 120 C 34 140, 38 160, 40 172" className="rb-cd-stem" />
      <path d="M40 30 C 26 40, 20 56, 24 70" className="rb-cd-stem" />
      {[
        [32, 24, -40],
        [44, 46, 30],
        [30, 62, -30],
        [44, 92, 30],
        [32, 108, -40],
        [42, 134, 30],
      ].map(([x, y, r]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0 C 3 -6, 10 -8, 15 -5 C 11 0, 5 2, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          className="rb-cd-leaf"
        />
      ))}
      <Blossom x={38} y={14} r={9} />
      <Blossom x={22} y={42} r={7} />
      <Blossom x={50} y={64} r={7.5} />
      <Blossom x={26} y={84} r={6} />
      <Blossom x={46} y={112} r={6.5} />
      <path d="M40 172 V 178" className="rb-cd-stem" />
      <path d="M40 178 C 36 182, 37 188, 40 189 C 43 188, 44 182, 40 178 Z" className="rb-cd-drop" />
    </svg>
  );
}

export default function RubyCountdown({
  editing,
  layout,
  eventDateIso,
  field,
  onLayoutChange,
  onEventDateChange,
}: {
  editing: boolean;
  layout?: string;
  eventDateIso?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_COUNTDOWN_LAYOUTS, "gold-rings");
  const count = useCountdown(eventDateIso);
  const dateText = formatEventDate(eventDateIso);
  const isCollage = activeLayout !== "gold-rings";

  const live = <p className="rb-live rb-gv">{field("countdownLiveLabel", "rb-live rb-gv")}</p>;

  const dateEditor =
    editing && onEventDateChange ? (
      <label className="rb-date-edit">
        Event date
        <input
          type="datetime-local"
          value={toLocalInput(eventDateIso)}
          onChange={(e) => onEventDateChange(e.target.value)}
        />
      </label>
    ) : null;

  function Title({ script = false }: { script?: boolean }) {
    return (
      <h2 className={`rb-cd-title ${script ? "rb-gv is-script" : "rb-mc"}`}>
        {field("countdownHeading", `rb-cd-title ${script ? "rb-gv is-script" : "rb-mc"}`)}
      </h2>
    );
  }

  function Subtitle({ lined = false }: { lined?: boolean }) {
    return (
      <p className={`rb-mc rb-cd-sub${lined ? " is-lined" : ""}`}>
        {lined ? <span className="rb-cd-sub-line" aria-hidden="true" /> : null}
        <span>{field("countdownSubtitle", "rb-cd-sub-text")}</span>
        {lined ? <span className="rb-cd-sub-line" aria-hidden="true" /> : null}
      </p>
    );
  }

  return (
    <section
      className={`rb-sec rb-sec-alt${isCollage ? " rb-cd" : ""}`}
      id="countdown"
      data-layout={activeLayout}
      aria-label="Countdown"
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className="rb-layout-picker"
        />
      ) : null}

      {activeLayout === "gold-rings" ? (
        <div className="rb-wrap">
          <SectionTitle>{field("countdownHeading", "rb-h2 rb-mc")}</SectionTitle>
          {dateEditor}
          <Reveal>
            {count.isLive ? (
              live
            ) : (
              <div className="rb-rings">
                {RINGS.map((ring) => {
                  const value = count[ring.key];
                  const progress = Math.min(1, value / ring.max);
                  return (
                    <div key={ring.key} className="rb-rg">
                      <svg viewBox="0 0 100 100" aria-hidden="true">
                        <circle className="rb-rg-t" cx="50" cy="50" r="46" />
                        <circle
                          className="rb-rg-p"
                          cx="50"
                          cy="50"
                          r="46"
                          pathLength={1}
                          style={{ strokeDashoffset: 1 - progress }}
                        />
                      </svg>
                      <div>
                        <b>{value}</b>
                        <span>{ring.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>
      ) : null}

      {activeLayout === "arch-laurel" ? (
        <div className="rb-cd-wrap">
          <Reveal className="rb-cd-head">
            <HeartRule className="is-top" />
            <Title />
            <Subtitle lined />
          </Reveal>
          {dateEditor}
          <Reveal className="rb-cd-stage">
            <Laurel side="left" />
            {count.isLive ? (
              live
            ) : (
              <div className="rb-cd-arches">
                {RINGS.map((ring) => (
                  <div key={ring.key} className="rb-cd-arch">
                    <ArchCrown />
                    <b>{count[ring.key]}</b>
                    <span>{ring.label}</span>
                    <i className="rb-cd-diamond" aria-hidden="true" />
                  </div>
                ))}
              </div>
            )}
            <Laurel side="right" />
          </Reveal>
          <Reveal className="rb-cd-foot">
            <HeartRule />
            <DateLine text={dateText} arrows />
          </Reveal>
        </div>
      ) : null}

      {activeLayout === "halo-rings" ? (
        <div className="rb-cd-wrap">
          <Reveal className="rb-cd-head">
            <Title />
            <HeartRule />
            <Subtitle />
          </Reveal>
          {dateEditor}
          <Reveal className="rb-cd-stage">
            <Sprig className="is-left" />
            {count.isLive ? (
              live
            ) : (
              <div className="rb-cd-halos">
                {RINGS.map((ring, index) => (
                  <Fragment key={ring.key}>
                    {index > 0 ? <Sprig className="is-between" /> : null}
                    <div className="rb-cd-halo">
                      <b>{count[ring.key]}</b>
                      <span>{ring.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
            <Sprig className="is-right" />
            <span className="rb-cd-sparkles" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <i key={index} className={`is-s${index}`} />
              ))}
            </span>
          </Reveal>
          <Reveal className="rb-cd-foot">
            <HeartRule />
            <DateLine text={dateText} arrows />
          </Reveal>
        </div>
      ) : null}

      {activeLayout === "ornate-plaque" ? (
        <div className="rb-cd-wrap">
          <Reveal className="rb-cd-head">
            <Title />
            <HeartRule />
          </Reveal>
          {dateEditor}
          <Reveal className="rb-cd-stage">
            {count.isLive ? (
              live
            ) : (
              <div className="rb-cd-plaque">
                <PlaqueCap side="left" />
                <PlaqueCap side="right" />
                <i className="rb-cd-diamond is-top" aria-hidden="true" />
                <i className="rb-cd-diamond is-bottom" aria-hidden="true" />
                {RINGS.map((ring, index) => (
                  <Fragment key={ring.key}>
                    {index > 0 ? <span className="rb-cd-divider" aria-hidden="true" /> : null}
                    <div className="rb-cd-cell">
                      <b>{count[ring.key]}</b>
                      <span>{ring.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal className="rb-cd-foot">
            <DateLine text={dateText} />
            <HeartRule />
          </Reveal>
        </div>
      ) : null}

      {activeLayout === "hanging-tags" ? (
        <div className="rb-cd-wrap">
          <Reveal className="rb-cd-head">
            <Title script />
            <HeartRule />
          </Reveal>
          {dateEditor}
          <Reveal className="rb-cd-stage">
            {count.isLive ? (
              live
            ) : (
              <div className="rb-cd-hang">
                <span className="rb-cd-rod" aria-hidden="true" />
                <Vine side="left" />
                <Vine side="right" />
                <div className="rb-cd-tags">
                  {RINGS.map((ring, index) => (
                    <div key={ring.key} className={`rb-cd-tag is-t${index}`}>
                      <span className="rb-cd-chain" aria-hidden="true" />
                      <div className="rb-cd-tag-body">
                        <TagShape />
                        <b>{count[ring.key]}</b>
                        <span>{ring.label}</span>
                        <TagOrnament />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
          <Reveal className="rb-cd-foot">
            <DateLine text={dateText} />
            <HeartRule />
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
