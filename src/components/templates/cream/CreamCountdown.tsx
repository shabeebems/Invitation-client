"use client";

import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, DiamondRule, Reveal } from "@/components/templates/cream/CreamDecor";
import { CreamBlossomSpray, CreamLeafSprig } from "@/components/templates/cream/CreamWelcomeArt";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  CREAM_COUNTDOWN_LAYOUTS,
  type CreamCountdownLayout,
} from "@/components/templates/cream/cream-layouts";

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

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const noopSubscribe = () => () => {};

/** Reads the calendar date as written in the ISO string, so every timezone shows the same day. */
function eventCalendar(iso?: string) {
  const match = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (month < 0 || month > 11 || day < 1) return null;
  const leading = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  if (day > length) return null;
  const cells: (number | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length }, (_, i) => i + 1),
  ];
  return { year, monthName: MONTHS[month], day, cells };
}

export default function CreamCountdown({
  editing,
  layout,
  eventDateIso,
  imageUrl = "",
  field,
  onLayoutChange,
  onEventDateChange,
  onChangeImage,
}: {
  editing: boolean;
  layout?: string;
  eventDateIso?: string;
  imageUrl?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
  onChangeImage?: (file: File) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_COUNTDOWN_LAYOUTS, "rose-band");
  const fileRef = useRef<HTMLInputElement>(null);
  const live = useCountdown(eventDateIso);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const count = mounted ? live : { ...live, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const cells = [
    { value: count.days, label: "Days", progress: Math.min(count.days, 365) / 365 },
    { value: count.hours, label: "Hours", progress: count.hours / 24 },
    { value: count.minutes, label: "Minutes", progress: count.minutes / 60 },
    { value: count.seconds, label: "Seconds", progress: count.seconds / 60 },
  ];

  function pad(value: number) {
    return String(value).padStart(2, "0");
  }

  function pickImage() {
    if (editing && onChangeImage) fileRef.current?.click();
  }

  function renderHead(className = "") {
    return (
      <Reveal className={`ce-ct-head ${className}`.trim()}>
        <p className="ce-ct-eyebrow">{field("amenityThreeLabel")}</p>
        <h2 className="ce-ct-title">{field("countdownHeading")}</h2>
        <DiamondRule className="ce-ct-rule" />
      </Reveal>
    );
  }

  function renderDateEditor() {
    return editing && onEventDateChange ? (
      <label className="ce-date-edit ce-ct-date-edit">
        Event date
        <input
          type="datetime-local"
          value={toLocalInput(eventDateIso)}
          onChange={(e) => onEventDateChange(e.target.value)}
        />
      </label>
    ) : null;
  }

  function renderDate(className: string) {
    return (
      <p className={className}>
        {field("weekday")}
        {", "}
        {field("day")} {field("monthYear")}
      </p>
    );
  }

  function renderLive(className = "") {
    return <p className={`ce-ct-live ${className}`.trim()}>{field("countdownLiveLabel")}</p>;
  }

  function renderPhoto() {
    return (
      <div
        className={`ce-ct-ap-ph${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? "Change countdown photo" : undefined}
        onClick={pickImage}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            pickImage();
          }
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" loading="lazy" />
        ) : (
          <CreamPh colors={["#E8D9BF", "#D8B8AD"]} label="" />
        )}
        {editing ? <span className="ce-photo-hint">Change photo</span> : null}
      </div>
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "progress-rings":
        return (
          <div className="ce-w ce-ct ce-ct-rg">
            <CreamLeafSprig className="ce-ct-rg-sprig is-left" />
            <CreamLeafSprig className="ce-ct-rg-sprig is-right" />
            {renderHead("is-center")}
            {renderDateEditor()}
            {count.isLive ? (
              renderLive("is-center")
            ) : (
              <ul className="ce-ct-rg-list" role="timer" aria-live="off">
                {cells.map((cell, index) => (
                  <li key={cell.label}>
                    <Reveal className="ce-ct-ring" delay={`${index * 0.08}s`}>
                      <svg viewBox="0 0 120 120" aria-hidden="true">
                        <circle className="ce-ct-ring-track" cx="60" cy="60" r={RING_RADIUS} />
                        <circle className="ce-ct-ring-inner" cx="60" cy="60" r="46" />
                        <circle
                          className="ce-ct-ring-fill"
                          cx="60"
                          cy="60"
                          r={RING_RADIUS}
                          style={
                            {
                              strokeDasharray: RING_LENGTH,
                              strokeDashoffset: RING_LENGTH * (1 - cell.progress),
                            } as CSSProperties
                          }
                        />
                      </svg>
                      <span className="ce-ct-ring-copy">
                        <b>{pad(cell.value)}</b>
                        <span>{cell.label}</span>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
            <Reveal className="ce-ct-ribbon">
              <span aria-hidden="true" />
              {renderDate("ce-ct-ribbon-text")}
              <span aria-hidden="true" />
            </Reveal>
          </div>
        );
      case "arch-portrait":
        return (
          <div className="ce-w ce-ct ce-ct-ap">
            <Reveal className="ce-ct-ap-media">
              {renderPhoto()}
              <CreamBlossomSpray className="ce-ct-ap-spray" />
            </Reveal>
            <div className="ce-ct-ap-body">
              {renderHead()}
              {renderDateEditor()}
              {count.isLive ? (
                renderLive()
              ) : (
                <Reveal className="ce-ct-ap-list-wrap" delay="0.08s">
                  <ol className="ce-ct-ap-list" role="timer" aria-live="off">
                    {cells.map((cell) => (
                      <li key={cell.label}>
                        <b>{pad(cell.value)}</b>
                        <span className="ce-ct-ap-lead" aria-hidden="true" />
                        <span className="ce-ct-ap-label">{cell.label}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )}
              <Reveal delay="0.14s">{renderDate("ce-ct-ap-date")}</Reveal>
            </div>
          </div>
        );
      case "calendar-card": {
        const calendar = eventCalendar(eventDateIso);
        return (
          <div className={`ce-w ce-ct ce-ct-cal${calendar ? "" : " no-calendar"}`}>
            {calendar ? (
              <Reveal className="ce-ct-cal-card">
                <p className="ce-ct-cal-month">
                  {calendar.monthName} <em>{calendar.year}</em>
                </p>
                <DiamondRule className="ce-ct-rule" />
                <div className="ce-ct-cal-grid" aria-hidden="true">
                  {WEEKDAY_INITIALS.map((initial, index) => (
                    <span key={`w-${index}`} className="ce-ct-cal-wd">
                      {initial}
                    </span>
                  ))}
                  {calendar.cells.map((value, index) =>
                    value === null ? (
                      <span key={`b-${index}`} />
                    ) : (
                      <span
                        key={`d-${value}`}
                        className={`ce-ct-cal-day${value === calendar.day ? " is-day" : ""}`}
                      >
                        {value === calendar.day ? (
                          <svg className="ce-ct-cal-ring" viewBox="0 0 60 56">
                            <path
                              pathLength={1}
                              d="M31 4C15 3 5 14 5 28c0 14 11 24 26 24 15 0 24-11 24-24C55 14 44 5 27 6"
                            />
                            <path className="is-heart" d="M51 9.5s-3.6-2.3-3.6-4.8a1.9 1.9 0 0 1 3.6-.9 1.9 1.9 0 0 1 3.6.9c0 2.5-3.6 4.8-3.6 4.8z" />
                          </svg>
                        ) : null}
                        <span>{value}</span>
                      </span>
                    )
                  )}
                </div>
              </Reveal>
            ) : null}
            <div className="ce-ct-cal-body">
              {renderHead()}
              {renderDateEditor()}
              {count.isLive ? (
                renderLive()
              ) : (
                <ul className="ce-ct-cal-tiles" role="timer" aria-live="off">
                  {cells.map((cell, index) => (
                    <li key={cell.label}>
                      <Reveal className="ce-ct-tile" delay={`${index * 0.07}s`}>
                        <b>{pad(cell.value)}</b>
                        <span>{cell.label}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
              <Reveal delay="0.14s">{renderDate("ce-ct-cal-date")}</Reveal>
            </div>
          </div>
        );
      }
      default:
        return (
          <>
            <p className="ce-eyebrow">{field("amenityThreeLabel", "ce-eyebrow")}</p>
            <Reveal>
              <h2 className="ce-h2">{field("countdownHeading", "ce-h2")}</h2>
            </Reveal>

            {renderDateEditor()}

            <Reveal>
              {count.isLive ? (
                <p className="ce-live">{field("countdownLiveLabel", "ce-live")}</p>
              ) : (
                <div className="ce-cd" role="timer" aria-live="off">
                  {cells.map((cell) => (
                    <div key={cell.label}>
                      <b>{pad(cell.value)}</b>
                      <span>{cell.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
            <p className="ce-count-date">
              {field("weekday", "ce-count-date")}
              {", "}
              {field("day", "ce-count-date")} {field("monthYear", "ce-count-date")}
            </p>
          </>
        );
    }
  }

  return (
    <section className="ce-count" id="count" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className="ce-layout-picker"
        />
      ) : null}

      {renderBody()}

      {editing && onChangeImage ? (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChangeImage(file);
            e.target.value = "";
          }}
        />
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
