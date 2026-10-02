"use client";

import { useRef, useState } from "react";
import EditableField from "@/components/templates/EditableField";
import InvitationEditChrome from "@/components/templates/InvitationEditChrome";
import {
  invitationApiBase,
  invitationDoneHref,
  rememberPendingImage,
  type InvitationTemplate,
  type InvitationTheme,
  type PendingImage,
  type TemplateContent,
  imageUrl,
  withImageUrl,
} from "@/lib/api";

const CORAL_EMBER_TITLE = "Coral Ember";

const sparkles = [
  { left: "8%", top: "18%", size: 3, delay: "0s", duration: "2.6s" },
  { left: "18%", top: "42%", size: 2, delay: "0.4s", duration: "3.1s" },
  { left: "72%", top: "14%", size: 4, delay: "0.8s", duration: "2.8s" },
  { left: "84%", top: "36%", size: 3, delay: "1.1s", duration: "3.4s" },
  { left: "44%", top: "22%", size: 2, delay: "1.5s", duration: "2.4s" },
  { left: "61%", top: "58%", size: 3, delay: "1.9s", duration: "3s" },
  { left: "12%", top: "68%", size: 2, delay: "2.2s", duration: "2.7s" },
  { left: "90%", top: "70%", size: 4, delay: "0.6s", duration: "3.2s" },
];

const confetti = [
  { left: "6%", delay: "0s", duration: "11s", color: "#dcc59a" },
  { left: "18%", delay: "2.2s", duration: "13s", color: "#f3e6c8" },
  { left: "34%", delay: "1.1s", duration: "12s", color: "#c4a574" },
  { left: "52%", delay: "3.4s", duration: "14s", color: "#e8d5a8" },
  { left: "68%", delay: "0.7s", duration: "12.5s", color: "#f3e6c8" },
  { left: "82%", delay: "2.8s", duration: "11.5s", color: "#dcc59a" },
  { left: "94%", delay: "1.6s", duration: "13.5s", color: "#c4a574" },
];

