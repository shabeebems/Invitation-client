"use client";

import { Fragment, useState, type CSSProperties, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_DRESS_LAYOUTS,
  type AureliaDressLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

type Swatch = { color: string; name: string };
type Slot = number | "add";

const THEME_COUNT = 4;
const MAX_DRESS_COLORS = 10;
const NAME_MAX = 20;
const STRAND_ROW = 5;
const NEW_COLOR = "#c9a29b";
const HEX = /^#[0-9a-f]{6}$/i;
const CORNERS = ["tl", "tr", "bl", "br"] as const;

function cleanName(value: string) {
  return value.replace(/[|,"']/g, " ").replace(/\s+/g, " ").trim().slice(0, NAME_MAX);
}

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

function toHex(value: string) {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return NEW_COLOR;
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value.trim();
  return HEX.test(ctx.fillStyle) ? ctx.fillStyle : NEW_COLOR;
}

function themeSwatches(from: Element): Swatch[] {
  const style = getComputedStyle(from);
  return Array.from({ length: THEME_COUNT }, (_, i) => ({
    color: toHex(style.getPropertyValue(`--au-dress-${i + 1}`)),
    name: cleanName(style.getPropertyValue(`--au-dress-${i + 1}-name`)),
  }));
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 13.7 10.3 22.5 12 13.7 13.7 12 22.5 10.3 13.7 1.5 12 10.3 10.3Z" />
    </svg>
  );
}

export default function AureliaDress({
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
  onLayoutChange?: (layout: AureliaDressLayout) => void;
  onColorsChange?: (colors: string[]) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_DRESS_LAYOUTS, "ringed-swatches");
  const [draft, setDraft] = useState<{ index: number; color: string } | null>(null);

  const custom = parseSwatches(colors);
  const isCustom = custom.length > 0;
  const count = isCustom ? custom.length : THEME_COUNT;
  const canEdit = editing && Boolean(onColorsChange);
  const canAdd = canEdit && count < MAX_DRESS_COLORS;
  const indices = Array.from({ length: count }, (_, i) => i);
  const slots: Slot[] = canAdd ? [...indices, "add"] : indices;

  function current(from: Element) {
    return isCustom ? custom.map((swatch) => ({ ...swatch })) : themeSwatches(from);
  }

  function save(next: Swatch[]) {
    setDraft(null);
    onColorsChange?.(serialize(next));
  }

  function bindChange(onPick: (color: string, node: HTMLInputElement) => void) {
    return (node: HTMLInputElement | null) => {
      if (!node) return;
      const handle = () => onPick(node.value, node);
      node.addEventListener("change", handle);
      return () => node.removeEventListener("change", handle);
    };
  }

  function swatchKey(index: number) {
    return `sw-${index}-${isCustom ? custom[index].color : "theme"}`;
  }

  function itemStyle(index: number) {
    if (!isCustom) {
      return { "--dx-name": `var(--au-dress-${index + 1}-name)` } as CSSProperties;
    }
    return canEdit ? ({ "--dx-name": '"Name"' } as CSSProperties) : undefined;
  }

  function renderChip(index: number) {
    const background =
      draft?.index === index
        ? draft.color
        : isCustom
          ? custom[index].color
          : `var(--au-dress-${index + 1})`;

    if (!canEdit) {
      return (
        <span className="au-dx-chip-wrap">
          <i className="au-dx-chip" style={{ background }} />
        </span>
      );
    }

    return (
      <span className="au-dx-chip-wrap">
        <label className="au-dx-chip is-pick" style={{ background }} title="Change colour">
          <input
            type="color"
            aria-label={`Change colour ${index + 1}`}
            ref={bindChange((picked, node) => {
              const next = current(node);
              next[index] = { ...next[index], color: picked };
              save(next);
            })}
            onClick={(event) => {
              event.currentTarget.value = current(event.currentTarget)[index]?.color || NEW_COLOR;
            }}
            onChange={(event) => setDraft({ index, color: event.target.value })}
          />
        </label>
        {count > 1 ? (
          <button
            type="button"
            className="au-dx-x"
            aria-label={`Remove colour ${index + 1}`}
            onClick={(event) =>
              save(current(event.currentTarget).filter((_, i) => i !== index))
            }
          >
            ×
          </button>
        ) : null}
      </span>
    );
  }

  function renderName(index: number) {
    const value = isCustom ? custom[index].name : "";
    return (
      <EditableField
        value={value}
        editable={canEdit}
        className="au-dx-name"
        maxLength={NAME_MAX}
        onCommit={(next) => {
          const name = cleanName(next);
          if (name === value) return;
          const list = current(document.getElementById("dress") || document.documentElement);
          if (!list[index] || list[index].name === name) return;
          list[index] = { ...list[index], name };
          save(list);
        }}
      />
    );
  }

  function renderItem(index: number, className: string, decor?: ReactNode) {
    const blank = isCustom && canEdit && !custom[index].name;
    return (
      <li
        key={swatchKey(index)}
        className={`au-dx-item ${className}${blank ? " is-blank" : ""}`}
        style={itemStyle(index)}
      >
        {decor}
        {renderChip(index)}
        {renderName(index)}
      </li>
    );
  }

  function renderAdd(className: string, label?: string, decor?: ReactNode) {
    return (
      <li key="add" className={`au-dx-item is-add ${className}`}>
        {decor}
        <span className="au-dx-chip-wrap">
          <label className="au-dx-chip is-add" title="Add colour">
            <span aria-hidden="true">+</span>
            <input
              type="color"
              aria-label="Add colour"
              defaultValue={NEW_COLOR}
              ref={bindChange((picked, node) => save([...current(node), { color: picked, name: "" }]))}
            />
          </label>
        </span>
        {label ? <span className="au-dx-name is-add-label">{label}</span> : null}
      </li>
    );
  }

  function renderSlot(slot: Slot, className: string, addLabel?: string, decor?: ReactNode) {
    return slot === "add" ? renderAdd(className, addLabel, decor) : renderItem(slot, className, decor);
  }

  function renderEyebrow(modifier = "", trail = false) {
    return (
      <p className={`au-eyebrow au-dx-eyebrow ${modifier}`.trim()}>
        {field("venueLabel", "au-eyebrow")}
        {trail ? (
          <span className="au-dx-trail" aria-hidden="true">
            <b />
          </span>
        ) : null}
      </p>
    );
  }

  function renderTitle() {
    return <h2 className="au-dx-title">{field("dressCode", "au-dx-title-text")}</h2>;
  }

  function renderNote() {
    return <p className="au-dx-note">{field("storyText", "au-dx-note-text", true)}</p>;
  }

  function renderHint() {
    return canEdit ? <p className="au-dx-hint">Tap a colour to change it</p> : null;
  }

  function renderOrnament() {
    return (
      <div className="au-dx-orn" aria-hidden="true">
        <i />
        <SparkleIcon className="au-dx-spark" />
        <i />
      </div>
    );
  }

  function renderCentredHead() {
    return (
      <Reveal className="au-dx-head">
        {renderEyebrow("is-lined")}
        {renderTitle()}
        {renderNote()}
      </Reveal>
    );
  }

  const corners = CORNERS.map((corner) => (
    <span key={corner} className={`au-ft-corner is-${corner}`} aria-hidden="true" />
  ));

  const strandRows: Slot[][] = [];
  for (let i = 0; i < slots.length; i += STRAND_ROW) {
    strandRows.push(slots.slice(i, i + STRAND_ROW));
  }

  return (
    <section className="au-sec au-dress" id="dress" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_DRESS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Dress"
          className="au-layout-picker"
        />
      ) : null}

      {activeLayout === "palette-legend" ? (
        <div className="au-dx au-pl">
          <Reveal className="au-pl-copy">
            {renderEyebrow("is-trail", true)}
            {renderTitle()}
            {renderNote()}
          </Reveal>
          <span className="au-pl-rule" aria-hidden="true" />
          <Reveal className="au-pl-side" delay="0.15s">
            <p className="au-pl-label">{field("dressPaletteLabel", "au-pl-label-text")}</p>
            <ul className={`au-pl-list${slots.length > 6 ? " is-long" : ""}`}>
              {slots.map((slot) => renderSlot(slot, "au-pl-item", "Add colour"))}
            </ul>
            {renderHint()}
          </Reveal>
        </div>
      ) : activeLayout === "framed-tiles" ? (
        <div className="au-dx au-ft">
          {renderCentredHead()}
          <Reveal delay="0.15s">
            <ul className="au-ft-row">
              {slots.map((slot) => renderSlot(slot, "au-ft-tile", "Add", corners))}
            </ul>
          </Reveal>
          <Reveal delay="0.25s">
            {renderOrnament()}
            {renderHint()}
          </Reveal>
        </div>
      ) : activeLayout === "linked-strand" ? (
        <div className="au-dx au-ls">
          <Reveal className="au-ls-head">
            {renderEyebrow()}
            <div className="au-ls-title-row">
              {renderTitle()}
              <span className="au-dx-trail is-title" aria-hidden="true">
                <b />
              </span>
            </div>
            {renderNote()}
          </Reveal>
          <Reveal className="au-ls-strand" delay="0.15s">
            {strandRows.map((row, rowIndex) => (
              <ul key={`row-${rowIndex}`} className="au-ls-row">
                {row.map((slot, k) => (
                  <Fragment key={slot === "add" ? "add" : swatchKey(slot)}>
                    {k > 0 ? <li className="au-ls-link" aria-hidden="true" /> : null}
                    {renderSlot(slot, "au-ls-item")}
                  </Fragment>
                ))}
              </ul>
            ))}
          </Reveal>
          {canEdit ? (
            <div className="au-ls-foot">
              {renderHint()}
              <i className="au-ls-tick" aria-hidden="true" />
              <i className="au-ls-line" aria-hidden="true" />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="au-dx au-rs">
          {renderCentredHead()}
          <Reveal delay="0.15s">
            <ul className="au-rs-row">{slots.map((slot) => renderSlot(slot, "au-rs-item"))}</ul>
          </Reveal>
          <Reveal delay="0.25s">
            {renderOrnament()}
            {renderHint()}
          </Reveal>
        </div>
      )}
    </section>
  );
}
