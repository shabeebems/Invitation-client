"use client";

import type { CSSProperties, ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaLotus, EventIcon, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_VENUE_LAYOUTS,
  type AureliaVenueLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

function toHref(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default function AureliaVenue({
  items,
  layout,
  editing,
  dateLine,
  day,
  monthYear,
  venueName,
  venueCity,
  mapsUrl,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
}: {
  items: ProgramItem[];
  layout?: string;
  editing: boolean;
  dateLine: string;
  day: string;
  monthYear: string;
  venueName: string;
  venueCity: string;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: AureliaVenueLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_VENUE_LAYOUTS, "ivory-cards");
  const cards = items.length
    ? items
    : [
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
      ];
  const monthShort = (monthYear.trim().split(/\s+/)[0] || "").slice(0, 3);
  const year = monthYear.match(/\d{4}/)?.[0] || "";
  const shortDate = [day, monthYear].filter(Boolean).join(" ");

  function renderButton(item: ProgramItem, className = "au-btn") {
    if (editing) {
      return <span className={className}>{field("getDirectionsLabel", "au-btn-label")}</span>;
    }
    const href = toHref(item.mapsUrl ?? mapsUrl);
    return (
      <a
        className={className}
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
      >
        {field("getDirectionsLabel", "au-btn-label")}
      </a>
    );
  }

  function renderLinkEditor(item: ProgramItem, index: number) {
    if (!editing) return null;
    return (
      <div className="au-vn-link">
        <p className="au-vn-link-label">Google Maps URL</p>
        <EditableField
          value={item.mapsUrl ?? mapsUrl}
          editable
          className="au-vn-link-field"
          maxLength={PROGRAM_ITEM_MAX.mapsUrl}
          onCommit={(value) => onCommitItem(index, "mapsUrl", value)}
        />
      </div>
    );
  }

  function renderRemove(index: number) {
    if (!editing || cards.length <= 1) return null;
    return (
      <button type="button" className="au-remove" onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    );
  }

  function renderIcon(index: number, className = "au-vx-ico") {
    return (
      <span className={className} aria-hidden="true">
        <EventIcon kind={index % 2 === 0 ? "ring" : "glass"} />
      </span>
    );
  }

  function renderTitle(item: ProgramItem, index: number) {
    return (
      <h3 className="au-vx-name">
        <EditableField
          value={item.title}
          editable={editing}
          maxLength={PROGRAM_ITEM_MAX.title}
          onCommit={(value) => onCommitItem(index, "title", value)}
        />
      </h3>
    );
  }

  function renderTime(item: ProgramItem, index: number) {
    return (
      <p className="au-vx-time">
        <EditableField
          value={item.time}
          editable={editing}
          maxLength={PROGRAM_ITEM_MAX.time}
          onCommit={(value) => onCommitItem(index, "time", value)}
        />
      </p>
    );
  }

  function renderPlace() {
    return (
      <p className="au-vx-place">
        {venueName}
        <br />
        {venueCity}
      </p>
    );
  }

  function renderDesc(item: ProgramItem, index: number) {
    return (
      <p className="au-vx-desc">
        <EditableField
          value={item.description}
          editable={editing}
          multiline
          maxLength={PROGRAM_ITEM_MAX.description}
          onCommit={(value) => onCommitItem(index, "description", value)}
        />
      </p>
    );
  }

  function renderActions(item: ProgramItem, index: number) {
    return (
      <div className="au-vx-actions">
        {renderButton(item, "au-btn au-vx-btn")}
        {renderLinkEditor(item, index)}
        {renderRemove(index)}
      </div>
    );
  }

  function renderHead() {
    return (
      <Reveal className="au-vx-head">
        <p className="au-eyebrow">{field("weekday", "au-eyebrow")}</p>
        <h2 className="au-vx-title">{field("programTitle", "")}</h2>
        <p className="au-vx-intro">{field("programIntro", "")}</p>
      </Reveal>
    );
  }

  const rows = Math.ceil(cards.length / 2);

  return (
    <section
      className="au-sec au-venue is-paper"
      id="venue"
      data-layout={activeLayout}
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_VENUE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="au-layout-picker"
        />
      ) : null}

      {activeLayout === "notched-frames" ? (
        <div className="au-vx au-nf">
          <Reveal className="au-vx-head">
            <div className="au-nf-orn">
              <i />
              <span className="au-eyebrow">{field("weekday", "au-eyebrow")}</span>
              <AureliaLotus className="au-nf-lotus" />
              <span className="au-eyebrow">{shortDate}</span>
              <i />
            </div>
            <h2 className="au-vx-title">{field("programTitle", "")}</h2>
            <p className="au-vx-intro">{field("programIntro", "")}</p>
          </Reveal>
          <div className="au-nf-row">
            {cards.map((item, index) => (
              <Reveal key={`au-nf-${index}`} className="au-nf-cell" delay={`${(index % 2) * 0.15}s`}>
                <article className="au-nf-card">
                  <span className="au-nf-corner is-tl" aria-hidden="true" />
                  <span className="au-nf-corner is-tr" aria-hidden="true" />
                  <span className="au-nf-corner is-bl" aria-hidden="true" />
                  <span className="au-nf-corner is-br" aria-hidden="true" />
                  {renderIcon(index)}
                  {renderTitle(item, index)}
                  <p className="au-vx-date">{dateLine}</p>
                  <span className="au-vx-rule" aria-hidden="true" />
                  {renderTime(item, index)}
                  {renderPlace()}
                  {renderDesc(item, index)}
                  {renderActions(item, index)}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : activeLayout === "date-divider" ? (
        <div className="au-vx au-dd">
          {renderHead()}
          <div className="au-dd-grid" style={{ "--rows": rows } as CSSProperties}>
            {cards.map((item, index) => (
              <div
                key={`au-dd-${index}`}
                className="au-dd-slot"
                style={
                  {
                    "--col": index % 2 === 0 ? 1 : 3,
                    "--row": Math.floor(index / 2) + 1,
                    order: index === 0 ? 0 : index + 1,
                  } as CSSProperties
                }
              >
                <Reveal className="au-dd-item" delay={`${(index % 2) * 0.15}s`}>
                  {renderIcon(index)}
                  {renderTitle(item, index)}
                  {renderTime(item, index)}
                  {renderPlace()}
                  {renderDesc(item, index)}
                  {renderActions(item, index)}
                </Reveal>
              </div>
            ))}
            <div className="au-dd-mid" aria-hidden="true">
              <i className="au-dd-line" />
              <b className="au-dd-gem" />
              <span className="au-dd-medal">
                <strong>{day}</strong>
                <small>{monthShort}</small>
                <small>{year}</small>
              </span>
              <b className="au-dd-gem" />
              <i className="au-dd-line" />
            </div>
          </div>
        </div>
      ) : activeLayout === "linked-icons" ? (
        <div className="au-vx au-li">
          {renderHead()}
          <div className="au-li-row">
            {cards.map((item, index) => (
              <Reveal key={`au-li-${index}`} className="au-li-item" delay={`${(index % 2) * 0.15}s`}>
                {renderIcon(index, "au-vx-ico au-li-ico")}
                {renderTitle(item, index)}
                {renderTime(item, index)}
                {renderPlace()}
                {renderDesc(item, index)}
                {renderActions(item, index)}
                <span className="au-li-link" aria-hidden="true">
                  <b />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      ) : activeLayout === "tilted-tickets" ? (
        <div className="au-vx au-tt">
          {renderHead()}
          <div className="au-tt-row">
            {cards.map((item, index) => (
              <Reveal key={`au-tt-${index}`} className="au-tt-cell" delay={`${(index % 2) * 0.15}s`}>
                <article className="au-tt-card">
                  {renderIcon(index, "au-vx-ico au-tt-ico")}
                  {renderTitle(item, index)}
                  <p className="au-vx-date">{dateLine}</p>
                  <span className="au-vx-rule" aria-hidden="true" />
                  {renderTime(item, index)}
                  {renderPlace()}
                  {renderDesc(item, index)}
                  {renderActions(item, index)}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="au-wrap au-center">
          <Reveal>
            <p className="au-eyebrow">{field("weekday", "au-eyebrow")}</p>
          </Reveal>
          <Reveal>
            <h2 className="au-h2">{field("programTitle", "au-h2")}</h2>
          </Reveal>
          <div className="au-cards">
            {cards.map((item, index) => (
              <Reveal key={`au-vn-${index}`} delay={`${index * 0.2}s`} className="au-card">
                <div className="au-card-in">
                  <EventIcon kind={index % 2 === 0 ? "ring" : "glass"} />
                  <h3>
                    <EditableField
                      value={item.title}
                      editable={editing}
                      maxLength={PROGRAM_ITEM_MAX.title}
                      onCommit={(value) => onCommitItem(index, "title", value)}
                    />
                  </h3>
                  <p className="au-eyebrow au-card-date">{dateLine}</p>
                  <div className="au-card-time">
                    <EditableField
                      value={item.time}
                      editable={editing}
                      maxLength={PROGRAM_ITEM_MAX.time}
                      onCommit={(value) => onCommitItem(index, "time", value)}
                    />
                  </div>
                  <p>
                    {venueName}
                    <br />
                    {venueCity}
                  </p>
                  <p className="au-card-desc">
                    <EditableField
                      value={item.description}
                      editable={editing}
                      multiline
                      maxLength={PROGRAM_ITEM_MAX.description}
                      onCommit={(value) => onCommitItem(index, "description", value)}
                    />
                  </p>
                  {renderButton(item)}
                  {renderLinkEditor(item, index)}
                  {renderRemove(index)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {editing && cards.length < MAX_PROGRAM_ITEMS ? (
        <button type="button" className="au-add" onClick={onAddItem}>
          Add event
        </button>
      ) : null}
    </section>
  );
}
