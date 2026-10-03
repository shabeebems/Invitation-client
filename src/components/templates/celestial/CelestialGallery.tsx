"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { GalleryItem } from "@/lib/api";

export default function CelestialGallery({
  items,
  editable,
  field,
  onImageChange,
}: {
  items?: GalleryItem[];
  editable: boolean;
  field: (key: any, className?: string) => ReactNode;
  onImageChange?: (file: File, index: number) => void;
}) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadIndex, setSelectedUploadIndex] = useState<number>(0);

  const displayItems = items && items.length > 0 ? items : [
    { eyebrow: "Orion", title: "Golden Radiance", caption: "Walking hand in hand toward eternity", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Lyra", title: "Twilight Serenade", caption: "Whispers of grace beneath the evening sky", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Cygnus", title: "Infinite Harmony", caption: "Two souls anchored in faith and affection", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Cassiopeia", title: "Written Forever", caption: "Blessed by the heavens, cherished on earth", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80" },
  ];

  const coordinates = [
    "RA: 05h 35m · DEC: -05° 23'",
    "RA: 18h 50m · DEC: +36° 50'",
    "RA: 20h 41m · DEC: +45° 16'",
    "RA: 01h 00m · DEC: +60° 43'",
  ];

  useEffect(() => {
    if (activePhotoIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1));
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev !== null && prev < displayItems.length - 1 ? prev + 1 : 0));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, displayItems.length]);

  function handleSlotClick(index: number) {
    if (editable) {
      setSelectedUploadIndex(index);
      fileInputRef.current?.click();
    } else {
      setActivePhotoIndex(index);
    }
  }

  const activePhoto = activePhotoIndex !== null ? displayItems[activePhotoIndex] : null;

  return (
    <section id="gallery" className="relative z-10 mx-auto my-28 max-w-6xl px-4 text-center">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && onImageChange) {
            onImageChange(file, selectedUploadIndex);
          }
        }}
      />

      {/* Decorative Divider */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
        <span className="font-serif text-xs tracking-[0.3em]">✦ CONSTELLATION VAULT ✦</span>
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
        {field("galleryEyebrow", "text-center text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl">
        {field("galleryTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--cs-text-muted)]">
        {field("galleryIntro", "text-center text-sm font-light text-[var(--cs-text-muted)]")}
      </p>

      {/* Astrolabe Photo Plates Grid */}
      <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {displayItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSlotClick(index)}
            className="cs-instrument-card group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:border-[var(--cs-starlight)] hover:shadow-[0_0_35px_rgba(243,227,182,0.35)]"
          >
            <span className="cs-corner-pin tl" />
            <span className="cs-corner-pin tr" />
            <span className="cs-corner-pin bl" />
            <span className="cs-corner-pin br" />

            {item.url ? (
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 p-4 text-xs text-[var(--cs-text-muted)]">
                <span className="text-3xl">✨</span>
                <p className="mt-2 font-medium">Add Photo</p>
              </div>
            )}

            {/* Constellation Name Badge */}
            <div className="absolute top-4 left-4 z-10 rounded-full border border-white/20 bg-black/75 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase backdrop-blur-md">
              ✦ {item.eyebrow}
            </div>

            {/* Coordinate Watermark Stamp */}
            <div className="absolute top-4 right-4 z-10 font-mono text-[9px] text-[var(--cs-starlight-dim)] opacity-80 backdrop-blur-sm">
              {coordinates[index % coordinates.length]}
            </div>

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030612]/95 via-[#030612]/50 to-transparent p-6 text-left opacity-90 transition-opacity group-hover:opacity-100">
              <h4 className="font-serif text-xl font-medium text-white">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-white/80">
                {item.caption}
              </p>
            </div>

            {editable && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-[var(--cs-starlight)] px-4 py-2 text-xs font-bold text-[#030612] shadow-lg">
                  Change Photo
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Starlight Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cs-instrument-card relative flex max-h-[92vh] max-w-4xl flex-col items-center overflow-hidden rounded-3xl border border-[var(--cs-starlight)] bg-[#030612] shadow-2xl"
          >
            <div className="relative flex max-h-[75vh] w-full items-center justify-center overflow-hidden bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1
                  )
                }
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/80 cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null && prev < displayItems.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/80 cursor-pointer"
              >
                ›
              </button>
            </div>

            <div className="w-full bg-[#080e26] p-5 text-center">
              <div className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                ✦ {activePhoto.eyebrow} · {activePhotoIndex! + 1} OF {displayItems.length}
              </div>
              <h3 className="font-serif text-2xl text-[var(--cs-starlight-light)]">{activePhoto.title}</h3>
              <p className="mt-1 text-xs text-[var(--cs-text-muted)]">{activePhoto.caption}</p>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm text-white hover:bg-black cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
