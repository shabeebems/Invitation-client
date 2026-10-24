/**
 * Max characters per invitation text field.
 * Keep in sync with server/src/common/helpers/content-limits.ts
 */
export const DEFAULT_CONTENT_MAX = 200;

export const CONTENT_FIELD_MAX: Record<string, number> = {
  bismillah: 120,
  hostLabel: 120,
  hostNames: 80,
  introLine: 160,
  groomName: 40,
  brideName: 40,
  brideParentsLabel: 40,
  brideParents: 80,
  presenceLine: 220,
  weekday: 24,
  day: 8,
  monthYear: 40,
  time: 40,
  venueLabel: 40,
  venueName: 80,
  venueHall: 80,
  venueCity: 80,
  mapsUrl: 500,
  hashtag: 48,
  blessing: 400,
  inviteLine: 220,
  footer: 120,
  shareText: 1200,
  envelopeTagline: 80,
  skipLabel: 40,
  openHint: 80,
  bismillahTranslation: 120,
  mashallahBadge: 60,
  headlinePrefix: 80,
  familyLine: 80,
  houseName: 80,
  eventDateIso: 48,
  eventEndIso: 48,
  countdownHeading: 80,
  countdownSubtitle: 80,
  countdownLiveLabel: 80,
  countdownLayout: 32,
  heroLayout: 32,
  ambianceEffect: 32,
  programLayout: 32,
  programEyebrow: 40,
  programTitle: 80,
  programIntro: 280,
  galleryEyebrow: 40,
  galleryTitle: 80,
  galleryIntro: 280,
  galleryCtaLabel: 40,
  galleryLayout: 32,
  viewPhotoLabel: 40,
  locationEyebrow: 40,
  locationTitle: 80,
  locationIntro: 280,
  locationLayout: 32,
  destinationLabel: 40,
  addressFull: 200,
  addressShort: 80,
  googleMapsUrl: 500,
  copyAddressLabel: 40,
  hamdalah: 80,
  closingBlessing: 400,
  closingPresence: 120,
  replayLabel: 40,
  craftedBy: 80,
  addToCalendarLabel: 40,
  getDirectionsLabel: 40,
  calendarModalTitle: 80,
  calendarModalDesc: 200,
  googleCalendarLabel: 40,
  icsCalendarLabel: 40,
  dressCode: 80,
  dressColors: 320,
  dressPaletteLabel: 40,
  rsvpNote: 200,
  storyTitle: 80,
  storyText: 600,
  meetCoupleTitle: 80,
  meetCoupleIntro: 220,
  meetCoupleLayout: 32,
  groomLabel: 40,
  groomBio: 320,
  groomDetail: 120,
  brideLabel: 40,
  brideBio: 320,
  brideDetail: 120,
  loveStoryTitle: 80,
  loveStoryIntro: 280,
  loveStoryLayout: 32,
  amenityOneLabel: 40,
  amenityOneDetail: 80,
  amenityTwoLabel: 40,
  amenityTwoDetail: 80,
  amenityThreeLabel: 40,
  amenityThreeDetail: 80,
  footerLayout: 32,
  storyLayout: 32,
  quoteLayout: 32,
};

export const PROGRAM_ITEM_MAX = {
  time: 40,
  title: 80,
  description: 280,
  mapsUrl: 500,
} as const;

export const GALLERY_ITEM_MAX = {
  eyebrow: 40,
  title: 80,
  caption: 200,
} as const;

export const LOVE_STORY_ITEM_MAX = {
  date: 40,
  place: 80,
  title: 80,
} as const;

export const LOCATION_ITEM_MAX = {
  label: 40,
  title: 80,
  address: 200,
  mapsUrl: 500,
} as const;

export const MAX_GALLERY_ITEMS = 20;
export const MAX_LOVE_STORY_ITEMS = 15;
export const MAX_LOCATION_ITEMS = 8;
export const MAX_PROGRAM_ITEMS = 16;

export function maxForContentField(key: string | number | symbol): number {
  if (typeof key !== "string") {
    return DEFAULT_CONTENT_MAX;
  }
  return CONTENT_FIELD_MAX[key] ?? DEFAULT_CONTENT_MAX;
}

export function clampText(value: string, max: number): string {
  if (value.length <= max) {
    return value;
  }
  return value.slice(0, max);
}
