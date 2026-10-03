"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export default function CelestialRsvp({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [dietary, setDietary] = useState("");
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="relative z-10 mx-auto my-28 max-w-3xl px-4 text-center">
      {/* Decorative Divider */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
        <span className="font-serif text-xs tracking-[0.3em]">✦ WISH UPON A STAR · RSVP ✦</span>
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
        Kindly Inscribe Your Attendance
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl">
        Light a Star in Our Constellation
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-light text-[var(--cs-text-muted)]">
        {field("rsvpNote", "text-center text-sm font-light text-[var(--cs-text-muted)]")}
      </p>

      {/* Optical Instrument Form Container */}
      <div className="cs-instrument-card mt-10 rounded-3xl p-8 text-left shadow-2xl backdrop-blur-xl sm:p-12">
        <span className="cs-corner-pin tl" />
        <span className="cs-corner-pin tr" />
        <span className="cs-corner-pin bl" />
        <span className="cs-corner-pin br" />

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--cs-starlight)] bg-[var(--cs-starlight)]/15 text-3xl text-[var(--cs-starlight)] shadow-[0_0_35px_rgba(243,227,182,0.5)] animate-bounce">
              🌟
            </div>
            <h3 className="font-serif text-3xl font-medium text-[var(--cs-starlight-light)]">
              Your Star is Inscribed in the Heavens
            </h3>
            <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-[var(--cs-text-muted)]">
              Alhamdulillah! Thank you, <span className="font-medium text-[var(--cs-starlight)]">{guestName}</span>.{" "}
              {attending === "yes"
                ? "Your honored seat has been registered under the starlit canopy. We eagerly look forward to witnessing this celestial union together."
                : "Your prayers, duas, and thoughtful wishes will illuminate our path into this blessed lifetime."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
                setWishes("");
              }}
              className="mt-4 text-xs font-semibold tracking-wider text-[var(--cs-starlight)] uppercase underline transition hover:text-white cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance Choice */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Attendance Confirmation
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-2xl border p-4 text-center text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                    attending === "yes"
                      ? "border-[var(--cs-starlight)] bg-[var(--cs-starlight)]/15 text-[var(--cs-starlight-light)] shadow-[0_0_25px_rgba(243,227,182,0.3)]"
                      : "border-[var(--cs-border-light)] bg-black/40 text-[var(--cs-text-muted)] hover:border-white/20"
                  }`}
                >
                  <span className="block text-xl mb-1">🌟</span>
                  <span>Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-2xl border p-4 text-center text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                    attending === "no"
                      ? "border-[var(--cs-starlight)] bg-[var(--cs-starlight)]/15 text-[var(--cs-starlight-light)] shadow-[0_0_25px_rgba(243,227,182,0.3)]"
                      : "border-[var(--cs-border-light)] bg-black/40 text-[var(--cs-text-muted)] hover:border-white/20"
                  }`}
                >
                  <span className="block text-xl mb-1">🕊️</span>
                  <span>Sending Duas from Afar</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Honored Guest Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Rayan Al-Mansoor"
                className="w-full rounded-2xl border border-[var(--cs-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cs-text-main)] placeholder:text-[var(--cs-text-faint)] focus:border-[var(--cs-starlight)] focus:outline-none focus:ring-1 focus:ring-[var(--cs-starlight)]"
              />
            </div>

            {attending === "yes" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Guest Count */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                    Companions Attending
                  </label>
                  <div className="relative">
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-[var(--cs-border)] bg-black/50 px-5 py-3.5 pr-10 text-sm text-[var(--cs-text-main)] focus:border-[var(--cs-starlight)] focus:outline-none focus:ring-1 focus:ring-[var(--cs-starlight)] cursor-pointer"
                    >
                      <option value="1" className="bg-[#080e26] text-white">1 Guest (Solo)</option>
                      <option value="2" className="bg-[#080e26] text-white">2 Guests</option>
                      <option value="3" className="bg-[#080e26] text-white">3 Guests</option>
                      <option value="4" className="bg-[#080e26] text-white">4 Guests</option>
                      <option value="5" className="bg-[#080e26] text-white">5+ Family Members</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--cs-starlight)]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Dietary requirements */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                    Dietary Accommodations
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="e.g. Halal / Vegetarian / Gluten-Free"
                    className="w-full rounded-2xl border border-[var(--cs-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cs-text-main)] placeholder:text-[var(--cs-text-faint)] focus:border-[var(--cs-starlight)] focus:outline-none focus:ring-1 focus:ring-[var(--cs-starlight)]"
                  />
                </div>
              </div>
            )}

            {/* Wishes / Dua Upon a Star */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Your Dua & Wish Upon a Star
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="May Allah shower this union with endless barakah, light, and celestial peace..."
                className="w-full rounded-2xl border border-[var(--cs-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cs-text-main)] placeholder:text-[var(--cs-text-faint)] focus:border-[var(--cs-starlight)] focus:outline-none focus:ring-1 focus:ring-[var(--cs-starlight)]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full border border-[var(--cs-starlight)] bg-gradient-to-r from-[var(--cs-starlight-dim)] via-[var(--cs-starlight)] to-[var(--cs-starlight-dim)] py-4 text-xs font-bold tracking-widest text-[#030612] uppercase shadow-[0_0_25px_rgba(243,227,182,0.35)] transition duration-300 hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              Light My Star in the Sky (Confirm RSVP)
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
