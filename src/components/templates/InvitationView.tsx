import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import BirthdayPartyInvitation from "@/components/templates/BirthdayPartyInvitation";
import GrandWeddingInvitation from "@/components/templates/GrandWeddingInvitation";
import CinematicWeddingInvitation from "@/components/templates/CinematicWeddingInvitation";
import CelestialWeddingInvitation from "@/components/templates/CelestialWeddingInvitation";
import VogueWeddingInvitation from "@/components/templates/VogueWeddingInvitation";

function isVogueWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "editorial-vogue" ||
    template.templateSlug === "editorial-vogue" ||
    /editorial|vogue/i.test(template.slug || "") ||
    /editorial|vogue/i.test(template.templateSlug || "")
  );
}

function isCelestialWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "celestial-starlight" ||
    template.templateSlug === "celestial-starlight" ||
    /celestial|starlight/i.test(template.slug || "") ||
    /celestial|starlight/i.test(template.templateSlug || "")
  );
}

function isHouseWarmingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "parambil-house" ||
    template.templateSlug === "parambil-house" ||
    /house\s*warm/i.test(template.categoryName || "")
  );
}

function isBirthdayTemplate(template: InvitationTemplate) {
  return (
    template.slug === "midnight-birthday" ||
    template.templateSlug === "midnight-birthday" ||
    /birthday/i.test(template.categoryName || "")
  );
}

function isGrandWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "eternal-union" ||
    template.templateSlug === "eternal-union" ||
    /eternal|union/i.test(template.slug || "") ||
    /eternal|union/i.test(template.templateSlug || "")
  );
}

function isCinematicWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "cinematic-vows" ||
    template.templateSlug === "cinematic-vows" ||
    /cinematic|vows/i.test(template.slug || "") ||
    /cinematic|vows/i.test(template.templateSlug || "")
  );
}

export default function InvitationView({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  if (isVogueWeddingTemplate(template)) {
    return <VogueWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isCelestialWeddingTemplate(template)) {
    return <CelestialWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isCinematicWeddingTemplate(template)) {
    return <CinematicWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isGrandWeddingTemplate(template)) {
    return <GrandWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isHouseWarmingTemplate(template)) {
    return <HouseWarmingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isBirthdayTemplate(template)) {
    return <BirthdayPartyInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  return <RoyalReceptionInvitation template={template} editable={editable} onPublish={onPublish} />;
}
