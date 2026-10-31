"use client";

import { useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { DiamondRule, Reveal } from "@/components/templates/cream/CreamDecor";
import { CreamLeafSprig } from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_DRESS_LAYOUTS,
  type CreamDressLayout,
} from "@/components/templates/cream/cream-layouts";

type Swatch = { color: string; name: string };
type SwatchVariant = "petal" | "circle" | "arch" | "strip";
type TravelIcon = "stay" | "shuttle" | "parking" | "airport";

const DEFAULT_SWATCHES: Swatch[] = [
  { name: "Ivory", color: "#fbf7f0" },
  { name: "Sage", color: "#a8ae96" },
  { name: "Dusty rose", color: "#d8b8ad" },
  { name: "Champagne", color: "#c6a779" },
  { name: "Cocoa", color: "#7a5f4c" },
];

const TRAVEL: { label: string; text: string; icon: TravelIcon }[] = [
  { label: "amenityOneLabel", text: "amenityOneDetail", icon: "stay" },
  { label: "amenityTwoLabel", text: "amenityTwoDetail", icon: "shuttle" },
  { label: "destinationLabel", text: "addressShort", icon: "parking" },
  { label: "amenityThreeDetail", text: "copyAddressLabel", icon: "airport" },
];

const MAX_DRESS_COLORS = 8;
const NAME_MAX = 20;
const NEW_COLOR = "#c9a29b";
const HEX = /^#[0-9a-f]{6}$/i;

