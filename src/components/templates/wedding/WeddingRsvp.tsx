"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export default function WeddingRsvp({
  field,
}: {
  field: (key: any, className?: string) => ReactNode;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState("1");
  const [diet, setDiet] = useState("standard");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="relative mx-auto my-24 max-w-2xl px-4 text-center">
      <div className="eu-glass relative overflow-hidden rounded-3xl p-8 sm:p-14">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--eu-gold)]/15 blur-3xl" />

        {/* Decorative Arabesque */}
        <div className="mx-auto flex items-center justify-center gap-3 text-[var(--eu-gold)] opacity-80">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--eu-gold)]" />
          <span className="text-xs">✦ 💌 ✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--eu-gold)]" />
        </div>

        <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase">
          RSVP & Guestbook
        </p>

        <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl">
          Will You Grace Our Union?
        </h2>

        <p className="mt-3 text-xs tracking-wider text-[var(--eu-text-muted)]">
          {field("rsvpNote", "text-center text-xs tracking-wider text-[var(--eu-text-muted)]")}
        </p>

        {submitted ? (
          <div className="my-8 rounded-3xl border-2 border-[var(--eu-gold)] bg-gradient-to-b from-[var(--eu-gold)]/15 to-transparent p-8 text-center shadow-lg">
            <span className="text-5xl">✨ 🤲 ✨</span>
            <h3 className="mt-4 font-serif text-2xl font-medium text-[var(--eu-gold-light)]">
              JazakAllah Khair, {name}!
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-[var(--eu-text-muted)]">
              {attendance === "yes"
                ? "Your gracious confirmation has been received. We eagerly look forward to welcoming you and celebrating this joyous day together!"
                : "Thank you for letting us know. Your warm prayers and blessings will accompany us in spirit."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-[var(--eu-gold)] uppercase">
                Your Esteemed Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Salman & Family"
                className="mt-2 w-full rounded-2xl border border-[var(--eu-border)] bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[var(--eu-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--eu-gold)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAttendance("yes")}
                className={`rounded-2xl border py-3.5 text-xs font-bold tracking-wider uppercase transition-all ${
                  attendance === "yes"
                    ? "border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] to-[var(--eu-gold)] text-[#1e050b] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                    : "border-[var(--eu-border)] bg-white/5 text-[var(--eu-text-muted)] hover:bg-white/10"
                }`}
              >
                Joyfully Attending ✨
              </button>
              <button
                type="button"
                onClick={() => setAttendance("no")}
                className={`rounded-2xl border py-3.5 text-xs font-bold tracking-wider uppercase transition-all ${
                  attendance === "no"
                    ? "border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] to-[var(--eu-gold)] text-[#1e050b] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                    : "border-[var(--eu-border)] bg-white/5 text-[var(--eu-text-muted)] hover:bg-white/10"
                }`}
              >
                Declines with Prayers
              </button>
            </div>

            {attendance === "yes" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[var(--eu-gold)] uppercase">
                    Guests Attending
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="eu-select w-full cursor-pointer appearance-none rounded-2xl border border-[var(--eu-border)] bg-black/50 px-4 py-3.5 pr-11 text-sm text-white transition focus:border-[var(--eu-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--eu-gold)]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4+">4+ Family Members</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--eu-gold)]">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[var(--eu-gold)] uppercase">
                    Culinary Preference
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      className="eu-select w-full cursor-pointer appearance-none rounded-2xl border border-[var(--eu-border)] bg-black/50 px-4 py-3.5 pr-11 text-sm text-white transition focus:border-[var(--eu-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--eu-gold)]"
                    >
                      <option value="standard">Traditional Feast (Halal)</option>
                      <option value="vegetarian">Pure Vegetarian</option>
                      <option value="jain">Jain Vegetarian</option>
                      <option value="kids">Children Friendly</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--eu-gold)]">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold tracking-wider text-[var(--eu-gold)] uppercase">
                Prayers & Warm Wishes for Newlyweds
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your dua, blessing, or heartfelt congratulations..."
                className="mt-2 w-full rounded-2xl border border-[var(--eu-border)] bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[var(--eu-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--eu-gold)]"
              />
            </div>

            <button
              type="submit"
              className="eu-shimmer-btn w-full rounded-full border border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] via-[var(--eu-gold)] to-[var(--eu-gold-dark)] py-4 text-xs font-bold tracking-[0.2em] text-[#1e050b] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition hover:brightness-110 active:scale-95"
            >
              Confirm Response
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
