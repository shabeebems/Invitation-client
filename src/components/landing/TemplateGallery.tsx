"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { imageUrl, type Category, type InvitationTemplate } from "@/lib/api";
import { allura, cormorant } from "@/lib/fonts";
import "./template-gallery.css";

/** Requests a cropped, compressed rendition from Cloudinary; other hosts pass through untouched. */
function sized(url: string, width: number) {
  return url.includes("/image/upload/")
    ? url.replace("/image/upload/", `/image/upload/c_fill,g_auto,ar_5:4,w_${width},q_auto,f_auto/`)
    : url;
}

function circleThumb(url: string) {
  return url.includes("/image/upload/")
    ? url.replace("/image/upload/", "/image/upload/c_fill,g_auto,w_160,h_160,q_auto,f_auto/")
    : url;
}

const BACK_SLOTS = ["heroAlt", "couple", "story", "storyFeature", "bride", "groom", "envelope"];

function photosFor(template: InvitationTemplate) {
  const images = template.images || [];
  const front = imageUrl(images, "hero") || images[0]?.url || "";
  const back =
    BACK_SLOTS.map((slot) => imageUrl(images, slot)).find((url) => url && url !== front) ||
    images.find((image) => image.url && image.url !== front)?.url ||
    "";

  return { front, back };
}

/** First clause of the description, so every card reads as a short two-line tagline. */
function tagline(description: string) {
  const text = description.trim();
  const first = text.split(/[,.;:—]|\swith\s/)[0]?.trim() || "";

  if (first.length < 14) return text;
  return `${first}.`;
}

const LEAF = "M0 0C3-4.6 9.6-6.2 16-3.7C11 1.7 4.6 2.5 0 0Z";

const SPRIG_LEAVES: [number, number, number, number, string][] = [
  [11, 39, -100, 0.9, "#7D9873"],
  [13, 37, 4, 0.85, "#5E7A58"],
  [19, 30, -104, 1, "#93AC88"],
  [21, 28, -2, 0.95, "#6E8A66"],
  [27, 21, -100, 0.9, "#5E7A58"],
  [29, 19, -8, 0.85, "#8BA47F"],
  [36, 12, -96, 0.7, "#6E8A66"],
  [39, 8, -46, 0.75, "#7D9873"],
];

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path d="M5 45C14 36 24 24 40 7" stroke="#6F8A68" strokeWidth="1.2" strokeLinecap="round" />
      {SPRIG_LEAVES.map(([x, y, rotate, scale, fill]) => (
        <path
          key={`${x}-${y}`}
          d={LEAF}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
          fill={fill}
          fillOpacity="0.92"
        />
      ))}
    </svg>
  );
}

const GARDEN_LEAVES: [number, number, number, number, string][] = [
  [56, 152, -142, 1.7, "#6F8C69"],
  [57, 146, -36, 1.6, "#8EA784"],
  [55, 128, -150, 1.5, "#587553"],
  [56, 121, -30, 1.7, "#6F8C69"],
  [51, 90, -146, 1.5, "#8EA784"],
  [52, 84, -28, 1.35, "#587553"],
  [46, 58, -152, 1.3, "#6F8C69"],
  [47, 52, -30, 1.25, "#8EA784"],
  [48, 25, -132, 1.15, "#587553"],
  [50, 19, -52, 1.05, "#6F8C69"],
  [56, 5, -72, 0.95, "#8EA784"],
  [72, 101, -66, 1.3, "#6F8C69"],
  [77, 99, 24, 1.15, "#8EA784"],
  [103, 88, -16, 1.25, "#587553"],
  [30, 66, -116, 1.2, "#8EA784"],
  [25, 67, 160, 1.15, "#6F8C69"],
  [9, 57, -160, 1.15, "#587553"],
];

const EUCALYPTUS: [number, number, number][] = [
  [88, 95, -20],
  [96, 84, -35],
  [64, 35, -30],
  [73, 27, -40],
  [81, 19, -50],
];

function Bloom({ x, y, scale, rotate }: { x: number; y: number; scale: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M0 0C-7.5-5-8.5-16 0-21C8.5-16 7.5-5 0 0Z"
          transform={`rotate(${angle})`}
          fill="#FFFDF7"
          stroke="#E2D7C3"
          strokeWidth="0.8"
        />
      ))}
      <circle r="3.8" fill="#DDBE77" />
      <circle r="1.7" fill="#A8844F" />
    </g>
  );
}

function GardenSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 170" className={className} fill="none" aria-hidden="true">
      <g stroke="#5F7A59" strokeWidth="1.4" strokeLinecap="round">
        <path d="M58 168C52 130 60 95 48 60C42 40 46 20 56 4" />
        <path d="M54 110C70 100 86 98 104 88" />
        <path d="M50 75C36 66 22 64 8 56" />
        <path d="M47 45C60 38 72 30 82 18" />
      </g>
      {GARDEN_LEAVES.map(([x, y, rotate, scale, fill]) => (
        <path
          key={`${x}-${y}`}
          d={LEAF}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
          fill={fill}
          fillOpacity="0.9"
        />
      ))}
      {EUCALYPTUS.map(([x, y, rotate]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="6"
          ry="4.4"
          transform={`rotate(${rotate} ${x} ${y})`}
          fill="#A9B9A1"
          fillOpacity="0.9"
        />
      ))}
      <Bloom x={62} y={108} scale={0.95} rotate={10} />
      <Bloom x={31} y={68} scale={0.78} rotate={-14} />
      <Bloom x={60} y={38} scale={0.62} rotate={22} />
      <ellipse cx="90" cy="14" rx="3" ry="4.4" transform="rotate(35 90 14)" fill="#F6EFE0" stroke="#E2D7C3" strokeWidth="0.7" />
      <ellipse cx="108" cy="84" rx="2.8" ry="4" transform="rotate(70 108 84)" fill="#F6EFE0" stroke="#E2D7C3" strokeWidth="0.7" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path
        d="M12 20.3s-7.6-4.6-9.2-9.4C1.7 7.5 3.8 4.4 7.1 4.4c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.3 0 5.4 3.1 4.3 6.5-1.6 4.8-9.2 9.4-9.2 9.4Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TemplateGallery({
  categories,
  templates,
}: {
  categories: Category[];
  templates: InvitationTemplate[];
}) {
  const [selectedId, setSelectedId] = useState("all");

  const chips = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }

    const seen = new Map<string, Category>();

    for (const template of templates) {
      if (!template.categoryId || seen.has(template.categoryId)) {
        continue;
      }

      seen.set(template.categoryId, {
        id: template.categoryId,
        name: template.categoryName || "Invitation",
        description: "",
        isActive: true,
        imageUrl: "",
      });
    }

    return [...seen.values()];
  }, [categories, templates]);

  const visible = useMemo(
    () =>
      selectedId === "all"
        ? templates
        : templates.filter((template) => template.categoryId === selectedId),
    [selectedId, templates]
  );

  return (
    <section id="templates" className="tg scroll-mt-20">
      <GardenSprig className="tg-garden tg-garden--right" />

      <div className="tg-inner">
        <div className="tg-head">
          <div className="tg-heading">
            <GardenSprig className="tg-garden tg-garden--left" />
            <h2 className={`tg-title ${allura.className}`}>Elegant Templates</h2>
            <p className="tg-sub">Beautiful designs for your special moments</p>
            <span className="tg-rule" aria-hidden="true">
              <i />
              <HeartIcon />
              <i />
            </span>
          </div>

          <div className="tg-cats" role="group" aria-label="Filter templates by occasion">
            <button
              type="button"
              aria-pressed={selectedId === "all"}
              onClick={() => setSelectedId("all")}
              className={`tg-cat${selectedId === "all" ? " is-active" : ""}`}
            >
              <span className="tg-cat-photo tg-cat-photo--all" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="7" height="7" rx="2" />
                  <rect x="13" y="4" width="7" height="7" rx="2" />
                  <rect x="4" y="13" width="7" height="7" rx="2" />
                  <rect x="13" y="13" width="7" height="7" rx="2" />
                </svg>
              </span>
              <span className="tg-cat-name">All</span>
            </button>

            {chips.map((category) => {
              const active = selectedId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(category.id)}
                  className={`tg-cat${active ? " is-active" : ""}`}
                >
                  <span className="tg-cat-photo" aria-hidden="true">
                    {category.imageUrl ? (
                      <img src={circleThumb(category.imageUrl)} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className={`tg-cat-initial ${cormorant.className}`}>
                        {category.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="tg-cat-name">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length === 1 ? "1 template" : `${visible.length} templates`}
        </p>

        {visible.length === 0 ? (
          <div className="tg-empty">
            <LeafSprig className="tg-empty-leaf" />
            <p className={`tg-empty-title ${allura.className}`}>Coming soon</p>
            <p className="tg-empty-text">
              New designs for this occasion are being crafted. Try another category for now.
            </p>
            <button type="button" className="tg-empty-btn" onClick={() => setSelectedId("all")}>
              View all templates
            </button>
          </div>
        ) : (
          <ul className="tg-grid" key={selectedId}>
            {visible.map((template, index) => {
              const { front, back } = photosFor(template);
              const href = `/preview/${template.slug}`;

              return (
                <li key={template.id} className="tg-item" style={{ "--i": index } as CSSProperties}>
                  <article className="tg-card">
                    <div className="tg-stack" aria-hidden="true">
                      <span className={`tg-frame tg-frame--back${back ? "" : " is-blank"}`}>
                        {back ? <img src={sized(back, 360)} alt="" loading="lazy" decoding="async" /> : null}
                      </span>
                      <span className="tg-frame tg-frame--front">
                        {front ? (
                          <img src={sized(front, 520)} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <span className={`tg-photo-fallback ${cormorant.className}`}>{template.name}</span>
                        )}
                      </span>
                      <LeafSprig className="tg-sprig tg-sprig--left" />
                      <LeafSprig className="tg-sprig tg-sprig--right" />
                    </div>

                    <div className="tg-body">
                      <span className="tg-tag">{template.categoryName || "Invitation"}</span>
                      <h3 className={`tg-name ${cormorant.className}`}>
                        <Link href={href} className="tg-link">
                          {template.name}
                        </Link>
                      </h3>
                      <p className="tg-desc">{tagline(template.description)}</p>
                      <div className="tg-foot" aria-hidden="true">
                        <LeafSprig className="tg-foot-leaf" />
                        <span className="tg-go">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/user/use/${template.slug}`}
                      className="tg-use"
                      aria-label={`Use ${template.name}`}
                      title="Use this template"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 20h9" />
                        <path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.5 18.5 3.5 19.5l1-4Z" />
                      </svg>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
