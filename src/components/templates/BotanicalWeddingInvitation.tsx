"use client";

import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import {
  type InvitationTemplate,
  type PendingImage,
} from "@/lib/api";

import BotanicalPetalsCanvas from "@/components/templates/botanical/BotanicalPetalsCanvas";
import BotanicalHero from "@/components/templates/botanical/BotanicalHero";
import BotanicalFeastMenu from "@/components/templates/botanical/BotanicalFeastMenu";
import BotanicalRsvpCard from "@/components/templates/botanical/BotanicalRsvpCard";

export default function BotanicalWeddingInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const { field, themeTitle, chrome } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
  });

  // Dynamic Theme Classes
  const themeClass = /jasmine|riviera/i.test(themeTitle)
    ? " theme-jasmine"
    : /amalfi|lemon/i.test(themeTitle)
    ? " theme-amalfi"
    : "";

  return (
    <main className={`botanical-orangery${themeClass} min-h-screen relative`}>
      {chrome}

      {/* Interactive Falling Flower Petal & Leaf Physics Canvas */}
      <BotanicalPetalsCanvas />

      {/* 1. Hero Section (No Navbar, Handmade Italian Deckled-Edge Letter & Pressed Olive Branch) */}
      <BotanicalHero field={field} />

      {/* 2. Exclusive Tuscan Harvest Feast & Banquet Tasting Menu */}
      <BotanicalFeastMenu field={field} />

      {/* 3. Terracotta Garden RSVP & Herbarium Dietary Card */}
      <BotanicalRsvpCard field={field} />
    </main>
  );
}
