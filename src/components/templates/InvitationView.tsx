import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import BirthdayPartyInvitation from "@/components/templates/BirthdayPartyInvitation";
import CinematicWeddingInvitation from "@/components/templates/CinematicWeddingInvitation";
import CelestialWeddingInvitation from "@/components/templates/CelestialWeddingInvitation";
import BotanicalWeddingInvitation from "@/components/templates/BotanicalWeddingInvitation";
import BurgundyWeddingInvitation from "@/components/templates/BurgundyWeddingInvitation";
import CrimsonWeddingInvitation from "@/components/templates/CrimsonWeddingInvitation";

function isCrimsonWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "crimson-scroll" ||
    template.templateSlug === "crimson-scroll" ||
    template.slug === "riza-nizamudheen" ||
    template.templateSlug === "riza-nizamudheen" ||
    /crimson|scroll|riza|nizamudheen/i.test(template.slug || "") ||
    /crimson|scroll|riza|nizamudheen/i.test(template.templateSlug || "")
  );
}

function isBurgundyWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "burgundy-bloom" ||
    template.templateSlug === "burgundy-bloom" ||
    template.slug === "aysha-basim" ||
    template.templateSlug === "aysha-basim" ||
    /burgundy|bloom|aysha/i.test(template.slug || "") ||
    /burgundy|bloom|aysha/i.test(template.templateSlug || "")
  );
}

function isBotanicalWeddingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "botanical-orangery" ||
    template.templateSlug === "botanical-orangery" ||
    /botanical|orangery/i.test(template.slug || "") ||
    /botanical|orangery/i.test(template.templateSlug || "")
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
  if (isCrimsonWeddingTemplate(template)) {
    return <CrimsonWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isBurgundyWeddingTemplate(template)) {
    return <BurgundyWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isBotanicalWeddingTemplate(template)) {
    return <BotanicalWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isCelestialWeddingTemplate(template)) {
    return <CelestialWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isCinematicWeddingTemplate(template)) {
    return <CinematicWeddingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isHouseWarmingTemplate(template)) {
    return <HouseWarmingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isBirthdayTemplate(template)) {
    return <BirthdayPartyInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  return <RoyalReceptionInvitation template={template} editable={editable} onPublish={onPublish} />;
}
