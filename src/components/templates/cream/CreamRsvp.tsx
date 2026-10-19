"use client";

import { useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_RSVP_LAYOUTS,
  type CreamRsvpLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamRsvp({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamRsvpLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_RSVP_LAYOUTS, "outlined-card");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState("");
  const [att, setAtt] = useState("");
  const [errName, setErrName] = useState("");
  const [errAtt, setErrAtt] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit() {
    const n = name.trim();
    if (n.length < 2) {
      setErrName("Please enter your name.");
      return;
    }
    setErrName("");
    if (!att) {
      setErrAtt("Please choose one option.");
      return;
    }
    setErrAtt("");
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSent(true);
  }

  const first = name.trim().split(" ")[0] || "";
  const thanks =
    att === "yes"
      ? "Your reply looks lovely! This was a demo, so nothing has been delivered to the couple."
      : "We'll miss you. This was a demo, so nothing has been delivered to the couple.";

  return (
    <section className="ce-rsvp" id="rsvp" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_RSVP_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="RSVP"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w ce-rsvp-w">
        <p className="ce-eyebrow">{field("rsvpNote", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">
            Will you <em>join us?</em>
          </h2>
        </Reveal>

        <Reveal>
          <div className="ce-card2">
            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!editing) void submit();
                }}
                noValidate
              >
                <div className="ce-f">
                  <label htmlFor="ce-nm">Full name</label>
                  <input
                    id="ce-nm"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={editing}
                    required
                  />
                  <div className="ce-err">{errName}</div>
                </div>
                <div className="ce-f">
                  <fieldset>
                    <legend>Attendance</legend>
                    <label className="ce-ch">
                      <input
                        type="radio"
                        name="ce-at"
                        value="yes"
                        checked={att === "yes"}
                        disabled={editing}
                        onChange={() => setAtt("yes")}
                      />
                      <span>Joyfully accepts</span>
                    </label>
                    <label className="ce-ch">
                      <input
                        type="radio"
                        name="ce-at"
                        value="no"
                        checked={att === "no"}
                        disabled={editing}
                        onChange={() => setAtt("no")}
                      />
                      <span>Regretfully declines</span>
                    </label>
                  </fieldset>
                  <div className="ce-err">{errAtt}</div>
                </div>
                {att !== "no" ? (
                  <div className="ce-f">
                    <label htmlFor="ce-gs">Number of guests</label>
                    <select
                      id="ce-gs"
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
                ) : null}
                <div className="ce-f">
                  <label htmlFor="ce-dt">Dietary requirements</label>
                  <input
                    id="ce-dt"
                    type="text"
                    placeholder="Optional"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    disabled={editing}
                  />
                </div>
                <div className="ce-f">
                  <label htmlFor="ce-ms">Message to the couple</label>
                  <textarea
                    id="ce-ms"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={editing}
                  />
                </div>
                <button type="submit" className="ce-btn ce-btn-fill" disabled={editing || sending}>
                  {sending ? "Sending…" : field("openHint", "ce-btn-label")}
                </button>
                <p className="ce-demo">
                  Demo form: nothing is sent anywhere until RSVP is connected to your backend.
                </p>
              </form>
            ) : (
              <div className="ce-ok">
                <h3>
                  Thank you, <em>{first}</em>
                </h3>
                <p className="ce-soft">{thanks}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
