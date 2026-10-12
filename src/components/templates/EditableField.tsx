"use client";

import { useLayoutEffect, useRef, useState } from "react";

type EditableFieldProps = {
  value: string;
  editable?: boolean;
  className?: string;
  multiline?: boolean;
  maxLength?: number;
  onCommit: (value: string) => void;
};

function normalizeText(raw: string) {
  return raw.replace(/\u00a0/g, " ");
}

function truncate(raw: string, maxLength?: number) {
  const text = normalizeText(raw);
  if (!maxLength || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
}

export default function EditableField({
  value,
  editable = false,
  className = "",
  multiline = false,
  maxLength,
  onCommit,
}: EditableFieldProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const focusedRef = useRef(false);
  const debounceRef = useRef<number>(0);
  const [seed] = useState(() => truncate(value, maxLength));

  useLayoutEffect(() => {
    if (!editable || !ref.current || focusedRef.current) {
      return;
    }

    const next = truncate(value, maxLength);
    if (ref.current.textContent !== next) {
      ref.current.textContent = next;
    }
  }, [editable, value, maxLength]);

  function readValue() {
    if (!ref.current) {
      return "";
    }
    return truncate(ref.current.innerText, maxLength).trim();
  }

  function enforceLimit() {
    if (!ref.current || !maxLength) {
      return;
    }

    const current = normalizeText(ref.current.innerText);
    if (current.length > maxLength) {
      ref.current.textContent = current.slice(0, maxLength);
      const selection = window.getSelection();
      if (selection && ref.current.lastChild) {
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  function commitFromElement() {
    onCommit(readValue());
  }

  if (!editable) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className={`${className} editable-field`.trim()}
      contentEditable
      role="textbox"
      aria-multiline={multiline || undefined}
      data-max-length={maxLength || undefined}
      suppressContentEditableWarning
      onFocus={() => {
        focusedRef.current = true;
      }}
      onPaste={(event) => {
        event.preventDefault();
        const pasted = event.clipboardData.getData("text/plain");
        const existing = normalizeText(ref.current?.innerText || "");
        const selection = window.getSelection();
        const selected = selection?.toString() || "";
        const room = maxLength ? Math.max(0, maxLength - (existing.length - selected.length)) : pasted.length;
        document.execCommand("insertText", false, pasted.slice(0, room));
        enforceLimit();
      }}
      onInput={() => {
        enforceLimit();
        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
          commitFromElement();
        }, 450);
      }}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
          return;
        }

        if (
          maxLength &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey &&
          event.key.length === 1
        ) {
          const selected = window.getSelection()?.toString() || "";
          const current = normalizeText(ref.current?.innerText || "");
          if (current.length - selected.length >= maxLength) {
            event.preventDefault();
          }
        }
      }}
      onBlur={() => {
        focusedRef.current = false;
        window.clearTimeout(debounceRef.current);
        enforceLimit();
        commitFromElement();
      }}
    >
      {seed}
    </span>
  );
}
