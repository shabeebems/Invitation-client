"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  CREAM_COUNTDOWN_LAYOUTS,
  type CreamCountdownLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamCountdown({
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
  onLayoutChange?: (layout: CreamCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_COUNTDOWN_LAYOUTS, "rose-band");
  const count = useCountdown(eventDateIso);

  const cells = [
    { value: count.days, label: "Days" },
    { value: count.hours, label: "Hours" },
    { value: count.minutes, label: "Minutes" },
    { value: count.seconds, label: "Seconds" },
  ];

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

      <p className="ce-eyebrow">{field("amenityThreeLabel", "ce-eyebrow")}</p>
      <Reveal>
        <h2 className="ce-h2">{field("countdownHeading", "ce-h2")}</h2>
      </Reveal>

      {editing && onEventDateChange ? (
        <label className="ce-date-edit">
          Event date
          <input
            type="datetime-local"
            value={toLocalInput(eventDateIso)}
            onChange={(e) => onEventDateChange(e.target.value)}
          />
        </label>
      ) : null}

      <Reveal>
        {count.isLive ? (
          <p className="ce-live">{field("countdownLiveLabel", "ce-live")}</p>
        ) : (
          <div className="ce-cd" role="timer" aria-live="off">
            {cells.map((cell) => (
              <div key={cell.label}>
                <b>{String(cell.value).padStart(2, "0")}</b>
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
