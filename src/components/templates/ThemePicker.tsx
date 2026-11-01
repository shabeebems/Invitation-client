"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveInvitationTheme, type InvitationSource, type InvitationTheme } from "@/lib/api";

/** Theme select for admin listings; the invitation editor uses the edit dock instead. */
export default function ThemePicker({
  slug,
  selectedThemeId,
  themes,
  source = "template",
}: {
  slug: string;
  selectedThemeId: string;
  themes: InvitationTheme[];
  source?: InvitationSource;
}) {
  const router = useRouter();
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const currentId = chosenId ?? selectedThemeId;

  async function selectTheme(themeId: string) {
    setSaving(true);
    setError("");

    try {
      const saved = await saveInvitationTheme({ slug, source }, themeId);
      setChosenId(saved.selectedThemeId);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change theme");
    } finally {
      setSaving(false);
    }
  }

  if (themes.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-zinc-100 pt-4">
      <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Theme</label>
      <select
        value={currentId}
        disabled={saving}
        onChange={(event) => void selectTheme(event.target.value)}
        className="mt-1.5 w-full rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.title}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
