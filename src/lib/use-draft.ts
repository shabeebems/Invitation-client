import type { TemplateContent } from "@/lib/api";

export type UseDraft = {
  name: string;
  content: Partial<TemplateContent>;
  selectedThemeId?: string;
};

function key(slug: string) {
  return `save-the-kath-use:${slug}`;
}

function storage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function saveUseDraft(slug: string, draft: UseDraft) {
  const store = storage();
  if (!store || !slug || !draft?.name) {
    return;
  }

  try {
    store.setItem(key(slug), JSON.stringify(draft));
    // Keep sessionStorage in sync for any older tabs still reading it.
    sessionStorage.setItem(key(slug), JSON.stringify(draft));
  } catch {
    // Quota / private mode — ignore; editor state still lives in memory.
  }
}

const parsedDrafts = new Map<string, { raw: string; draft: UseDraft | null }>();

function parseDraft(raw: string): UseDraft | null {
  try {
    const parsed = JSON.parse(raw) as UseDraft;
    return parsed?.name && parsed.content ? parsed : null;
  } catch {
    return null;
  }
}

function readRaw(slug: string): string | null {
  const store = storage();
  const fromLocal = store?.getItem(key(slug)) || null;
  if (fromLocal) {
    return fromLocal;
  }

  try {
    return sessionStorage.getItem(key(slug));
  } catch {
    return null;
  }
}

/** Returns the same object while storage is unchanged, as useSyncExternalStore requires. */
export function readUseDraft(slug: string): UseDraft | null {
  const raw = readRaw(slug);

  if (!raw) {
    parsedDrafts.delete(slug);
    return null;
  }

  const cached = parsedDrafts.get(slug);
  if (cached?.raw === raw) {
    return cached.draft;
  }

  const draft = parseDraft(raw);
  parsedDrafts.set(slug, { raw, draft });
  return draft;
}

export function clearUseDraft(slug: string) {
  try {
    storage()?.removeItem(key(slug));
    sessionStorage.removeItem(key(slug));
  } catch {
    // ignore
  }
  parsedDrafts.delete(slug);
}
