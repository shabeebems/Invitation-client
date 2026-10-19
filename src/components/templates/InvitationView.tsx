import type { InvitationTemplate, PendingImage } from "@/lib/api";
import RoyalReceptionInvitation from "@/components/templates/RoyalReceptionInvitation";
import HouseWarmingInvitation from "@/components/templates/HouseWarmingInvitation";
import VelvetHeritageInvitation from "@/components/templates/VelvetHeritageInvitation";
import PalaceParchmentInvitation from "@/components/templates/PalaceParchmentInvitation";
import BotanicalScriptInvitation from "@/components/templates/BotanicalScriptInvitation";
import RoyalRubyInvitation from "@/components/templates/RoyalRubyInvitation";
import AureliaNocturneInvitation from "@/components/templates/AureliaNocturneInvitation";
import CreamEditorialInvitation from "@/components/templates/CreamEditorialInvitation";

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

  if (matches(template, /velvet-heritage|velvet/i)) {
    return <VelvetHeritageInvitation {...props} />;
  }

  if (matches(template, /palace-parchment|palace/i)) {
    return <PalaceParchmentInvitation {...props} />;
  }

  if (matches(template, /botanical-script|botanical/i)) {
    return <BotanicalScriptInvitation {...props} />;
  }

  if (matches(template, /royal-ruby|ruby/i)) {
    return <RoyalRubyInvitation {...props} />;
  }

  if (matches(template, /aurelia-nocturne|aurelia/i)) {
    return <AureliaNocturneInvitation {...props} />;
  }

  if (matches(template, /cream-editorial|cream/i)) {
    return <CreamEditorialInvitation {...props} />;
  }

  return <RoyalReceptionInvitation {...props} />;
}
