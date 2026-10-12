"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LayoutPicker, {
  COUNTDOWN_LAYOUTS,
  normalizeLayoutId,
  type CountdownLayout,
} from "@/components/templates/royal/LayoutPicker";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  EVENT_DATE_TOO_SOON_MESSAGE,
  isEventDateAllowed,
  minDatetimeLocal,
  toDatetimeLocal,
} from "@/lib/event-date";

export type { CountdownLayout };

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function AnimatedDigits({ value }: { value: string }) {
  return (
    <span
      className="rr-count-digits"
      aria-hidden="true"
      style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}
    >
      {value.split("").map((digit, index) => (
        <span
          key={`${index}-${digit}`}
          className="rr-count-digit"
          style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}
        >
          {digit}
        </span>
      ))}
    </span>
  );
}

function Ornament() {
  return (
    <div className="rr-count-ornament" aria-hidden="true">
      <span className="rr-count-ornament-line" />
      <span className="rr-count-ornament-gem">✦</span>
      <span className="rr-count-ornament-line" />
    </div>
  );
}

export default function RoyalCountdown({
  eventDateIso,
  weekday,
  day,
  monthYear,
  time,
  layout,
  editing,
  field,
  onLayoutChange,
  onEventDateChange,
}: {
  eventDateIso?: string;
  weekday?: string;
  day?: string;
  monthYear?: string;
  time?: string;
  layout?: string;
  editing?: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const countdown = useCountdown(eventDateIso);
  const [pulse, setPulse] = useState(false);
  const [dateError, setDateError] = useState("");
  const prevSeconds = useRef(countdown.seconds);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, COUNTDOWN_LAYOUTS, "classic");
  const minDateTime = minDatetimeLocal();

  useEffect(() => {
    if (prevSeconds.current !== countdown.seconds) {
      prevSeconds.current = countdown.seconds;
      setPulse(true);
      const timer = window.setTimeout(() => setPulse(false), 280);
      return () => window.clearTimeout(timer);
    }
  }, [countdown.seconds]);

  const units = [
    { label: "Days", value: pad(countdown.days) },
    { label: "Hours", value: pad(countdown.hours) },
    { label: "Minutes", value: pad(countdown.minutes) },
    { label: "Seconds", value: pad(countdown.seconds) },
  ];

  const dateLine = [weekday, day && monthYear ? `${day} ${monthYear}` : monthYear, time]
    .filter(Boolean)
    .join(" · ");

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) {
      return;
    }

    try {
      if (typeof input.showPicker === "function") {
        void input.showPicker();
        return;
      }
    } catch {
      // Fall through to focus/click for browsers that block showPicker.
    }

    input.focus();
    input.click();
  }

  function renderDateLine() {
    const canEditDate = Boolean(editing && onEventDateChange);

    return (
      <div className={`rr-date-badge is-${activeLayout}${canEditDate ? " is-editable" : ""}`}>
        {canEditDate ? (
          <label className="rr-date-line rr-date-picker font-caps">
            <span className="rr-date-picker-text">{dateLine || "Choose date & time"}</span>
            <span className="rr-date-picker-hint font-caps">Tap to change</span>
            <input
              ref={dateInputRef}
              type="datetime-local"
              className="rr-date-picker-input"
              min={minDateTime}
              value={toDatetimeLocal(eventDateIso)}
              onChange={(event) => {
                const next = event.target.value;
                if (next && !isEventDateAllowed(next)) {
                  setDateError(EVENT_DATE_TOO_SOON_MESSAGE);
                  return;
                }
                setDateError("");
                onEventDateChange?.(next);
              }}
              onClick={(event) => {
                event.stopPropagation();
                openDatePicker();
              }}
              aria-label="Choose event date and time"
            />
          </label>
        ) : (
          <p className="rr-date-line font-caps">{dateLine}</p>
        )}
        {dateError ? <p className="rr-date-picker-error font-caps">{dateError}</p> : null}
      </div>
    );
  }

  return (
    <section
      id="countdown"
      className={`rr-section rr-countdown is-layout-${activeLayout}`}
      style={{ color: "#e7d3a4" }}
    >
      <div className="rr-section-inner">
        <p className="rr-eyebrow font-caps" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
          Save the date
        </p>

        {editing && onLayoutChange ? (
          <LayoutPicker
            options={COUNTDOWN_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Countdown"
          />
        ) : null}

        {countdown.isLive ? (
          <>
            <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
              {field("countdownLiveLabel", "rr-script-title font-names text-[#e7d3a4]")}
            </h2>
            {renderDateLine()}
            <div className="rr-celebrate">
              <span className="rr-celebrate-mark" aria-hidden="true">
                ❦
              </span>
              <p className="font-invite-serif" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
                May this union be filled with barakah and joy
              </p>
            </div>
          </>
        ) : (
          <>
            {activeLayout === "ornate" || activeLayout === "minimal" ? <Ornament /> : null}

            <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
              {field("countdownHeading", "rr-script-title font-names text-[#e7d3a4]")}
            </h2>
            {renderDateLine()}

            <div className={`rr-count-shell is-${activeLayout}`}>
              {activeLayout === "ornate" ? (
                <>
                  <span className="rr-count-corner rr-count-corner-tl" aria-hidden="true" />
                  <span className="rr-count-corner rr-count-corner-tr" aria-hidden="true" />
                  <span className="rr-count-corner rr-count-corner-bl" aria-hidden="true" />
                  <span className="rr-count-corner rr-count-corner-br" aria-hidden="true" />
                </>
              ) : null}

              <div className={`rr-count-grid ${pulse ? "is-tick" : ""}`} role="timer" aria-live="polite">
                {units.map((unit, index) => (
                  <div key={unit.label} className="rr-count-unit">
                    {activeLayout === "ribbon" && index > 0 ? (
                      <span className="rr-count-sep" aria-hidden="true">
                        :
                      </span>
                    ) : null}
                    <div className="rr-count-cell">
                      <AnimatedDigits value={unit.value} />
                      <span className="sr-only">
                        {unit.value} {unit.label}
                      </span>
                      <span
                        className="rr-count-label font-caps"
                        style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}
                      >
                        {unit.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeLayout === "ornate" || activeLayout === "minimal" ? <Ornament /> : null}
          </>
        )}
      </div>
    </section>
  );
}
