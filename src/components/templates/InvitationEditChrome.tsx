"use client";

import Link from "next/link";
import ThemePicker from "@/components/templates/ThemePicker";
import PublishPaymentModal from "@/components/landing/PublishPaymentModal";
import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";
import { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  ROYAL_AMBIANCE_EFFECTS,
  type AmbianceEffect,
} from "@/lib/template-ambiance";
import SectionPicker from "@/components/templates/shared/SectionPicker";
import type { SectionDef } from "@/lib/template-sections";
import type { InvitationSource, InvitationTheme } from "@/lib/api";

export type EditChromeStatus = "idle" | "saving" | "saved" | "error";
export type EditChromeVariant = "invite" | "house" | "party";

const styles = {
  invite: {
    bar: "rr-edit-chrome fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10050] flex w-[min(98vw,1100px)] -translate-x-1/2 items-center gap-3 overflow-x-auto rounded-full border px-3 py-2 whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm",
    publishBar:
      "rr-edit-chrome fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10080] flex w-[min(96vw,420px)] -translate-x-1/2 items-center justify-center gap-3 rounded-full border px-3 py-2 whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm",
    back: "rr-edit-chrome font-caps fixed top-[max(12px,env(safe-area-inset-top))] left-[max(12px,env(safe-area-inset-left))] z-[10070] rounded-full border px-4 py-2 text-[10px] tracking-[1.4px] uppercase shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm",
    action:
      "font-caps shrink-0 rounded-full border border-[color:color-mix(in_srgb,var(--gold-light)_45%,transparent)] px-3 py-1 text-[10px] tracking-[1.4px] text-[color:var(--gold-light)] uppercase hover:border-[color:var(--gold-light)] hover:text-[color:var(--gold-pale)]",
    done: "font-caps shrink-0 rounded-full border border-[color:color-mix(in_srgb,var(--gold-light)_45%,transparent)] px-3 py-1 text-[10px] tracking-[1.4px] text-[color:var(--gold-light)] uppercase no-underline hover:border-[color:var(--gold-light)] hover:text-[color:var(--gold-pale)]",
    status:
      "font-caps min-w-0 max-w-[42vw] shrink text-[9px] tracking-[1.2px] text-[color:color-mix(in_srgb,var(--gold-light)_70%,transparent)] uppercase truncate sm:max-w-[280px]",
    hint: "font-invite-sans m-0 hidden text-[11px] text-[color:color-mix(in_srgb,var(--gold-pale)_60%,transparent)] sm:block",
    publish: "rr-edit-chrome-publish font-caps shrink-0 rounded-full px-5 py-1.5 text-[10px] tracking-[1.4px] uppercase disabled:opacity-60",
    error: "font-caps text-[9px] tracking-[1.4px] text-[color:var(--gold-pale)] uppercase",
    hintText: "",
  },
  house: {
    bar: "hw-edit-bar fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10050] flex w-[min(96vw,760px)] -translate-x-1/2 items-center gap-3 overflow-x-auto rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-nav)] px-3 py-2 text-[#221c18] whitespace-nowrap shadow-[0_10px_28px_rgba(34,28,24,0.12)] backdrop-blur-sm",
    publishBar:
      "hw-edit-bar fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10080] flex w-[min(96vw,420px)] -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-nav)] px-3 py-2 text-[#221c18] whitespace-nowrap shadow-[0_10px_28px_rgba(34,28,24,0.12)] backdrop-blur-sm",
    back: "hw-edit-bar fixed top-[max(12px,env(safe-area-inset-top))] left-[max(12px,env(safe-area-inset-left))] z-[10070] rounded-full border border-[#ab4f3166] bg-[var(--color-linen-nav)] px-4 py-2 text-[10px] font-semibold tracking-[1.4px] text-[#87361b] uppercase shadow-[0_10px_28px_rgba(34,28,24,0.12)] backdrop-blur-sm hover:bg-[#ab4f31] hover:text-white",
    action:
      "shrink-0 rounded-full border border-[#ab4f3166] px-3 py-1 text-[10px] font-semibold tracking-[1.4px] text-[#87361b] uppercase hover:bg-[#ab4f31] hover:text-white",
    done: "shrink-0 rounded-full border border-[#ab4f3166] px-3 py-1 text-[10px] font-semibold tracking-[1.4px] text-[#87361b] uppercase no-underline hover:bg-[#ab4f31] hover:text-white",
    status: "shrink-0 text-[9px] tracking-[1.4px] text-[#796e65] uppercase",
    hint: "m-0 hidden text-[11px] text-[#796e65] sm:block",
    publish:
      "shrink-0 rounded-full bg-[#ab4f31] px-5 py-1.5 text-[10px] font-semibold tracking-[1.4px] text-white uppercase disabled:opacity-60",
    error: "text-[9px] font-semibold tracking-[1.4px] text-[#87361b] uppercase",
    hintText: "",
  },
  party: {
    bar: "fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10050] flex w-[min(96vw,760px)] -translate-x-1/2 items-center gap-3 overflow-x-auto rounded-full border border-[#e8d5a859] bg-[#070b14e8] px-3 py-2 text-[#f4e6c4] whitespace-nowrap shadow-[0_10px_28px_rgba(7,11,20,0.5)] backdrop-blur-sm",
    publishBar:
      "fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10080] flex w-[min(96vw,420px)] -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-[#e8d5a859] bg-[#070b14e8] px-3 py-2 text-[#f4e6c4] whitespace-nowrap shadow-[0_10px_28px_rgba(7,11,20,0.5)] backdrop-blur-sm",
    back: "bd-sans fixed top-[max(12px,env(safe-area-inset-top))] left-[max(12px,env(safe-area-inset-left))] z-[10070] rounded-full border border-[#e8d5a873] bg-[#070b14e8] px-4 py-2 text-[10px] font-semibold tracking-[1.4px] text-[#e8d5a8] uppercase shadow-[0_10px_28px_rgba(7,11,20,0.5)] backdrop-blur-sm hover:border-[#e8d5a8] hover:text-[#f4e6c4]",
    action:
      "bd-sans shrink-0 rounded-full border border-[#e8d5a873] px-3 py-1 text-[10px] font-semibold tracking-[1.4px] text-[#e8d5a8] uppercase hover:border-[#e8d5a8] hover:text-[#f4e6c4]",
    done: "bd-sans shrink-0 rounded-full border border-[#e8d5a873] px-3 py-1 text-[10px] font-semibold tracking-[1.4px] text-[#e8d5a8] uppercase no-underline hover:border-[#e8d5a8] hover:text-[#f4e6c4]",
    status: "bd-sans shrink-0 text-[9px] tracking-[1.4px] text-[#e8d5a8b3] uppercase",
    hint: "bd-sans m-0 hidden text-[11px] text-[#f4e6c499] sm:block",
    publish:
      "bd-sans shrink-0 rounded-full bg-[#e8d5a8] px-5 py-1.5 text-[10px] font-semibold tracking-[1.4px] text-[#070b14] uppercase disabled:opacity-60",
    error: "bd-sans text-[9px] font-semibold tracking-[1.4px] text-[#f4e6c4] uppercase",
    hintText: "",
  },
} as const;

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
    return "Could not save";
  }
  return "Editing";
}

