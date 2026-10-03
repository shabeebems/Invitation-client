"use client";

import { useEffect, useRef, useState } from "react";

export default function CelestialNavbar({
  groomInitial,
  brideInitial,
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3",
}: {
  groomInitial: string;
  brideInitial: string;
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
    <header className="sticky top-0 left-0 right-0 z-40 border-b border-[var(--cs-border-light)] bg-[#030612]/92 backdrop-blur-2xl">
      {/* Top Telemetry Strip */}
      <div className="hidden border-b border-white/5 bg-black/60 px-4 py-1 text-center sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[var(--cs-starlight-dim)] uppercase">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cs-starlight)]" />
            <span>OBSERVATORY HORIZON: ONLINE</span>
          </span>
          <span>DEC: +24° 18&apos; 42&quot; · RA: 18h 36m 56s · LUNAR ILLUMINATION: 84%</span>
          <span>EQUINOX: J2026.9</span>
        </div>
      </div>

      {/* Main Astrolabe Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        {/* Monogram Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-serif text-base tracking-widest text-[var(--cs-starlight)] transition hover:brightness-125"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--cs-starlight-dim)] bg-[var(--cs-starlight)]/10 text-xs shadow-[0_0_12px_rgba(243,227,182,0.3)]">
            ✦
          </span>
          <span className="font-semibold tracking-[0.25em]">
            {groomInitial} & {brideInitial}
          </span>
          <span className="hidden font-mono text-[9px] tracking-widest text-[var(--cs-text-faint)] uppercase lg:inline">
            · ASTRIS
          </span>
        </a>

        {/* Universal Section Anchor Links */}
        <nav
          aria-label="Celestial Navigation"
          className="hidden list-none items-center gap-6 p-0 text-[11px] font-semibold tracking-[0.2em] text-[var(--cs-text-muted)] uppercase md:flex"
        >
          <li>
            <a href="#alignment" className="transition hover:text-[var(--cs-starlight)]">
              Ephemeris
            </a>
          </li>
          <li>
            <a href="#story" className="transition hover:text-[var(--cs-starlight)]">
              In The Stars
            </a>
          </li>
          <li>
            <a href="#schedule" className="transition hover:text-[var(--cs-starlight)]">
              24h Orbit
            </a>
          </li>
          <li>
            <a href="#gallery" className="transition hover:text-[var(--cs-starlight)]">
              Constellations
            </a>
          </li>
          <li>
            <a href="#observatory" className="transition hover:text-[var(--cs-starlight)]">
              Observatory
            </a>
          </li>
          <li>
            <a href="#rsvp" className="transition hover:text-[var(--cs-starlight)]">
              Make a Wish
            </a>
          </li>
        </nav>

        {/* Ambient Sound & Quick Action */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            title={audioPlaying ? "Mute Celestial Soundtrack" : "Play Celestial Soundtrack"}
            aria-label={audioPlaying ? "Mute audio" : "Play audio"}
            className="flex items-center gap-2 rounded-full border border-[var(--cs-border)] bg-[var(--cs-bg-card)] px-3.5 py-1.5 text-xs text-[var(--cs-starlight)] backdrop-blur-md transition hover:border-[var(--cs-starlight)] hover:bg-[var(--cs-starlight)]/10 cursor-pointer"
          >
            {audioPlaying ? (
              <>
                <div className="flex h-3 items-end gap-0.5">
                  <span className="w-0.5 animate-pulse bg-[var(--cs-starlight)] h-3" />
                  <span className="w-0.5 animate-pulse bg-[var(--cs-starlight-light)] h-1.5 delay-75" />
                  <span className="w-0.5 animate-pulse bg-[var(--cs-starlight)] h-2.5 delay-150" />
                </div>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider">Music On</span>
              </>
            ) : (
              <>
                <span className="text-xs">✨</span>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--cs-text-muted)]">Music Off</span>
              </>
            )}
          </button>

          {/* Quick RSVP CTA */}
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--cs-starlight-dim)] bg-gradient-to-r from-[var(--cs-starlight-dim)] to-[var(--cs-starlight)] px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#030612] uppercase shadow-[0_0_15px_rgba(243,227,182,0.25)] transition hover:brightness-110 active:scale-95"
          >
            <span>RSVP</span>
            <span>✦</span>
          </a>
        </div>
      </div>
    </header>
  );
}
