"use client";

import { useRef, useState, type ReactNode } from "react";
import LayoutPicker, {
  MEET_COUPLE_LAYOUTS,
  normalizeLayoutId,
  type MeetCoupleLayout,
} from "@/components/templates/royal/LayoutPicker";
import ImageCropModal from "@/components/templates/shared/ImageCropModal";
import type { ImageSlot } from "@/lib/api";

export type { MeetCoupleLayout };

type PortraitSlot = Extract<ImageSlot, "groom" | "bride">;

function Portrait({
  src,
  alt,
  editing,
  onPick,
  label,
}: {
  src: string;
  alt: string;
  editing: boolean;
  onPick: () => void;
  label: string;
}) {
  return (
    <div
      className={`rr-portrait ${editing ? "is-editable" : ""}`}
      role={editing ? "button" : undefined}
      tabIndex={editing ? 0 : undefined}
      onClick={() => editing && onPick()}
      onKeyDown={(event) => {
        if (editing && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onPick();
        }
      }}
      aria-label={editing ? `Change ${label} portrait` : undefined}
    >
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <span className="rr-portrait-placeholder font-caps">Add portrait</span>
      )}
      {editing ? <span className="rr-portrait-hint font-caps">Change photo</span> : null}
    </div>
  );
}

export default function RoyalMeetCouple({
  groomName,
  brideName,
  groomSrc,
  brideSrc,
  editing,
  layout,
  onChangeImage,
  onLayoutChange,
  field,
}: {
  groomName: string;
  brideName: string;
  groomSrc: string;
  brideSrc: string;
  editing: boolean;
  layout?: string;
  onChangeImage: (slot: PortraitSlot, file: File) => void;
  onLayoutChange?: (layout: MeetCoupleLayout) => void;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
}) {
  const groomInputRef = useRef<HTMLInputElement>(null);
  const brideInputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState("");
  const [cropSlot, setCropSlot] = useState<PortraitSlot | null>(null);
  const activeLayout = normalizeLayoutId(layout, MEET_COUPLE_LAYOUTS, "classic");
  const cropAspect = activeLayout === "oval" ? 1 : 4 / 5;

  function beginCrop(slot: PortraitSlot, file: File) {
    const preview = URL.createObjectURL(file);
    setCropSlot(slot);
    setCropSrc(preview);
  }

  function closeCrop() {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc);
    }
    setCropSrc("");
    setCropSlot(null);
  }

  async function saveCrop(file: File) {
    if (!cropSlot) return;
    onChangeImage(cropSlot, file);
    closeCrop();
  }

  return (
    <section
      id="couple"
      className="rr-section rr-couple"
      style={{ color: "#e7d3a4" }}
    >
      <div className="rr-section-inner">
        <p className="rr-eyebrow font-caps" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
          The couple
        </p>
        <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
          {field("meetCoupleTitle", "rr-script-title font-names text-[#e7d3a4]")}
        </h2>
        <p className="rr-section-intro font-invite-serif" style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}>
          {field("meetCoupleIntro", "rr-section-intro font-invite-serif text-[#f3e8cd]", true)}
        </p>

        {editing && onLayoutChange ? (
          <LayoutPicker
            options={MEET_COUPLE_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Couple"
          />
        ) : null}

        <div className={`rr-couple-grid is-${activeLayout}`}>
          <article className="rr-person">
            <Portrait
              src={groomSrc}
              alt={groomName}
              editing={editing}
              label="groom"
              onPick={() => groomInputRef.current?.click()}
            />
            <p className="rr-person-label font-caps">{field("groomLabel", "rr-person-label font-caps")}</p>
            <h3 className="rr-person-name font-names">{field("groomName", "rr-person-name font-names")}</h3>
            <p className="rr-person-bio font-invite-serif">
              {field("groomBio", "rr-person-bio font-invite-serif", true)}
            </p>
            <p className="rr-person-detail font-caps">
              {field("groomDetail", "rr-person-detail font-caps", true)}
            </p>
            {editing ? (
              <input
                ref={groomInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) beginCrop("groom", file);
                  event.target.value = "";
                }}
              />
            ) : null}
          </article>

          {activeLayout !== "stacked" ? (
            <div className="rr-couple-ampersand font-invite-serif" aria-hidden="true">
              &
            </div>
          ) : (
            <div className="rr-couple-divider" aria-hidden="true">
              <span />
              <em className="font-invite-serif">&</em>
              <span />
            </div>
          )}

          <article className="rr-person">
            <Portrait
              src={brideSrc}
              alt={brideName}
              editing={editing}
              label="bride"
              onPick={() => brideInputRef.current?.click()}
            />
            <p className="rr-person-label font-caps">{field("brideLabel", "rr-person-label font-caps")}</p>
            <h3 className="rr-person-name font-names">{field("brideName", "rr-person-name font-names")}</h3>
            <p className="rr-person-bio font-invite-serif">
              {field("brideBio", "rr-person-bio font-invite-serif", true)}
            </p>
            <p className="rr-person-detail font-caps">
              {field("brideDetail", "rr-person-detail font-caps", true)}
            </p>
            {editing ? (
              <input
                ref={brideInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) beginCrop("bride", file);
                  event.target.value = "";
                }}
              />
            ) : null}
          </article>
        </div>
      </div>

      <ImageCropModal
        open={Boolean(cropSrc && cropSlot)}
        imageSrc={cropSrc}
        aspect={cropAspect}
        title={cropSlot === "bride" ? "Crop bride photo" : "Crop groom photo"}
        confirmLabel="Save & upload"
        onCancel={closeCrop}
        onConfirm={saveCrop}
      />
    </section>
  );
}