export default function InvitationEditChrome({
  variant,
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
  variant: EditChromeVariant;
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
  selectedThemeId: string;
  themes: InvitationTheme[];
  source?: InvitationSource;
  payOpen: boolean;
  onEnterPreview: () => void;
  onBackToEdit: () => void;
  onOpenPay: () => void;
  onClosePay: () => void;
  onConfirmPay: () => Promise<void>;
  onThemeChange: (selectedThemeId: string, themes: InvitationTheme[]) => void;
  ambianceEffect?: string;
  onAmbianceEffectChange?: (effect: AmbianceEffect) => void;
  ambianceEffects?: LayoutOption<AmbianceEffect>[];
  sectionCatalog?: SectionDef[];
  enabledSections?: string[];
  onSectionToggle?: (sectionId: string, on: boolean) => void;
}) {
  const ui = styles[variant];
  const barStatus = statusLabel(status, statusMessage);
  const effectFallback = ambianceEffects[0]?.id ?? "none";
  const effectValue = normalizeLayoutId(ambianceEffect, ambianceEffects, effectFallback);
  const showEffectPicker = Boolean(onAmbianceEffectChange);
  const showSectionPicker =
    Boolean(sectionCatalog?.length) && Boolean(onSectionToggle) && Array.isArray(enabledSections);

  return (
    <>
      {editing ? (
        <div className={ui.bar}>
          <ThemePicker
            slug={slug}
            selectedThemeId={selectedThemeId}
            themes={themes}
            source={source}
            variant={variant}
            inline
            localOnly={canPublish}
            onChange={onThemeChange}
          />
          {showSectionPicker ? (
            <SectionPicker
              sections={sectionCatalog!}
              enabled={enabledSections!}
              onToggle={onSectionToggle!}
              variant={variant === "party" ? "party" : variant}
            />
          ) : null}
          {showEffectPicker ? (
            <div className="flex shrink-0 items-center gap-2">
              <label
                htmlFor="invitation-ambiance-effect"
                className={
                  variant === "invite"
                    ? "font-caps shrink-0 text-[9px] tracking-[1.4px] text-[color:color-mix(in_srgb,var(--gold-light)_70%,transparent)] uppercase"
                    : variant === "house"
                      ? "shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#796e65] uppercase"
                      : "bd-sans shrink-0 text-[9px] font-semibold tracking-[1.4px] text-[#e8d5a8b3] uppercase"
                }
              >
                Effect
              </label>
              <select
                id="invitation-ambiance-effect"
                value={effectValue}
                onChange={(event) =>
                  onAmbianceEffectChange?.(
                    normalizeLayoutId(event.target.value, ambianceEffects, effectFallback)
                  )
                }
                className={
                  variant === "invite"
                    ? "rr-edit-chrome-select font-caps rounded-full border px-3 py-1.5 text-[10px] tracking-[1.2px] uppercase"
                    : variant === "house"
                      ? "rounded-full border border-[#e8dccd] bg-white px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#221c18]"
                      : "bd-sans rounded-full border border-[#e8d5a873] bg-[#070b14] px-3 py-1.5 text-[11px] font-medium tracking-[0.4px] text-[#e8d5a8]"
                }
              >
                {ambianceEffects.map((effect) => (
                  <option key={effect.id} value={effect.id} className="bg-white text-[#221c18]">
                    {effect.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <span
            className={`${ui.status} ${status === "error" || statusMessage ? ui.error : ""}`.trim()}
            title={barStatus}
          >
            {barStatus}
          </span>
          {ui.hintText && !statusMessage ? <p className={ui.hint}>{ui.hintText}</p> : null}
          {canPublish ? (
            <button type="button" onClick={onEnterPreview} className={`${ui.action} ml-auto`}>
              Save
            </button>
          ) : onDone ? (
            <button
              type="button"
              disabled={status === "saving"}
              onClick={() => void onDone()}
              className={`${ui.done} ml-auto`}
            >
              {status === "saving" ? "Saving…" : "Done"}
            </button>
          ) : (
            <Link href={doneHref} className={`${ui.done} ml-auto`}>
              Done
            </Link>
          )}
        </div>
      ) : null}

      {previewing ? (
        <>
          <button type="button" onClick={onBackToEdit} className={ui.back}>
            Back to edit
          </button>
          <div className={ui.publishBar}>
            <button
              type="button"
              disabled={publishing}
              onClick={onOpenPay}
              className={ui.publish}
            >
              {publishing ? "Publishing…" : "Publish"}
            </button>
            {status === "error" ? <span className={ui.error}>Could not publish</span> : null}
          </div>
        </>
      ) : null}

      <PublishPaymentModal
        open={payOpen}
        invitationName={invitationName}
        onClose={onClosePay}
        onSuccess={onConfirmPay}
      />
    </>
  );
}
