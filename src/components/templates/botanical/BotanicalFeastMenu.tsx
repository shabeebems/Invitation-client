"use client";

import type { ReactNode } from "react";

export default function BotanicalFeastMenu({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section className="relative z-10 mx-auto my-20 w-full max-w-2xl px-4 text-center sm:px-6">
      {/* Tuscan Deckled-Edge Menu Sheet */}
      <div className="relative rounded-[32px] border border-[#d9ccb8] bg-[#fffdfa] p-8 text-center shadow-[0_20px_70px_rgba(70,55,40,0.08)] sm:p-12">
        {/* Top Dried Lavender / Olive Sprig */}
        <div className="mx-auto mb-4 flex items-center justify-center gap-2 font-serif text-[11px] font-bold tracking-[0.25em] text-[var(--bo-olive)] uppercase">
          <span>🌿</span>
          <span>THE GARDEN BANQUET</span>
          <span>🌿</span>
        </div>

        <h3 className="font-serif text-3xl font-light text-[var(--bo-olive-dark)] sm:text-4xl">
          Tuscan Harvest Feast
        </h3>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs text-[var(--bo-text-muted)] italic sm:text-sm">
          A celebratory culinary gathering prepared with seasonal herbs, pressed olive oils, and warm Mediterranean hospitality.
        </p>

        {/* Menu Courses */}
        <div className="mt-8 space-y-6 divide-y divide-[#ece2d0] text-left font-serif">
          {/* Course 1 */}
          <div className="pt-6 first:pt-0">
            <div className="flex items-baseline justify-between text-sm font-semibold tracking-wider text-[var(--bo-terracotta)] uppercase">
              <span>Primo · Welcome Infusion</span>
              <span className="font-mono text-xs text-[var(--bo-olive)]">05:30 PM</span>
            </div>
            <p className="mt-1 font-serif text-base font-medium text-[var(--bo-olive-dark)]">
              Citrus Blossom Kahwa &amp; Wild Mountain Figs
            </p>
            <p className="mt-0.5 text-xs text-[var(--bo-text-muted)] italic">
              Omani dates, fresh pomegranate pearls, and artisanal rosemary focaccia drizzled with cold-pressed olive oil.
            </p>
          </div>

          {/* Course 2 */}
          <div className="pt-6">
            <div className="flex items-baseline justify-between text-sm font-semibold tracking-wider text-[var(--bo-terracotta)] uppercase">
              <span>Secondo · Grand Banquet</span>
              <span className="font-mono text-xs text-[var(--bo-olive)]">07:30 PM</span>
            </div>
            <p className="mt-1 font-serif text-base font-medium text-[var(--bo-olive-dark)]">
              Saffron Herb Risotto &amp; Wood-Fired Delicacies
            </p>
            <p className="mt-0.5 text-xs text-[var(--bo-text-muted)] italic">
              Served family-style alongside roasted heirloom tomatoes, garden salads, and fragrant spiced jasmine rice.
            </p>
          </div>

          {/* Course 3 */}
          <div className="pt-6">
            <div className="flex items-baseline justify-between text-sm font-semibold tracking-wider text-[var(--bo-terracotta)] uppercase">
              <span>Dolce · Celebration Finale</span>
              <span className="font-mono text-xs text-[var(--bo-olive)]">09:15 PM</span>
            </div>
            <p className="mt-1 font-serif text-base font-medium text-[var(--bo-olive-dark)]">
              Pistachio Halwa &amp; Orange Blossom Panna Cotta
            </p>
            <p className="mt-0.5 text-xs text-[var(--bo-text-muted)] italic">
              Accompanying mint tea infusions, wedding confectionery, and sweet blessings for the newlyweds.
            </p>
          </div>
        </div>

        {/* Dietary Note at Bottom */}
        <div className="mt-8 rounded-2xl border border-[var(--bo-olive)]/20 bg-[#f7f3ec] p-4 text-center font-serif text-xs text-[var(--bo-olive-dark)]">
          <span className="font-semibold">✦ Dietary Hospitality: </span>
          <span>All culinary courses are strictly Halal with tailored vegetarian and gluten-friendly preparations available.</span>
        </div>
      </div>
    </section>
  );
}
