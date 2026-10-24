"use client";

import { Fragment, useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_FAMILY_LAYOUTS,
  type BotanicalFamilyLayout,
} from "@/components/templates/botanical/botanical-layouts";

type FamilySlot = "parentsLeft" | "groom" | "bride" | "parentsRight";

function FamilyGlyph({ index }: { index: number }) {
  const kind = index % 4;
  if (kind === 1) {
    return (
      <svg className="bs-fam-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M4.4 7.2a4.2 4.2 0 0 1 6 0L12 8.8l1.6-1.6a4.2 4.2 0 1 1 6 6L12 20.2 4.4 13.2a4.2 4.2 0 0 1 0-6z"
          strokeLinejoin="round"
          strokeWidth="1.45"
        />
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg className="bs-fam-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="9.2" cy="12" r="4.1" strokeWidth="1.45" />
        <circle cx="14.8" cy="12" r="4.1" strokeWidth="1.45" />
      </svg>
    );
  }
  return (
    <svg className="bs-fam-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect height="9.2" rx="1" strokeWidth="1.45" width="13.2" x="5.4" y="9.2" />
      <path d="M5.4 12h13.2M12 9.2v9.2" strokeWidth="1.45" />
      <path d="M12 9.2c-1.6-2.3-3.6-1.5-3.6.2 0 1.5 1.8 1.7 3.6.1z" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M12 9.2c1.6-2.3 3.6-1.5 3.6.2 0 1.5-1.8 1.7-3.6.1z" strokeLinejoin="round" strokeWidth="1.45" />
    </svg>
  );
}

function FamilyDiamond() {
  return <span className="bs-fam-diamond" aria-hidden="true" />;
}

function PolaroidSprig() {
  return (
    <svg className="bs-fam-sprig" viewBox="0 0 40 70" fill="currentColor" aria-hidden="true">
      <path d="M20 68c0-18 8-28 14-40" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M28 36c6-2 10 1 11 6-6 1-10-1-11-6z" opacity="0.75" />
      <path d="M24 48c5-1 8 2 8 6-5 0-8-2-8-6z" opacity="0.65" />
      <path d="M18 28c-6-3-10 0-11 5 6 1 10-1 11-5z" opacity="0.7" />
    </svg>
  );
}

