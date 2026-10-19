"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_COUPLE_LAYOUTS,
  type CreamCoupleLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamCouple({
  editing,
  layout,
  brideUrl,
  groomUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  brideUrl: string;
  groomUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: "bride" | "groom", file: File) => void;
  onLayoutChange?: (layout: CreamCoupleLayout) => void;
}) {
  const brideRef = useRef<HTMLInputElement>(null);
  const groomRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_COUPLE_LAYOUTS, "offset-portraits");

  function Portrait({
    slot,
    url,
    nameKey,
    labelKey,
    bioKey,
    colors,
    inputRef,
  }: {
    slot: "bride" | "groom";
    url: string;
    nameKey: string;
    labelKey: string;
    bioKey: string;
    colors: [string, string];
    inputRef: RefObject<HTMLInputElement | null>;
  }) {
    return (
      <article className="ce-person">
        <Reveal>
          <div
            className={`ce-person-ph${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? `Change ${slot} photo` : undefined}
            onClick={() => editing && inputRef.current?.click()}
            onKeyDown={(e) => {
              if (editing && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
          >
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" />
            ) : (
              <CreamPh colors={colors} label={slot} />
            )}
            {editing ? <span className="ce-photo-hint">Change photo</span> : null}
          </div>
          <small>{field(labelKey, "ce-person-role")}</small>
          <h3>{field(nameKey, "ce-person-name")}</h3>
          <p className="ce-person-bio">{field(bioKey, "ce-person-bio", true)}</p>
        </Reveal>
        {editing ? (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChangeImage(slot, file);
              e.target.value = "";
            }}
          />
        ) : null}
      </article>
    );
  }

  return (
    <section className="ce-couple" id="couple" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_COUPLE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Couple"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w">
        <p className="ce-eyebrow">{field("meetCoupleTitle", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">{field("storyTitle", "ce-h2")}</h2>
        </Reveal>
        <div className="ce-cp">
          <Portrait
            slot="bride"
            url={brideUrl}
            nameKey="brideName"
            labelKey="brideLabel"
            bioKey="brideBio"
            colors={["#E8D9BF", "#D8B8AD"]}
            inputRef={brideRef}
          />
          <Portrait
            slot="groom"
            url={groomUrl}
            nameKey="groomName"
            labelKey="groomLabel"
            bioKey="groomBio"
            colors={["#A8AE96", "#E8D9BF"]}
            inputRef={groomRef}
          />
        </div>
      </div>
    </section>
  );
}
