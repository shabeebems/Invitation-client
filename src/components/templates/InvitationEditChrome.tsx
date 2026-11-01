"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import PublishPaymentModal from "@/components/landing/PublishPaymentModal";
import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";
import { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { ROYAL_AMBIANCE_EFFECTS, type AmbianceEffect } from "@/lib/template-ambiance";
import type { SectionDef } from "@/lib/template-sections";
import { saveInvitationTheme, type InvitationSource, type InvitationTheme } from "@/lib/api";
import "./shared/edit-dock.css";

export type EditChromeStatus = "idle" | "saving" | "saved" | "error";

type Panel = "theme" | "sections" | "effects";

function statusLabel(status: EditChromeStatus, statusMessage?: string) {
  if (statusMessage) {
    return statusMessage;
  }
  if (status === "saving") {
    return "Saving…";
  }
  if (status === "saved") {
    return "Saved";
  }
  if (status === "error") {
    return "Not saved";
  }
  return "";
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7h2a4.6 4.6 0 0 0 4.6-4.6C21 6.4 17 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.3" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="7.3" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 4.5 11.4 8.6 15.5 10 11.4 11.4 10 15.5 8.6 11.4 4.5 10 8.6 8.6Z" />
      <path d="M17.5 3v3M16 4.5h3M17 15.5v4M15 17.5h4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.4 12.3 2.4 2.4 4.8-5" />
    </svg>
  );
}

