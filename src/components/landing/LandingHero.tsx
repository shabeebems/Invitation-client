import { HERO_IMAGE_WIDTHS, heroImageUrl } from "@/lib/landing-assets";
import { cormorant } from "@/lib/fonts";
import LandingBotanical from "./LandingBotanical";

export default function LandingHero() {
  return (
    <section className="ld-hero" aria-labelledby="ld-hero-title">
      <div className="ld-hero-media">
        {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary serves the responsive renditions */}
        <img
          src={heroImageUrl(1600)}
          srcSet={HERO_IMAGE_WIDTHS.map((width) => `${heroImageUrl(width)} ${width}w`).join(", ")}
          sizes="(min-width: 1024px) 62vw, 100vw"
          alt="Stone archway wrapped in peach and ivory roses, overlooking the sea and mountains"
          fetchPriority="high"
          decoding="async"
          className="ld-hero-img"
        />
        <svg className="ld-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 120V78C190 52 380 92 640 86C900 80 1120 18 1440 34V120Z" />
        </svg>
      </div>

      <LandingBotanical className="ld-botanical ld-botanical--top" />
      <LandingBotanical className="ld-botanical ld-botanical--bottom" />

      <div className="ld-hero-inner">
        <div className="ld-hero-copy">
          <p className="ld-eyebrow">Your story, our designs</p>
          <h1 id="ld-hero-title" className={`ld-title ${cormorant.className}`}>
            Beautiful Invitations
            <br />
            for <span>Every Occasion</span>
          </h1>
          <p className="ld-lead">
            From intimate gatherings to grand celebrations, find the perfect template to make your
            moments unforgettable.
          </p>
          <a href="#templates" className="ld-cta">
            Explore Templates
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
