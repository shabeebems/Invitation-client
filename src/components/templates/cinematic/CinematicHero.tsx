"use client";

import type { ReactNode } from "react";

export default function CinematicHero({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section className="relative z-10 flex min-h-[95vh] flex-col items-center justify-center px-4 pt-12 pb-24 text-center">
      {/* 2.39:1 Cinematic Letterbox Frame Indicator */}
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Top Production Banner / Studio Slate */}
        <div className="mb-6 flex flex-wrap items-center justify-between border-b border-[var(--cv-gold)]/20 pb-3 text-[10px] tracking-[0.25em] text-[var(--cv-gold)]/70 uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--cv-gold)] animate-pulse" />
            <span>2.39:1 CINEMASCOPE • 4K MASTER</span>
          </div>
          <div className="font-mono tracking-widest text-[var(--cv-gold-light)]/80">
            ROLL 01 • SCENE 01 • TAKE 01
          </div>
          <div className="hidden sm:block font-mono tracking-widest">
            SOUND: DOLBY ATMOS
          </div>
        </div>

        {/* Sacred Blessing / Opening Title Card */}
        <div className="space-y-2 py-4">
          <div className="font-serif text-3xl font-light text-[var(--cv-gold-light)] drop-shadow-[0_2px_20px_rgba(226,192,107,0.45)] sm:text-4xl md:text-5xl">
            {field("bismillah", "text-center font-serif text-3xl text-[var(--cv-gold-light)] sm:text-4xl md:text-5xl")}
          </div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--cv-gold)] uppercase sm:text-xs">
            In the name of Allah • The Most Gracious • The Most Merciful
          </p>
        </div>

        {/* Studio Production Credit */}
        <div className="mx-auto my-4 max-w-xl space-y-1">
          <div className="text-[10px] font-bold tracking-[0.35em] text-[var(--cv-gold)] uppercase sm:text-xs">
            {field("hostLabel", "text-center text-[10px] tracking-[0.35em] text-[var(--cv-gold)] uppercase sm:text-xs")}
          </div>
          <div className="text-sm font-light tracking-[0.2em] text-[var(--cv-text-main)] uppercase sm:text-base">
            {field("hostNames", "text-center text-sm font-light text-[var(--cv-text-main)] uppercase sm:text-base")}
          </div>
          <div className="text-[11px] font-light tracking-widest text-[var(--cv-text-muted)] uppercase">
            {field("introLine", "text-center text-[11px] font-light text-[var(--cv-text-muted)] uppercase")}
          </div>
        </div>

        {/* Grand Premiere Movie Title Marquee */}
        <div className="relative my-8 border-y border-[var(--cv-gold)]/30 py-8 backdrop-blur-sm sm:my-10 sm:py-12">
          {/* Subtle film reel sprocket accents along top and bottom */}
          <div className="pointer-events-none absolute -top-1 left-0 right-0 flex justify-between px-2 text-[8px] text-[var(--cv-gold)]/40 font-mono">
            <span>[ 001 ]</span>
            <span>[ 002 ]</span>
            <span>[ 003 ]</span>
            <span>[ 004 ]</span>
            <span>[ 005 ]</span>
          </div>

          <p className="mb-3 text-[10px] font-semibold tracking-[0.4em] text-[var(--cv-gold)] uppercase sm:text-xs">
            ✦ WORLD PREMIERE PRESENTATION ✦
          </p>

          <h1 className="flex flex-col items-center justify-center gap-1 font-serif text-4xl font-extralight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="cv-gold-gradient tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(226,192,107,0.5)]">
              {field("groomName", "cv-gold-gradient font-serif font-light")}
            </span>
            <span className="my-1 font-serif text-xl text-[var(--cv-gold)]/70 italic sm:text-2xl">
              &amp;
            </span>
            <span className="cv-gold-gradient tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(226,192,107,0.5)]">
              {field("brideName", "cv-gold-gradient font-serif font-light")}
            </span>
          </h1>

          <div className="mx-auto mt-4 max-w-md text-xs font-light tracking-wide text-[var(--cv-text-muted)]">
            <span className="opacity-75">{field("brideParentsLabel", "opacity-75")} </span>
            <span className="font-medium text-[var(--cv-gold-light)]">
              {field("brideParents", "font-medium text-[var(--cv-gold-light)]")}
            </span>
          </div>

          <p className="mx-auto mt-3 max-w-lg text-[11px] font-light tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-xs">
            {field("inviteLine", "text-center text-[11px] tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-xs")}
          </p>

          <div className="pointer-events-none absolute -bottom-1 left-0 right-0 flex justify-between px-2 text-[8px] text-[var(--cv-gold)]/40 font-mono">
            <span>[ 006 ]</span>
            <span>[ 007 ]</span>
            <span>[ 008 ]</span>
            <span>[ 009 ]</span>
            <span>[ 010 ]</span>
          </div>
        </div>

        {/* Widescreen Film Premiere Marquee Billboard (NO 3-pillar box!) */}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[var(--cv-gold)]/40 bg-gradient-to-b from-black/80 via-[#120f18]/90 to-black/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-7">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:divide-x sm:divide-[var(--cv-gold)]/30">
            {/* Premiere Date Ticket Block */}
            <div className="w-full text-center sm:w-1/3 sm:text-left sm:pr-4">
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                ✦ PREMIERE DATE
              </span>
              <p className="mt-1 font-serif text-xl font-medium tracking-wide text-[var(--cv-gold-light)] sm:text-2xl">
                {field("weekday", "font-medium text-[var(--cv-gold-light)]")}
              </p>
              <p className="font-mono text-xs text-[var(--cv-text-muted)] tracking-wider">
                {field("day", "text-xs font-mono text-[var(--cv-text-muted)]")} {field("monthYear", "text-xs font-mono text-[var(--cv-text-muted)]")}
              </p>
            </div>

            {/* Showtime / Engagement */}
            <div className="w-full text-center sm:w-1/3 sm:px-4">
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                ✦ SHOWTIME
              </span>
              <p className="mt-1 font-serif text-xl font-medium tracking-wide text-white sm:text-2xl">
                {field("time", "font-medium text-white")}
              </p>
              <p className="font-mono text-[11px] text-[var(--cv-gold)]/80 tracking-widest uppercase">
                CEREMONY &amp; GALA
              </p>
            </div>

            {/* Theatre & City */}
            <div className="w-full text-center sm:w-1/3 sm:text-right sm:pl-4">
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                ✦ PREMIERE THEATRE
              </span>
              <p className="mt-1 font-serif text-lg font-medium tracking-wide text-[var(--cv-gold-light)] sm:text-xl truncate">
                {field("venueCity", "font-medium text-[var(--cv-gold-light)]")}
              </p>
              <p className="text-xs text-[var(--cv-text-muted)] truncate">
                {field("venueName", "text-xs text-[var(--cv-text-muted)]")}
              </p>
            </div>
          </div>

          {/* Authentic Film Poster Billing Strip at Bottom */}
          <div className="mt-5 border-t border-[var(--cv-gold)]/20 pt-3 text-[9px] font-mono tracking-[0.2em] text-[var(--cv-text-muted)]/80 uppercase">
            A CO-PRODUCTION OF TWO FAMILIES • MUSIC BY JOY • CINEMATOGRAPHY BY MEMORIES • ADMIT ONE HONORED GUEST
          </div>
        </div>

        {/* Quick-Action Suite (Cinema Tickets) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#schedule"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8010] px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-[#0a080d] uppercase shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <span>SCENE BREAKDOWN</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)]/50 bg-black/60 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-[var(--cv-gold-light)] uppercase backdrop-blur-md transition-all hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/15 active:scale-95"
          >
            <span>RED CARPET RSVP</span>
            <span>🎬</span>
          </a>
        </div>

      </div>
    </section>
  );
}

