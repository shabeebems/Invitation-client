import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import CelestialWeddingInvitation from "@/components/templates/CelestialWeddingInvitation";

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
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const props = { template, editable, onPublish };

  if (matches(template, /celestial-starlight|celestial|starlight/i)) {
    return <CelestialWeddingInvitation {...props} />;
  }

  if (matches(template, /parambil-house/i) || /house\s*warm/i.test(template.categoryName || "")) {
    return <HouseWarmingInvitation {...props} />;
  }

  return <RoyalReceptionInvitation {...props} />;
}
