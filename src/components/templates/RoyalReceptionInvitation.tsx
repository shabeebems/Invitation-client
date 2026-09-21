"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { API_URL, type InvitationTemplate, type InvitationTheme, type TemplateContent, imageUrl, withImageUrl } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";
import ThemePicker from "@/components/templates/ThemePicker";

export const RED_VELVET_THEME_ID = "6ab112ec097114d6c4cefdb4";
export const HULK_THEME_ID = "6ab1131c097114d6c4cefdc3";

const petals = [
  { left: "2%", width: 13, delay: "1.2s", duration: "17s", sway: "-50px", spin: "534deg", fill: "var(--maroon)" },
  { left: "10%", width: 15, delay: "2.4s", duration: "12s", sway: "46px", spin: "443deg", fill: "var(--maroon-soft)" },
  { left: "26%", width: 15, delay: "3.5s", duration: "12s", sway: "-60px", spin: "218deg", fill: "var(--maroon-deep)" },
  { left: "36%", width: 18, delay: "4.4s", duration: "16s", sway: "9px", spin: "203deg", fill: "var(--gold)" },
  { left: "48%", width: 16, delay: "5.1s", duration: "12s", sway: "36px", spin: "270deg", fill: "var(--maroon)" },
  { left: "62%", width: 11, delay: "6.7s", duration: "18s", sway: "50px", spin: "258deg", fill: "var(--maroon-soft)" },
  { left: "76%", width: 12, delay: "3.8s", duration: "19s", sway: "22px", spin: "534deg", fill: "var(--maroon-deep)" },
  { left: "90%", width: 20, delay: "7.9s", duration: "18s", sway: "53px", spin: "472deg", fill: "var(--gold)" },
];

const sparkles = [
  { left: "8%", top: "18%", size: 3, delay: "0s", duration: "2.4s" },
  { left: "37%", top: "53%", size: 3, delay: "0.35s", duration: "2.8s" },
  { left: "74%", top: "6%", size: 4, delay: "0.7s", duration: "3.2s" },
  { left: "11%", top: "59%", size: 5, delay: "1.05s", duration: "3.6s" },
  { left: "48%", top: "12%", size: 2, delay: "1.4s", duration: "4s" },
  { left: "85%", top: "65%", size: 3, delay: "1.75s", duration: "2.4s" },
  { left: "22%", top: "18%", size: 4, delay: "2.1s", duration: "2.8s" },
  { left: "59%", top: "71%", size: 5, delay: "2.45s", duration: "3.2s" },
];

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

function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <svg
          key={petal.left}
          className="petal absolute top-[-30px]"
          viewBox="0 0 20 24"
          style={{
            left: petal.left,
            width: petal.width,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            ["--sway" as string]: petal.sway,
            ["--spin" as string]: petal.spin,
          }}
        >
          <path d="M10 1 C 16 6, 19 12, 15 19 C 12.5 23, 7.5 23, 5 19 C 1 12, 4 6, 10 1 Z" fill={petal.fill} opacity="0.75" />
        </svg>
      ))}
    </div>
  );
}

