"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function BotanicalHero({
  field,
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3",
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  audioUrl?: string;
}) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    function attemptAudioPlay() {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setAudioPlaying(true);
          cleanupGestureListeners();
        })
        .catch(() => {});
    }

    function onFirstGesture() {
      attemptAudioPlay();
    }

    function cleanupGestureListeners() {
      window.removeEventListener("click", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    }

    attemptAudioPlay();
    window.addEventListener("click", onFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("scroll", onFirstGesture, { once: true, passive: true });

    return () => {
      cleanupGestureListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  function toggleAudio() {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  }

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      {/* Floating Villa Estate Insignia (Zero Navbar) */}
      <div className="absolute top-6 left-6 z-20 hidden items-center gap-2 sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--bo-olive)]/30 bg-white/90 text-sm text-[var(--bo-olive)] shadow-sm backdrop-blur-md">
          🌿
        </span>
        <div className="text-left font-serif">
          <p className="text-[11px] font-bold tracking-widest text-[var(--bo-olive-dark)] uppercase">Villa Rosa Orangery</p>
          <p className="text-[9px] tracking-wider text-[var(--bo-text-muted)] uppercase">Tuscan Garden Estate · Muscat</p>
        </div>
      </div>

      {/* Floating Garden Harp Audio Pill */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleAudio}
          title={audioPlaying ? "Mute Acoustic Garden Harp" : "Play Acoustic Garden Harp"}
          aria-label={audioPlaying ? "Mute audio" : "Play audio"}
          className="flex items-center gap-2 rounded-full border border-[var(--bo-border)] bg-white/90 px-4 py-2 text-xs text-[var(--bo-olive-dark)] shadow-md backdrop-blur-md transition hover:border-[var(--bo-olive)] hover:bg-white cursor-pointer"
        >
          {audioPlaying ? (
            <>
              <div className="flex h-3 items-end gap-0.5">
                <span className="w-0.5 animate-pulse bg-[var(--bo-olive)] h-3" />
                <span className="w-0.5 animate-pulse bg-[var(--bo-terracotta)] h-1.5 delay-75" />
                <span className="w-0.5 animate-pulse bg-[var(--bo-olive)] h-2.5 delay-150" />
              </div>
              <span className="font-serif text-[11px] font-semibold tracking-wider">Harp Symphony On</span>
            </>
          ) : (
            <>
              <span className="text-xs">🎵</span>
              <span className="font-serif text-[11px] font-semibold tracking-wider text-[var(--bo-text-muted)]">Garden Music</span>
            </>
          )}
        </button>
      </div>

      {/* Main Tuscan Villa Deckled-Edge Parchment Card */}
      <div className="relative mx-auto mt-6 w-full max-w-2xl">
        {/* Soft Organic Shadow */}
        <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-b from-[#e8decb]/40 via-[#dfd0b7]/30 to-transparent blur-2xl" />

        {/* The Handmade Paper Sheet */}
        <div className="relative rounded-[32px] border border-[#d9ccb8] bg-[#fffdfa] p-8 text-center shadow-[0_25px_80px_rgba(70,55,40,0.09)] sm:p-14 md:p-16">
          {/* Real Botanical Pressed Olive Sprig & Wax Stamp at Top */}
          <div className="relative mx-auto -mt-4 mb-8 flex flex-col items-center">
            {/* Pressed Olive Branch SVG */}
            <svg className="h-10 w-28 text-[var(--bo-olive)] opacity-85" viewBox="0 0 120 40" fill="none">
              <path d="M10 20 C 40 10, 80 30, 110 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              {/* Leaves */}
              <path d="M30 16 C 32 10, 42 12, 38 18 C 34 20, 28 18, 30 16 Z" fill="currentColor" opacity="0.7" />
              <path d="M50 24 C 54 30, 62 28, 58 22 C 54 20, 48 22, 50 24 Z" fill="currentColor" opacity="0.7" />
              <path d="M70 17 C 74 11, 84 13, 80 19 C 76 21, 68 19, 70 17 Z" fill="currentColor" opacity="0.7" />
              <path d="M90 23 C 94 29, 102 27, 98 21 C 94 19, 88 21, 90 23 Z" fill="currentColor" opacity="0.7" />
            </svg>

            {/* Terracotta Wax Seal Imprint */}
            <div className="relative -mt-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#b05f38] bg-gradient-to-tr from-[#a65630] via-[#c4724a] to-[#994d27] shadow-[0_4px_15px_rgba(166,86,48,0.35)]">
              <span className="font-serif text-lg font-bold text-[#fef5ee] drop-shadow-sm">
                ✦
              </span>
            </div>
          </div>

          {/* Sacred Bismillah in Olive-Gold Calligraphy */}
          <div className="space-y-2">
            <div className="font-serif text-3xl font-light text-[var(--bo-olive-dark)] sm:text-4xl">
              {field("bismillah", "font-serif text-3xl font-light text-[var(--bo-olive-dark)] sm:text-4xl")}
            </div>
            <p className="font-serif text-xs tracking-[0.2em] text-[var(--bo-text-muted)] italic">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          {/* Families Invitation Invitation Prose */}
          <div className="mx-auto mt-8 max-w-lg space-y-2">
            <p className="font-serif text-xs font-semibold tracking-[0.3em] text-[var(--bo-terracotta)] uppercase">
              {field("hostLabel", "font-serif text-xs font-semibold tracking-[0.3em] uppercase")}
            </p>
            <p className="font-serif text-lg font-medium text-[var(--bo-text-main)] sm:text-xl">
              {field("hostNames", "font-serif text-lg font-medium text-[var(--bo-text-main)] sm:text-xl")}
            </p>
            <p className="font-serif text-sm font-light leading-relaxed text-[var(--bo-text-muted)] italic">
              {field("introLine", "font-serif text-sm font-light text-[var(--bo-text-muted)] italic")}
            </p>
          </div>

          {/* The Couple's Grand Calligraphic Names in Romantic Tuscan Script */}
          <div className="my-10 space-y-3 border-y border-[#e6dbc8] py-8">
            <h1 className="font-serif text-5xl font-normal tracking-wide text-[var(--bo-text-main)] sm:text-7xl md:text-8xl">
              <span className="font-serif italic text-[var(--bo-olive-dark)]">
                {field("groomName", "font-serif italic text-[var(--bo-olive-dark)]")}
              </span>
              <span className="mx-3 font-serif text-3xl font-light text-[var(--bo-terracotta)] italic sm:text-4xl">
                and
              </span>
              <span className="font-serif italic text-[var(--bo-olive-dark)]">
                {field("brideName", "font-serif italic text-[var(--bo-olive-dark)]")}
              </span>
            </h1>

            {/* Parents Lineage */}
            <div className="pt-2 font-serif text-xs text-[var(--bo-text-muted)] sm:text-sm">
              <span className="italic">{field("brideParentsLabel", "italic")} </span>
              <span className="font-medium text-[var(--bo-olive-dark)]">
                {field("brideParents", "font-medium text-[var(--bo-olive-dark)]")}
              </span>
            </div>
          </div>

          {/* Prose Itinerary Paragraph (NOT a 3-pillar card!) */}
          <div className="mx-auto max-w-lg space-y-4">
            <div className="rounded-2xl border border-[#e8decb] bg-[#faf6ee] p-6 shadow-sm">
              <p className="font-serif text-base font-normal leading-relaxed text-[var(--bo-text-main)] sm:text-lg">
                On <span className="font-semibold text-[var(--bo-olive-dark)]">{field("weekday", "font-semibold text-[var(--bo-olive-dark)]")}</span>, the{" "}
                <span className="font-semibold text-[var(--bo-olive-dark)]">{field("day", "font-semibold text-[var(--bo-olive-dark)]")}</span> of{" "}
                <span className="font-semibold text-[var(--bo-olive-dark)]">{field("monthYear", "font-semibold text-[var(--bo-olive-dark)]")}</span>
                <br />
                at <span className="font-semibold text-[var(--bo-terracotta)]">{field("time", "font-semibold text-[var(--bo-terracotta)]")}</span> in the golden afternoon
              </p>

              <div className="my-3 flex items-center justify-center gap-3 text-[var(--bo-olive)] opacity-50">
                <span className="h-px w-10 bg-[var(--bo-olive)]" />
                <span className="text-xs">❦</span>
                <span className="h-px w-10 bg-[var(--bo-olive)]" />
              </div>

              <p className="font-serif text-sm font-medium text-[var(--bo-olive-dark)] uppercase tracking-wider">
                {field("venueName", "font-serif text-sm font-medium text-[var(--bo-olive-dark)] uppercase tracking-wider")}
              </p>
              <p className="font-serif text-xs text-[var(--bo-text-muted)] italic">
                {field("venueCity", "font-serif text-xs text-[var(--bo-text-muted)] italic")}
              </p>
            </div>

            <p className="font-serif text-xs tracking-wider text-[var(--bo-olive-dark)] italic">
              {field("presenceLine", "font-serif text-xs tracking-wider text-[var(--bo-olive-dark)] italic")}
            </p>
          </div>

          {/* Bottom Deckled Seal Footnote */}
          <div className="mt-8 border-t border-[#eee5d5] pt-4 font-serif text-[11px] text-[var(--bo-text-muted)] italic">
            Reception and festive banquet under the stars to follow solemnization
          </div>
        </div>
      </div>

      {/* Gentle Scroll Prompt */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <span className="font-serif text-xs tracking-widest text-[var(--bo-olive-dark)] uppercase opacity-75">
          Enter The Garden
        </span>
        <span className="mt-1 text-sm text-[var(--bo-terracotta)] animate-bounce">
          ↓
        </span>
      </div>
    </section>
  );
}
