import type { InvitationTemplate } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";

export function isHouseWarmingTemplate(template: InvitationTemplate) {
  return template.slug === "parambil-house" || /house\s*warm/i.test(template.categoryName || "");
}

export default function InvitationView({
  template,
  editable = false,
}: {
  template: InvitationTemplate;
  editable?: boolean;
}) {
  if (isHouseWarmingTemplate(template)) {
    return <HouseWarmingInvitation template={template} editable={editable} />;
  }

  return <RoyalReceptionInvitation template={template} editable={editable} />;
}
