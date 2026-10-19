"use client";

import { useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_RSVP_LAYOUTS,
  type RubyRsvpLayout,
} from "@/components/templates/ruby/ruby-layouts";

export default function RubyRsvp({
  editing,
  layout,
  shareText,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  shareText: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyRsvpLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_RSVP_LAYOUTS, "formal-reply");
  const [coming, setComing] = useState(true);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    const n = name.trim();
    if (!n) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setSent(true);
  }

  const thanks = coming
    ? `Thank you, ${name.trim()}. We can't wait to celebrate with you.`
    : `Thank you, ${name.trim()}. You will be missed.`;

  const waMsg = coming
    ? `Hi! This is ${name.trim()}. We'll be there (${guests} guest(s)). ${note}`
    : `Hi! This is ${name.trim()}. Sadly we can't make it. ${note}`;

  const waHref = `https://wa.me/?text=${encodeURIComponent(waMsg.trim() || shareText)}`;

  return (
    <section className="rb-sec" id="rsvp" data-layout={activeLayout} aria-label="RSVP">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_RSVP_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="RSVP"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap">
        <SectionTitle>{field("locationEyebrow", "rb-h2 rb-mc")}</SectionTitle>
        <Reveal>
          <p className="rb-lead">{field("rsvpNote", "rb-lead", true)}</p>
        </Reveal>

        {!sent ? (
          <Reveal>
            <form
              className="rb-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!editing) send();
              }}
            >
              <label>
                YOUR NAME
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  disabled={editing}
                />
              </label>
              <div className="rb-tog" role="group" aria-label="Attendance">
                <button
                  type="button"
                  aria-pressed={coming}
                  disabled={editing}
                  onClick={() => setComing(true)}
                >
                  Joyfully accept
                </button>
                <button
                  type="button"
                  aria-pressed={!coming}
                  disabled={editing}
                  onClick={() => setComing(false)}
                >
                  Sadly decline
                </button>
              </div>
              {coming ? (
                <label>
                  GUESTS
                  <select value={guests} onChange={(e) => setGuests(e.target.value)} disabled={editing}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label>
                A NOTE FOR THE COUPLE
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={editing}
                />
              </label>
              <div className="rb-err" role="alert">
                {error}
              </div>
              <button type="submit" className="rb-btn rb-btn-solid" disabled={editing}>
                {field("openHint", "rb-btn-label")}
              </button>
            </form>
          </Reveal>
        ) : (
          <div className="rb-ok show">
            <p className="rb-gv rb-thanks">{thanks}</p>
            <a className="rb-btn" href={waHref} target="_blank" rel="noopener noreferrer">
              SEND ON WHATSAPP
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
