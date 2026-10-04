"use client";

import { useEffect, useRef, useState } from "react";

interface BurgundyCoverGateProps {
  groomName: string;
  brideName: string;
  eventDateText?: string;
  coverImage?: string;
  audioUrl?: string;
  editable?: boolean;
}

export default function BurgundyCoverGate({
  groomName,
  brideName,
  eventDateText = "5.9.2026",
  coverImage = "/templates/burgundy-bloom/cover-bg.jpg",
  audioUrl = "/templates/burgundy-bloom/audio.mp3",
  editable = false,
}: BurgundyCoverGateProps) {
  // If editable, default to open so editor is not blocked
  const [isOpen, setIsOpen] = useState(editable);
  const [isOpening, setIsOpening] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Typewriter state
  const coupleText = `${brideName?.toUpperCase() || "AYSHA"} . ${groomName?.toUpperCase() || "BASIM"}\n${eventDateText}`;
  const arabicPoem = "عسى هذا القبول مُكللاً بالبهجات\nوعسى دعواتكم من الغيث تروينا";

  const [typedCouple, setTypedCouple] = useState("");
  const [coupleDone, setCoupleDone] = useState(false);
  const [typedPoem, setTypedPoem] = useState("");
  const [poemDone, setPoemDone] = useState(false);
  const [showTap, setShowTap] = useState(false);

  // Trigger typewriter sequence
  useEffect(() => {
    if (isOpen) return;

    let coupleIdx = 0;
    const coupleTimer = setTimeout(() => {
      const interval = setInterval(() => {
        coupleIdx++;
        setTypedCouple(coupleText.slice(0, coupleIdx));
        if (coupleIdx >= coupleText.length) {
          clearInterval(interval);
          setCoupleDone(true);
        }
      }, 55);
      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(coupleTimer);
  }, [coupleText, isOpen]);

  useEffect(() => {
    if (!coupleDone || isOpen) return;

    let poemIdx = 0;
    const poemTimer = setTimeout(() => {
      const interval = setInterval(() => {
        poemIdx++;
        setTypedPoem(arabicPoem.slice(0, poemIdx));
        if (poemIdx >= arabicPoem.length) {
          clearInterval(interval);
          setPoemDone(true);
        }
      }, 65);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(poemTimer);
  }, [coupleDone, arabicPoem, isOpen]);

  useEffect(() => {
    if (poemDone && !isOpen) {
      const t = setTimeout(() => setShowTap(true), 400);
      return () => clearTimeout(t);
    }
  }, [poemDone, isOpen]);

  // Handle open and music
  function handleOpen() {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Audio autoplay policies
        });
    }

    setTimeout(() => {
      setIsOpen(true);
    }, 850);
  }

  function toggleAudio() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }

  const coupleLines = typedCouple.split("\n");
  const poemLines = typedPoem.split("\n");

  return (
    <>
      {/* Background Audio */}
      <audio ref={audioRef} src={audioUrl} preload="auto" loop />

      {/* Floating Audio Toggle Pill (Always available once opened) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute music" : "Play music"}
            className="flex items-center gap-2 rounded-full border border-[var(--ab-gold)]/60 bg-[var(--ab-card-bg)] px-3.5 py-2 text-xs text-[var(--ab-burgundy)] shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-sm">{isPlaying ? "🎵" : "🔇"}</span>
            <span className="ab-font-cinzel text-[10px] tracking-wider uppercase font-semibold">
              {isPlaying ? "Music On" : "Music Off"}
            </span>
          </button>
        </div>
      )}

      {/* Editor replay button */}
      {isOpen && editable && (
        <div className="fixed top-20 right-6 z-40">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsOpening(false);
              setTypedCouple("");
              setCoupleDone(false);
              setTypedPoem("");
              setPoemDone(false);
              setShowTap(false);
            }}
            className="flex items-center gap-2 rounded-full border border-[var(--ab-burgundy)]/40 bg-[var(--ab-ivory-light)]/90 px-4 py-1.5 font-mono text-[11px] tracking-widest text-[var(--ab-burgundy)] shadow-md backdrop-blur-md transition-all hover:bg-[var(--ab-cream)]"
          >
            <span>✦</span>
            <span>REPLAY COVER ENTRANCE</span>
          </button>
        </div>
      )}

      {/* Interactive Cover Entrance Screen */}
      {!isOpen && (
        <div
          onClick={handleOpen}
          className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#f2ede6] transition-opacity duration-800 ${
            isOpening ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="Wedding Cover Gate - Click to Open"
        >
          {/* Cover Background Image */}
          <img
            src={coverImage}
            alt="Wedding Cover"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Soft Bottom Gradient to enhance text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#f2ede6] via-[#f2ede6]/70 to-transparent" />

          {/* Centered Content at Bottom 10% */}
          <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center px-6 text-center">
            {/* Couple Name Line with Typewriter Caret */}
            <p className="ab-font-cinzel min-h-[1.4em] text-sm tracking-[0.22em] text-[var(--ab-espresso)] sm:text-base md:text-lg">
              <span>{coupleLines[0] || ""}</span>
              {!coupleDone && coupleLines.length === 1 && (
                <span className="inline-block h-[0.9em] w-[2px] bg-[var(--ab-espresso)] align-[-0.12em] animate-[ab-caret_.9s_steps(1)_infinite]" />
              )}
            </p>

            {/* Date Line */}
            <p className="ab-font-cinzel mt-2 min-h-[1.3em] text-xs tracking-[0.18em] text-[var(--ab-wine-dark)]/85 sm:text-sm">
              <span>{coupleLines[1] || ""}</span>
              {!coupleDone && coupleLines.length === 2 && (
                <span className="inline-block h-[0.9em] w-[2px] bg-[var(--ab-wine-dark)] align-[-0.12em] animate-[ab-caret_.9s_steps(1)_infinite]" />
              )}
            </p>

            {/* Antique Gold Divider Line */}
            <div className="my-5 h-px w-10 bg-[var(--ab-gold)]/60" />

            {/* Arabic Marriage Blessing in Amiri Calligraphy */}
            <div dir="rtl" className="ab-font-amiri space-y-1 text-sm text-[var(--ab-burgundy)] sm:text-base md:text-lg">
              <p className="min-h-[1.5em] leading-relaxed">
                <span>{poemLines[0] || ""}</span>
                {!poemDone && coupleDone && poemLines.length === 1 && (
                  <span className="inline-block h-[0.9em] w-[2px] bg-[var(--ab-burgundy)] align-[-0.12em] animate-[ab-caret_.9s_steps(1)_infinite]" />
                )}
              </p>
              <p className="min-h-[1.5em] leading-relaxed">
                <span>{poemLines[1] || ""}</span>
                {!poemDone && poemLines.length === 2 && (
                  <span className="inline-block h-[0.9em] w-[2px] bg-[var(--ab-burgundy)] align-[-0.12em] animate-[ab-caret_.9s_steps(1)_infinite]" />
                )}
              </p>
            </div>

            {/* Glowing "Tap to Open" Pill CTA Button */}
            <div
              className={`mt-7 transition-opacity duration-700 ${
                showTap ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="ab-font-cinzel inline-flex items-center rounded-full border border-[var(--ab-gold)]/80 bg-[var(--ab-gold)]/20 px-6 py-2.5 text-[11px] font-bold tracking-[0.32em] text-[var(--ab-wine-dark)] uppercase shadow-md animate-[ab-tap-glow_2s_infinite]">
                Tap to Open
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
