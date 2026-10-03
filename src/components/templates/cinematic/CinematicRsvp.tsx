"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export default function CinematicRsvp({
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
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cv-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cv-gold)]" />
        <span className="text-xs">✦ KINDLY RESPOND ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cv-gold)]" />
      </div>

      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("rsvpEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("rsvpTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-light text-[var(--cv-text-muted)]">
        {field("rsvpDeadline", "text-center text-sm font-light text-[var(--cv-text-muted)]")}
      </p>

      {/* Glass Form Container */}
      <div className="cv-glass mt-10 rounded-3xl p-8 text-left shadow-2xl backdrop-blur-xl sm:p-12">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--cv-gold)] bg-[var(--cv-gold)]/10 text-2xl text-[var(--cv-gold)]">
              ✨
            </div>
            <h3 className="font-serif text-3xl font-medium text-[var(--cv-gold-light)]">
              {attending === "yes" ? "Blessings Received" : "Warm Wishes Noted"}
            </h3>
            <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-[var(--cv-text-muted)]">
              Thank you, <span className="font-medium text-[var(--cv-gold)]">{guestName}</span>.{" "}
              {attending === "yes"
                ? "Your seat of honor has been reserved with warmth and joy. We eagerly await celebrating with you."
                : "Your prayers and thoughtful wishes mean the world to us."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
                setWishes("");
              }}
              className="mt-4 text-xs font-semibold tracking-wider text-[var(--cv-gold)] uppercase underline transition hover:text-white cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance Choice */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                Will you be joining us?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-2xl border p-4 text-center text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                    attending === "yes"
                      ? "border-[var(--cv-gold)] bg-[var(--cv-gold)]/15 text-[var(--cv-gold-light)] shadow-[0_0_20px_rgba(226,192,107,0.2)]"
                      : "border-[var(--cv-border-light)] bg-black/30 text-[var(--cv-text-muted)] hover:border-white/20"
                  }`}
                >
                  <span className="block text-lg mb-1">🕊️</span>
                  <span>Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-2xl border p-4 text-center text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                    attending === "no"
                      ? "border-[var(--cv-gold)] bg-[var(--cv-gold)]/15 text-[var(--cv-gold-light)] shadow-[0_0_20px_rgba(226,192,107,0.2)]"
                      : "border-[var(--cv-border-light)] bg-black/30 text-[var(--cv-text-muted)] hover:border-white/20"
                  }`}
                >
                  <span className="block text-lg mb-1">💌</span>
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Rayan Al-Mansoor"
                className="w-full rounded-2xl border border-[var(--cv-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-faint)] focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
              />
            </div>

            {attending === "yes" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Guest Count */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                    Attending Guests
                  </label>
                  <div className="relative">
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-[var(--cv-border)] bg-black/50 px-5 py-3.5 pr-10 text-sm text-[var(--cv-text-main)] focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)] cursor-pointer"
                    >
                      <option value="1" className="bg-[#121016] text-white">1 Guest (Just me)</option>
                      <option value="2" className="bg-[#121016] text-white">2 Guests</option>
                      <option value="3" className="bg-[#121016] text-white">3 Guests</option>
                      <option value="4" className="bg-[#121016] text-white">4 Guests</option>
                      <option value="5" className="bg-[#121016] text-white">5+ Family Members</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--cv-gold)]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Dietary requirements */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                    Dietary Preferences
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="e.g. Halal / Vegetarian / Nut Allergy"
                    className="w-full rounded-2xl border border-[var(--cv-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-faint)] focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
                  />
                </div>
              </div>
            )}

            {/* Wishes / Dua */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                Warm Wishes & Dua for the Couple
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="May Allah bless this union and grant endless love and harmony..."
                className="w-full rounded-2xl border border-[var(--cv-border)] bg-black/50 px-5 py-3.5 text-sm text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-faint)] focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[var(--cv-gold-dark)] via-[var(--cv-gold)] to-[var(--cv-gold-dark)] py-4 text-xs font-bold tracking-widest text-[#121016] uppercase shadow-xl transition duration-300 hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              Confirm RSVP Response
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
