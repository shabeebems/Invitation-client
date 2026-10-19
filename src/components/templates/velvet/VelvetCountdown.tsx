"use client";

import { useRef, useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { Reveal, VelvetFloralSwag } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_COUNTDOWN_LAYOUTS,
  type VelvetCountdownLayout,
} from "@/components/templates/velvet/velvet-layouts";
import {
  EVENT_DATE_TOO_SOON_MESSAGE,
  isEventDateAllowed,
  minDatetimeLocal,
  toDatetimeLocal,
} from "@/lib/event-date";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function VelvetCountdown({
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
  onLayoutChange?: (layout: VelvetCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const countdown = useCountdown(eventDateIso);
  const [dateError, setDateError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, VELVET_COUNTDOWN_LAYOUTS, "scallop");
  const minDateTime = minDatetimeLocal();

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
    <section className="vh-countdown" id="countdown" data-layout={activeLayout}>
      <VelvetFloralSwag className="vh-cd-floral-left" />
      <VelvetFloralSwag className="vh-cd-floral-right" />

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={VELVET_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className="vh-layout-picker is-dark"
        />
      ) : null}

      <Reveal>
        <div className="vh-cap-title vh-cd-eyebrow">
          {field("countdownHeading", "vh-cap-title vh-cd-eyebrow")}
        </div>
      </Reveal>
      <Reveal>
        <h2 className="vh-script vh-cd-title">Countdown</h2>
      </Reveal>

      {editing ? (
        <div className="vh-cd-date-edit">
          <button type="button" className="vh-cap-title vh-cd-date-btn" onClick={openDatePicker}>
            Change event date
          </button>
          <input
            ref={dateInputRef}
            type="datetime-local"
            className="vh-cd-date-input"
            min={minDateTime}
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
          {dateError ? <p className="vh-cd-date-error">{dateError}</p> : null}
        </div>
      ) : null}

      <Reveal>
        <div className="vh-countdown-row" role="timer" aria-live="off">
          {countdown.isLive ? (
            <p className="vh-script vh-cd-live">
              {field("countdownLiveLabel", "vh-script vh-cd-live")}
            </p>
          ) : (
            units.map((unit) => (
              <div key={unit.label} className="vh-scallop-card">
                <span className="vh-scallop-num">{unit.value}</span>
                <span className="vh-scallop-lbl">{unit.label}</span>
                <span className="vh-scallop-hrt" aria-hidden="true">
                  ♥
                </span>
              </div>
            ))
          )}
        </div>
      </Reveal>
    </section>
  );
}
