"use client";

import type { ReactNode } from "react";

export default function HouseFooter({
  editable,
  field,
  onReplay,
}: {
  editable: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onReplay: () => void;
}) {
  return (
    <footer className={`relative z-[2] border-t border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-6 pt-[70px] text-center ${editable ? "pb-40" : "pb-[90px]"}`}>
      <p className="hw-font-arabic mb-2 text-[1.9rem] text-[var(--color-terracotta)]">{field("hamdalah")}</p>
      <p className="hw-font-serif mx-auto mb-3.5 max-w-[620px] text-[1.3rem] leading-[1.6] text-[#221c18] italic">
        “{field("closingBlessing", "", true)}”
      </p>
      <p className="text-[0.96rem] font-medium text-[#796e65]">
        {field("closingPresence")}
        <br />
        <strong className="text-[#221c18]">{field("hostNames")}</strong>
        <br />
        {field("familyLine")}
      </p>
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e4be57] bg-[var(--color-linen-card)] px-5 py-2 text-[0.86rem] font-semibold text-[var(--color-terracotta-dark)] shadow-sm"
        onClick={onReplay}
      >
        {field("replayLabel")}
      </button>
      <p className="mt-8 border-t border-[var(--color-terracotta-soft)] pt-[18px] text-[0.82rem] tracking-[0.06em] text-[#796e65]">
        {field("craftedBy")}
      </p>
    </footer>
  );
}
