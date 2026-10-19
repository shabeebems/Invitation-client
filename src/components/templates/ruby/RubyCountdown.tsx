"use client";

import type { ReactNode } from "react";
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

  return (
    <section
      className="rb-sec rb-sec-alt"
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

      <div className="rb-wrap">
        <SectionTitle>{field("countdownHeading", "rb-h2 rb-mc")}</SectionTitle>
        {editing && onEventDateChange ? (
          <label className="rb-date-edit">
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
            <p className="rb-live rb-gv">{field("countdownLiveLabel", "rb-live rb-gv")}</p>
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