function Ornament() {
  return (
    <svg className="bd-ornament" viewBox="0 0 180 24" fill="none" aria-hidden="true">
      <path
        d="M8 12 C28 12 34 5 48 5 C62 5 64 19 78 19 C84 19 84 12 90 12 C96 12 96 5 102 5 C116 5 118 19 132 19 C146 19 152 12 172 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="90" cy="12" r="2.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <circle cx="168" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function BirthdayPartyInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const [draft, setDraft] = useState(template);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [publishing, setPublishing] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const editing = editable && !previewing;
  const pendingImages = useRef<PendingImage[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { content } = draft;
  const heroImageUrl = imageUrl(draft.images, "hero");
  const shareText = encodeURIComponent(content.shareText || "");
  const mapsHref = content.googleMapsUrl || content.mapsUrl || "";
  const themeTitle =
    draft.selectedThemeTitle ||
    draft.themes?.find((theme) => theme.id === draft.selectedThemeId)?.title ||
    "";
  const themeClass = /coral\s*ember/i.test(themeTitle) || themeTitle === CORAL_EMBER_TITLE ? " palette-ember" : "";
  const initial = (content.celebrantName || "A").trim().charAt(0).toUpperCase();

  async function persist(nextContent: TemplateContent, image?: File) {
    if (onPublish) {
      if (image) {
        pendingImages.current = rememberPendingImage(pendingImages.current, { file: image, slot: "hero" });
      }
      return;
    }

    setStatus("saving");

    const body = new FormData();
    body.append("content", JSON.stringify(nextContent));

    if (image) {
      body.append("image", image);
      body.append("imageSlot", "hero");
    }

    try {
      const response = await fetch(invitationApiBase(draft), {
        method: "PUT",
        credentials: "include",
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

  async function publish() {
    if (!onPublish || publishing) {
      return;
    }

    setPublishing(true);
    setStatus("saving");

    try {
      await onPublish(draft, pendingImages.current);
    } catch (err) {
      setStatus("error");
      setPublishing(false);
      throw err;
    }
  }

  const field = (
    key: Exclude<keyof TemplateContent, "programItems" | "galleryItems">,
    className: string,
    multiline = false
  ) => (
    <EditableField
      value={content[key] || ""}
      editable={editing}
      className={className}
      multiline={multiline}
      onCommit={(value) => commit(key, value)}
    />
  );

  return (
    <main className={`birthday-invitation relative${themeClass}`}>
      <InvitationEditChrome
        variant="party"
        editing={editing}
        previewing={previewing}
        status={status}
        publishing={publishing}
        canPublish={Boolean(onPublish)}
        doneHref={invitationDoneHref(draft)}
        invitationName={draft.name}
        slug={draft.slug}
        selectedThemeId={draft.selectedThemeId}
        themes={draft.themes || []}
        source={draft.source}
        payOpen={payOpen}
        onEnterPreview={() => {
          setStatus("idle");
          setPreviewing(true);
          window.scrollTo({ top: 0 });
        }}
        onBackToEdit={() => {
          setPublishing(false);
          setStatus("idle");
          setPreviewing(false);
          setPayOpen(false);
          window.scrollTo({ top: 0 });
        }}
        onOpenPay={() => {
          setStatus("idle");
          setPayOpen(true);
        }}
        onClosePay={() => {
          if (!publishing) {
            setPayOpen(false);
          }
        }}
        onConfirmPay={async () => {
          await publish();
        }}
        onThemeChange={(selectedThemeId, themes: InvitationTheme[]) => {
          setDraft((prev) => ({
            ...prev,
            selectedThemeId,
            selectedThemeTitle:
              themes.find((theme) => theme.id === selectedThemeId)?.title || prev.selectedThemeTitle,
            themes,
          }));
          setStatus("saved");
        }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[1200] px-[clamp(12px,2.5vw,32px)]">
        <div className="flex min-h-16 items-center justify-center">
          <a href="#home" className="pointer-events-auto no-underline" aria-label="Home">
            <span className="bd-script text-[clamp(30px,4vw,40px)] leading-none text-[var(--champagne-bright)] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
              {initial}
            </span>
          </a>
        </div>
      </header>

      <section id="home" className="bd-hero">
        <div
          className={`bd-hero-media ${editing ? "bd-photo-edit" : ""}`}
          role={editing ? "button" : undefined}
          tabIndex={editing ? 0 : undefined}
          onClick={() => editing && imageInputRef.current?.click()}
          onKeyDown={(event) => {
            if (editing && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              imageInputRef.current?.click();
            }
          }}
          aria-label={editing ? "Change birthday photo" : undefined}
        >
          {heroImageUrl ? (
            <img src={heroImageUrl} alt={content.celebrantName || "Birthday celebration"} />
          ) : (
            <div className="bd-hero-fallback" />
          )}
          {editing ? <span className="bd-photo-edit-chip bd-caps text-[9px]">Change photo</span> : null}
        </div>

        <div className="bd-frame" aria-hidden="true" />
        <div className="bd-frame-corners" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="bd-monogram" aria-hidden="true">
          {initial}
        </div>

        <div className="bd-sparkle-layer" aria-hidden="true">
          {sparkles.map((sparkle) => (
            <span
              key={`${sparkle.left}-${sparkle.top}`}
              className="bd-sparkle"
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
          {confetti.map((piece) => (
            <span
              key={`${piece.left}-${piece.delay}`}
              className="bd-confetti"
              style={{
                left: piece.left,
                background: piece.color,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
              }}
            />
          ))}
        </div>

        <div className="bd-hero-copy">
          <p className="bd-caps bd-rise bd-title-row text-[clamp(10px,0.4vw+0.55rem,12px)] text-[var(--champagne-soft)]">
            {field("partyTitle", "")}
          </p>
          <h1 className="bd-rise bd-rise-delay mt-4 mb-0 text-[clamp(78px,16vw,148px)] leading-[0.86]">
            {field("celebrantName", "bd-script bd-shimmer")}
          </h1>
          <div className="bd-age-line bd-rise bd-rise-delay-2">
            {field(
              "ageLabel",
              "bd-display text-[clamp(17px,1.5vw+0.6rem,24px)] font-medium tracking-[0.06em] text-[var(--champagne-bright)]"
            )}
          </div>
          <p className="bd-display bd-rise bd-rise-delay-3 mx-auto mt-6 max-w-[36rem] text-[clamp(18px,1.7vw+0.55rem,28px)] leading-snug text-[var(--champagne-soft)]">
            {field("introLine", "", true)}
          </p>
        </div>

        <div className="bd-scroll-hint bd-caps text-[8px] tracking-[0.2em]" aria-hidden="true">
          Scroll
          <span />
        </div>

        {editing ? (
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
      </section>

      <section className="bd-section bd-section-soft">
        <Ornament />
        <div className="bd-meta">
          <div className="bd-meta-item">
            <p className="bd-caps m-0 text-[10px] text-[var(--champagne-dim)]">When</p>
            <p className="bd-display mt-3 text-[clamp(24px,2.4vw,34px)] text-[var(--champagne-bright)]">
              {field("weekday", "block")}
            </p>
            <p className="bd-sans mt-2 text-sm text-[var(--champagne-soft)]">
              {field("day", "inline")} {field("monthYear", "inline")}
            </p>
            <p className="bd-sans mt-1 text-sm text-[var(--champagne-dim)]">{field("time", "")}</p>
          </div>
          <div className="bd-meta-item">
            <p className="bd-caps m-0 text-[10px] text-[var(--champagne-dim)]">
              {field("venueLabel", "")}
            </p>
            <p className="bd-display mt-3 text-[clamp(24px,2.4vw,34px)] text-[var(--champagne-bright)]">
              {field("venueName", "")}
            </p>
            <p className="bd-sans mt-2 text-sm text-[var(--champagne-soft)]">{field("venueHall", "")}</p>
            <p className="bd-sans mt-1 text-sm text-[var(--champagne-dim)]">{field("venueCity", "")}</p>
          </div>
          <div className="bd-meta-item">
            <p className="bd-caps m-0 text-[10px] text-[var(--champagne-dim)]">Attire</p>
            <p className="bd-display mt-3 text-[clamp(24px,2.4vw,34px)] text-[var(--champagne-bright)]">
              {field("dressCode", "")}
            </p>
            <p className="bd-sans mt-2 text-sm leading-6 text-[var(--champagne-soft)]">
              {field("presenceLine", "", true)}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="bd-caps text-[10px] text-[var(--champagne-dim)]">
            {field("hostLabel", "")}
          </p>
          <p className="bd-display mt-2 text-[clamp(26px,3vw,38px)] text-[var(--champagne-bright)]">
            {field("hostNames", "")}
          </p>
        </div>
      </section>

      <section className="bd-section">
        <div className="bd-wish">
          <Ornament />
          <p className="bd-display text-[clamp(24px,3vw,36px)] leading-snug text-[var(--champagne-bright)]">
            {field("inviteLine", "", true)}
          </p>
          <p className="bd-script mt-6 text-[clamp(34px,5vw,52px)] leading-tight text-[var(--champagne)]">
            {field("blessing", "", true)}
          </p>
          <p className="bd-caps mt-7 text-[11px] text-[var(--champagne-dim)]">{field("hashtag", "")}</p>

          <div className="bd-actions">
            {mapsHref ? (
              <a href={mapsHref} target="_blank" rel="noreferrer" className="bd-cta bd-sans text-sm font-medium">
                Open directions
              </a>
            ) : null}
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
              className="bd-cta bd-cta-solid bd-sans text-sm font-semibold"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="bd-footer">
        <p className="bd-sans text-xs text-[var(--champagne-dim)]">{field("footer", "")}</p>
        {content.addressFull ? (
          <p className="bd-sans mt-2 text-[11px] text-[var(--champagne-dim)]">{field("addressFull", "")}</p>
        ) : null}
      </footer>
    </main>
  );
}
