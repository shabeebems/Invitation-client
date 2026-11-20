"use client";

import dynamic from "next/dynamic";
import BrandLoader from "@/components/brand/BrandLoader";
import type { InvitationTemplate, PendingImage } from "@/lib/api";

type ViewProps = {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (
    draft: InvitationTemplate,
    images: PendingImage[],
    orderId?: string
  ) => Promise<string | undefined | void>;
};

const chunkFallback = () => <BrandLoader label="Opening invitation…" />;

const HouseWarmingInvitation = dynamic(() => import("@/components/templates/HouseWarmingInvitation"), {
  loading: chunkFallback,
});
const VelvetHeritageInvitation = dynamic(() => import("@/components/templates/VelvetHeritageInvitation"), {
  loading: chunkFallback,
});
const BotanicalScriptInvitation = dynamic(() => import("@/components/templates/BotanicalScriptInvitation"), {
  loading: chunkFallback,
});
const RoyalRubyInvitation = dynamic(() => import("@/components/templates/RoyalRubyInvitation"), {
  loading: chunkFallback,
});
const AureliaNocturneInvitation = dynamic(() => import("@/components/templates/AureliaNocturneInvitation"), {
  loading: chunkFallback,
});
const CreamEditorialInvitation = dynamic(() => import("@/components/templates/CreamEditorialInvitation"), {
  loading: chunkFallback,
});
const RoyalReceptionInvitation = dynamic(() => import("@/components/templates/RoyalReceptionInvitation"), {
  loading: chunkFallback,
});

function slugOf(template: InvitationTemplate) {
  return `${template.slug || ""} ${template.templateSlug || ""}`;
}

function matches(template: InvitationTemplate, pattern: RegExp) {
  return pattern.test(slugOf(template));
}

export default function InvitationView({ template, editable = false, onPublish }: ViewProps) {
  const props = { template, editable, onPublish };

  if (matches(template, /parambil-house/i) || /house\s*warm/i.test(template.categoryName || "")) {
    return <HouseWarmingInvitation {...props} />;
  }

  if (matches(template, /velvet-heritage|velvet/i)) {
    return <VelvetHeritageInvitation {...props} />;
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