function DockItem({
  icon,
  label,
  meta,
  active,
  primary,
  disabled,
  onClick,
  href,
}: {
  icon: ReactNode;
  label: string;
  meta?: string;
  active?: boolean;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const className = `ed-item${active ? " is-active" : ""}${primary ? " is-primary" : ""}`;
  const content = (
    <>
      <span className="ed-item-icon">{icon}</span>
      <span className="ed-item-label">{label}</span>
      {meta ? <span className="ed-item-meta">{meta}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={primary ? undefined : active}
    >
      {content}
    </button>
  );
}

export default function InvitationEditChrome({
  editing,
  previewing,
  status,
  statusMessage = "",
  publishing,
  canPublish,
  doneHref,
  onDone,
  invitationName,
  slug,
  templateId,
  selectedThemeId,
  themes,
  source = "template",
  payOpen,
  onEnterPreview,
  onBackToEdit,
  onOpenPay,
  onClosePay,
  onConfirmPay,
  onThemeChange,
  ambianceEffect,
  onAmbianceEffectChange,
  ambianceEffects = ROYAL_AMBIANCE_EFFECTS,
  sectionCatalog,
  enabledSections,
  onSectionToggle,
}: {
  editing: boolean;
  previewing: boolean;
  status: EditChromeStatus;
  statusMessage?: string;
  publishing: boolean;
  canPublish: boolean;
  doneHref: string;
  onDone?: () => void | Promise<void>;
  invitationName: string;
  slug: string;
  templateId?: string;
  selectedThemeId: string;
  themes: InvitationTheme[];
  source?: InvitationSource;
  payOpen: boolean;
  onEnterPreview: () => void;
  onBackToEdit: () => void;
  onOpenPay: () => void;
  onClosePay: () => void;
  onConfirmPay: (orderId?: string) => Promise<void> | void;
  onThemeChange: (selectedThemeId: string, themes: InvitationTheme[]) => void;
  ambianceEffect?: string;
  onAmbianceEffectChange?: (effect: AmbianceEffect) => void;
  ambianceEffects?: LayoutOption<AmbianceEffect>[];
  sectionCatalog?: SectionDef[];
  enabledSections?: string[];
  onSectionToggle?: (sectionId: string, on: boolean) => void;
}) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [themeSaving, setThemeSaving] = useState(false);
  const [themeError, setThemeError] = useState("");
  const dockRef = useRef<HTMLDivElement>(null);

  const effectFallback = ambianceEffects[0]?.id ?? "none";
  const effectValue = normalizeLayoutId(ambianceEffect, ambianceEffects, effectFallback);
  const showThemes = themes.length > 0;
  const showSections =
    Boolean(sectionCatalog?.length) && Boolean(onSectionToggle) && Array.isArray(enabledSections);
  const showEffects = Boolean(onAmbianceEffectChange);
  const saveState = statusLabel(status, statusMessage);

  useEffect(() => {
    if (!panel) {
      return;
    }

    function onPointer(event: MouseEvent) {
      if (!dockRef.current?.contains(event.target as Node)) {
        setPanel(null);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null);
      }
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  function toggle(next: Panel) {
    setPanel((current) => (current === next ? null : next));
  }

  async function selectTheme(themeId: string) {
    if (themeId === selectedThemeId) {
      return;
    }

    if (canPublish) {
      onThemeChange(themeId, themes);
      return;
    }

    setThemeSaving(true);
    setThemeError("");

    try {
      const saved = await saveInvitationTheme({ slug, source }, themeId);
      onThemeChange(saved.selectedThemeId, saved.themes || themes);
    } catch (error) {
      setThemeError(error instanceof Error ? error.message : "Could not change theme");
    } finally {
      setThemeSaving(false);
    }
  }

  return (
    <>
      {editing ? (
        <div ref={dockRef} className="ed-root ed-dock" role="toolbar" aria-label="Edit invitation">
          {panel === "theme" ? (
            <div className="ed-panel" role="dialog" aria-label="Theme">
              <p className="ed-panel-title">Theme</p>
              {themes.map((theme) => {
                const selected = theme.id === selectedThemeId;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    className={`ed-option${selected ? " is-selected" : ""}`}
                    disabled={themeSaving}
                    onClick={() => void selectTheme(theme.id)}
                    aria-pressed={selected}
                  >
                    <span>{theme.title}</span>
                    <span className="ed-option-mark" aria-hidden="true" />
                  </button>
                );
              })}
              {themeError ? <p className="ed-panel-error">{themeError}</p> : null}
            </div>
          ) : null}

          {panel === "sections" && showSections ? (
            <div className="ed-panel" role="dialog" aria-label="Sections">
              <p className="ed-panel-title">Sections</p>
              {sectionCatalog!.map((section) => {
                const on = enabledSections!.includes(section.id);
                return (
                  <label key={section.id} className={`ed-option ed-option--check${section.required ? " is-locked" : ""}`}>
                    <span>
                      {section.label}
                      {section.required ? <span className="ed-option-note">Required</span> : null}
                    </span>
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={Boolean(section.required)}
                      onChange={(event) => onSectionToggle!(section.id, event.target.checked)}
                    />
                    <span className="ed-switch" aria-hidden="true" />
                  </label>
                );
              })}
            </div>
          ) : null}

          {panel === "effects" && showEffects ? (
            <div className="ed-panel" role="dialog" aria-label="Effects">
              <p className="ed-panel-title">Background effect</p>
              {ambianceEffects.map((effect) => {
                const selected = effect.id === effectValue;
                return (
                  <button
                    key={effect.id}
                    type="button"
                    className={`ed-option${selected ? " is-selected" : ""}`}
                    onClick={() =>
                      onAmbianceEffectChange?.(normalizeLayoutId(effect.id, ambianceEffects, effectFallback))
                    }
                    aria-pressed={selected}
                  >
                    <span>{effect.label}</span>
                    <span className="ed-option-mark" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="ed-bar">
            {showThemes ? (
              <DockItem
                icon={<PaletteIcon />}
                label="Theme"
                active={panel === "theme"}
                onClick={() => toggle("theme")}
              />
            ) : null}
            {showSections ? (
              <DockItem
                icon={<SectionsIcon />}
                label="Sections"
                meta={`${enabledSections!.length}/${sectionCatalog!.length}`}
                active={panel === "sections"}
                onClick={() => toggle("sections")}
              />
            ) : null}
            {showEffects ? (
              <DockItem
                icon={<SparkleIcon />}
                label="Effects"
                active={panel === "effects"}
                onClick={() => toggle("effects")}
              />
            ) : null}
            {canPublish ? (
              <DockItem icon={<CheckIcon />} label="Save" meta={saveState} primary onClick={onEnterPreview} />
            ) : onDone ? (
              <DockItem
                icon={<CheckIcon />}
                label={status === "saving" ? "Saving…" : "Done"}
                meta={status === "saving" ? undefined : saveState}
                primary
                disabled={status === "saving"}
                onClick={() => void onDone()}
              />
            ) : (
              <DockItem icon={<CheckIcon />} label="Done" meta={saveState} primary href={doneHref} />
            )}
          </div>
        </div>
      ) : null}

      {previewing ? (
        <>
          <button type="button" onClick={onBackToEdit} className="ed-root ed-back">
            ← Back to edit
          </button>
          <div className="ed-root ed-publish">
            <button type="button" disabled={publishing} onClick={onOpenPay} className="ed-publish-button">
              {publishing ? "Publishing…" : "Publish"}
            </button>
            {status === "error" ? <span className="ed-publish-error">Could not publish</span> : null}
          </div>
        </>
      ) : null}

      <PublishPaymentModal
        open={payOpen}
        templateId={templateId}
        workSlug={source === "work" ? slug : undefined}
        invitationName={invitationName}
        onClose={onClosePay}
        onSuccess={onConfirmPay}
      />
    </>
  );
}
