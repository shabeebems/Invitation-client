"use client";

import { useEffect, useRef, useState } from "react";

export default function VogueHeaderBar({
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
    <header className="sticky top-0 left-0 right-0 z-40 border-b border-[var(--ev-border)] bg-[var(--ev-bg-paper)]/95 px-4 py-3 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Editorial Logo / Issue Badge */}
        <a
          href="#"
          className="flex items-center gap-3 font-serif text-sm tracking-[0.25em] text-[var(--ev-text-dark)] uppercase"
        >
          <span className="font-bold">THE UNION</span>
          <span className="h-3 w-px bg-[var(--ev-border)]" />
          <span className="text-[10px] tracking-widest text-[var(--ev-text-muted)]">ISSUE 26</span>
          <span className="hidden text-[10px] text-[var(--ev-bronze)] sm:inline">✦ {groomInitial} & {brideInitial}</span>
        </a>

        {/* Section Links */}
        <nav
          aria-label="Editorial Navigation"
          className="hidden list-none items-center gap-7 p-0 text-[10px] font-semibold tracking-[0.22em] text-[var(--ev-text-muted)] uppercase md:flex"
        >
          <li>
            <a href="#contents" className="transition hover:text-[var(--ev-text-dark)]">
              Index & Time
            </a>
          </li>
          <li>
            <a href="#interview" className="transition hover:text-[var(--ev-text-dark)]">
              The Interview
            </a>
          </li>
          <li>
            <a href="#lookbook" className="transition hover:text-[var(--ev-text-dark)]">
              Lookbook
            </a>
          </li>
          <li>
            <a href="#spread" className="transition hover:text-[var(--ev-text-dark)]">
              Photo Spread
            </a>
          </li>
          <li>
            <a href="#destination" className="transition hover:text-[var(--ev-text-dark)]">
              Destination
            </a>
          </li>
          <li>
            <a href="#rsvp" className="transition hover:text-[var(--ev-text-dark)]">
              Guest Pass
            </a>
          </li>
        </nav>

        {/* Audio Toggle & RSVP CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            title={audioPlaying ? "Pause Salon Soundtrack" : "Play Salon Soundtrack"}
            aria-label={audioPlaying ? "Pause audio" : "Play audio"}
            className="flex items-center gap-2 rounded-full border border-[var(--ev-border)] bg-white/70 px-3 py-1.5 text-[10px] tracking-wider text-[var(--ev-text-dark)] uppercase transition hover:border-[var(--ev-text-dark)] cursor-pointer"
          >
            {audioPlaying ? (
              <>
                <div className="flex h-2.5 items-end gap-0.5">
                  <span className="w-0.5 animate-pulse bg-[var(--ev-text-dark)] h-2.5" />
                  <span className="w-0.5 animate-pulse bg-[var(--ev-bronze)] h-1.5 delay-75" />
                  <span className="w-0.5 animate-pulse bg-[var(--ev-text-dark)] h-2 delay-150" />
                </div>
                <span>Soundtrack</span>
              </>
            ) : (
              <>
                <span>🎵</span>
                <span className="text-[var(--ev-text-muted)]">Music</span>
              </>
            )}
          </button>

          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[var(--ev-text-dark)] px-4 py-1.5 text-[10px] font-bold tracking-widest text-[var(--ev-text-light)] uppercase transition hover:bg-[var(--ev-bronze)] active:scale-95"
          >
            <span>RSVP</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
