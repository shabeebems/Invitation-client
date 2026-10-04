"use client";

import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import { type InvitationTemplate, type PendingImage } from "@/lib/api";

import CrimsonCoverGate from "./crimson/CrimsonCoverGate";
import CrimsonPetals from "./crimson/CrimsonPetals";
import CrimsonInvocationSection from "./crimson/CrimsonInvocationSection";
import CrimsonCoupleSection from "./crimson/CrimsonCoupleSection";
import CrimsonEventsSection from "./crimson/CrimsonEventsSection";
import CrimsonCountdownSection from "./crimson/CrimsonCountdownSection";

export default function CrimsonWeddingInvitation({
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
  const themeClass = /wine|noir|dark|midnight/i.test(themeTitle)
    ? " theme-wine"
    : /emerald|green|sage/i.test(themeTitle)
    ? " theme-emerald"
    : "";

  const brideName = content.brideName || "Fathimath Riza P";
  const groomName = content.groomName || "Nizamudheen KP";
  const ceremonyDateText = `${content.weekday || "Sunday"} · ${content.day || "2"} ${content.monthYear || "August 2026"}`;
  const hijriDateText = content.headlinePrefix || "18 Safar 1448 AH";
  const scrollBg = "/templates/crimson-scroll/scroll-bg.webp";

  return (
    <main className={`crimson-scroll${themeClass} min-h-screen relative`}>
      {chrome}

      {/* UNIFIED SINGLE BACKGROUND IMAGE FOR ALL SECTIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={scrollBg}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-top"
        />
        {/* Soft heirloom parchment tint */}
        <div className="absolute inset-0 bg-[#fdf5ea]/20" />
      </div>

      {/* UNIFIED REAL-TIME FALLING ROSE PETALS ACROSS THE ENTIRE PAGE */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        <CrimsonPetals />
      </div>

      {/* Interactive Golden Filigree Cover Gate */}
      <CrimsonCoverGate
        groomName={groomName}
        brideName={brideName}
        ceremonyDateText={ceremonyDateText}
        hijriDateText={hijriDateText}
        scrollBg={scrollBg}
        editable={editable}
      />

      {/* Main Continuous Scroll Content (Relative z-20) */}
      <div className="relative z-20">
        {/* Section 1: Sacred Invocation & Welcome */}
        <CrimsonInvocationSection field={field} />

        {/* Section 2: Couple Announcement & Quranic Verse */}
        <CrimsonCoupleSection field={field} />

        {/* Section 3: The 3 Ceremonies (Nikah, Reception, Wedding) & Interactive Maps */}
        <CrimsonEventsSection field={field} />

        {/* Section 4: The Velvet Countdown & Outro */}
        <CrimsonCountdownSection
          eventDateIso={content.eventDateIso || "2026-08-02T11:00:00+05:30"}
          field={field}
        />
      </div>
    </main>
  );
}
