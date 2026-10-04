"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export default function BotanicalRsvpCard({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [dietary, setDietary] = useState("Traditional");
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="relative z-10 mx-auto my-16 w-full max-w-2xl px-4 text-center sm:px-6">
      <div className="relative rounded-[32px] border border-[#d9ccb8] bg-[#fffdfa] p-8 text-center shadow-[0_20px_70px_rgba(70,55,40,0.08)] sm:p-12">
        {/* Top Terracotta Stamp */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--bo-terracotta)]/40 bg-[var(--bo-terracotta)]/10 text-xl text-[var(--bo-terracotta)] shadow-sm">
          💌
        </div>

        <p className="font-serif text-[11px] font-bold tracking-[0.25em] text-[var(--bo-olive)] uppercase">
          Kindly Respond
        </p>

        <h3 className="mt-1 font-serif text-3xl font-light text-[var(--bo-olive-dark)] sm:text-4xl">
          Garden Presence &amp; RSVP
        </h3>

        <p className="mx-auto mt-2 max-w-md font-serif text-xs text-[var(--bo-text-muted)] italic sm:text-sm">
          {field("rsvpDeadline", "font-serif text-xs text-[var(--bo-text-muted)] italic sm:text-sm")}
        </p>

        {submitted ? (
          <div className="py-10 text-center font-serif">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bo-olive)]/15 text-2xl text-[var(--bo-olive-dark)]">
              🌿
            </div>
            <h4 className="mt-4 text-2xl font-light text-[var(--bo-olive-dark)]">
              {attending === "yes" ? "Garden Reservation Confirmed" : "Warm Wishes Received"}
            </h4>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--bo-text-muted)]">
              Thank you, <span className="font-semibold text-[var(--bo-terracotta)]">{guestName}</span>.{" "}
              {attending === "yes"
                ? "Your seat beneath the olive canopy has been lovingly reserved. We look forward to embracing you in celebration."
                : "Your prayers and thoughtful duas bring great warmth to our hearts."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
                setWishes("");
              }}
              className="mt-5 text-xs text-[var(--bo-terracotta)] underline hover:text-[var(--bo-olive-dark)] cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left font-serif">
            {/* Attendance Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-[var(--bo-olive-dark)] uppercase">
                Will you join our garden celebration?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-2xl border p-3.5 text-center text-xs transition cursor-pointer ${
                    attending === "yes"
                      ? "border-[var(--bo-terracotta)] bg-[var(--bo-terracotta)]/10 font-bold text-[var(--bo-terracotta)] shadow-sm"
                      : "border-[#e0d6c5] bg-white text-[var(--bo-text-muted)] hover:border-[var(--bo-olive)]"
                  }`}
                >
                  <span className="block text-base mb-0.5">🌿</span>
                  <span>Joyfully Attending</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-2xl border p-3.5 text-center text-xs transition cursor-pointer ${
                    attending === "no"
                      ? "border-[var(--bo-terracotta)] bg-[var(--bo-terracotta)]/10 font-bold text-[var(--bo-terracotta)] shadow-sm"
                      : "border-[#e0d6c5] bg-white text-[var(--bo-text-muted)] hover:border-[var(--bo-olive)]"
                  }`}
                >
                  <span className="block text-base mb-0.5">🕊️</span>
                  <span>Absent with Prayers</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-[var(--bo-olive-dark)] uppercase">
                Honored Guest Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Amina &amp; Family"
                className="w-full rounded-2xl border border-[#d9ccb8] bg-[#faf7f2] px-4 py-3 text-sm text-[var(--bo-olive-dark)] placeholder:text-[#a89d8d] focus:border-[var(--bo-terracotta)] focus:outline-none"
              />
            </div>

            {attending === "yes" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-[var(--bo-olive-dark)] uppercase">
                    Guests Attending
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full rounded-2xl border border-[#d9ccb8] bg-[#faf7f2] px-4 py-3 text-sm text-[var(--bo-olive-dark)] focus:border-[var(--bo-terracotta)] focus:outline-none cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests (Couple)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Family Members</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-[var(--bo-olive-dark)] uppercase">
                    Herbarium Dietary Prep
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full rounded-2xl border border-[#d9ccb8] bg-[#faf7f2] px-4 py-3 text-sm text-[var(--bo-olive-dark)] focus:border-[var(--bo-terracotta)] focus:outline-none cursor-pointer"
                  >
                    <option value="Traditional">Traditional Banquet (Halal)</option>
                    <option value="Vegetarian">Vegetarian Meadow Selection</option>
                    <option value="GlutenFree">Gluten-Friendly Course</option>
                  </select>
                </div>
              </div>
            )}

            {/* Wishes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-[var(--bo-olive-dark)] uppercase">
                Warm Dua &amp; Note for the Couple
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="May your union flourish like blossoms in spring..."
                className="w-full rounded-2xl border border-[#d9ccb8] bg-[#faf7f2] px-4 py-3 text-sm text-[var(--bo-olive-dark)] placeholder:text-[#a89d8d] focus:border-[var(--bo-terracotta)] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full border border-[var(--bo-terracotta)] bg-gradient-to-r from-[var(--bo-terracotta)] to-[#9a4b37] py-3.5 font-serif text-sm font-semibold tracking-wider text-white shadow-md transition hover:brightness-110 active:scale-95 cursor-pointer"
            >
              Seal Response &amp; Send Prayers
            </button>
          </form>
        )}
      </div>

      {/* Romantic Botanical Sign-off */}
      <div className="my-10 text-center font-serif">
        <p className="text-xs text-[var(--bo-olive-dark)] italic">
          {field("closingBlessing", "text-xs text-[var(--bo-olive-dark)] italic")}
        </p>
        <p className="mt-2 text-[10px] tracking-widest text-[var(--bo-text-muted)] uppercase">
          {field("footer", "text-[10px] tracking-widest text-[var(--bo-text-muted)] uppercase")}
        </p>
      </div>
    </section>
  );
}
