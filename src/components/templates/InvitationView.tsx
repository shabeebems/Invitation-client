import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import BirthdayPartyInvitation from "@/components/templates/BirthdayPartyInvitation";

export function isHouseWarmingTemplate(template: InvitationTemplate) {
  return (
    template.slug === "parambil-house" ||
    template.templateSlug === "parambil-house" ||
    /house\s*warm/i.test(template.categoryName || "")
  );
}

export function isBirthdayTemplate(template: InvitationTemplate) {
  return (
    template.slug === "midnight-birthday" ||
    template.templateSlug === "midnight-birthday" ||
    /birthday/i.test(template.categoryName || "")
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
  if (isHouseWarmingTemplate(template)) {
    return <HouseWarmingInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  if (isBirthdayTemplate(template)) {
    return <BirthdayPartyInvitation template={template} editable={editable} onPublish={onPublish} />;
  }

  return <RoyalReceptionInvitation template={template} editable={editable} onPublish={onPublish} />;
}
