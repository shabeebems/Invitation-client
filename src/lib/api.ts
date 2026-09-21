export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type AdminUser = {
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
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

export type InvitationTemplate = {
  id: string;
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  images: TemplateImage[];
  categoryId: string;
  categoryName: string;
  selectedThemeId: string;
  selectedThemeTitle: string;
  themes: InvitationTheme[];
  content: TemplateContent;
};
