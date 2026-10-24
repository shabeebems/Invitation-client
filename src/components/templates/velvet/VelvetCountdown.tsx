"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  VelvetCdDivider,
  VelvetCdFlourish,
  VelvetCdHeart,
  VelvetCdHexFrame,
  VelvetCdLantern,
  VelvetCdLeafWreath,
} from "@/components/templates/velvet/VelvetCountdownArt";
import { Reveal } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_COUNTDOWN_LAYOUT_ALIASES,
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

const DARK_LAYOUTS: VelvetCountdownLayout[] = ["gilded-rings", "lantern-hex", "ivory-card"];

function SceneArt({ layout }: { layout: VelvetCountdownLayout }) {
  if (layout === "lantern-hex") {
    return (
      <>
        <VelvetCdLantern className="vh-cd-lantern-pos a" />
        <VelvetCdLantern className="vh-cd-lantern-pos b" />
        <VelvetCdLantern className="vh-cd-lantern-pos c" />
        <VelvetCdLantern className="vh-cd-lantern-pos d" />
      </>
    );
  }

  return null;
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
  const [mounted, setMounted] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const activeLayout = normalizeLayoutId(
    layout,
    VELVET_COUNTDOWN_LAYOUTS,
    "gilded-rings",
    VELVET_COUNTDOWN_LAYOUT_ALIASES
  );
  const minDateTime = minDatetimeLocal();
  const pickerDark = DARK_LAYOUTS.includes(activeLayout);
  const showWreath = activeLayout === "gilded-rings";
  const showHex = activeLayout === "lantern-hex";
  const showHeart = activeLayout === "lantern-hex";

  const units = [
    { label: "Days", value: mounted ? String(countdown.days) : "—" },
    { label: "Hours", value: mounted ? pad(countdown.hours) : "00" },
    { label: "Minutes", value: mounted ? pad(countdown.minutes) : "00" },
    { label: "Seconds", value: mounted ? pad(countdown.seconds) : "00" },
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

  const heading = (
    <div className="vh-cd-heading">
      <VelvetCdFlourish />
      <Reveal>
        <div className="vh-cap-title vh-cd-eyebrow">
          {field("countdownHeading", "vh-cap-title vh-cd-eyebrow")}
        </div>
      </Reveal>
      <Reveal>
        <h2 className="vh-script vh-cd-title">Countdown</h2>
      </Reveal>
      {showHeart ? <VelvetCdHeart /> : <VelvetCdDivider />}
    </div>
  );

  const dateEdit = editing ? (
    <div className="vh-cd-date-edit">
      <button type="button" className="vh-cap-title vh-cd-date-btn" onClick={openDatePicker}>
        <span aria-hidden="true">✦</span> Change event date <span aria-hidden="true">✦</span>
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
  ) : null;

  const unitsRow = (
    <Reveal>
      <div className="vh-countdown-row" role="timer" aria-live="off">
        {countdown.isLive ? (
          <p className="vh-script vh-cd-live">{field("countdownLiveLabel", "vh-script vh-cd-live")}</p>
        ) : (
          units.map((unit) => (
            <div key={unit.label} className={`vh-cd-unit is-${activeLayout}`}>
              {showHex ? <VelvetCdHexFrame /> : null}
              {showWreath ? <VelvetCdLeafWreath /> : null}
              <span className="vh-cd-num">{unit.value}</span>
              <span className="vh-cd-lbl">{unit.label}</span>
            </div>
          ))
        )}
      </div>
    </Reveal>
  );

  const inner = (
    <div className="vh-cd-inner">
      {heading}
      {unitsRow}
      {dateEdit}
    </div>
  );

  return (
    <section className="vh-countdown" id="countdown" data-layout={activeLayout}>
      <SceneArt layout={activeLayout} />

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={VELVET_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className={`vh-layout-picker${pickerDark ? " is-dark" : ""}`}
        />
      ) : null}

      {activeLayout === "ivory-card" ? <div className="vh-cd-board">{inner}</div> : inner}
    </section>
  );
}
