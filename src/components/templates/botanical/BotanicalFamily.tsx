"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_FAMILY_LAYOUTS,
  type BotanicalFamilyLayout,
} from "@/components/templates/botanical/botanical-layouts";

type FamilySlot = "parentsLeft" | "groom" | "bride" | "parentsRight";

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

  function Portrait({
    slot,
    url,
    title,
    subtitle,
  }: {
    slot: FamilySlot;
    url: string;
    title: ReactNode;
    subtitle: ReactNode;
  }) {
    return (
      <div className="bs-family-person">
        <div
          className={`bs-family-photo${editing ? " is-editable" : ""}`}
          role={editing ? "button" : undefined}
          tabIndex={editing ? 0 : undefined}
          aria-label={editing ? `Change ${slot} photo` : undefined}
          onClick={() => editing && refs[slot].current?.click()}
          onKeyDown={(event) => {
            if (editing && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              refs[slot].current?.click();
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
        <h3 className="bs-family-name">{title}</h3>
        <p className="bs-family-role">{subtitle}</p>
        {editing ? (
          <input
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
        ) : null}
      </div>
    );
  }

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

      <Reveal>
        <FlourishRule>
          <h2 className="bs-section-eyebrow">{field("brideParentsLabel", "bs-section-eyebrow")}</h2>
        </FlourishRule>
      </Reveal>

      <div className="bs-family-row">
        <Portrait
          slot="parentsLeft"
          url={parentLeftUrl}
          title={field("amenityOneLabel", "bs-family-name")}
          subtitle={field("amenityOneDetail", "bs-family-role")}
        />
        <Portrait
          slot="groom"
          url={groomUrl}
          title={field("groomName", "bs-family-name")}
          subtitle={field("groomLabel", "bs-family-role")}
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
        />
        <Portrait
          slot="parentsRight"
          url={parentRightUrl}
          title={field("amenityTwoLabel", "bs-family-name")}
          subtitle={field("amenityTwoDetail", "bs-family-role")}
        />
      </div>
    </section>
  );
}
