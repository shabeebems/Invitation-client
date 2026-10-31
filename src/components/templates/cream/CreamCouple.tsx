"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CreamBlossomCluster,
  CreamBlossomSpray,
  CreamBlossomTwig,
  CreamHeart,
  CreamLeafSprig,
} from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_COUPLE_LAYOUTS,
  type CreamCoupleLayout,
} from "@/components/templates/cream/cream-layouts";

type PhotoSlot = "bride" | "groom" | "couple";
type Person = "bride" | "groom";

const PLACEHOLDER: Record<PhotoSlot, [string, string]> = {
  bride: ["#E8D9BF", "#D8B8AD"],
  groom: ["#A8AE96", "#E8D9BF"],
  couple: ["#E8D9BF", "#C9B79A"],
};

const PERSON_KEYS: Record<Person, { label: string; name: string; bio: string }> = {
  bride: { label: "brideLabel", name: "brideName", bio: "brideBio" },
  groom: { label: "groomLabel", name: "groomName", bio: "groomBio" },
};

/** "Two people, one story" -> ["Two people,", "one story"]. */
function splitTitle(raw: string): [string, string] {
  const text = raw.trim();
  const cut = text.indexOf(",");
  if (cut < 0 || cut === text.length - 1) return [text, ""];
  return [text.slice(0, cut + 1), text.slice(cut + 1).trim()];
}

function DiamondRule() {
  return (
    <svg className="ce-cx-rule" viewBox="0 0 72 10" aria-hidden="true">
      <path d="M0 5h27M45 5h27" stroke="currentColor" strokeWidth="1" />
      <path d="M36 .8L40.2 5 36 9.2 31.8 5Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M36 3.2L37.8 5 36 6.8 34.2 5Z" fill="currentColor" />
    </svg>
  );
}

