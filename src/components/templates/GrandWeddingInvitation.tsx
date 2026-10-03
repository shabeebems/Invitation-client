"use client";

import { useRef, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import {
  type InvitationTemplate,
  type PendingImage,
  imageUrl,
  withImageUrl,
} from "@/lib/api";

import WeddingEnvelope from "@/components/templates/wedding/WeddingEnvelope";
import WeddingHero from "@/components/templates/wedding/WeddingHero";
import WeddingCountdown from "@/components/templates/wedding/WeddingCountdown";
import WeddingStory from "@/components/templates/wedding/WeddingStory";
import WeddingEvents from "@/components/templates/wedding/WeddingEvents";
import WeddingGallery from "@/components/templates/wedding/WeddingGallery";
import WeddingLocation from "@/components/templates/wedding/WeddingLocation";
import WeddingRsvp from "@/components/templates/wedding/WeddingRsvp";
import WeddingAudio from "@/components/templates/wedding/WeddingAudio";

export default function GrandWeddingInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const { draft, setDraft, content, editing, persist, field, themeTitle, chrome } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
  });

  // Default envelope closed for guests; opened for editors for instant field access
  const [openedEnvelope, setOpenedEnvelope] = useState(editable);
  const heroRef = useRef<HTMLDivElement>(null);

  const heroImageUrl = imageUrl(draft.images, "hero");
  const groomInitial = (content.groomName || "I").trim().charAt(0) || "I";
  const brideInitial = (content.brideName || "A").trim().charAt(0) || "A";

  // Dynamic Theme Class
  const themeClass = /emerald|garden/i.test(themeTitle)
    ? " theme-emerald"
    : /nocturne|midnight|navy/i.test(themeTitle)
    ? " theme-nocturne"
    : "";

  function handleHeroImageChange(file: File) {
    const preview = URL.createObjectURL(file);
    setDraft((prev) => ({
      ...prev,
      images: withImageUrl(prev.images, "hero", preview),
    }));
    void persist(draft.content, { file, slot: "hero" });
  }

  function handleGalleryImageChange(file: File, index: number) {
    const preview = URL.createObjectURL(file);
    const existing = [...(draft.content.galleryItems || [])];
    const item = existing[index] || { eyebrow: "Moments", title: "Gallery", caption: "", url: "" };
    existing[index] = { ...item, url: preview };

    const nextContent = { ...draft.content, galleryItems: existing };
    setDraft((prev) => ({ ...prev, content: nextContent }));
    void persist(nextContent, { file, slot: "gallery", galleryIndex: index });
  }

  function handleCommitProgramItem(index: number, key: string, value: string) {
    const current = [...(draft.content.programItems || [])];
    if (!current[index]) {
      current[index] = { time: "", title: "", description: "" };
    }
    current[index] = { ...current[index], [key]: value };

    const nextContent = { ...draft.content, programItems: current };
    setDraft((prev) => ({ ...prev, content: nextContent }));
    void persist(nextContent);
  }

  function handleEnvelopeOpen() {
    setOpenedEnvelope(true);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <main className={`eternal-union${themeClass}`}>
      {chrome}
      <WeddingAudio />

      {/* Interactive Envelope Screen */}
      {!openedEnvelope ? (
        <WeddingEnvelope
          groomInitial={groomInitial}
          brideInitial={brideInitial}
          tagline={content.envelopeTagline || "Together with their families"}
          onOpen={handleEnvelopeOpen}
          editable={editing}
          field={field}
        />
      ) : (
        /* Top Royal Navigation Bar */
        <nav
          aria-label="Wedding Navigation"
          className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--eu-border-light)] bg-[var(--eu-bg-surface)]/85 px-4 py-3 shadow-md backdrop-blur-xl sm:px-8"
        >
          {/* Couple Monogram Crest */}
          <a href="#" className="flex items-center gap-2 font-serif text-lg font-bold tracking-widest text-[var(--eu-gold)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--eu-gold)] text-xs">
              ✦
            </span>
            <span>{groomInitial} & {brideInitial}</span>
          </a>

          {/* Section Anchors */}
          <ul className="hidden list-none items-center gap-6 p-0 text-xs font-semibold tracking-widest text-[var(--eu-text-muted)] uppercase md:flex">
            <li>
              <a href="#schedule" className="transition hover:text-[var(--eu-gold)]">
                Program
              </a>
            </li>
            <li>
              <a href="#gallery" className="transition hover:text-[var(--eu-gold)]">
                Moments
              </a>
            </li>
            <li>
              <a href="#location" className="transition hover:text-[var(--eu-gold)]">
                Venue
              </a>
            </li>
            <li>
              <a href="#rsvp" className="transition hover:text-[var(--eu-gold)]">
                RSVP
              </a>
            </li>
          </ul>

          {/* Replay Envelope Trigger */}
          <button
            type="button"
            onClick={() => setOpenedEnvelope(false)}
            title="Replay Envelope Wax Seal Opening"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--eu-border)] bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wider text-[var(--eu-gold-light)] hover:border-[var(--eu-gold)] hover:bg-[var(--eu-gold)]/10"
          >
            <span>✉️</span>
            <span className="hidden sm:inline">Replay Seal</span>
          </button>
        </nav>
      )}

      {/* Main Wedding Invitation Content */}
      <div ref={heroRef} className={`relative z-10 transition-opacity duration-1000 ${openedEnvelope ? "opacity-100" : "hidden"}`}>
        <WeddingHero
          heroImageUrl={heroImageUrl}
          editable={editing}
          field={field}
          onImageChange={handleHeroImageChange}
        />

        <WeddingCountdown
          eventDateIso={content.eventDateIso}
          eventEndIso={content.eventEndIso}
          title={`${content.groomName || "Groom"} & ${content.brideName || "Bride"}`}
          venueName={content.venueName}
          venueCity={content.venueCity}
          field={field}
        />

        <WeddingStory field={field} />

        <WeddingEvents
          items={content.programItems}
          editable={editing}
          field={field}
          onCommitItem={handleCommitProgramItem}
        />

        <WeddingGallery
          items={content.galleryItems}
          editable={editing}
          field={field}
          onImageChange={handleGalleryImageChange}
        />

        <div id="location">
          <WeddingLocation
            mapsUrl={content.mapsUrl || content.googleMapsUrl}
            addressFull={content.addressFull}
            venueName={content.venueName}
            venueHall={content.venueHall}
            venueCity={content.venueCity}
            field={field}
          />
        </div>

        <WeddingRsvp field={field} />

        {/* Footer Blessing & Family Note */}
        <footer className="border-t border-[var(--eu-border-light)] py-14 text-center">
          <div className="mx-auto max-w-md space-y-3 px-4">
            <p className="font-serif text-2xl font-light text-[var(--eu-gold)] italic">
              {field("closingBlessing", "font-serif text-2xl font-light text-[var(--eu-gold)] italic")}
            </p>
            <p className="text-xs font-light tracking-widest text-[var(--eu-text-muted)] uppercase">
              {field("presenceLine", "text-xs font-light tracking-widest text-[var(--eu-text-muted)] uppercase")}
            </p>
            <p className="pt-4 text-[10px] tracking-[0.2em] text-[var(--eu-text-faint)] uppercase">
              {field("footer", "text-[10px] tracking-[0.2em] text-[var(--eu-text-faint)] uppercase")}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
