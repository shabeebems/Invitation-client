"use client";

import { useLayoutEffect, useRef, useState } from "react";

type EditableFieldProps = {
  value: string;
  editable?: boolean;
  className?: string;
  multiline?: boolean;
  onCommit: (value: string) => void;
};

export default function EditableField({
  value,
  editable = false,
  className = "",
  multiline = false,
  onCommit,
}: EditableFieldProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const focusedRef = useRef(false);
  const debounceRef = useRef<number>(0);
  const [seed] = useState(value);

  useLayoutEffect(() => {
    if (!editable || !ref.current || focusedRef.current) {
      return;
    }

    if (ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [editable, value]);

  function commitFromElement() {
    if (!ref.current) {
      return;
    }

    onCommit(ref.current.innerText.replace(/\u00a0/g, " ").trim());
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
      suppressContentEditableWarning
      onFocus={() => {
        focusedRef.current = true;
      }}
      onPaste={(event) => {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
      onInput={() => {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
          commitFromElement();
        }, 450);
      }}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onBlur={() => {
        focusedRef.current = false;
        window.clearTimeout(debounceRef.current);
        commitFromElement();
      }}
    >
      {seed}
    </span>
  );
}
