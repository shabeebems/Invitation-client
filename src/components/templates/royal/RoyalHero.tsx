"use client";

import { useRef, type ReactNode } from "react";

function OrnamentWave() {
  return (
    <svg className="mx-auto my-1.5 mb-3 block w-[130px] max-w-full text-[#b9893e] opacity-90" viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path
        d="M4 12 C 24 12, 30 5, 44 5 C 58 5, 60 19, 74 19 C 80 19, 80 12, 80 12 C 80 12, 80 5, 86 5 C 100 5, 102 19, 116 19 C 130 19, 136 12, 156 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="80" cy="12" r="2.6" fill="currentColor" />
      <circle cx="8" cy="12" r="1.6" fill="currentColor" />
      <circle cx="152" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CornerVine({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute hidden w-[clamp(56px,11vw,96px)] text-[#b9893ea6] sm:block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="block h-auto w-full">
        <path d="M8 8 C30 10 24 38 48 44 C70 50 66 18 92 26 C106 30 110 48 116 54" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 8 C12 30 38 24 48 44 C22 60 28 86 32 112" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="48" cy="44" r="3" fill="currentColor" />
        <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        <path d="M72 20 C78 12 90 16 90 26 C90 34 78 34 74 28 C70 22 72 20 72 20Z" fill="currentColor" opacity="0.55" />
      </svg>
    </span>
  );
}

export default function RoyalHero({
  editing,
  heroImageUrl,
  groomName,
  brideName,
  field,
  onChangeImage,
}: {
  editing: boolean;
  heroImageUrl: string;
  groomName: string;
  brideName: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <section
      id="home"
      className="invite-hero relative z-[2] flex min-h-svh items-center justify-center overflow-hidden px-[clamp(16px,3vw,40px)] pt-[clamp(64px,8vh,88px)] pb-[clamp(24px,4vh,40px)] text-[#f3e8cd]"
    >
      <CornerVine className="top-[clamp(70px,12vh,96px)] left-[clamp(10px,2vw,24px)]" />
      <CornerVine className="top-[clamp(70px,12vh,96px)] right-[clamp(10px,2vw,24px)] -scale-x-100" />

      <div className="relative z-[4] grid w-[min(1180px,100%)] grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-[clamp(20px,3.5vw,48px)]">
        <div className="relative z-[5] order-2 flex min-h-0 items-end justify-center lg:order-1 lg:min-h-[min(78vh,720px)]">
          <div
            className={`relative ${editing ? "cursor-pointer" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            onClick={() => editing && imageInputRef.current?.click()}
            onKeyDown={(event) => {
              if (editing && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                imageInputRef.current?.click();
              }
            }}
            aria-label={editing ? "Change couple photo" : undefined}
          >
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt={`${groomName} and ${brideName}`}
                className="h-auto w-full max-w-[min(86vw,620px)] object-contain object-bottom lg:max-h-[min(78vh,720px)] lg:max-w-none"
              />
            ) : (
              <span className="font-caps inline-flex min-h-48 min-w-48 items-center justify-center border border-dashed border-[#e7d3a473] px-6 text-[10px] tracking-[2px] text-[#e7d3a4] uppercase">
                Add photo
              </span>
            )}
            {editing ? (
              <span className="font-caps pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[color:color-mix(in_srgb,var(--gold-light)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--night)_78%,transparent)] px-3 py-1.5 text-[9px] tracking-[1.6px] text-[color:var(--gold-light)] uppercase">
                Change photo
              </span>
            ) : null}
          </div>
          {editing ? (
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onChangeImage(file);
                event.target.value = "";
              }}
            />
          ) : null}
        </div>

        <div className="order-1 w-full max-w-[540px] justify-self-center self-end px-4 text-center lg:order-2 lg:px-0">
          <p className="font-arabic text-[clamp(22px,2.4vw+0.6rem,34px)] leading-[1.5] text-[#e7d3a4] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            {field("bismillah", "")}
          </p>
          <OrnamentWave />
          <p className="font-caps px-1 text-[clamp(10px,0.35vw+0.55rem,12.5px)] leading-[1.75] tracking-[2.4px] text-[#f3e8cdc7] uppercase">
            {field("hostLabel", "")}
            {field(
              "hostNames",
              "font-invite-serif mt-1 block text-[clamp(20px,1.6vw+0.7rem,28px)] tracking-[0.4px] text-[#e7d3a4] normal-case italic"
            )}
          </p>
          <p className="font-caps mt-2.5 px-1 text-[clamp(10px,0.35vw+0.55rem,12.5px)] leading-[1.75] tracking-[2.4px] text-[#f3e8cdd9] uppercase">
            {field("introLine", "")}
          </p>
          <h1 className="font-names my-3 mb-2 flex w-full flex-col items-center">
            {field("groomName", "text-shimmer block text-[clamp(46px,5vw+0.5rem,82px)] leading-[1.05]")}
            <span className="font-invite-serif my-0.5 text-[clamp(22px,2vw+0.4rem,34px)] text-[#b9893e] italic">&</span>
            {field("brideName", "text-shimmer block text-[clamp(42px,4.5vw+0.5rem,72px)] leading-[1.05]")}
          </h1>
          <p className="font-caps mt-1 px-1 text-[clamp(9px,0.3vw+0.5rem,11px)] leading-[1.7] tracking-[2px] text-[#f3e8cdb8] uppercase">
            {field("brideParentsLabel", "")}
            {field(
              "brideParents",
              "font-invite-serif mt-0.5 block text-[clamp(16px,1.2vw+0.55rem,22px)] tracking-[0.3px] text-[#e7d3a4] normal-case italic"
            )}
          </p>
          <p className="font-caps mx-auto mt-2.5 max-w-[380px] text-[clamp(10px,0.3vw+0.55rem,12px)] leading-[1.7] tracking-[2px] text-[#e7d3a4c7] uppercase">
            {field("presenceLine", "", true)}
          </p>
        </div>
      </div>
    </section>
  );
}
