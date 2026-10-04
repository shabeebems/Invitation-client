"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { GalleryItem } from "@/lib/api";

export default function CinematicGallery({
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
    { eyebrow: "Moments", title: "Golden Radiance", caption: "Walking in silence and harmony", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "The Vow", title: "Heartbeat in Sync", caption: "Every laughter a promised tomorrow", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Together", title: "Twilight Embrace", caption: "Surrounded by boundless warmth", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Forever", title: "A New Chapter", caption: "Two souls, one sacred path", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80" },
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
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cv-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cv-gold)]" />
        <span className="text-xs">✦ CHERISHED MOMENTS ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cv-gold)]" />
      </div>

      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("galleryEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("galleryTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--cv-text-muted)]">
        {field("galleryIntro", "text-center text-sm font-light text-[var(--cv-text-muted)]")}
      </p>

      {/* 35mm Film Still Contact Sheet */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSlotClick(index)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--cv-gold)]/40 bg-black shadow-[0_8px_25px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.03] hover:border-[var(--cv-gold)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            {/* Top Film Sprocket Strip */}
            <div className="flex items-center justify-between border-b border-[var(--cv-gold)]/20 bg-[#0d0b11] px-3 py-1 font-mono text-[8px] text-[var(--cv-gold)]/50 tracking-widest">
              <span>KODAK 500T</span>
              <div className="flex gap-1.5 text-[7px] text-[var(--cv-gold)]/40">
                <span>■</span>
                <span>■</span>
                <span>■</span>
                <span>■</span>
              </div>
              <span>FRAME {index + 1}A</span>
            </div>

            {/* Photo Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
              {item.url ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 p-4 text-xs text-[var(--cv-text-muted)]">
                  <span className="text-3xl">🎬</span>
                  <p className="mt-2 font-mono text-[10px]">ADD PRODUCTION STILL</p>
                </div>
              )}

              {/* Film Grade Lower-Third Caption */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 text-left">
                <span className="font-mono text-[9px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                  {item.eyebrow}
                </span>
                <h4 className="font-serif text-lg font-light text-white">
                  {item.title}
                </h4>
                <p className="font-mono text-[10px] text-[var(--cv-text-muted)] truncate">
                  {item.caption}
                </p>
              </div>

              {editable && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                  <span className="rounded-full bg-[var(--cv-gold)] px-4 py-2 font-mono text-[10px] font-bold text-[#121016] uppercase shadow-lg">
                    Swap Production Still
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Film Sprocket Strip */}
            <div className="flex items-center justify-between border-t border-[var(--cv-gold)]/20 bg-[#0d0b11] px-3 py-1 font-mono text-[8px] text-[var(--cv-gold)]/50 tracking-widest">
              <span>SAFETY FILM</span>
              <div className="flex gap-1.5 text-[7px] text-[var(--cv-gold)]/40">
                <span>■</span>
                <span>■</span>
                <span>■</span>
                <span>■</span>
              </div>
              <span>24 FPS</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-4xl flex-col items-center overflow-hidden rounded-3xl border border-[var(--cv-gold)] bg-black/95 shadow-2xl"
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

            <div className="w-full bg-[var(--cv-bg-secondary)] p-5 text-center">
              <div className="text-[10px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                {activePhotoIndex! + 1} OF {displayItems.length}
              </div>
              <h3 className="font-serif text-2xl text-[var(--cv-gold-light)]">{activePhoto.title}</h3>
              <p className="mt-1 text-xs text-[var(--cv-text-muted)]">{activePhoto.caption}</p>
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
