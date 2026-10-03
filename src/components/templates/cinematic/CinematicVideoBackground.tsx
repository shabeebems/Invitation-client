"use client";

import { useEffect, useRef } from "react";

export default function CinematicVideoBackground({
  videoUrl,
  posterUrl,
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3",
  videoPlaying = true,
  audioPlaying = false,
  onAudioStateChange,
}: {
  videoUrl?: string;
  posterUrl?: string;
  audioUrl?: string;
  videoPlaying?: boolean;
  audioPlaying?: boolean;
  onAudioStateChange?: (playing: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // High-reliability local and verified fallback video sources
  const primaryVideo = videoUrl && !videoUrl.includes("mixkit.co") ? videoUrl : "/videos/wedding-bg.webm";
  const fallbackVideo = "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/35/2022-08-06%2C_Pacific_Ocean_sunset_%28Ocean_Shores%2C_Washington%29%2C_01.webm/2022-08-06%2C_Pacific_Ocean_sunset_%28Ocean_Shores%2C_Washington%29%2C_01.webm.480p.vp9.webm";
  const resolvedPoster = posterUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85";

  // Audio setup with autoplay gesture listener
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    function attemptAudioPlay() {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          onAudioStateChange?.(true);
          cleanupGestureListeners();
        })
        .catch(() => {
          // Awaiting user interaction
        });
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
  }, [audioUrl, onAudioStateChange]);

  // Sync external audioPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [audioPlaying]);

  // Sync external videoPlaying state
  useEffect(() => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [videoPlaying]);

  return (
    <>
      {/* Full-bleed Fixed Looping Background Video */}
      <video
        ref={videoRef}
        poster={resolvedPoster}
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
        className="cv-video-fixed opacity-75 blur-none"
      >
        <source src={primaryVideo} type="video/webm" />
        <source src={fallbackVideo} type="video/webm" />
      </video>

      {/* Dark Ambient Vignette Overlay for Crisp Contrast */}
      <div className="cv-vignette" aria-hidden="true" />
    </>
  );
}
