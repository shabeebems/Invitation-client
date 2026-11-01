import { invitationLiveHref, type InvitationTemplate, type TemplateContent } from "@/lib/api";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/** Guest-facing link: the live page for a saved invitation, the preview for a template. */
export function invitationShareUrl(invitation: Pick<InvitationTemplate, "slug" | "source">) {
  if (typeof window === "undefined" || !invitation.slug) {
    return "";
  }

  const path = invitation.source === "work" ? invitationLiveHref(invitation) : `/preview/${invitation.slug}`;
  return `${window.location.origin}${path}`;
}

function dateLine(content: TemplateContent) {
  const date = [clean(content.weekday), [clean(content.day), clean(content.monthYear)].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  const time = clean(content.time).replace(/^at\s+/i, "");

  return [date, time].filter(Boolean).join(" · ");
}

function weddingVenueLine(content: TemplateContent) {
  const place = [clean(content.venueName), clean(content.venueHall)].filter(Boolean).join(" — ");
  const line = [place, clean(content.venueCity)].filter(Boolean).join(", ");

  if (line) {
    return line;
  }

  const first = content.locationItems?.[0];
  return [clean(first?.title), clean(first?.address)].filter(Boolean).join(", ") || clean(content.addressFull);
}

export function buildWeddingShareMessage(
  content: TemplateContent,
  options: { occasion?: string; closing?: string } = {}
) {
  const parts: string[] = [];
  const bismillah = clean(content.bismillah);
  const couple = [clean(content.groomName), clean(content.brideName)].filter(Boolean).join(" & ");
  const families = [clean(content.hostNames), clean(content.brideParents)].filter(Boolean);

  if (bismillah) {
    parts.push(bismillah);
  }

  const intro = [`You're invited to the ${options.occasion || "wedding"}${couple ? ` of *${couple}*` : ""}`];
  if (families.length === 1) {
    intro.push(`Hosted by the family of ${families[0]}`);
  } else if (families.length === 2) {
    intro.push(`Hosted by the families of ${families[0]} and ${families[1]}`);
  }

  const when = dateLine(content);
  if (when) {
    intro.push(`🗓 ${when}`);
  }

  const where = weddingVenueLine(content);
  if (where) {
    intro.push(`📍 ${where}`);
  }

  parts.push(intro.join("\n"));

  if (options.closing) {
    parts.push(options.closing);
  }

  return parts.join("\n\n");
}

export function buildHouseShareMessage(content: TemplateContent) {
  const parts: string[] = [];
  const bismillah = clean(content.bismillah);
  const houseName = clean(content.houseName);
  const hostNames = clean(content.hostNames);
  const familyLine = clean(content.familyLine);

  if (bismillah) {
    parts.push(bismillah);
  }

  const titleLines: string[] = [];
  if (houseName) {
    titleLines.push(`🏡 *${houseName}*`);
  }
  if (hostNames) {
    titleLines.push(`Warm Welcome to the New Home of\n*${hostNames}*${familyLine ? `\n_${familyLine}_` : ""}`);
  }
  if (titleLines.length > 0) {
    parts.push(titleLines.join("\n\n"));
  }

  const when = dateLine(content);
  if (when) {
    parts.push(`🗓 *Event Date & Time:*\n*${when}*`);
  }

  const address =
    clean(content.addressFull) || [clean(content.venueName), clean(content.venueCity)].filter(Boolean).join(", ");
  if (address) {
    parts.push(`📍 *Address:*\n${address}`);
  }

  return parts.join("\n\n");
}

/** The owner's edited message when set, otherwise the message built from the invitation details. */
export function resolveShareMessage(content: TemplateContent, builtMessage: string) {
  return clean(content.shareMessage) || builtMessage;
}

export function withInvitationLink(message: string, url: string) {
  return url ? `${message}\n\n🔗 View invitation:\n${url}` : message;
}

export function whatsappShareHref(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppShare(message: string) {
  window.open(whatsappShareHref(message), "_blank", "noopener,noreferrer");
}