function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={`${sparkle.left}-${sparkle.top}`}
          className="sparkle absolute rounded-full bg-[radial-gradient(circle,#f3e8cd_0%,#b9893e_55%,transparent_70%)] shadow-[0_0_6px_rgba(231,211,164,0.7)]"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function RoyalReceptionInvitation({
  template,
  editable = false,
}: {
  template: InvitationTemplate;
  editable?: boolean;
}) {
  const [draft, setDraft] = useState(template);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { content } = draft;
  const heroImageUrl = imageUrl(draft.images, "hero");
  const groomsInitial = (content.groomName || "").trim().charAt(0) || "I";
  const bridesInitial = (content.brideName || "").trim().charAt(0) || "A";
  const shareText = encodeURIComponent(content.shareText || "");

  async function persist(nextContent: TemplateContent, image?: File) {
    setStatus("saving");

    const body = new FormData();
    body.append("content", JSON.stringify(nextContent));

    if (image) {
      body.append("image", image);
      body.append("imageSlot", "hero");
    }

    try {
      const response = await fetch(`${API_URL}/api/templates/${draft.slug}`, {
        method: "PUT",
        body,
      });
      const data = (await response.json()) as {
        success?: boolean;
        template?: InvitationTemplate;
      };

      if (!response.ok || !data.success || !data.template) {
        throw new Error("Save failed");
      }

      setDraft(data.template);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  function commit(key: Exclude<keyof TemplateContent, "programItems" | "galleryItems">, value: string) {
    setDraft((prev) => {
      if (prev.content[key] === value) {
        return prev;
      }

      const nextContent = { ...prev.content, [key]: value };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function changeImage(file: File) {
    const preview = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, images: withImageUrl(prev.images, "hero", preview) }));
    void persist(draft.content, file);
  }

  const field = (key: Exclude<keyof TemplateContent, "programItems" | "galleryItems">, className: string, multiline = false) => (
    <EditableField
      value={content[key] || ""}
      editable={editable}
      className={className}
      multiline={multiline}
      onCommit={(value) => commit(key, value)}
    />
  );

  let themeClass = "";

  if (draft.selectedThemeId === HULK_THEME_ID) {
    themeClass = " palette-emerald";
  } else if (draft.selectedThemeId === RED_VELVET_THEME_ID) {
    themeClass = "";
  }

  return (
    <main className={`royal-invitation relative${themeClass}`}>
      {editable ? (
        <div className="fixed top-[max(10px,env(safe-area-inset-top,0px))] left-[max(12px,env(safe-area-inset-left,0px))] z-[1200] flex max-w-[min(92vw,360px)] flex-col gap-1 rounded-2xl border border-[#e7d3a459] bg-[#1a060ce8] px-3 py-2.5 text-[#f3e8cd] shadow-[0_10px_28px_rgba(10,5,7,0.45)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="font-caps rounded-full border border-[#e7d3a473] px-3 py-1 text-[10px] tracking-[1.4px] text-[#e7d3a4] uppercase no-underline hover:border-[#e7d3a4] hover:text-[#f3e8cd]"
            >
              Done
            </Link>
            <span className="font-caps text-[9px] tracking-[1.4px] text-[#e7d3a4b3] uppercase">
              {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : status === "error" ? "Could not save" : "Editing"}
            </span>
          </div>
          <p className="font-invite-sans m-0 text-[11px] text-[#f3e8cd99]">Tap any text or the photo to edit</p>
          <ThemePicker
            slug={draft.slug}
            selectedThemeId={draft.selectedThemeId}
            themes={draft.themes || []}
            variant="invite"
            onChange={(selectedThemeId, themes: InvitationTheme[]) => {
              setDraft((prev) => ({
                ...prev,
                selectedThemeId,
                selectedThemeTitle: themes.find((theme) => theme.id === selectedThemeId)?.title || prev.selectedThemeTitle,
                themes,
              }));
              setStatus("saved");
            }}
          />
        </div>
      ) : null}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[1100] px-[clamp(12px,2.5vw,32px)]">
        <div className="flex min-h-16 items-center justify-center">
          <a href="#home" className="pointer-events-auto flex flex-col items-center no-underline" aria-label="Home">
            <span className="font-names text-[clamp(28px,4vw,38px)] leading-none tracking-wide text-[#e7d3a4] [text-shadow:0_2px_18px_rgba(185,137,62,0.35)]">
              {groomsInitial}
              <span className="mx-0.5 text-[0.55em] text-[#b9893e]">&</span>
              {bridesInitial}
            </span>
          </a>
        </div>
      </header>

      <section
        id="home"
        className="invite-hero relative z-[2] flex min-h-svh items-center justify-center overflow-hidden px-[clamp(16px,3vw,40px)] pt-[clamp(64px,8vh,88px)] pb-[clamp(24px,4vh,40px)] text-[#f3e8cd]"
      >
        <Petals />
        <Sparkles />
        <CornerVine className="top-[clamp(70px,12vh,96px)] left-[clamp(10px,2vw,24px)]" />
        <CornerVine className="top-[clamp(70px,12vh,96px)] right-[clamp(10px,2vw,24px)] -scale-x-100" />

        <div className="relative z-[4] grid w-[min(1180px,100%)] grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-[clamp(20px,3.5vw,48px)]">
          <div className="relative z-[5] order-2 flex min-h-0 items-end justify-center lg:order-1 lg:col-start-1 lg:row-span-2 lg:min-h-[min(78vh,720px)]">
            <div
              className={`relative ${editable ? "cursor-pointer" : ""}`}
              role={editable ? "button" : undefined}
              tabIndex={editable ? 0 : undefined}
              onClick={() => editable && imageInputRef.current?.click()}
              onKeyDown={(event) => {
                if (editable && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  imageInputRef.current?.click();
                }
              }}
              aria-label={editable ? "Change couple photo" : undefined}
            >
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt={`${content.groomName} and ${content.brideName}`}
                  className="h-auto w-full max-w-[min(86vw,620px)] object-contain object-bottom lg:max-h-[min(78vh,720px)] lg:max-w-none"
                />
              ) : (
                <span className="font-caps inline-flex min-h-48 min-w-48 items-center justify-center border border-dashed border-[#e7d3a473] px-6 text-[10px] tracking-[2px] text-[#e7d3a4] uppercase">
                  Add photo
                </span>
              )}
              {editable ? (
                <span className="font-caps pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[#e7d3a473] bg-[#1a060cc7] px-3 py-1.5 text-[9px] tracking-[1.6px] text-[#e7d3a4] uppercase">
                  Change photo
                </span>
              ) : null}
            </div>
            {editable ? (
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void changeImage(file);
                  }
                  event.target.value = "";
                }}
              />
            ) : null}
          </div>

          <div className="order-1 w-full max-w-[540px] justify-self-center self-end px-4 text-center lg:order-2 lg:col-start-2 lg:px-0">
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
              <span className="font-invite-serif my-0.5 text-[clamp(22px,2vw+0.4rem,34px)] text-[#b9893e] italic">
                &
              </span>
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

          <div className="order-3 col-start-1 w-full max-w-[540px] justify-self-center pb-1 text-center lg:col-start-2">
            <div className="mx-auto flex w-fit max-w-full items-stretch justify-center border border-[#e7d3a459] bg-[#fdf9f20f] px-1.5 py-2 backdrop-blur-sm">
              <div className="flex min-w-0 flex-col items-center justify-center px-[clamp(10px,1.8vw,18px)] py-1">
                <span className="font-caps border-y border-[#e7d3a473] px-0.5 py-[7px] text-[clamp(10px,0.4vw+0.5rem,13px)] tracking-[1.6px] whitespace-nowrap text-[#f3e8cd]">
                  {field("weekday", "")}
                </span>
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center border-x border-[#e7d3a473] px-[clamp(10px,1.8vw,18px)] py-1">
                {field("day", "font-invite-serif text-[clamp(24px,2.2vw+0.6rem,36px)] leading-none text-[#e7d3a4]")}
                {field(
                  "monthYear",
                  "font-caps text-[clamp(8px,0.3vw+0.45rem,11px)] tracking-[1.2px] whitespace-nowrap text-[#f3e8cd]"
                )}
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center px-[clamp(10px,1.8vw,18px)] py-1">
                <span className="font-caps border-y border-[#e7d3a473] px-0.5 py-[7px] text-[clamp(10px,0.4vw+0.5rem,13px)] tracking-[1.6px] whitespace-nowrap text-[#f3e8cd]">
                  {field("time", "")}
                </span>
              </div>
            </div>
            <p className="font-script mt-4 text-center text-[clamp(18px,2vw+0.5rem,24px)] text-[#e7d3a4]">
              {field("dayNote", "")}
            </p>
            <div className="mt-5 flex w-full flex-col items-center gap-0.5">
              <p className="font-caps mb-1 text-[9px] tracking-[3px] text-[#b9893ed9] uppercase">{field("venueLabel", "")}</p>
              <p className="font-invite-serif text-[clamp(18px,1.4vw+0.6rem,26px)] leading-[1.25] text-[#f3e8cd]">
                {field("venueName", "")}
              </p>
              <p className="font-caps mt-0.5 text-[clamp(9px,0.3vw+0.45rem,11px)] tracking-[2.2px] text-[#e7d3a4b3] uppercase">
                {field("venueHall", "")}
              </p>
              <p className="font-caps mt-0.5 text-[clamp(9px,0.3vw+0.45rem,11px)] tracking-[2.2px] text-[#e7d3a4b3] uppercase">
                {field("venueCity", "")}
              </p>
              <div className="mt-3 flex w-full max-w-[280px] flex-col items-center justify-center">
                {editable ? (
                  <>
                    <span className="font-caps inline-flex min-h-11 min-w-[168px] items-center justify-center border border-[#b9893e66] bg-transparent px-5 py-2.5 text-[10px] tracking-[1.6px] text-[#b9893e] uppercase">
                      Open in Maps
                    </span>
                    {field(
                      "mapsUrl",
                      "font-invite-sans mt-2 block max-w-full break-all text-[10px] tracking-normal text-[#e7d3a4a6] normal-case",
                      true
                    )}
                  </>
                ) : (
                  <a
                    className="font-caps inline-flex min-h-11 min-w-[168px] items-center justify-center border border-[#b9893e66] bg-transparent px-5 py-2.5 text-[10px] tracking-[1.6px] text-[#b9893e] uppercase no-underline transition-colors hover:border-[#e7d3a4a6] hover:text-[#e7d3a4]"
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="invite-footer relative z-[1] overflow-hidden px-[clamp(16px,3vw,32px)] pt-[clamp(24px,4vh,40px)] pb-6 text-center">
        <p className="font-names text-shimmer-slow mt-0 text-[clamp(34px,5vw+0.5rem,54px)] leading-[1.15]">
          {field("groomName", "")} <span className="font-invite-serif text-[0.55em] text-[#b9893e] not-italic"> & </span> {field("brideName", "")}
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
        <p className="font-invite-sans mt-4 mb-0 text-[9px] tracking-[0.14em] text-[#f3e8cd38]">
          {field("footer", "")}
        </p>
      </footer>

      <a
        className="invite-share font-caps fixed right-[max(14px,env(safe-area-inset-right,0px))] bottom-[max(18px,env(safe-area-inset-bottom,0px))] z-[1100] inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#f3e8cd73] px-4 py-3 text-[10px] tracking-[2px] text-[#e7d3a4] uppercase no-underline"
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share invitation on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.7 15l-1.2 4.3 4.4-1.2A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5l-.3.5c-.1.2-.3.3-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1.2.1 1.6.8 1.9.9.3.2.5.2.6.3.1.2.1 1-.1 1.7z"
          />
        </svg>
        <span className="max-sm:sr-only">Share</span>
      </a>
    </main>
  );
}
