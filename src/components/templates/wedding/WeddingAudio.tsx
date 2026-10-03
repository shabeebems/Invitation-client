"use client";

import { useEffect, useRef, useState } from "react";

export default function WeddingAudio({
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3",
  autoPlay = true,
}: {
  audioUrl?: string;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    function attemptPlay() {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
          cleanupListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy until first user interaction
        });
    }

    function onFirstUserGesture() {
      attemptPlay();
    }

    function cleanupListeners() {
      window.removeEventListener("click", onFirstUserGesture);
      window.removeEventListener("touchstart", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
    }

    if (autoPlay) {
      // 1. Attempt immediate autoplay
      attemptPlay();

      // 2. Fallback: Start playback on very first user tap/click/key (e.g. breaking envelope seal)
      window.addEventListener("click", onFirstUserGesture, { once: true, passive: true });
      window.addEventListener("touchstart", onFirstUserGesture, { once: true, passive: true });
      window.addEventListener("keydown", onFirstUserGesture, { once: true, passive: true });
    }

    return () => {
      cleanupListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl, autoPlay]);

  function togglePlay() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <div className="fixed right-5 bottom-6 z-40 flex items-center gap-3">
      {/* Soundwave equalizer indicator */}
      {playing && (
        <div className="flex h-7 items-end gap-1 rounded-full border border-[var(--eu-border)] bg-[var(--eu-bg-surface)] px-3 py-1.5 shadow-lg backdrop-blur-md">
          <span className="eu-equalizer-bar w-1 rounded-full bg-[var(--eu-gold)]" />
          <span className="eu-equalizer-bar w-1 rounded-full bg-[var(--eu-gold-light)]" />
          <span className="eu-equalizer-bar w-1 rounded-full bg-[var(--eu-gold)]" />
          <span className="eu-equalizer-bar w-1 rounded-full bg-[var(--eu-gold-light)]" />
        </div>
      )}

      {/* Main Vinyl Record Button */}
      <button
        type="button"
        onClick={togglePlay}
        title={playing ? "Pause Ambient Music" : "Play Ambient Wedding Symphony"}
        aria-label={playing ? "Pause music" : "Play music"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--eu-gold)] bg-[var(--eu-bg-surface)] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-95"
      >
        {/* Vinyl Disc with Grooves */}
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--eu-gold)]/40 bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 shadow-inner ${
            playing ? "eu-vinyl-spinning" : ""
          }`}
        >
          {/* Inner Record Label */}
          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--eu-gold-dark)] bg-gradient-to-tr from-[#991b1b] to-[#dc2626]">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--eu-gold-light)] shadow-sm" />
          </div>

          {/* Micro Vinyl Grooves */}
          <div className="pointer-events-none absolute inset-1 rounded-full border border-white/10" />
        </div>

        {/* Tone Arm Icon / Stylus Indicator */}
        <div
          className={`pointer-events-none absolute -top-1 -right-0.5 h-4 w-4 text-[var(--eu-gold)] transition-transform duration-500 ${
            playing ? "rotate-12" : "-rotate-45 opacity-60"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="4" x2="16" y2="16" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full border border-[var(--eu-border)] bg-[var(--eu-bg-surface)] px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-[var(--eu-gold-light)] opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100">
          {playing ? "Ambient Symphony: Playing" : "Tap to Play Royal Symphony 🎵"}
        </span>
      </button>
    </div>
  );
}
