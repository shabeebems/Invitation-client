"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamOrnament, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CreamBlossomCluster,
  CreamBlossomSpray,
  CreamBlossomTwig,
  CreamDeckleFilter,
  CreamDovePair,
  CreamHeart,
  CreamLaurelHeart,
  CreamLeafSprig,
  CreamRingsOrnament,
  CreamWaxSeal,
} from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_WELCOME_LAYOUTS,
  type CreamWelcomeLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamWelcome({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamWelcomeLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_WELCOME_LAYOUTS, "centered-ornament");
  const deckleId = `ce-wl-deckle-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  function renderTitle() {
    return <p className="ce-wl-title">{field("presenceLine", "", true)}</p>;
  }

  function renderText() {
    return <p className="ce-wl-text">{field("meetCoupleIntro", "", true)}</p>;
  }

  function renderDivider() {
    return (
      <span className="ce-wl-div" aria-hidden="true">
        <i />
        <CreamHeart className="ce-wl-heart" />
        <i />
      </span>
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "ring-frame":
        return (
          <div className="ce-w ce-wl ce-wl-ring">
            <Reveal className="ce-wl-frame">
              <CreamBlossomCluster className="ce-wl-cluster" />
              <CreamLeafSprig className="ce-wl-sprig" />
              <CreamRingsOrnament className="ce-wl-rings" />
              {renderTitle()}
              {renderDivider()}
              {renderText()}
              <CreamLaurelHeart className="ce-wl-laurel" />
            </Reveal>
          </div>
        );
      case "twin-doves":
        return (
          <div className="ce-w ce-wl ce-wl-doves">
            <Reveal>
              <CreamDovePair className="ce-wl-dove" />
            </Reveal>
            <Reveal delay=".08s">
              {renderTitle()}
              {renderDivider()}
            </Reveal>
            <Reveal delay=".16s">
              {renderText()}
              <span className="ce-wl-ribbon" aria-hidden="true">
                <i />
                <CreamHeart className="ce-wl-heart" />
                <i />
              </span>
            </Reveal>
          </div>
        );
      case "sealed-letter":
        return (
          <div
            className="ce-w ce-wl ce-wl-sealed"
            style={{ "--wl-deckle": `url(#${deckleId})` } as CSSProperties}
          >
            <CreamDeckleFilter id={deckleId} />
            <Reveal className="ce-wl-letter">
              <span className="ce-wl-paper" aria-hidden="true" />
              <CreamWaxSeal className="ce-wl-seal" />
              <CreamBlossomSpray className="ce-wl-spray" />
              <CreamBlossomTwig className="ce-wl-twig" />
              <div className="ce-wl-letter-body">
                {renderTitle()}
                {renderDivider()}
                {renderText()}
              </div>
            </Reveal>
          </div>
        );
      default:
        return (
          <div className="ce-w">
            <CreamOrnament />
            <Reveal>
              <p className="ce-welcome-big">{field("presenceLine", "ce-welcome-big", true)}</p>
            </Reveal>
            <Reveal>
              <p className="ce-welcome-text">{field("meetCoupleIntro", "ce-welcome-text", true)}</p>
            </Reveal>
          </div>
        );
    }
  }

  return (
    <section className="ce-welcome" id="welcome" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_WELCOME_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Welcome"
          className="ce-layout-picker"
        />
      ) : null}

      {renderBody()}
    </section>
  );
}
