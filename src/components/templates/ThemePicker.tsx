"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { invitationApiBase, type InvitationSource, type InvitationTheme } from "@/lib/api";

export default function ThemePicker({
  slug,
  selectedThemeId,
  themes,
  source = "template",
  variant = "admin",
  localOnly = false,
  inline = false,
  onChange,
}: {
  slug: string;
  selectedThemeId: string;
  themes: InvitationTheme[];
  source?: InvitationSource;
  variant?: "admin" | "invite" | "house" | "party";
  localOnly?: boolean;
  inline?: boolean;
  onChange?: (selectedThemeId: string, themes: InvitationTheme[]) => void;
}) {
  const router = useRouter();
  const [currentId, setCurrentId] = useState(selectedThemeId);
  const [items, setItems] = useState(themes);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const invite = variant === "invite";
  const house = variant === "house";
  const party = variant === "party";
  const inlineChrome = invite || house || party;

  useEffect(() => {
    setCurrentId(selectedThemeId);
    setItems(themes);
  }, [selectedThemeId, themes]);

  async function selectTheme(themeId: string) {
    if (localOnly) {
      setCurrentId(themeId);
      onChange?.(themeId, items);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${invitationApiBase({ slug, source })}/theme`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedThemeId: themeId }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        template?: { selectedThemeId?: string; themes?: InvitationTheme[] };
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not change theme");
      }

      const nextId = data.template?.selectedThemeId || themeId;
      const nextThemes = data.template?.themes || items;
      setCurrentId(nextId);
      setItems(nextThemes);
      onChange?.(nextId, nextThemes);

      if (variant === "admin") {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change theme");
    } finally {
      setSaving(false);
    }
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={
        inline
          ? "flex shrink-0 items-center gap-2"
          : inlineChrome
            ? "mt-2"
            : "mt-4 border-t border-zinc-100 pt-4"
      }
    >
      <label
        className={
          invite
            ? "font-caps shrink-0 text-[9px] tracking-[1.4px] text-[#e7d3a4b3] uppercase"
            : house
              ? "shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#796e65] uppercase"
              : party
                ? "bd-sans shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#e8d5a8b3] uppercase"
                : "text-xs font-semibold tracking-wide text-zinc-400 uppercase"
        }
      >
        Theme
      </label>
      <select
        value={currentId}
        disabled={saving}
        onChange={(event) => void selectTheme(event.target.value)}
        className={
          invite
            ? `font-caps rounded-full border border-[#e7d3a473] bg-[#1a060c] px-3 py-1.5 text-[10px] tracking-[1.2px] text-[#e7d3a4] uppercase ${inline ? "w-auto" : "mt-1.5 w-full"}`
            : house
              ? `rounded-full border border-[#e8dccd] bg-white px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#221c18] ${inline ? "w-auto" : "mt-1.5 w-full"}`
              : party
                ? `bd-sans rounded-full border border-[#e8d5a873] bg-[#070b14] px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#e8d5a8] ${inline ? "w-auto" : "mt-1.5 w-full"}`
                : "mt-1.5 w-full rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800"
        }
      >
        {items.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.title}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
