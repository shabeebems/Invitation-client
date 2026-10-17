import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";

function slugOf(template: InvitationTemplate) {
  return `${template.slug || ""} ${template.templateSlug || ""}`;
}

function matches(template: InvitationTemplate, pattern: RegExp) {
  return pattern.test(slugOf(template));
}

export default function InvitationView({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (
    draft: InvitationTemplate,
    images: PendingImage[],
    orderId?: string
  ) => Promise<string | undefined | void>;
}) {
  const props = { template, editable, onPublish };

  if (matches(template, /parambil-house/i) || /house\s*warm/i.test(template.categoryName || "")) {
    return <HouseWarmingInvitation {...props} />;
  }

  return <RoyalReceptionInvitation {...props} />;
}
