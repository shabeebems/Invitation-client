"use client";

import type { ReactNode } from "react";

export default function RoyalFooter({
  editable,
  field,
}: {
  editable: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <footer
      className={`invite-footer relative z-[1] overflow-hidden px-[clamp(16px,3vw,32px)] pt-[clamp(24px,4vh,40px)] text-center ${
        editable ? "pb-40" : "pb-6"
      }`}
    >
      <p className="font-names text-shimmer-slow mt-0 text-[clamp(34px,5vw+0.5rem,54px)] leading-[1.15]">
        {field("groomName", "")}{" "}
        <span className="font-invite-serif text-[0.55em] text-[#b9893e] not-italic"> & </span>{" "}
        {field("brideName", "")}
      </p>
      <p className="font-caps mt-1.5 text-[clamp(10px,0.4vw+0.5rem,12px)] tracking-[3px] text-[#b9893e] uppercase">
        {field("hashtag", "")}
      </p>
      <p className="font-invite-serif mx-auto mt-3.5 max-w-[440px] px-2 text-[clamp(14px,1vw+0.55rem,17px)] leading-[1.7] text-[#f3e8cdc7] italic">
        {field("blessing", "", true)}
      </p>
      <p className="font-caps mt-2.5 px-2 text-[clamp(9px,0.3vw+0.45rem,11px)] leading-[1.5] tracking-[2.2px] text-[#e7d3a4a6] uppercase">
        {field("inviteLine", "", true)}
      </p>
      <p className="font-invite-sans mt-4 mb-0 text-[9px] tracking-[0.14em] text-[#f3e8cd38]">{field("footer", "")}</p>
    </footer>
  );
}
