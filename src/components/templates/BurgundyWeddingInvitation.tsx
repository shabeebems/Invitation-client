"use client";

import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

import BurgundyCoverGate from "./burgundy/BurgundyCoverGate";
import BurgundyInvocationSection from "./burgundy/BurgundyInvocationSection";
import BurgundyCoupleSection from "./burgundy/BurgundyCoupleSection";
import BurgundyEventsSection from "./burgundy/BurgundyEventsSection";
import BurgundyCountdownSection from "./burgundy/BurgundyCountdownSection";

export default function BurgundyWeddingInvitation({
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

  // Dynamic Theme Classes
  const themeClass = /noir|black|dark/i.test(themeTitle)
    ? " theme-noir"
    : /emerald|green|sage/i.test(themeTitle)
    ? " theme-emerald"
    : "";

  const brideName = content.brideName || "Aysha Neha";
  const groomName = content.groomName || "Basim Ali";
  const eventDateText = content.coverTagline || "5.9.2026";
  const coverImage = imageUrl(draft.images, "hero") || "/templates/burgundy-bloom/cover-bg.jpg";
  const audioUrl = "/templates/burgundy-bloom/audio.mp3";
  const bgPattern = "/templates/burgundy-bloom/bloom-bg.jpg";
  const mapsUrl = content.mapsUrl || "https://maps.app.goo.gl/SnXKiwnKtErqcHAa7";

  return (
    <main className={`burgundy-bloom${themeClass} min-h-screen relative`}>
      {chrome}

      {/* Interactive Typewriter Cover Gate & Ambient Music */}
      <BurgundyCoverGate
        groomName={groomName}
        brideName={brideName}
        eventDateText={eventDateText}
        coverImage={coverImage}
        audioUrl={audioUrl}
        editable={editable}
      />

      {/* Section 1: Sacred Invocation & Welcome */}
      <BurgundyInvocationSection
        field={field}
        bgPattern={bgPattern}
      />

      {/* Section 2: Couple Announcement & Quranic Blessing */}
      <BurgundyCoupleSection
        field={field}
        bgPattern={bgPattern}
      />

      {/* Section 3: Events & Venue Map Card */}
      <BurgundyEventsSection
        field={field}
        bgPattern={bgPattern}
        mapsUrl={mapsUrl}
      />

      {/* Section 4: Velvet Countdown & Outro Monogram */}
      <BurgundyCountdownSection
        eventDateIso={content.eventDateIso || "2026-09-05T10:45:00+05:30"}
        field={field}
        bgPattern={bgPattern}
      />
    </main>
  );
}
