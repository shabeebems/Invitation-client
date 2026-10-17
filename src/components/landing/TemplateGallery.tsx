"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Playfair_Display, Allura } from "next/font/google";
import { imageUrl, type Category, type InvitationTemplate } from "@/lib/api";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
});

function CategoryGlyph({ name }: { name: string }) {
  const label = name.toLowerCase();

  if (/house|home/.test(label)) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    );
  }

  if (/wed|nikah|engag|ring|love/.test(label)) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="14" r="6.5" />
        <path d="M12 7.5l2-3-2-1-2 1 2 3z" />
        <path d="M10 4.5h4" />
      </svg>
    );
  }

  if (/celeb|party|gift|birth|cake/.test(label)) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13" />
        <path d="M3 12h18" />
        <path d="M12 8c-2.5-3-5.5-2-5.5 0 0 2 5.5 4 5.5 0z" />
        <path d="M12 8c2.5-3 5.5-2 5.5 0 0 2-5.5 4-5.5 0z" />
      </svg>
    );
  }

  if (/iftar|ramadan|eid/.test(label)) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-7.54-7.54A9.03 9.03 0 0 0 12 3z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 transition-colors"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l1.8 2H17.5A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
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
    <section
      id="templates"
      className="relative w-full overflow-hidden bg-[#F6F4EB] px-6 pt-16 pb-28 scroll-mt-20 sm:px-10 md:pt-20 md:pb-36 lg:px-12 xl:px-16"
    >
      {/* BACKGROUND DECORATIONS: Soft organic sage circular/arched shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {/* Top-Right Massive Circular Sage Arch (Crescent background in reference) */}
        <div className="absolute -top-32 -right-28 h-[760px] w-[760px] rounded-full bg-[#DCE4CF]/65 blur-[1px]" />
        {/* Mid-Right Soft Curved Swell */}
        <div className="absolute top-[380px] -right-20 h-[560px] w-[500px] rounded-l-full bg-[#E3E8D7]/40 blur-md" />
        {/* Top-Left Sage Contour behind foliage */}
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-[#D8E1C9]/50 blur-[2px]" />
        {/* Bottom-Left Flowing Curve */}
        <div className="absolute -bottom-32 -left-28 h-[640px] w-[640px] rounded-full bg-[#DCE3CE]/55 blur-[2px]" />
        {/* Bottom-Right Soft Glow */}
        <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-[#D8E1C9]/45 blur-[2px]" />
      </div>

      {/* TOP-LEFT BOTANICAL ILLUSTRATION: Green branches & white blossoms */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 select-none" aria-hidden="true">
        <svg
          className="h-32 w-32 -translate-x-6 -translate-y-6 select-none drop-shadow-[0_8px_16px_rgba(20,45,30,0.12)] sm:h-40 sm:w-40 sm:-translate-x-3 sm:-translate-y-3 lg:h-72 lg:w-72 lg:translate-x-0 lg:translate-y-0 xl:h-76 xl:w-76"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="topLeafDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#416147" />
              <stop offset="100%" stopColor="#1C3822" />
            </linearGradient>
            <linearGradient id="topLeafMid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#587A5E" />
              <stop offset="100%" stopColor="#28482E" />
            </linearGradient>
            <linearGradient id="topLeafLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6C8F72" />
              <stop offset="100%" stopColor="#35563B" />
            </linearGradient>
            <linearGradient id="whitePetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F2EFE8" />
            </linearGradient>
          </defs>

          {/* Stems */}
          <path
            d="M0 0 C 60 50, 130 110, 190 190 C 210 220, 230 260, 240 300"
            stroke="#2B4631"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M90 75 C 130 90, 160 120, 185 155"
            stroke="#2B4631"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M130 115 C 150 90, 185 80, 220 75"
            stroke="#2B4631"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M50 35 C 80 50, 110 50, 145 45"
            stroke="#2B4631"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <path d="M145 45 C 165 30, 190 35, 205 48 C 185 58, 160 55, 145 45 Z" fill="url(#topLeafLight)" />
          <path d="M120 50 C 135 65, 130 85, 120 95 C 105 82, 108 65, 120 50 Z" fill="url(#topLeafDark)" />
          <path d="M185 80 C 210 65, 235 70, 250 82 C 230 95, 205 92, 185 80 Z" fill="url(#topLeafMid)" />
          <path d="M160 120 C 185 110, 210 118, 225 132 C 205 145, 180 138, 160 120 Z" fill="url(#topLeafLight)" />
          <path d="M185 155 C 210 150, 230 162, 240 180 C 218 188, 198 178, 185 155 Z" fill="url(#topLeafDark)" />
          <path d="M190 190 C 220 195, 238 215, 245 235 C 220 240, 200 225, 190 190 Z" fill="url(#topLeafMid)" />
          <path d="M210 230 C 235 240, 250 260, 252 285 C 230 282, 218 265, 210 230 Z" fill="url(#topLeafLight)" />

          {/* Clusters of White Blossoms */}
          <g transform="translate(105, 95)">
            <ellipse cx="0" cy="-11" rx="5.5" ry="9" fill="url(#whitePetal)" />
            <ellipse cx="10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(72)" />
            <ellipse cx="6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(144)" />
            <ellipse cx="-6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-144)" />
            <ellipse cx="-10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-72)" />
            <circle cx="0" cy="0" r="3.5" fill="#E6C86E" />
            <circle cx="0" cy="0" r="1.8" fill="#B28C2E" />
          </g>

          <g transform="translate(145, 140) scale(0.85)">
            <ellipse cx="0" cy="-11" rx="5.5" ry="9" fill="url(#whitePetal)" />
            <ellipse cx="10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(72)" />
            <ellipse cx="6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(144)" />
            <ellipse cx="-6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-144)" />
            <ellipse cx="-10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-72)" />
            <circle cx="0" cy="0" r="3.5" fill="#E6C86E" />
            <circle cx="0" cy="0" r="1.8" fill="#B28C2E" />
          </g>

          <g transform="translate(75, 55) scale(0.75)">
            <ellipse cx="0" cy="-11" rx="5.5" ry="9" fill="url(#whitePetal)" />
            <ellipse cx="10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(72)" />
            <ellipse cx="6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(144)" />
            <ellipse cx="-6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-144)" />
            <ellipse cx="-10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-72)" />
            <circle cx="0" cy="0" r="3.5" fill="#E6C86E" />
            <circle cx="0" cy="0" r="1.8" fill="#B28C2E" />
          </g>
        </svg>
      </div>

      {/* LOWER-RIGHT BOTANICAL ILLUSTRATION: Cascading foliage & white blossoms */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-10 select-none" aria-hidden="true">
        <svg
          className="h-32 w-32 translate-x-6 translate-y-6 select-none drop-shadow-[0_-8px_16px_rgba(20,45,30,0.12)] sm:h-40 sm:w-40 sm:translate-x-3 sm:translate-y-3 lg:h-72 lg:w-72 lg:translate-x-0 lg:translate-y-0 xl:h-76 xl:w-76"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="botLeafDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3E6044" />
              <stop offset="100%" stopColor="#1B3520" />
            </linearGradient>
            <linearGradient id="botLeafMid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#55775B" />
              <stop offset="100%" stopColor="#2A4B30" />
            </linearGradient>
            <linearGradient id="botLeafLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6E9174" />
              <stop offset="100%" stopColor="#3B5D41" />
            </linearGradient>
          </defs>

          {/* Stems */}
          <path
            d="M320 320 C 260 260, 200 200, 130 130 C 100 100, 70 70, 40 40"
            stroke="#2B4631"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M220 230 C 180 210, 150 180, 130 140"
            stroke="#2B4631"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M180 180 C 150 160, 120 160, 90 165"
            stroke="#2B4631"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <path d="M40 40 C 30 60, 35 85, 48 100 C 58 80, 55 55, 40 40 Z" fill="url(#botLeafLight)" />
          <path d="M70 70 C 90 55, 115 60, 130 75 C 110 88, 85 85, 70 70 Z" fill="url(#botLeafDark)" />
          <path d="M90 165 C 80 145, 90 120, 105 110 C 115 130, 110 155, 90 165 Z" fill="url(#botLeafMid)" />
          <path d="M130 140 C 115 125, 125 100, 142 90 C 152 110, 148 132, 130 140 Z" fill="url(#botLeafLight)" />
          <path d="M150 190 C 130 180, 125 155, 135 140 C 155 148, 160 172, 150 190 Z" fill="url(#botLeafDark)" />
          <path d="M190 220 C 165 210, 160 185, 172 170 C 192 178, 198 202, 190 220 Z" fill="url(#botLeafMid)" />
          <path d="M230 250 C 205 240, 202 215, 215 200 C 235 208, 240 232, 230 250 Z" fill="url(#botLeafLight)" />

          {/* White flower cluster near corner */}
          <g transform="translate(195, 210)">
            <ellipse cx="0" cy="-11" rx="5.5" ry="9" fill="url(#whitePetal)" />
            <ellipse cx="10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(72)" />
            <ellipse cx="6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(144)" />
            <ellipse cx="-6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-144)" />
            <ellipse cx="-10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-72)" />
            <circle cx="0" cy="0" r="3.5" fill="#E6C86E" />
            <circle cx="0" cy="0" r="1.8" fill="#B28C2E" />
          </g>

          <g transform="translate(150, 165) scale(0.8)">
            <ellipse cx="0" cy="-11" rx="5.5" ry="9" fill="url(#whitePetal)" />
            <ellipse cx="10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(72)" />
            <ellipse cx="6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(144)" />
            <ellipse cx="-6" cy="9" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-144)" />
            <ellipse cx="-10" cy="-3" rx="5.5" ry="9" fill="url(#whitePetal)" transform="rotate(-72)" />
            <circle cx="0" cy="0" r="3.5" fill="#E6C86E" />
            <circle cx="0" cy="0" r="1.8" fill="#B28C2E" />
          </g>
        </svg>
      </div>

      {/* TOP-RIGHT DECORATIVE HANDWRITTEN MESSAGE */}
      <div
        className="pointer-events-none absolute top-8 right-8 z-10 hidden select-none lg:flex lg:flex-col lg:items-center xl:top-12 xl:right-16 -rotate-3"
        aria-hidden="true"
      >
        <p
          className={`${allura.className} text-center text-[2.1rem] leading-[1.08] text-[#344E3B] drop-shadow-sm xl:text-[2.4rem]`}
        >
          Beautiful
          <br />
          Invitations
          <br />
          for Life’s Special
          <br />
          Moments
        </p>
        <svg
          className="mt-2.5 h-5 w-5 text-[#344E3B]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-20 mx-auto max-w-[1360px]">
        {/* HEADER SECTION */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Label with horizontal lines */}
          <div className="flex items-center justify-center gap-3.5 sm:gap-5">
            <span className="h-[1.5px] w-12 bg-[#0A2A1D]/25 sm:w-20" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#4A624E] uppercase sm:text-xs">
              Choose your style
            </span>
            <span className="h-[1.5px] w-12 bg-[#0A2A1D]/25 sm:w-20" />
          </div>

          {/* Main Title */}
          <h2
            className={`${playfair.className} mt-3 text-[2.75rem] leading-[1.08] font-medium tracking-tight text-[#0A2A1D] sm:text-5xl lg:text-[3.5rem]`}
          >
            Pick a design you’ll love.
          </h2>

          {/* Subtitle */}
          <p
            className={`${playfair.className} mx-auto mt-3 max-w-xl text-base text-[#556356] italic sm:text-lg lg:text-[1.3rem]`}
          >
            Filter by occasion and preview any design before you share it.
          </p>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {/* "All" Filter Pill */}
          <button
            type="button"
            onClick={() => setSelectedId("all")}
            className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
              selectedId === "all"
                ? "bg-[#0A2A1D] text-white shadow-sm ring-1 ring-[#0A2A1D]"
                : "border border-[#E0DBCF] bg-[#FFFEF8] text-[#1E2B21] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#0A2A1D]/40 hover:bg-white"
            }`}
          >
            All
          </button>

          {/* Category Chips with pure outline glyphs */}
          {chips.map((category) => {
            const active = selectedId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedId(category.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#0A2A1D] text-white shadow-sm ring-1 ring-[#0A2A1D]"
                    : "border border-[#E0DBCF] bg-[#FFFEF8] text-[#1E2B21] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#0A2A1D]/40 hover:bg-white"
                }`}
              >
                <CategoryGlyph name={category.name} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* TEMPLATE CARDS GRID (Balanced & Centered) */}
        {visible.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-[32px] border border-[#E7E5D9] bg-[#FFFEF8] px-8 py-14 text-center shadow-sm">
            <p className={`${playfair.className} text-2xl text-[#0A2A1D]`}>No templates found</p>
            <p className="mt-2 text-sm text-[#62675F]">Choose another category to browse available designs.</p>
          </div>
        ) : (
          <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-7 xl:gap-8">
            {visible.map((template) => {
              const hero = imageUrl(template.images, "hero") || template.images?.[0]?.url;

              return (
                <article
                  key={template.id}
                  className="group relative flex w-full max-w-[320px] sm:max-w-[325px] flex-col overflow-hidden rounded-[32px] border border-[#EDE8DC] bg-[#FFFEFA] shadow-[0_18px_42px_rgba(20,40,30,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(20,40,30,0.12)] sm:rounded-[36px]"
                >
                  {/* Large Photographic Image with Curved Wave Bottom */}
                  <div className="relative h-[290px] w-full overflow-hidden rounded-t-[31px] bg-[#EFECE1] sm:h-[310px] sm:rounded-t-[35px]">
                    {hero ? (
                      <img
                        src={hero}
                        alt={template.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#E9E5D6] text-[#0A2A1D]/50">
                        <span className={`${playfair.className} text-2xl italic`}>{template.name}</span>
                      </div>
                    )}

                    {/* Subtle Organic Curve at bottom of photo matching reference */}
                    <svg
                      className="pointer-events-none absolute -bottom-[1px] left-0 h-6 w-full text-[#FFFEFA] select-none"
                      viewBox="0 0 320 24"
                      preserveAspectRatio="none"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 24 L0 8 Q160 16 230 4 Q275 0 320 14 L320 24 Z" />
                    </svg>

                    {/* Botanical Leaf Sprig sitting gracefully at bottom-right corner of photo */}
                    <div
                      className="pointer-events-none absolute -bottom-2 right-2.5 z-20 select-none drop-shadow-[0_4px_8px_rgba(20,45,30,0.22)]"
                      aria-hidden="true"
                    >
                      <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="leafCard1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#4A6F52" />
                            <stop offset="100%" stopColor="#203E27" />
                          </linearGradient>
                          <linearGradient id="leafCard2" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#62896B" />
                            <stop offset="100%" stopColor="#2E4F36" />
                          </linearGradient>
                        </defs>
                        <path d="M6 38 C 14 30, 24 22, 38 6" stroke="#25432C" strokeWidth="2.2" strokeLinecap="round" />
                        {/* Leaf 1 - top right */}
                        <path d="M38 6 C 30 8, 26 15, 28 22 C 33 20, 36 14, 38 6 Z" fill="url(#leafCard1)" />
                        {/* Leaf 2 - center */}
                        <path d="M28 15 C 20 15, 15 20, 16 28 C 23 26, 26 21, 28 15 Z" fill="url(#leafCard2)" />
                        {/* Leaf 3 - bottom left */}
                        <path d="M19 25 C 13 26, 10 31, 9 37 C 15 36, 18 32, 19 25 Z" fill="url(#leafCard1)" />
                        {/* Leaf 4 - small outer */}
                        <path d="M28 22 C 35 22, 40 27, 42 34 C 36 34, 31 30, 28 22 Z" fill="url(#leafCard2)" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Occasion Label */}
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-[#657C63] uppercase">
                        {template.categoryName || "Invitation"}
                      </p>

                      {/* Template Title */}
                      <h3
                        className={`${playfair.className} mt-2 text-[1.65rem] leading-[1.2] font-medium text-[#0A2A1D] sm:text-[1.75rem]`}
                      >
                        {template.name}
                      </h3>

                      {/* Template Description */}
                      <p className="mt-2.5 line-clamp-3 min-h-[3.75rem] text-[13px] leading-[1.62] text-[#5F6760]">
                        {template.description}
                      </p>
                    </div>

                    {/* Action Buttons: Preview & Use → */}
                    <div className="mt-6 flex items-center gap-3 pt-1">
                      <Link
                        href={`/preview/${template.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0A2A1D] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#14422F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2A1D]"
                      >
                        <svg className="h-4 w-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Preview</span>
                      </Link>

                      <Link
                        href={`/user/use/${template.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#C5B595] bg-[#FFFEF8] px-4 py-2.5 text-[13px] font-semibold text-[#0A2A1D] shadow-sm transition hover:border-[#0A2A1D] hover:bg-[#0A2A1D]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2A1D]"
                      >
                        <svg
                          className="h-3.5 w-3.5 shrink-0 text-[#0A2A1D]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 2L11 13" />
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                        </svg>
                        <span>Use &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
