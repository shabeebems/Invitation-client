"use client";

import { useEffect, useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_HERO_LAYOUTS,
  type CreamHeroLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamHero({
  editing,
  layout,
  heroImageUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  heroImageUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: CreamHeroLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_HERO_LAYOUTS, "split-arch");

  useEffect(() => {
    const node = archRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [heroImageUrl]);

  useEffect(() => {
    const node = archRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function onScroll() {
      if (!node) return;
      node.style.backgroundPosition = `50% ${50 + window.scrollY * 0.02}%`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="ce-hero" id="hero" data-layout={activeLayout} aria-label="Wedding hero">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-hg">
        <div>
          <Reveal>
            <p className="ce-eyebrow">{field("introLine", "ce-eyebrow")}</p>
          </Reveal>
          <Reveal delay="0.1s">
            <h1 className="ce-hero-names">
              <span>{field("brideName", "ce-hero-names")}</span>
              <span>
                <em>&amp;</em> {field("groomName", "ce-hero-names")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay="0.25s">
            <div className="ce-meta">
              <span>
                {field("weekday", "ce-meta")}
                {", "}
                {field("day", "ce-meta")} {field("monthYear", "ce-meta")}
              </span>
              <span>{field("venueCity", "ce-meta")}</span>
            </div>
          </Reveal>
          <Reveal delay="0.3s">
            <p className="ce-hero-sub">{field("inviteLine", "ce-hero-sub", true)}</p>
          </Reveal>
          <Reveal delay="0.35s">
            <a className="ce-btn ce-btn-fill" href="#welcome">
              Explore
            </a>
          </Reveal>
        </div>

        <div
          ref={archRef}
          className={`ce-mk ce-arch ce-ph${editing ? " is-editable" : ""}`}
          role={editing ? "button" : "img"}
          tabIndex={editing ? 0 : undefined}
          aria-label={editing ? "Change hero portrait" : "Couple portrait"}
          onClick={() => editing && fileRef.current?.click()}
          onKeyDown={(e) => {
            if (editing && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              fileRef.current?.click();
            }
          }}
          style={
            heroImageUrl
              ? { backgroundImage: `url(${heroImageUrl})` }
              : undefined
          }
        >
          {!heroImageUrl ? (
            <CreamPh colors={["#E8D9BF", "#D8B8AD"]} label="Replace with portrait" />
          ) : null}
          {editing ? <span className="ce-photo-hint">Change portrait</span> : null}
        </div>
      </div>

      {editing ? (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChangeImage(file);
            e.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}
