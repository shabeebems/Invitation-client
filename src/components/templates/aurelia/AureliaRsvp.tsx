"use client";

import { useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_RSVP_LAYOUTS,
  type AureliaRsvpLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaRsvp({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: AureliaRsvpLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_RSVP_LAYOUTS, "formal-form");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState("");
  const [att, setAtt] = useState("");
  const [errName, setErrName] = useState("");
  const [errAtt, setErrAtt] = useState("");
  const [sent, setSent] = useState(false);

  function submit() {
    const n = name.trim();
    if (!n) {
      setErrName("Please share your name.");
      return;
    }
    setErrName("");
    if (!att) {
      setErrAtt("Please choose an option.");
      return;
    }
    setErrAtt("");
    setSent(true);
  }

  const thanks =
    att === "yes"
      ? `We can't wait, ${name.trim().split(" ")[0]}`
      : `You will be missed, ${name.trim().split(" ")[0]}`;

  return (
    <section className="au-sec au-rsvp" id="rsvp" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_RSVP_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="RSVP"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-wrap au-center">
        <Reveal>
          <p className="au-eyebrow">{field("rsvpNote", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">
            {field("locationEyebrow", "au-h2")}
            <br />
            <em>{field("destinationLabel", "au-h2")}</em>
          </h2>
        </Reveal>

        <Reveal>
          <form
            className="au-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!editing) submit();
            }}
          >
            {!sent ? (
              <>
                <div className="au-f">
                  <label htmlFor="au-n">Full name</label>
                  <input
                    id="au-n"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    disabled={editing}
                  />
                  <div className="au-err">{errName}</div>
                </div>
                <div className="au-row">
                  <div className="au-f">
                    <label htmlFor="au-g">Number of guests</label>
                    <select
                      id="au-g"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      disabled={editing}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={String(n)}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="au-f">
                    <label htmlFor="au-d">Dietary preferences</label>
                    <input
                      id="au-d"
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      placeholder="None"
                      disabled={editing}
                    />
                  </div>
                </div>
                <div className="au-f">
                  <label htmlFor="au-m">A message for the couple</label>
                  <textarea
                    id="au-m"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={editing}
                  />
                </div>
                <div className="au-choice">
                  <button
                    type="button"
                    className={`au-btn${att === "yes" ? " is-sel" : ""}`}
                    disabled={editing}
                    onClick={() => setAtt("yes")}
                  >
                    Joyfully attending
                  </button>
                  <button
                    type="button"
                    className={`au-btn${att === "no" ? " is-sel" : ""}`}
                    disabled={editing}
                    onClick={() => setAtt("no")}
                  >
                    Unable to attend
                  </button>
                </div>
                <div className="au-err au-center">{errAtt}</div>
                <button type="submit" className="au-btn au-btn-wide" disabled={editing}>
                  {field("openHint", "au-btn-label")}
                </button>
              </>
            ) : (
              <div className="au-done show">
                <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
                  <circle cx="40" cy="40" r="32" />
                  <path d="M26 41l10 10 19-21" />
                </svg>
                <h3>{thanks}</h3>
                <p>Your reply has been received.</p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
