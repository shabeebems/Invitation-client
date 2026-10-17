"use client";

import { useRef, type ReactNode } from "react";
import { Flower } from "@/components/templates/house/HouseIcons";

export default function HouseHero({
  field,
  editing,
  heroSrc,
  houseName,
  onChangeHeroImage,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  heroSrc: string;
  houseName: string;
  onChangeHeroImage: (file: File) => void;
}) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <section
      id="hero"
      className="relative z-[2] flex flex-col items-center px-6 pt-12 pb-6 text-center sm:pt-16"
    >
      <p className="hw-font-arabic mb-1.5 text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.3] text-[#c59b27] [filter:drop-shadow(0_2px_8px_#c59b2740)]">
        {field("bismillah")}
      </p>
      <p className="mb-[22px] text-[0.88rem] tracking-[0.08em] text-[#796e65] italic">
        {field("bismillahTranslation")}
      </p>
      <p className="hw-badge mb-5 inline-flex items-center gap-2 px-5 py-1.5 text-[0.82rem] font-semibold">
        <Flower /> {field("mashallahBadge")} <Flower />
      </p>
      <h1 className="hw-font-serif mb-3.5 text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.15] font-semibold text-[#221c18]">
        {field("headlinePrefix")}
        <span className="hw-name-gradient mt-1 block">{field("hostNames")}</span>
      </h1>
      <p className="hw-font-serif mb-2.5 text-[1.3rem] tracking-[0.04em] text-[var(--color-terracotta-dark)] italic">
        {field("familyLine")}
      </p>
      <p className="mx-auto mb-7 max-w-[640px] text-[clamp(1rem,2vw,1.2rem)] leading-[1.7] text-[#473e37] italic">
        “{field("blessing", "", true)}”
      </p>

      <div
        className={`hw-cutout-stage relative mx-auto flex w-full max-w-[820px] flex-col items-center ${
          editing ? "cursor-pointer" : ""
        }`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        onClick={() => {
          if (editing) {
            imageRef.current?.click();
          }
        }}
        onKeyDown={(event) => {
          if (editing && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            imageRef.current?.click();
          }
        }}
        aria-label={editing ? "Change house photo" : undefined}
      >
        <span className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[90%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#e6c56852_0%,#ab4f311f_45%,transparent_75%)] blur-2xl" />
        {heroSrc ? (
          <img src={heroSrc} alt={houseName} className="hw-cutout-img relative z-[2]" />
        ) : (
          <span className="relative z-[2] inline-flex min-h-48 items-center rounded-2xl border border-dashed border-[var(--color-linen-border)] px-8 text-sm text-[#796e65]">
            Add house photo
          </span>
        )}
        {editing ? (
          <span className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)]/90 px-3 py-1 text-[10px] font-semibold tracking-[1.2px] text-[#87361b] uppercase">
            Change photo
          </span>
        ) : null}
      </div>
      {editing ? (
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onChangeHeroImage(file);
            }
            event.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}
