"use client";

import { useState, type MouseEvent } from "react";
import type { InvitationTemplate } from "@/lib/api";
import {
  invitationShareUrl,
  openWhatsAppShare,
  resolveShareMessage,
  whatsappShareHref,
  withInvitationLink,
} from "@/lib/share-message";
import ShareMessageModal from "./ShareMessageModal";

/**
 * WhatsApp share for an invitation: guests open WhatsApp with the message and link,
 * while the owner gets an editor for the message.
 * Draft / unpaid invitations never emit a guest link (preview URLs are not shared).
 */
export function useShareMessage({
  draft,
  builtMessage,
  editing,
  onSave,
}: {
  draft: InvitationTemplate;
  builtMessage: string;
  editing: boolean;
  onSave: (message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [blockedNote, setBlockedNote] = useState(false);
  const message = resolveShareMessage(draft.content, builtMessage);
  const shareUrl = invitationShareUrl(draft);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (editing) {
      setOpen(true);
      return;
    }

    if (!shareUrl) {
      setBlockedNote(true);
      window.setTimeout(() => setBlockedNote(false), 2800);
      return;
    }

    openWhatsAppShare(withInvitationLink(message, shareUrl));
  }

  const modal = open ? (
    <ShareMessageModal
      message={message}
      defaultMessage={builtMessage}
      onSave={onSave}
      onClose={() => setOpen(false)}
    />
  ) : null;

  return {
    href: shareUrl ? whatsappShareHref(withInvitationLink(message, shareUrl)) : "#",
    onClick,
    label: editing
      ? "Edit WhatsApp message"
      : shareUrl
        ? "Share invitation on WhatsApp"
        : "Publish to share on WhatsApp",
    modal,
    blockedNote: blockedNote ? (
      <p
        role="status"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[10070] max-w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-full bg-[#183C2C] px-4 py-2 text-center text-[11px] font-medium text-[#F1EFE8] shadow-lg"
      >
        Publish your invitation first to get a guest link.
      </p>
    ) : null,
  };
}
