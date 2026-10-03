"use client";

export default function CinematicNavbar({
  groomInitial,
  brideInitial,
  videoPlaying,
  audioPlaying,
  onToggleVideo,
  onToggleAudio,
}: {
  groomInitial: string;
  brideInitial: string;
  videoPlaying: boolean;
  audioPlaying: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}) {
  return (
    <header className="cv-navbar px-4 py-3 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Monogram Brand */}
        <a href="#" className="flex items-center gap-2 font-serif text-lg font-bold tracking-widest text-[var(--cv-gold)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--cv-gold)] text-xs">
            ✦
          </span>
          <span>{groomInitial} & {brideInitial}</span>
        </a>

        {/* Universal Section Anchor Links */}
        <nav aria-label="Invitation Navigation" className="hidden list-none items-center gap-7 p-0 text-xs font-semibold tracking-widest text-[var(--cv-text-muted)] uppercase md:flex">
          <li>
            <a href="#story" className="transition hover:text-[var(--cv-gold)]">
              Our Story
            </a>
          </li>
          <li>
            <a href="#schedule" className="transition hover:text-[var(--cv-gold)]">
              Events
            </a>
          </li>
          <li>
            <a href="#gallery" className="transition hover:text-[var(--cv-gold)]">
              Moments
            </a>
          </li>
          <li>
            <a href="#location" className="transition hover:text-[var(--cv-gold)]">
              Venue
            </a>
          </li>
          <li>
            <a href="#rsvp" className="transition hover:text-[var(--cv-gold)]">
              RSVP
            </a>
          </li>
        </nav>

        {/* Ambient Sound & Video Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio / Music Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={audioPlaying ? "Mute Background Music" : "Play Background Music"}
            aria-label={audioPlaying ? "Mute music" : "Play music"}
            className="flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-black/40 px-3 py-1.5 text-xs text-[var(--cv-gold)] backdrop-blur-md transition hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/10 cursor-pointer"
          >
            {audioPlaying ? (
              <>
                <div className="flex h-3 items-end gap-0.5">
                  <span className="w-0.5 animate-pulse bg-[var(--cv-gold)] h-2.5" />
                  <span className="w-0.5 animate-pulse bg-[var(--cv-gold-light)] h-1.5 delay-75" />
                  <span className="w-0.5 animate-pulse bg-[var(--cv-gold)] h-3 delay-150" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider">Music On</span>
              </>
            ) : (
              <>
                <span>🔇</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-text-muted)]">Music Off</span>
              </>
            )}
          </button>

          {/* Video Play / Pause Toggle */}
          <button
            type="button"
            onClick={onToggleVideo}
            title={videoPlaying ? "Pause Background Video" : "Resume Background Video"}
            aria-label={videoPlaying ? "Pause video" : "Resume video"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--cv-border)] bg-black/40 text-[var(--cv-gold)] backdrop-blur-md transition hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/10 cursor-pointer"
          >
            {videoPlaying ? (
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="h-3 w-3 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
