export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type AdminUser = {
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  isAdmin: boolean;
  emailVerified?: boolean;
  hasPassword?: boolean;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  imageUrl: string;
};

export type TemplateContent = {
  bismillah?: string;
  hostLabel?: string;
  hostNames?: string;
  introLine?: string;
  groomName?: string;
  brideName?: string;
  brideParentsLabel?: string;
  brideParents?: string;
  presenceLine?: string;
  weekday?: string;
  day?: string;
  monthYear?: string;
  time?: string;
  dayNote?: string;
  venueLabel?: string;
  venueName?: string;
  venueHall?: string;
  venueCity?: string;
  mapsUrl?: string;
  hashtag?: string;
  blessing?: string;
  inviteLine?: string;
  footer?: string;
  shareText?: string;
  envelopeTagline?: string;
  skipLabel?: string;
  openHint?: string;
  bismillahTranslation?: string;
  mashallahBadge?: string;
  headlinePrefix?: string;
  familyLine?: string;
  houseName?: string;
  eventDateIso?: string;
  eventEndIso?: string;
  countdownHeading?: string;
  countdownLiveLabel?: string;
  programEyebrow?: string;
  programTitle?: string;
  programIntro?: string;
  programItems?: ProgramItem[];
  galleryEyebrow?: string;
  galleryTitle?: string;
  galleryIntro?: string;
  galleryItems?: GalleryItem[];
  viewPhotoLabel?: string;
  locationEyebrow?: string;
  locationTitle?: string;
  locationIntro?: string;
  destinationLabel?: string;
  addressFull?: string;
  addressShort?: string;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
  copyAddressLabel?: string;
  openGoogleLabel?: string;
  openAppleLabel?: string;
  hamdalah?: string;
  closingBlessing?: string;
  closingPresence?: string;
  replayLabel?: string;
  craftedBy?: string;
  navCelebration?: string;
  navProgram?: string;
  navTour?: string;
  navLocation?: string;
  addToCalendarLabel?: string;
  getDirectionsLabel?: string;
  calendarModalTitle?: string;
  calendarModalDesc?: string;
  googleCalendarLabel?: string;
  icsCalendarLabel?: string;
  celebrantName?: string;
  ageLabel?: string;
  partyTitle?: string;
  dressCode?: string;
  storyTitle?: string;
  storyText?: string;
  receptionTitle?: string;
  ceremonyTitle?: string;
  musicTitle?: string;
};

export type ProgramItem = {
  time: string;
  title: string;
  description: string;
};

export type GalleryItem = {
  eyebrow: string;
  title: string;
  caption: string;
  url: string;
  publicId?: string;
};

export type InvitationTheme = {
  id: string;
  title: string;
  templateId: string;
};

export type TemplateImage = {
  slot: string;
  url: string;
};

export function imageUrl(images: TemplateImage[] | undefined, slot: string) {
  return images?.find((image) => image.slot === slot)?.url || "";
}

export function withImageUrl(
  images: TemplateImage[] | undefined,
  slot: string,
  url: string
): TemplateImage[] {
  const next = [...(images || [])];
  const index = next.findIndex((image) => image.slot === slot);

  if (index >= 0) {
    next[index] = { ...next[index], url };
  } else {
    next.push({ slot, url });
  }

  return next;
}

export type PendingImage = {
  file: File;
  slot: "hero" | "gallery";
  galleryIndex?: number;
};

export function rememberPendingImage(current: PendingImage[], next: PendingImage): PendingImage[] {
  return [
    ...current.filter((item) =>
      next.slot === "gallery"
        ? !(item.slot === "gallery" && item.galleryIndex === next.galleryIndex)
        : item.slot !== "hero"
    ),
    next,
  ];
}

export type InvitationSource = "template" | "work";

export type InvitationTemplate = {
  id: string;
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  source?: InvitationSource;
  images: TemplateImage[];
  categoryId: string;
  categoryName: string;
  templateId?: string;
  templateName?: string;
  templateSlug?: string;
  userId?: string;
  selectedThemeId: string;
  selectedThemeTitle: string;
  themes: InvitationTheme[];
  content: TemplateContent;
};

export function invitationApiBase(template: Pick<InvitationTemplate, "slug" | "source">) {
  const kind = template.source === "work" ? "works" : "templates";
  return `${API_URL}/api/${kind}/${template.slug}`;
}

export function invitationDoneHref(template: Pick<InvitationTemplate, "source">) {
  return template.source === "work" ? "/account" : "/admin/templates";
}

export function invitationPreviewHref(template: Pick<InvitationTemplate, "slug" | "source">) {
  return template.source === "work" ? `/preview/work/${template.slug}` : `/preview/${template.slug}`;
}

export function invitationLiveHref(template: Pick<InvitationTemplate, "slug">) {
  return `/${template.slug}`;
}

export function invitationTitle(template: InvitationTemplate) {
  return (
    template.content.hostNames ||
    template.content.celebrantName ||
    [template.content.groomName, template.content.brideName].filter(Boolean).join(" & ") ||
    template.name
  );
}

async function readInvitation(url: string, key: "template" | "work"): Promise<InvitationTemplate | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      success?: boolean;
      template?: InvitationTemplate;
      work?: InvitationTemplate;
    };

    const invitation = key === "work" ? data.work || data.template : data.template;
    return data.success && invitation ? invitation : null;
  } catch {
    return null;
  }
}

export function fetchTemplate(slug: string) {
  return readInvitation(`${API_URL}/api/templates/${slug}`, "template");
}

export async function fetchTemplates(): Promise<InvitationTemplate[]> {
  try {
    const response = await fetch(`${API_URL}/api/templates`, { cache: "no-store" });
    const data = (await response.json()) as { success?: boolean; templates?: InvitationTemplate[] };
    return response.ok && data.success ? data.templates || [] : [];
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/api/categories`, { cache: "no-store" });
    const data = (await response.json()) as { success?: boolean; categories?: Category[] };
    return response.ok && data.success ? data.categories || [] : [];
  } catch {
    return [];
  }
}

export function fetchWork(slug: string) {
  return readInvitation(`${API_URL}/api/works/${slug}`, "work");
}
