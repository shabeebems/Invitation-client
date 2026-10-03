import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import BirthdayPartyInvitation from "@/components/templates/BirthdayPartyInvitation";
import GrandWeddingInvitation from "@/components/templates/GrandWeddingInvitation";

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
    /eternal|grand|union/i.test(template.slug || "") ||
    /eternal|grand|union/i.test(template.templateSlug || "")
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