function KnotRule() {
  return (
    <svg className="ce-cx-knot" viewBox="0 0 120 14" aria-hidden="true">
      <path d="M0 7h46M74 7h46" stroke="currentColor" strokeWidth="1" />
      <path
        d="M60 7c-2.6-3.6-8.4-4.4-9.6-1.2-1 2.6 2.6 4.4 5 2.6M60 7c2.6-3.6 8.4-4.4 9.6-1.2 1 2.6-2.6 4.4-5 2.6M60 7c-2.2 2.8-5.4 4.8-8.2 4.6M60 7c2.2 2.8 5.4 4.8 8.2 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="60" cy="7" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function CreamCouple({
  editing,
  layout,
  title = "",
  brideName = "",
  groomName = "",
  brideUrl,
  groomUrl,
  coupleUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  title?: string;
  brideName?: string;
  groomName?: string;
  brideUrl: string;
  groomUrl: string;
  coupleUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: PhotoSlot, file: File) => void;
  onLayoutChange?: (layout: CreamCoupleLayout) => void;
}) {
  const brideRef = useRef<HTMLInputElement>(null);
  const groomRef = useRef<HTMLInputElement>(null);
  const coupleRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_COUPLE_LAYOUTS, "offset-portraits");
  const urls: Record<PhotoSlot, string> = { bride: brideUrl, groom: groomUrl, couple: coupleUrl };
  const inputs = { bride: brideRef, groom: groomRef, couple: coupleRef };

  function openPicker(slot: PhotoSlot) {
    if (editing) inputs[slot].current?.click();
  }

  function renderPhoto(slot: PhotoSlot, className: string, children?: ReactNode) {
    const url = urls[slot];
    return (
      <div
        className={`${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change ${slot} photo` : undefined}
        onClick={() => openPicker(slot)}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openPicker(slot);
          }
        }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" />
        ) : (
          <CreamPh colors={PLACEHOLDER[slot]} label={slot} />
        )}
        {editing ? <span className="ce-photo-hint">Change photo</span> : null}
        {children}
      </div>
    );
  }

  function renderInput(slot: PhotoSlot) {
    return (
      <input
        key={slot}
        ref={inputs[slot]}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChangeImage(slot, file);
          e.target.value = "";
        }}
      />
    );
  }

  function renderEyebrow(variant: "trail" | "center") {
    return <p className={`ce-cx-eyebrow is-${variant}`}>{field("meetCoupleTitle")}</p>;
  }

  function renderTitle(className = "") {
    if (editing) {
      return <h2 className={`ce-cx-title ${className}`.trim()}>{field("storyTitle")}</h2>;
    }
    const [lead, accent] = splitTitle(title);
    return (
      <h2 className={`ce-cx-title ${className}`.trim()}>
        <span>{lead}</span>
        {accent ? <em>{accent}</em> : null}
      </h2>
    );
  }

  function renderTagline() {
    return <p className="ce-cx-tag">{field("coupleTagline", "", true)}</p>;
  }

  function renderPerson(who: Person, className = "") {
    const keys = PERSON_KEYS[who];
    return (
      <div className={`ce-cx-person is-${who} ${className}`.trim()}>
        <small className="ce-cx-role">{field(keys.label)}</small>
        <h3 className="ce-cx-name">{field(keys.name)}</h3>
        <p className="ce-cx-bio">{field(keys.bio, "", true)}</p>
      </div>
    );
  }

  function renderPair() {
    return (
      <div className="ce-cx-pair">
        {renderPerson("bride", "is-underlined")}
        <span className="ce-cx-pair-rule" aria-hidden="true" />
        {renderPerson("groom", "is-underlined")}
      </div>
    );
  }

  function renderOffsetPortrait(who: Person) {
    const keys = PERSON_KEYS[who];
    return (
      <article className="ce-person">
        <Reveal>
          {renderPhoto(who, "ce-person-ph")}
          <small>{field(keys.label, "ce-person-role")}</small>
          <h3>{field(keys.name, "ce-person-name")}</h3>
          <p className="ce-person-bio">{field(keys.bio, "ce-person-bio", true)}</p>
        </Reveal>
      </article>
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "arch-frame":
        return (
          <div className="ce-w ce-cx ce-cx-af">
            <div className="ce-cx-af-lead">
              <Reveal className="ce-cx-af-head">
                {renderEyebrow("trail")}
                {renderTitle()}
                <DiamondRule />
              </Reveal>
              <Reveal className="ce-cx-af-bride" delay=".1s">
                {renderPerson("bride")}
                <CreamBlossomTwig className="ce-cx-af-icon is-gold" />
              </Reveal>
            </div>
            <Reveal className="ce-cx-af-arch" delay=".15s">
              <span className="ce-cx-af-outline" aria-hidden="true" />
              {renderPhoto("bride", "ce-cx-ph ce-cx-af-archph")}
              <CreamBlossomSpray className="ce-cx-af-sprig-top is-gold" />
              <CreamBlossomCluster className="ce-cx-af-sprig-bottom" />
            </Reveal>
            <div className="ce-cx-af-side">
              <Reveal className="ce-cx-af-groomph" delay=".25s">
                {renderPhoto("groom", "ce-cx-ph ce-cx-af-rect")}
              </Reveal>
              <Reveal className="ce-cx-af-groom" delay=".3s">
                {renderPerson("groom")}
              </Reveal>
            </div>
          </div>
        );
      case "together-arch":
        return (
          <div className="ce-w ce-cx ce-cx-ta">
            <Reveal className="ce-cx-ta-media">
              <span className="ce-cx-ta-outline" aria-hidden="true" />
              {renderPhoto("couple", "ce-cx-ph ce-cx-ta-ph")}
              <CreamBlossomSpray className="ce-cx-ta-sprig-top is-gold" />
              <CreamBlossomCluster className="ce-cx-ta-sprig-bottom" />
            </Reveal>
            <Reveal className="ce-cx-ta-head" delay=".1s">
              {renderEyebrow("trail")}
              {renderTitle()}
              <DiamondRule />
              {renderTagline()}
            </Reveal>
            <Reveal className="ce-cx-ta-panel" delay=".2s">
              {renderPair()}
            </Reveal>
          </div>
        );
      case "oval-portraits":
        return (
          <div className="ce-w ce-cx ce-cx-ov">
            <Reveal className="ce-cx-ov-frame is-bride">
              {renderPhoto("bride", "ce-cx-ph ce-cx-ov-ph")}
              <CreamBlossomCluster className="ce-cx-ov-sprig" />
            </Reveal>
            <Reveal className="ce-cx-ov-head" delay=".1s">
              {renderEyebrow("center")}
              <span className="ce-cx-heart-rule" aria-hidden="true">
                <i />
                <CreamHeart className="ce-cx-heart" />
                <i />
              </span>
              {renderTitle("is-center")}
              {renderTagline()}
              <KnotRule />
            </Reveal>
            <Reveal className="ce-cx-ov-frame is-groom" delay=".2s">
              {renderPhoto("groom", "ce-cx-ph ce-cx-ov-ph")}
              <CreamBlossomCluster className="ce-cx-ov-sprig" />
            </Reveal>
            <Reveal className="ce-cx-ov-bride" delay=".25s">
              {renderPerson("bride")}
            </Reveal>
            <Reveal className="ce-cx-ov-groom" delay=".3s">
              {renderPerson("groom")}
            </Reveal>
          </div>
        );
      case "polaroid-pair":
        return (
          <div className="ce-w ce-cx ce-cx-pp">
            <div className="ce-cx-pp-eye">{renderEyebrow("trail")}</div>
            <Reveal className="ce-cx-pp-stage">
              <figure className="ce-cx-pp-card is-bride">
                <span className="ce-cx-pp-tape" aria-hidden="true" />
                {renderPhoto("bride", "ce-cx-ph ce-cx-pp-ph")}
              </figure>
              <figure className="ce-cx-pp-card is-groom">
                <CreamLeafSprig className="ce-cx-pp-leaf" />
                {renderPhoto("groom", "ce-cx-ph ce-cx-pp-ph")}
              </figure>
              <CreamBlossomTwig className="ce-cx-pp-sprig is-left" />
              <CreamBlossomTwig className="ce-cx-pp-sprig is-right" />
            </Reveal>
            <Reveal className="ce-cx-pp-names" delay=".15s">
              <p className="ce-cx-pp-label" aria-label={`${brideName} and ${groomName}`}>
                <span>{brideName}</span>
                <span className="ce-cx-pp-amp" aria-hidden="true">
                  <CreamHeart className="ce-cx-heart" />
                  <svg viewBox="0 0 40 8">
                    <path d="M1 4.5c6-3 12-3 19 0s13 3 19 0" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </span>
                <span>{groomName}</span>
              </p>
            </Reveal>
            <Reveal className="ce-cx-pp-head" delay=".1s">
              {renderTitle()}
              {renderTagline()}
            </Reveal>
            <Reveal className="ce-cx-pp-people" delay=".2s">
              {renderPair()}
            </Reveal>
          </div>
        );
      default:
        return (
          <div className="ce-w">
            <p className="ce-eyebrow">{field("meetCoupleTitle", "ce-eyebrow")}</p>
            <Reveal>
              <h2 className="ce-h2">{field("storyTitle", "ce-h2")}</h2>
            </Reveal>
            <div className="ce-cp">
              {renderOffsetPortrait("bride")}
              {renderOffsetPortrait("groom")}
            </div>
          </div>
        );
    }
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

      {renderBody()}

      {editing ? (["bride", "groom", "couple"] as const).map(renderInput) : null}
    </section>
  );
}
