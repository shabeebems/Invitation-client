"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { GalleryItem } from "@/lib/api";

export default function WeddingGallery({
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
    { eyebrow: "Moments", title: "Eternal Grace", caption: "Under the golden canopy of love", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "The Vow", title: "Shared Dreams", caption: "Every heartbeat in harmony", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Together", title: "Forever & Always", caption: "Beginning our journey hand in hand", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Celebration", title: "Pure Joy", caption: "Surrounded by loved ones and prayers", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80" },
  ];

  // Keyboard navigation for lightbox
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
    <section id="gallery" className="relative mx-auto my-24 max-w-6xl px-4 text-center">
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

      {/* Decorative Arabesque */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--eu-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--eu-gold)]" />
        <span className="text-xs">✦ 🖼️ ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--eu-gold)]" />
      </div>

      {/* Eyebrow */}
      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase">
        {field("galleryEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase")}
      </p>

      {/* Title */}
      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl">
        {field("galleryTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm font-light text-[var(--eu-text-muted)]">
        {field("galleryIntro", "text-center text-sm font-light text-[var(--eu-text-muted)]")}
      </p>

      {/* Luxury Gallery Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSlotClick(index)}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl border border-[var(--eu-border)] bg-[var(--eu-bg-surface)] shadow-[var(--eu-shadow)] transition-all duration-500 hover:scale-[1.03] hover:border-[var(--eu-gold)]"
          >
            {item.url ? (
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-4 text-xs text-[var(--eu-text-muted)]">
                <span className="text-3xl">📷</span>
                <p className="mt-2 font-medium">Add Photo</p>
              </div>
            )}

            {/* Hover overlay with gold caption */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-left opacity-90 transition-opacity group-hover:opacity-100">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                {item.eyebrow}
              </span>
              <h4 className="font-serif text-xl font-medium text-white">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-white/80">
                {item.caption}
              </p>
            </div>

            {editable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-[var(--eu-gold)] px-4 py-2 text-xs font-bold text-[#1e050b] shadow-lg">
                  Change Photo
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-4xl flex-col items-center overflow-hidden rounded-3xl border-2 border-[var(--eu-gold)] bg-[var(--eu-bg-primary)] shadow-2xl"
          >
            <div className="relative flex max-h-[75vh] w-full items-center justify-center overflow-hidden bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1
                  )
                }
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/80"
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
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/80"
              >
                ›
              </button>
            </div>

            <div className="w-full bg-[var(--eu-bg-secondary)] p-5 text-center">
              <div className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                {activePhotoIndex! + 1} of {displayItems.length}
              </div>
              <h3 className="font-serif text-2xl text-[var(--eu-gold-light)]">{activePhoto.title}</h3>
              <p className="mt-1 text-xs text-[var(--eu-text-muted)]">{activePhoto.caption}</p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm text-white hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
