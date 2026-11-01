import type { TemplateContent } from "@/lib/api";

export type UseDraft = {
  name: string;
  content: Partial<TemplateContent>;
};

function key(slug: string) {
  return `save-the-kath-use:${slug}`;
}

export function saveUseDraft(slug: string, draft: UseDraft) {
  sessionStorage.setItem(key(slug), JSON.stringify(draft));
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

/** Returns the same object while storage is unchanged, as useSyncExternalStore requires. */
export function readUseDraft(slug: string): UseDraft | null {
  const raw = sessionStorage.getItem(key(slug));

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
  sessionStorage.removeItem(key(slug));
  parsedDrafts.delete(slug);
}
