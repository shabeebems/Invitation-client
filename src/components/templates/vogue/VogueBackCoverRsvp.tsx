"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export default function VogueBackCoverRsvp({
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
    <section id="rsvp" className="relative z-10 mx-auto my-28 max-w-4xl px-4">
      {/* Magazine Section Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>THE BACK COVER · FINAL DISPATCH</span>
          <span>VIP GUEST REGISTRATION</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          EDITORIAL GUEST PASS & RSVP
        </h2>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase">
          {field("rsvpNote", "font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase")}
        </p>
      </div>

      {/* Main Back Cover Container */}
      <div className="mt-10 rounded-2xl border-2 border-[var(--ev-text-dark)] bg-white p-8 shadow-2xl sm:p-14">
        {submitted ? (
          <div className="space-y-6 py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ev-text-dark)] text-2xl text-white">
              ✓
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--ev-bronze)] uppercase">
                DISPATCH TRANSMITTED · PASS CONFIRMED
              </span>
              <h3 className="font-serif text-3xl font-bold text-[var(--ev-text-dark)] sm:text-4xl">
                {attending === "yes" ? "Your Seat of Honor is Inscribed" : "Warm Wishes Gratefully Received"}
              </h3>
              <p className="mx-auto max-w-md font-serif text-base font-light text-[var(--ev-text-muted)]">
                Thank you, <span className="font-bold text-[var(--ev-text-dark)]">{guestName}</span>.{" "}
                {attending === "yes"
                  ? "Your reservation has been confirmed for the haute couture celebration. We look forward to welcoming you with grace and warmth."
                  : "Your thoughtful prayers and well-wishes mean the world to our families."}
              </p>
            </div>

            {/* Editorial Barcode Pass Receipt */}
            <div className="mx-auto max-w-sm rounded-xl border border-[var(--ev-border-light)] bg-gray-50 p-6 text-center">
              <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--ev-text-muted)] uppercase">
                OFFICIAL PASS: VOGUE-2026-VIP-PASS
              </div>
              <div className="my-2 flex h-8 items-end justify-center gap-[2px]">
                {[4, 2, 5, 1, 6, 8, 3, 5, 2, 7, 4, 3, 8, 2, 6, 5, 3, 7, 4, 8, 2, 6].map((h, i) => (
                  <span
                    key={i}
                    className="bg-[var(--ev-text-dark)]"
                    style={{ width: "2px", height: `${h * 3 + 6}px` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] font-bold text-[var(--ev-text-dark)] uppercase">
                GUEST OF HONOUR: {guestName}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
                setWishes("");
              }}
              className="text-xs font-bold tracking-wider text-[var(--ev-bronze)] uppercase underline hover:text-[var(--ev-text-dark)] cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Attendance Switch */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
                Will you be gracing this editorial issue with your presence?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-xl border-2 p-5 text-center text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                    attending === "yes"
                      ? "border-[var(--ev-text-dark)] bg-[var(--ev-text-dark)] text-white shadow-lg"
                      : "border-[var(--ev-border-light)] bg-gray-50 text-[var(--ev-text-muted)] hover:border-black/30"
                  }`}
                >
                  <span className="block text-xl mb-1">✨</span>
                  <span>Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-xl border-2 p-5 text-center text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                    attending === "no"
                      ? "border-[var(--ev-text-dark)] bg-[var(--ev-text-dark)] text-white shadow-lg"
                      : "border-[var(--ev-border-light)] bg-gray-50 text-[var(--ev-text-muted)] hover:border-black/30"
                  }`}
                >
                  <span className="block text-xl mb-1">🕊️</span>
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--ev-text-dark)] uppercase">
                Guest Full Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Rayan Al-Mansoor"
                className="w-full rounded-xl border-2 border-[var(--ev-border)] bg-white px-5 py-4 text-sm text-[var(--ev-text-dark)] placeholder:text-gray-400 focus:border-[var(--ev-text-dark)] focus:outline-none"
              />
            </div>

            {attending === "yes" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Companions */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--ev-text-dark)] uppercase">
                    Companions Attending
                  </label>
                  <div className="relative">
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full appearance-none rounded-xl border-2 border-[var(--ev-border)] bg-white px-5 py-4 pr-10 text-sm text-[var(--ev-text-dark)] focus:border-[var(--ev-text-dark)] focus:outline-none cursor-pointer"
                    >
                      <option value="1">1 Guest (Admit Solo)</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3">3 Guests (Party of Three)</option>
                      <option value="4">4 Guests (Party of Four)</option>
                      <option value="5">5+ Family Members</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Dietary */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--ev-text-dark)] uppercase">
                    Dietary Requirements
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="e.g. Halal / Vegetarian / Gluten-Free"
                    className="w-full rounded-xl border-2 border-[var(--ev-border)] bg-white px-5 py-4 text-sm text-[var(--ev-text-dark)] placeholder:text-gray-400 focus:border-[var(--ev-text-dark)] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Well Wishes */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--ev-text-dark)] uppercase">
                Warm Wishes & Dua for the Couple
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="May this union be graced with eternal harmony, blessings, and elegance..."
                className="w-full rounded-xl border-2 border-[var(--ev-border)] bg-white px-5 py-4 text-sm text-[var(--ev-text-dark)] placeholder:text-gray-400 focus:border-[var(--ev-text-dark)] focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--ev-text-dark)] py-4 text-xs font-bold tracking-widest text-white uppercase shadow-xl transition hover:bg-[var(--ev-bronze)] active:scale-[0.99] cursor-pointer"
            >
              Inscribe & Confirm Guest Pass
            </button>
          </form>
        )}
      </div>

      {/* Editorial Magazine End Credits Footer */}
      <footer className="mt-20 border-t-2 border-[var(--ev-text-dark)] pt-8 text-center">
        <div className="mx-auto max-w-md space-y-3 font-serif">
          <p className="text-xl font-light italic text-[var(--ev-bronze)]">
            {field("closingBlessing", "text-xl font-light italic text-[var(--ev-bronze)]")}
          </p>
          <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--ev-text-muted)] uppercase">
            {field("footer", "font-mono text-[9px] tracking-[0.25em] text-[var(--ev-text-muted)] uppercase")}
          </div>
        </div>
      </footer>
    </section>
  );
}
