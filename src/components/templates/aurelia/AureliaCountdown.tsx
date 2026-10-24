"use client";

import { Fragment, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaLotus, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import {
  AURELIA_COUNTDOWN_LAYOUTS,
  type AureliaCountdownLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 2c.6 4.4 3.6 7.4 8 8-4.4.6-7.4 3.6-8 8-.6-4.4-3.6-7.4-8-8 4.4-.6 7.4-3.6 8-8z" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 16.5S3 12.2 3 7.6A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.6c0 4.6-7 8.9-7 8.9z" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

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
  const pad = (value: number) => String(value).padStart(2, "0");

  function renderDateEdit(className = "au-date-edit", lined = false) {
    if (!editing || !onEventDateChange) return null;
    const input = (
      <input
        type="datetime-local"
        value={toLocalInput(eventDateIso)}
        onChange={(e) => onEventDateChange(e.target.value)}
      />
    );
    return (
      <label className={className}>
        Event date
        {lined ? (
          <span className="au-cx-date-row">
            <i aria-hidden="true" />
            {input}
            <i aria-hidden="true" />
          </span>
        ) : (
          input
        )}
      </label>
    );
  }

  function renderLive() {
    return <p className="au-live">{field("countdownLiveLabel", "au-live")}</p>;
  }

  function renderOrnament(className = "au-cx-orn") {
    return (
      <div className={className} aria-hidden="true">
        <i />
        <AureliaLotus className="au-cx-lotus" />
        <i />
      </div>
    );
  }

  function renderPillIcon(index: number) {
    if (index === 0) return <AureliaLotus className="au-cx-pill-ico" />;
    if (index === 2) return <HeartIcon className="au-cx-pill-ico" />;
    return <SparkleIcon className="au-cx-pill-ico" />;
  }

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

      {activeLayout === "arched-pills" ? (
        <div className="au-cx au-ap">
          <Reveal className="au-cx-head">
            <p className="au-eyebrow">{field("amenityThreeLabel", "au-eyebrow")}</p>
            <h2 className="au-cx-title">{field("countdownHeading", "")}</h2>
            {renderDateEdit("au-date-edit au-cx-date")}
          </Reveal>
          <Reveal>
            {count.isLive ? (
              renderLive()
            ) : (
              <div className="au-ap-row" aria-live="off">
                {cells.map((cell, index) => (
                  <div key={cell.label} className="au-ap-pill">
                    {renderPillIcon(index)}
                    <b className="au-cx-num">{pad(cell.value)}</b>
                    <span className="au-cx-label">{cell.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      ) : activeLayout === "linked-rings" ? (
        <div className="au-cx au-lr">
          <Reveal className="au-cx-head">
            <p className="au-eyebrow au-cx-eyebrow is-lined">{field("amenityThreeLabel", "au-eyebrow")}</p>
            <h2 className="au-cx-title">{field("countdownHeading", "")}</h2>
            {renderDateEdit("au-date-edit au-cx-date")}
          </Reveal>
          <Reveal>
            {count.isLive ? (
              renderLive()
            ) : (
              <div className="au-lr-row" aria-live="off">
                {cells.map((cell, index) => (
                  <Fragment key={cell.label}>
                    {index > 0 ? (
                      <span className="au-lr-link" aria-hidden="true">
                        <SparkleIcon className="au-lr-spark" />
                      </span>
                    ) : null}
                    <div className="au-lr-unit">
                      <span className="au-lr-ring">
                        <b className="au-cx-num">{pad(cell.value)}</b>
                      </span>
                      <span className="au-cx-label">{cell.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal>{renderOrnament("au-cx-orn is-foot")}</Reveal>
        </div>
      ) : activeLayout === "framed-panel" ? (
        <div className="au-cx au-fp">
          <Reveal className="au-cx-head">
            {renderOrnament()}
            <p className="au-eyebrow au-cx-eyebrow is-lined">{field("amenityThreeLabel", "au-eyebrow")}</p>
            <h2 className="au-cx-title">{field("countdownHeading", "")}</h2>
            {renderDateEdit("au-date-edit au-cx-date", true)}
          </Reveal>
          <Reveal>
            {count.isLive ? (
              renderLive()
            ) : (
              <div className="au-fp-panel" aria-live="off">
                <span className="au-fp-corner is-tl" aria-hidden="true" />
                <span className="au-fp-corner is-tr" aria-hidden="true" />
                <span className="au-fp-corner is-bl" aria-hidden="true" />
                <span className="au-fp-corner is-br" aria-hidden="true" />
                {cells.map((cell) => (
                  <div key={cell.label} className="au-fp-cell">
                    <b className="au-cx-num">{pad(cell.value)}</b>
                    <span className="au-cx-label">{cell.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal>{renderOrnament("au-cx-orn is-foot")}</Reveal>
        </div>
      ) : (
        <>
          <Reveal>
            <p className="au-eyebrow">{field("amenityThreeLabel", "au-eyebrow")}</p>
          </Reveal>
          <Reveal>
            <h2 className="au-h2">{field("countdownHeading", "au-h2")}</h2>
          </Reveal>

          {renderDateEdit()}

          <Reveal>
            {count.isLive ? (
              renderLive()
            ) : (
              <div className="au-cd" aria-live="off">
                {cells.map((cell) => (
                  <div key={cell.label}>
                    <b>{pad(cell.value)}</b>
                    <span>{cell.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </>
      )}
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
