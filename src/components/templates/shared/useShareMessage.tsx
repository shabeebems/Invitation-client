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
  const message = resolveShareMessage(draft.content, builtMessage);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (editing) {
      setOpen(true);
      return;
    }

    openWhatsAppShare(withInvitationLink(message, invitationShareUrl(draft)));
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
    href: whatsappShareHref(message),
    onClick,
    label: editing ? "Edit WhatsApp message" : "Share invitation on WhatsApp",
    modal,
  };
}
