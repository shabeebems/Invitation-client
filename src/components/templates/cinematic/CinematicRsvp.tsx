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

      {/* Hollywood Box Office Pass Container */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--cv-gold)]/50 bg-gradient-to-b from-black/95 via-[#130f19]/95 to-black/95 p-8 text-left shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-12">
        {/* Box Office Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--cv-gold)]/20 pb-4 font-mono text-[10px] tracking-[0.25em] text-[var(--cv-gold)] uppercase">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--cv-gold-light)]">BOX OFFICE WILL-CALL</span>
            <span className="opacity-40">•</span>
            <span>GUEST PASS REGISTRATION</span>
          </div>
          <div className="text-[var(--cv-text-muted)]">
            SECTION: ORCHESTRA
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--cv-gold)] bg-[var(--cv-gold)]/10 text-2xl text-[var(--cv-gold)]">
              🎟️
            </div>
            <h3 className="font-serif text-3xl font-light text-[var(--cv-gold-light)]">
              {attending === "yes" ? "Premiere Pass Confirmed" : "Warm Wishes Acknowledged"}
            </h3>
            <p className="mx-auto max-w-md font-mono text-xs leading-relaxed text-[var(--cv-text-muted)] uppercase">
              HONORED GUEST: <span className="font-bold text-[var(--cv-gold)]">{guestName}</span>.{" "}
              {attending === "yes"
                ? "YOUR RESERVATION FOR THE WORLD PREMIERE HAS BEEN REGISTERED. WE AWAIT YOUR GRACEFUL PRESENCE ON THE RED CARPET."
                : "THANK YOU SINCERELY FOR YOUR NOBLE DUA AND CELEBRATORY WISHES."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
                setWishes("");
              }}
              className="mt-4 font-mono text-xs font-semibold tracking-wider text-[var(--cv-gold)] uppercase underline transition hover:text-white cursor-pointer"
            >
              Modify Guest Pass Registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Attendance Choice */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                ✦ SELECT ADMISSION STATUS:
              </label>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-xl border p-4 text-center tracking-wider uppercase transition cursor-pointer ${
                    attending === "yes"
                      ? "border-[var(--cv-gold)] bg-[var(--cv-gold)]/20 text-[var(--cv-gold-light)] shadow-[0_0_20px_rgba(226,192,107,0.3)] font-bold"
                      : "border-[var(--cv-gold)]/20 bg-black/40 text-[var(--cv-text-muted)] hover:border-[var(--cv-gold)]/40"
                  }`}
                >
                  <span className="block text-xl mb-1">🎟️</span>
                  <span>CONFIRM ADMISSION</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-xl border p-4 text-center tracking-wider uppercase transition cursor-pointer ${
                    attending === "no"
                      ? "border-[var(--cv-gold)] bg-[var(--cv-gold)]/20 text-[var(--cv-gold-light)] shadow-[0_0_20px_rgba(226,192,107,0.3)] font-bold"
                      : "border-[var(--cv-gold)]/20 bg-black/40 text-[var(--cv-text-muted)] hover:border-[var(--cv-gold)]/40"
                  }`}
                >
                  <span className="block text-xl mb-1">🕊️</span>
                  <span>ABSENT IN PERSON</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                HONORED GUEST FULL NAME *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Rayan Al-Mansoor"
                className="w-full rounded-xl border border-[var(--cv-gold)]/30 bg-black/70 px-5 py-3.5 font-mono text-xs text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-muted)]/50 focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
              />
            </div>

            {attending === "yes" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Guest Count */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                    NUMBER OF PASSES
                  </label>
                  <div className="relative">
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[var(--cv-gold)]/30 bg-black/70 px-5 py-3.5 pr-10 font-mono text-xs text-[var(--cv-text-main)] focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)] cursor-pointer"
                    >
                      <option value="1" className="bg-[#121016] text-white">1 Pass (Sole Guest)</option>
                      <option value="2" className="bg-[#121016] text-white">2 Passes (Couple)</option>
                      <option value="3" className="bg-[#121016] text-white">3 Passes</option>
                      <option value="4" className="bg-[#121016] text-white">4 Passes</option>
                      <option value="5" className="bg-[#121016] text-white">5+ Passes (Family)</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[var(--cv-gold)]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Dietary requirements */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                    HOSPITALITY / DIETARY PREF
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="e.g. Halal / Vegetarian / Gluten-Free"
                    className="w-full rounded-xl border border-[var(--cv-gold)]/30 bg-black/70 px-5 py-3.5 font-mono text-xs text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-muted)]/50 focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
                  />
                </div>
              </div>
            )}

            {/* Wishes / Dua */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                DEDICATION &amp; PRAYERS FOR THE NEWLYWEDS
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="May Allah shower this union with barakah, enduring companionship, and perpetual light..."
                className="w-full rounded-xl border border-[var(--cv-gold)]/30 bg-black/70 px-5 py-3.5 font-mono text-xs text-[var(--cv-text-main)] placeholder:text-[var(--cv-text-muted)]/50 focus:border-[var(--cv-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--cv-gold)]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8010] py-4 font-mono text-xs font-bold tracking-[0.2em] text-[#121016] uppercase shadow-[0_0_30px_rgba(212,175,55,0.3)] transition duration-300 hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              CONFIRM PREMIERE PASS • SUBMIT RSVP
            </button>

            {/* Barcode Strip */}
            <div className="flex items-center justify-between border-t border-dashed border-[var(--cv-gold)]/20 pt-4 font-mono text-[9px] text-[var(--cv-gold)]/60 tracking-widest uppercase">
              <span>ADMIT ONE HONORED GUEST</span>
              <span>|||| | ||||| || |||||| ||||</span>
              <span>NON-TRANSFERABLE</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