function cleanName(value: string) {
  return value.replace(/[|,"']/g, " ").replace(/\s+/g, " ").trim().slice(0, NAME_MAX);
}

/** Stored as "#hex|Name,#hex|Name"; the same format other templates use for dressColors. */
function parseSwatches(value?: string): Swatch[] {
  return (value || "")
    .split(",")
    .map((entry) => {
      const [color = "", ...rest] = entry.split("|");
      return { color: color.trim(), name: cleanName(rest.join(" ")) };
    })
    .filter((swatch) => HEX.test(swatch.color))
    .slice(0, MAX_DRESS_COLORS);
}

function serialize(list: Swatch[]) {
  return list
    .slice(0, MAX_DRESS_COLORS)
    .map((swatch) => (swatch.name ? `${swatch.color}|${swatch.name}` : swatch.color));
}

function TravelGlyph({ icon }: { icon: TravelIcon }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {icon === "stay" ? (
          <>
            <path d="M4 25V9M4 20h24v5M28 20v-4a3 3 0 0 0-3-3H14v7" />
            <circle cx="9" cy="15.5" r="2.4" />
          </>
        ) : null}
        {icon === "shuttle" ? (
          <>
            <rect x="6" y="5" width="20" height="19" rx="3" />
            <path d="M6 15h20M10 24v3M22 24v3M12 9h8" />
            <circle cx="10.5" cy="19.5" r="1" />
            <circle cx="21.5" cy="19.5" r="1" />
          </>
        ) : null}
        {icon === "parking" ? (
          <>
            <rect x="5" y="5" width="22" height="22" rx="5" />
            <path d="M13 23V10h4.5a3.8 3.8 0 0 1 0 7.6H13" />
          </>
        ) : null}
        {icon === "airport" ? (
          <path d="M14.5 27l2.2-1.2v-6.6l9.3 3.6v-2.6l-9.3-6V7.4a1.7 1.7 0 0 0-3.4 0v6.8l-9.3 6v2.6l9.3-3.6v6.6l2.2 1.2" />
        ) : null}
      </g>
    </svg>
  );
}

export default function CreamDress({
  editing,
  layout,
  colors,
  field,
  onLayoutChange,
  onColorsChange,
}: {
  editing: boolean;
  layout?: string;
  colors?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamDressLayout) => void;
  onColorsChange?: (colors: string[]) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_DRESS_LAYOUTS, "two-column");
  const [draft, setDraft] = useState<{ index: number; color: string } | null>(null);

  const custom = parseSwatches(colors);
  const swatches = custom.length ? custom : DEFAULT_SWATCHES;
  const canEdit = editing && Boolean(onColorsChange);
  const canAdd = canEdit && swatches.length < MAX_DRESS_COLORS;

  function save(next: Swatch[]) {
    setDraft(null);
    onColorsChange?.(serialize(next));
  }

  /** Saves when the native picker closes; live input only previews. */
  function bindChange(onPick: (color: string) => void) {
    return (node: HTMLInputElement | null) => {
      if (!node) return;
      const handle = () => onPick(node.value);
      node.addEventListener("change", handle);
      return () => node.removeEventListener("change", handle);
    };
  }

  function renderChip(swatch: Swatch, index: number) {
    const background = draft?.index === index ? draft.color : swatch.color;
    if (!canEdit) {
      return (
        <span className="ce-sw-chip-wrap">
          <i className="ce-sw-chip" style={{ background }} />
        </span>
      );
    }
    return (
      <span className="ce-sw-chip-wrap">
        <label className="ce-sw-chip is-pick" style={{ background }} title="Change colour">
          <input
            type="color"
            aria-label={`Change colour ${swatch.name || index + 1}`}
            defaultValue={swatch.color}
            ref={bindChange((picked) => {
              const next = swatches.map((item) => ({ ...item }));
              next[index] = { ...next[index], color: picked.toLowerCase() };
              save(next);
            })}
            onChange={(event) => setDraft({ index, color: event.target.value })}
          />
        </label>
        {swatches.length > 1 ? (
          <button
            type="button"
            className="ce-sw-x"
            aria-label={`Remove ${swatch.name || "colour"}`}
            onClick={() => save(swatches.filter((_, i) => i !== index))}
          >
            ×
          </button>
        ) : null}
      </span>
    );
  }

  function renderName(swatch: Swatch, index: number) {
    return (
      <EditableField
        value={swatch.name}
        editable={canEdit}
        className="ce-sw-name"
        maxLength={NAME_MAX}
        onCommit={(value) => {
          const name = cleanName(value);
          if (name === swatch.name) return;
          const next = swatches.map((item) => ({ ...item }));
          next[index] = { ...next[index], name };
          save(next);
        }}
      />
    );
  }

  function renderSwatches(variant: SwatchVariant = "petal") {
    return (
      <>
        <ul className={`ce-sw is-${variant}${canEdit ? " is-editing" : ""}`}>
          {swatches.map((swatch, index) => (
            <li key={`${index}-${swatch.color}`} className="ce-sw-item">
              {renderChip(swatch, index)}
              {renderName(swatch, index)}
            </li>
          ))}
          {canAdd ? (
            <li className="ce-sw-item is-add">
              <span className="ce-sw-chip-wrap">
                <label className="ce-sw-chip is-add" title="Add colour">
                  <span aria-hidden="true">+</span>
                  <input
                    type="color"
                    aria-label="Add colour"
                    defaultValue={NEW_COLOR}
                    ref={bindChange((picked) =>
                      save([...swatches, { color: picked.toLowerCase(), name: "" }])
                    )}
                  />
                </label>
              </span>
              <span className="ce-sw-name is-add-label">Add colour</span>
            </li>
          ) : null}
        </ul>
        {canEdit ? (
          <p className="ce-sw-hint">Tap a swatch to change its colour. Names are editable too.</p>
        ) : null}
      </>
    );
  }

  function renderDressHead(className = "") {
    return (
      <Reveal className={`ce-dx-head ${className}`.trim()}>
        <p className="ce-dx-eyebrow">{field("venueLabel")}</p>
        <h2 className="ce-dx-title">{field("dressCode")}</h2>
        <DiamondRule className="ce-dx-rule" />
        <p className="ce-dx-note">{field("storyText", undefined, true)}</p>
      </Reveal>
    );
  }

  function renderTravelHead(className = "") {
    return (
      <div className={`ce-dx-head ${className}`.trim()}>
        <p className="ce-dx-eyebrow">{field("locationEyebrow")}</p>
        <h2 className="ce-dx-title is-sm">
          Getting <em>here</em>
        </h2>
      </div>
    );
  }

  function renderTravelText(item: (typeof TRAVEL)[number]) {
    return (
      <>
        <h3 className="ce-dx-tr-label">{field(item.label)}</h3>
        <p className="ce-dx-tr-text">{field(item.text, undefined, true)}</p>
      </>
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "palette-card":
        return (
          <div className="ce-w ce-dx ce-dx-pc">
            {renderDressHead("is-center")}
            <Reveal className="ce-dx-pc-card" delay="0.1s">
              <CreamLeafSprig className="ce-dx-pc-sprig is-left" />
              <CreamLeafSprig className="ce-dx-pc-sprig is-right" />
              <p className="ce-dx-pc-label">{field("dressPaletteLabel")}</p>
              {renderSwatches("circle")}
            </Reveal>
            <Reveal className="ce-dx-pc-travel">
              {renderTravelHead("is-center")}
              <ul className="ce-dx-icons">
                {TRAVEL.map((item) => (
                  <li key={item.icon}>
                    <span className="ce-dx-badge" aria-hidden="true">
                      <TravelGlyph icon={item.icon} />
                    </span>
                    {renderTravelText(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        );
      case "arch-ticket":
        return (
          <div className="ce-w ce-dx ce-dx-at">
            <div className="ce-dx-at-top">
              {renderDressHead()}
              <Reveal className="ce-dx-at-arches" delay="0.1s">
                {renderSwatches("arch")}
              </Reveal>
            </div>
            <Reveal className="ce-dx-ticket">
              <div className="ce-dx-ticket-head">
                {renderTravelHead()}
                <span className="ce-dx-ticket-stamp" aria-hidden="true">
                  <TravelGlyph icon="airport" />
                </span>
              </div>
              <ol className="ce-dx-ticket-row">
                {TRAVEL.map((item) => (
                  <li key={item.icon}>
                    <span className="ce-dx-ticket-icon" aria-hidden="true">
                      <TravelGlyph icon={item.icon} />
                    </span>
                    {renderTravelText(item)}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        );
      case "paint-strip":
        return (
          <div className="ce-w ce-dx ce-dx-ps">
            <Reveal className="ce-dx-ps-panel is-light">
              {renderDressHead()}
              <div className="ce-dx-ps-strip">{renderSwatches("strip")}</div>
            </Reveal>
            <Reveal className="ce-dx-ps-panel is-dark" delay="0.1s">
              {renderTravelHead()}
              <ol className="ce-dx-ps-list">
                {TRAVEL.map((item, index) => (
                  <li key={item.icon}>
                    <span className="ce-dx-ps-num">{String(index + 1).padStart(2, "0")}</span>
                    <div>{renderTravelText(item)}</div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        );
      default:
        return (
          <div className="ce-w ce-two">
            <div>
              <p className="ce-eyebrow">{field("venueLabel", "ce-eyebrow")}</p>
              <Reveal>
                <h2 className="ce-h2">{field("dressCode", "ce-h2")}</h2>
              </Reveal>
              <Reveal>
                <p className="ce-soft ce-dress-note">{field("storyText", "ce-soft", true)}</p>
              </Reveal>
              <Reveal>{renderSwatches()}</Reveal>
            </div>

            <div>
              <p className="ce-eyebrow">{field("locationEyebrow", "ce-eyebrow")}</p>
              <Reveal>
                <h2 className="ce-h2 ce-h2-sm">
                  Getting <em>here</em>
                </h2>
              </Reveal>
              <div className="ce-tr">
                {TRAVEL.map((item) => (
                  <div key={item.icon}>
                    <h3>{field(item.label, "ce-tr-label")}</h3>
                    <p className="ce-soft">{field(item.text, "ce-soft", true)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <section className="ce-dress" id="dress" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_DRESS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Dress & Travel"
          className="ce-layout-picker"
        />
      ) : null}

      {renderBody()}
    </section>
  );
}