export default function BotanicalFamily({
  editing,
  layout,
  parentLeftUrl,
  parentRightUrl,
  groomUrl,
  brideUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  parentLeftUrl: string;
  parentRightUrl: string;
  groomUrl: string;
  brideUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: FamilySlot, file: File) => void;
  onLayoutChange?: (layout: BotanicalFamilyLayout) => void;
}) {
  const refs = {
    parentsLeft: useRef<HTMLInputElement>(null),
    groom: useRef<HTMLInputElement>(null),
    bride: useRef<HTMLInputElement>(null),
    parentsRight: useRef<HTMLInputElement>(null),
  };
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_FAMILY_LAYOUTS, "party-row");
  const people: Array<{
    slot: FamilySlot;
    url: string;
    title: ReactNode;
    subtitle: ReactNode;
  }> = [
    {
      slot: "parentsLeft",
      url: parentLeftUrl,
      title: field("amenityOneLabel", "bs-family-name"),
      subtitle: field("amenityOneDetail", "bs-family-role"),
    },
    {
      slot: "groom",
      url: groomUrl,
      title: field("groomName", "bs-family-name"),
      subtitle: field("groomLabel", "bs-family-role"),
    },
    {
      slot: "bride",
      url: brideUrl,
      title: field("brideName", "bs-family-name"),
      subtitle: field("brideLabel", "bs-family-role"),
    },
    {
      slot: "parentsRight",
      url: parentRightUrl,
      title: field("amenityTwoLabel", "bs-family-name"),
      subtitle: field("amenityTwoDetail", "bs-family-role"),
    },
  ];

  function openSlot(slot: FamilySlot) {
    if (editing) refs[slot].current?.click();
  }

  function Portrait({
    slot,
    url,
    title,
    subtitle,
    index,
    variant = "plain",
    hideMeta = false,
    className = "",
  }: {
    slot: FamilySlot;
    url: string;
    title: ReactNode;
    subtitle: ReactNode;
    index: number;
    variant?: "plain" | "arch" | "circle" | "hex" | "polaroid" | "note";
    hideMeta?: boolean;
    className?: string;
  }) {
    return (
      <article className={`bs-family-person is-${variant} ${className}`.trim()}>
        <div className={`bs-fam-frame is-${variant}`}>
          {variant === "circle" ? (
            <span className="bs-fam-num">{String(index + 1).padStart(2, "0")}</span>
          ) : null}
          <div
            className={`bs-family-photo${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? `Change ${slot} photo` : undefined}
            onClick={() => openSlot(slot)}
            onKeyDown={(event) => {
              if (editing && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                openSlot(slot);
              }
            }}
          >
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" />
            ) : (
              <span className="bs-photo-placeholder">Add</span>
            )}
          </div>
        </div>
        {variant !== "plain" && !hideMeta ? <FamilyGlyph index={index} /> : null}
        {hideMeta ? null : (
          <>
            <h3 className="bs-family-name">{title}</h3>
            <p className="bs-family-role">{subtitle}</p>
          </>
        )}
      </article>
    );
  }

  const fileInputs = (["parentsLeft", "groom", "bride", "parentsRight"] as const).map((slot) =>
    editing ? (
      <input
        key={`bs-fam-file-${slot}`}
        ref={refs[slot]}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChangeImage(slot, file);
          event.target.value = "";
        }}
      />
    ) : null
  );

  return (
    <section className="bs-family" data-layout={activeLayout} aria-label="Family and wedding party">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_FAMILY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Family"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-fam-head">
        <Reveal>
          <FlourishRule>
            <h2 className="bs-section-eyebrow">{field("brideParentsLabel", "bs-section-eyebrow")}</h2>
          </FlourishRule>
        </Reveal>
        <p className="bs-fam-lead">{field("amenityThreeDetail", "bs-fam-lead", true)}</p>
      </div>

      {activeLayout === "party-row" ? (
        <div className="bs-family-row">
          <Portrait
            slot="parentsLeft"
            url={parentLeftUrl}
            title={field("amenityOneLabel", "bs-family-name")}
            subtitle={field("amenityOneDetail", "bs-family-role")}
            index={0}
          />
          <Portrait
            slot="groom"
            url={groomUrl}
            title={field("groomName", "bs-family-name")}
            subtitle={field("groomLabel", "bs-family-role")}
            index={1}
          />
          <Reveal className="bs-family-center">
            <svg className="bs-family-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <p className="bs-script bs-family-withlove">{field("amenityThreeLabel", "bs-script bs-family-withlove")}</p>
            <p className="bs-family-duo">
              {field("groomName", "bs-family-duo")}
              <span> & </span>
              {field("brideName", "bs-family-duo")}
            </p>
          </Reveal>
          <Portrait
            slot="bride"
            url={brideUrl}
            title={field("brideName", "bs-family-name")}
            subtitle={field("brideLabel", "bs-family-role")}
            index={2}
          />
          <Portrait
            slot="parentsRight"
            url={parentRightUrl}
            title={field("amenityTwoLabel", "bs-family-name")}
            subtitle={field("amenityTwoDetail", "bs-family-role")}
            index={3}
          />
        </div>
      ) : null}

      {activeLayout === "arch-cards" ? (
        <div className="bs-fam-arches">
          {people.map((person, index) => (
            <Reveal key={person.slot}>
              <Portrait {...person} index={index} variant="arch" />
            </Reveal>
          ))}
        </div>
      ) : null}

      {activeLayout === "numbered-circles" ? (
        <div className="bs-fam-orbs">
          {people.map((person, index) => (
            <Fragment key={person.slot}>
              {index > 0 ? <FamilyDiamond /> : null}
              <Reveal>
                <Portrait {...person} index={index} variant="circle" />
              </Reveal>
            </Fragment>
          ))}
        </div>
      ) : null}

      {activeLayout === "polaroid-cluster" ? (
        <div className="bs-fam-polaroids">
          <Reveal>
            <Portrait {...people[0]} index={0} variant="polaroid" className="is-lead" />
          </Reveal>
          <Reveal className="bs-fam-cluster">
            <Portrait {...people[1]} index={1} variant="polaroid" hideMeta className="is-tilt-a" />
            <Portrait
              slot="groom"
              url={groomUrl}
              title={null}
              subtitle={null}
              index={1}
              variant="polaroid"
              hideMeta
              className="is-tilt-b"
            />
            <PolaroidSprig />
            <div className="bs-fam-cluster-meta">
              <FamilyGlyph index={1} />
              <h3 className="bs-family-name">{field("groomName", "bs-family-name")}</h3>
              <p className="bs-family-role">{field("groomLabel", "bs-family-role")}</p>
            </div>
          </Reveal>
          <Reveal>
            <Portrait {...people[2]} index={2} variant="polaroid" className="is-lead" />
          </Reveal>
          <Reveal>
            <Portrait {...people[3]} index={3} variant="note" />
          </Reveal>
        </div>
      ) : null}

      {activeLayout === "hex-portraits" ? (
        <div className="bs-fam-hexes">
          {people.map((person, index) => (
            <Fragment key={person.slot}>
              {index > 0 ? <FamilyDiamond /> : null}
              <Reveal>
                <Portrait {...people[index]} index={index} variant="hex" />
              </Reveal>
            </Fragment>
          ))}
        </div>
      ) : null}

      {fileInputs}
    </section>
  );
}
