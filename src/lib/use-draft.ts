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

export function readUseDraft(slug: string): UseDraft | null {
  const raw = sessionStorage.getItem(key(slug));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as UseDraft;

    if (!parsed?.name || !parsed.content) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearUseDraft(slug: string) {
  sessionStorage.removeItem(key(slug));
}
