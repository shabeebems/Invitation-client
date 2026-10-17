"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SectionDef } from "@/lib/template-sections";

type MenuPos = { left: number; bottom: number; width: number };

export default function SectionPicker({
  sections,
  enabled,
  onToggle,
  variant = "invite",
}: {
  sections: SectionDef[];
  enabled: string[];
  onToggle: (sectionId: string, on: boolean) => void;
  variant?: "invite" | "house" | "party";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<MenuPos | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const enabledCount = enabled.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  function updatePos() {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    setPos({
      left: rect.left,
      bottom: window.innerHeight - rect.top + 8,
      width: Math.max(rect.width, 200),
    });
  }

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onReposition() {
      updatePos();
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open]);

  const invite = variant === "invite";
  const house = variant === "house";

  const menu = open && mounted && pos
    ? createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Toggle sections"
          style={{
            position: "fixed",
            left: pos.left,
            bottom: pos.bottom,
            width: pos.width,
            zIndex: 12000,
          }}
          className={
            invite
              ? "rr-edit-chrome min-w-[200px] rounded-2xl border p-2 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
              : house
                ? "min-w-[200px] rounded-2xl border border-[#e8dccd] bg-white p-2.5 shadow-[0_12px_32px_rgba(34,28,24,0.18)]"
                : "min-w-[200px] rounded-2xl border border-[#e8d5a859] bg-[#070b14] p-2 shadow-[0_12px_32px_rgba(7,11,20,0.5)]"
          }
        >
          {sections.map((section) => {
            const checked = enabled.includes(section.id);
            return (
              <label
                key={section.id}
                className={
                  invite
                    ? "font-caps flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-[10px] tracking-[1px] text-[color:var(--gold-light)] uppercase hover:bg-[color:color-mix(in_srgb,var(--gold)_12%,transparent)]"
                    : house
                      ? "flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11px] font-medium text-[#221c18] hover:bg-[#f5eddf]"
                      : "bd-sans flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-[11px] font-medium text-[#e8d5a8] hover:bg-white/5"
                }
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={Boolean(section.required)}
                  onChange={(event) => onToggle(section.id, event.target.checked)}
                  className="accent-[var(--gold,#b9893e)]"
                />
                <span>
                  {section.label}
                  {section.required ? " · required" : ""}
                </span>
              </label>
            );
          })}
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center gap-2">
      <label
        className={
          invite
            ? "font-caps shrink-0 text-[9px] tracking-[1.4px] text-[color:color-mix(in_srgb,var(--gold-light)_70%,transparent)] uppercase"
            : house
              ? "shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#796e65] uppercase"
              : "bd-sans shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#e8d5a8b3] uppercase"
        }
      >
        Sections
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={
          invite
            ? "rr-edit-chrome-select font-caps rounded-full border px-3 py-1.5 text-[10px] tracking-[1.2px] uppercase"
            : house
              ? "rounded-full border border-[#e8dccd] bg-white px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#221c18]"
              : "bd-sans rounded-full border border-[#e8d5a873] bg-[#070b14] px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#e8d5a8]"
        }
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {enabledCount}/{sections.length} ▾
      </button>
      {menu}
    </div>
  );
}
