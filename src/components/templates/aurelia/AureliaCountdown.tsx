"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  AURELIA_COUNTDOWN_LAYOUTS,
  type AureliaCountdownLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaCountdown({
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
  onLayoutChange?: (layout: AureliaCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_COUNTDOWN_LAYOUTS, "tabular-quartet");
  const count = useCountdown(eventDateIso);

  const cells = [
    { value: count.days, label: "Days" },
    { value: count.hours, label: "Hours" },
    { value: count.minutes, label: "Minutes" },
    { value: count.seconds, label: "Seconds" },
  ];

  return (
    <section className="au-sec au-count" id="count" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
          className="au-layout-picker"
        />
      ) : null}

      <Reveal>
        <p className="au-eyebrow">{field("amenityThreeLabel", "au-eyebrow")}</p>
      </Reveal>
      <Reveal>
        <h2 className="au-h2">{field("countdownHeading", "au-h2")}</h2>
      </Reveal>

      {editing && onEventDateChange ? (
        <label className="au-date-edit">
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
          <p className="au-live">{field("countdownLiveLabel", "au-live")}</p>
        ) : (
          <div className="au-cd" aria-live="off">
            {cells.map((cell) => (
              <div key={cell.label}>
                <b>{String(cell.value).padStart(2, "0")}</b>
                <span>{cell.label}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
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
