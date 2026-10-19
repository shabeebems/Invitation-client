"use client";

import { useRef, useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { PalaceHeartRule, PalaceOliveTwigs } from "@/components/templates/palace/PalaceDecor";
import {
  PALACE_COUNTDOWN_LAYOUTS,
  type PalaceCountdownLayout,
} from "@/components/templates/palace/palace-layouts";
import {
  EVENT_DATE_TOO_SOON_MESSAGE,
  isEventDateAllowed,
  minDatetimeLocal,
  toDatetimeLocal,
} from "@/lib/event-date";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function PalaceCountdown({
  eventDateIso,
  layout,
  editing,
  field,
  onLayoutChange,
  onEventDateChange,
}: {
  eventDateIso?: string;
  layout?: string;
  editing?: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: PalaceCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const countdown = useCountdown(eventDateIso);
  const [dateError, setDateError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, PALACE_COUNTDOWN_LAYOUTS, "watercolor");

  const units = [
    { label: "Days", value: String(countdown.days) },
    { label: "Hours", value: pad(countdown.hours) },
    { label: "Minutes", value: pad(countdown.minutes) },
    { label: "Seconds", value: pad(countdown.seconds) },
  ];

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;
    try {
      if (typeof input.showPicker === "function") {
        void input.showPicker();
        return;
      }
    } catch {
      // fall through
    }
    input.focus();
    input.click();
  }

  return (
    <section className="pp-countdown" id="countdown" data-layout={activeLayout} aria-label="Wedding countdown">
      <div className="pp-countdown-wash" aria-hidden="true" />

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={PALACE_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className="pp-layout-picker"
        />
      ) : null}

      <p className="pp-kicker">{field("countdownHeading", "pp-kicker")}</p>
      <h2 className="pp-script pp-section-script">Countdown</h2>
      <PalaceHeartRule />

      {editing ? (
        <div className="pp-date-edit">
          <button type="button" className="pp-chip-btn" onClick={openDatePicker}>
            Change event date
          </button>
          <input
            ref={dateInputRef}
            type="datetime-local"
            className="pp-date-input"
            min={minDatetimeLocal()}
            value={toDatetimeLocal(eventDateIso || "")}
            onChange={(event) => {
              const value = event.target.value;
              if (!isEventDateAllowed(value)) {
                setDateError(EVENT_DATE_TOO_SOON_MESSAGE);
                return;
              }
              setDateError("");
              onEventDateChange?.(value);
            }}
          />
          {dateError ? <p className="pp-date-error">{dateError}</p> : null}
        </div>
      ) : null}

      {countdown.isLive ? (
        <p className="pp-script pp-countdown-live">
          {field("countdownLiveLabel", "pp-script pp-countdown-live")}
        </p>
      ) : (
        <div className="pp-countdown-grid" role="timer">
          {units.map((unit) => (
            <div key={unit.label} className="pp-water-badge">
              <span className="pp-water-num">{unit.value}</span>
              <span className="pp-water-lbl">{unit.label}</span>
            </div>
          ))}
        </div>
      )}

      <PalaceOliveTwigs label='Until We Say "I Do"' />
    </section>
  );
}
