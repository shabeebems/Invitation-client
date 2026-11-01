"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { maxForContentField } from "@/lib/content-limits";

const MAX = maxForContentField("shareMessage");

/** Lets the owner edit the WhatsApp message guests send; the invitation link is added on share. */
export default function ShareMessageModal({
  message,
  defaultMessage,
  onSave,
  onClose,
}: {
  message: string;
  defaultMessage: string;
  onSave: (next: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(message);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDefault = text.trim() === defaultMessage.trim();

  useEffect(() => {
    textareaRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  function save() {
    onSave(isDefault ? "" : text.trim());
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[13000] flex items-end justify-center bg-black/55 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-message-title"
        className="w-full max-w-lg rounded-lg bg-[#fffdf8] p-5 font-sans text-[#173a2c] normal-case tracking-normal shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:p-6"
      >
        <h2 id="share-message-title" className="text-base font-semibold">
          WhatsApp message
        </h2>
        <p className="mt-1 text-[13px] leading-5 text-[#686d65]">
          Guests send this when they tap Share. The invitation link is added at the end automatically.
        </p>

        <textarea
          ref={textareaRef}
          value={text}
          maxLength={MAX}
          onChange={(event) => setText(event.target.value)}
          rows={11}
          className="mt-4 w-full resize-y rounded-md border border-[#ddd1bb] bg-white px-3 py-2.5 text-[13.5px] leading-6 text-[#173a2c] outline-none focus:border-[#173a2c] focus:shadow-[0_0_0_3px_rgba(23,58,44,0.1)]"
        />
        <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-[#8d8f87]">
          <span>Use *text* for bold and _text_ for italics.</span>
          <span>
            {text.length}/{MAX}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setText(defaultMessage)}
            disabled={isDefault}
            className="text-[13px] font-semibold text-[#686d65] underline-offset-4 hover:text-[#173a2c] hover:underline disabled:cursor-default disabled:opacity-40 disabled:hover:no-underline"
          >
            Reset to default
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-md border border-[#ddd1bb] px-4 text-[13px] font-semibold text-[#3a4a40] hover:border-[#173a2c]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!text.trim()}
              className="h-9 rounded-md bg-[#173a2c] px-4 text-[13px] font-semibold text-[#fbf6ea] hover:bg-[#245440] disabled:opacity-50"
            >
              Save message
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
