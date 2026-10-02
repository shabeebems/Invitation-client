"use client";

import Link from "next/link";
import ThemePicker from "@/components/templates/ThemePicker";
import PublishPaymentModal from "@/components/landing/PublishPaymentModal";
import type { InvitationSource, InvitationTheme } from "@/lib/api";

export type EditChromeStatus = "idle" | "saving" | "saved" | "error";
export type EditChromeVariant = "invite" | "house" | "party";

const styles = {
  invite: {
    bar: "fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10050] flex w-[min(96vw,760px)] -translate-x-1/2 items-center gap-3 overflow-x-auto rounded-full border border-[#e7d3a459] bg-[#1a060ce8] px-3 py-2 text-[#f3e8cd] whitespace-nowrap shadow-[0_10px_28px_rgba(10,5,7,0.45)] backdrop-blur-sm",
    publishBar:
      "fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-[10080] flex w-[min(96vw,420px)] -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-[#e7d3a459] bg-[#1a060ce8] px-3 py-2 text-[#f3e8cd] whitespace-nowrap shadow-[0_10px_28px_rgba(10,5,7,0.45)] backdrop-blur-sm",
    back: "font-caps fixed top-[max(12px,env(safe-area-inset-top))] left-[max(12px,env(safe-area-inset-left))] z-[10070] rounded-full border border-[#e7d3a473] bg-[#1a060ce8] px-4 py-2 text-[10px] tracking-[1.4px] text-[#e7d3a4] uppercase shadow-[0_10px_28px_rgba(10,5,7,0.45)] backdrop-blur-sm hover:border-[#e7d3a4] hover:text-[#f3e8cd]",
    action:
      "font-caps shrink-0 rounded-full border border-[#e7d3a473] px-3 py-1 text-[10px] tracking-[1.4px] text-[#e7d3a4] uppercase hover:border-[#e7d3a4] hover:text-[#f3e8cd]",
    done: "font-caps shrink-0 rounded-full border border-[#e7d3a473] px-3 py-1 text-[10px] tracking-[1.4px] text-[#e7d3a4] uppercase no-underline hover:border-[#e7d3a4] hover:text-[#f3e8cd]",
    status: "font-caps shrink-0 text-[9px] tracking-[1.4px] text-[#e7d3a4b3] uppercase",
    hint: "font-invite-sans m-0 hidden text-[11px] text-[#f3e8cd99] sm:block",
    publish:
      "font-caps shrink-0 rounded-full bg-[#e7d3a4] px-5 py-1.5 text-[10px] tracking-[1.4px] text-[#1a060c] uppercase disabled:opacity-60",
    error: "font-caps text-[9px] tracking-[1.4px] text-[#f3e8cd] uppercase",
    hintText: "Tap any text or the photo to edit",
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
    hintText: "Tap any text or photo to edits",
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
    hintText: "Tap any text or the photo to edit",
  },
} as const;

function statusLabel(status: EditChromeStatus) {
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
  publishing,
  canPublish,
  doneHref,
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
}: {
  variant: EditChromeVariant;
  editing: boolean;
  previewing: boolean;
  status: EditChromeStatus;
  publishing: boolean;
  canPublish: boolean;
  doneHref: string;
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
}) {
  const ui = styles[variant];

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
          <span className={ui.status}>{statusLabel(status)}</span>
          <p className={ui.hint}>{ui.hintText}</p>
          {canPublish ? (
            <button type="button" onClick={onEnterPreview} className={`${ui.action} ml-auto`}>
              Save
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
