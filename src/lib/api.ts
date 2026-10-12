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
  [key: string]: any;
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
  /** classic | ornate | rings | ribbon | minimal */
  countdownLayout?: string;
  /** petals | stars | butterflies | sparkles | hearts | none */
  ambianceEffect?: string;
  programEyebrow?: string;
  programTitle?: string;
  programIntro?: string;
  programItems?: ProgramItem[];
  galleryEyebrow?: string;
  galleryTitle?: string;
  galleryIntro?: string;
  /** grid | masonry | polaroid | carousel | scrapbook */
  galleryLayout?: string;
  galleryItems?: GalleryItem[];
  viewPhotoLabel?: string;
  locationEyebrow?: string;
  locationTitle?: string;
  locationIntro?: string;
  /** split | palace | folio | cards | compact */
  locationLayout?: string;
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
  dressCode?: string;
  rsvpNote?: string;
  storyTitle?: string;
  storyText?: string;
  meetCoupleTitle?: string;
  meetCoupleIntro?: string;
  /** classic | oval | framed | stacked | cards */
  meetCoupleLayout?: string;
  groomLabel?: string;
  groomBio?: string;
  groomDetail?: string;
  brideLabel?: string;
  brideBio?: string;
  brideDetail?: string;
  loveStoryTitle?: string;
  /** journey | magazine | cards | path | album */
  loveStoryLayout?: string;
  loveStoryItems?: LoveStoryItem[];
  locationItems?: LocationItem[];
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

export type LoveStoryItem = {
  icon: string;
  date: string;
  place: string;
  title: string;
  url?: string;
  publicId?: string;
};

export type LocationItem = {
  label: string;
  title: string;
  address: string;
  mapsUrl: string;
  appleMapsUrl?: string;
};

export type InvitationTheme = {
  id: string;
  title: string;
  templateId: string;
};

export type TemplateImage = {
  slot: string;
  url: string;
  publicId?: string;
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

export type ImageSlot = "hero" | "gallery" | "groom" | "bride" | "loveStory";

export type PendingImage = {
  file: File;
  slot: ImageSlot;
  galleryIndex?: number;
  loveStoryIndex?: number;
};

export function rememberPendingImage(current: PendingImage[], next: PendingImage): PendingImage[] {
  return [
    ...current.filter((item) => {
      if (next.slot === "gallery") {
        return !(item.slot === "gallery" && item.galleryIndex === next.galleryIndex);
      }
      if (next.slot === "loveStory") {
        return !(item.slot === "loveStory" && item.loveStoryIndex === next.loveStoryIndex);
      }
      return item.slot !== next.slot;
    }),
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

export function invitationDoneHref(
  template: Pick<InvitationTemplate, "source">,
  role?: AdminUser["role"]
) {
  if (template.source === "work") {
    return role === "admin" ? "/admin/works" : "/user/invitations";
  }

  return "/admin/templates";
}

export function invitationPreviewHref(
  template: Pick<InvitationTemplate, "slug" | "source">,
  role?: AdminUser["role"]
) {
  if (role === "admin") {
    return template.source === "work"
      ? `/admin/works/${template.slug}`
      : `/admin/templates/${template.slug}`;
  }

  if (template.source === "work") {
    return role === "customer" ? `/user/works/${template.slug}` : `/preview/work/${template.slug}`;
  }

  return `/preview/${template.slug}`;
}

export function invitationEditHref(
  template: Pick<InvitationTemplate, "slug" | "source">,
  role?: AdminUser["role"]
) {
  if (role === "customer" && template.source === "work") {
    return `/user/works/${template.slug}/edit`;
  }

  return `${invitationPreviewHref(template, role)}/edit`;
}

export function invitationLiveHref(template: Pick<InvitationTemplate, "slug">) {
  return `/${template.slug}`;
}

export function invitationTitle(template: InvitationTemplate) {
  return (
    template.content.hostNames ||
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

export function resolveTemplateSlug(slug: string) {
  return slug;
}

type ListFetchOptions = {
  credentials?: RequestCredentials;
};

async function readList<T>(
  url: string,
  key: "templates" | "categories" | "works",
  options: ListFetchOptions = {}
): Promise<T[]> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: options.credentials,
    });
    const data = (await response.json()) as {
      success?: boolean;
      templates?: T[];
      categories?: T[];
      works?: T[];
      message?: string;
    };

    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to load ${key}`);
    }

    return (data[key] as T[] | undefined) || [];
  } catch (error) {
    if (options.credentials) {
      throw error;
    }
    return [];
  }
}

export function fetchTemplate(slug: string) {
  return readInvitation(`${API_URL}/api/templates/${resolveTemplateSlug(slug)}`, "template");
}

export function fetchTemplates(options: ListFetchOptions = {}) {
  return readList<InvitationTemplate>(`${API_URL}/api/templates`, "templates", options);
}

export function fetchCategories(options: ListFetchOptions = {}) {
  return readList<Category>(`${API_URL}/api/categories`, "categories", options);
}

export function fetchWorks(options: ListFetchOptions = {}) {
  return readList<InvitationTemplate>(`${API_URL}/api/works`, "works", {
    credentials: options.credentials || "include",
  });
}

export type StudioUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  emailVerified: boolean;
  createdAt?: string;
};

export async function fetchUsers(): Promise<StudioUser[]> {
  const response = await fetch(`${API_URL}/api/users`, {
    cache: "no-store",
    credentials: "include",
  });
  const data = (await response.json()) as {
    success?: boolean;
    users?: StudioUser[];
    message?: string;
  };

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load users");
  }

  return data.users || [];
}

export function fetchWork(slug: string) {
  return readInvitation(`${API_URL}/api/works/${slug}`, "work");
}

export async function createWork(body: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/api/works`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as {
    success?: boolean;
    message?: string;
    work?: InvitationTemplate;
  };

  if (!response.ok || !data.success || !data.work) {
    throw new Error(data.message || "Could not create work");
  }

  return data.work;
}

export async function updateWork(
  slug: string,
  content: TemplateContent,
  image?: PendingImage
) {
  const body = new FormData();
  body.append("content", JSON.stringify(content));

  if (image) {
    body.append("image", image.file);
    body.append("imageSlot", image.slot);
    if (image.galleryIndex !== undefined) {
      body.append("galleryIndex", String(image.galleryIndex));
    }
    if (image.loveStoryIndex !== undefined) {
      body.append("loveStoryIndex", String(image.loveStoryIndex));
    }
  }

  const response = await fetch(`${API_URL}/api/works/${slug}`, {
    method: "PUT",
    credentials: "include",
    body,
  });
  const data = (await response.json()) as {
    success?: boolean;
    message?: string;
    work?: InvitationTemplate;
  };

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not save invitation");
  }

  return data.work;
}
