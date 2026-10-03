"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { GalleryItem } from "@/lib/api";

export default function VogueGallerySpread({
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
    { eyebrow: "Look 01", title: "The Quiet Prelude", caption: "Raw silk and morning sunlight in the courtyard", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Look 02", title: "Couture in Motion", caption: "Handcrafted golden embroidery meets timeless silhouettes", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Look 03", title: "Twilight Monologue", caption: "Shared smiles beneath the evening horizon", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80" },
    { eyebrow: "Look 04", title: "Eternal Commitment", caption: "Two souls embarking on a shared destiny", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80" },
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
    <section id="spread" className="relative z-10 mx-auto my-28 max-w-6xl px-4">
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

      {/* Magazine Section Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>EDITORIAL SPREAD · P. 60 – 67</span>
          <span>BEHIND THE LENS</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          {field("galleryTitle", "font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl")}
        </h2>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase">
          PHOTOGRAPHY BY INVITEO ATELIER · 35MM MONOCHROME & GOLDEN LIGHT
        </p>
      </div>

      {/* Asymmetric Editorial Magazine Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {displayItems.map((item, index) => {
          // Asymmetric column widths: Item 0 is 7 cols, Item 1 is 5 cols, Item 2 is 5 cols, Item 3 is 7 cols
          const colSpan = index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : index === 2 ? "lg:col-span-5" : "lg:col-span-7";

          return (
            <div
              key={index}
              onClick={() => handleSlotClick(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--ev-border)] bg-[var(--ev-bg-dark)] ${colSpan}`}
            >
              <div className="aspect-[16/11] w-full overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover filter grayscale contrast-115 transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* Caption Bar */}
              <div className="flex items-center justify-between border-t border-white/10 bg-[var(--ev-bg-dark)] p-4 text-left text-white">
                <div>
                  <span className="font-mono text-[9px] font-bold tracking-wider text-[var(--ev-bronze-light)] uppercase">
                    FIG. 0{index + 1} · {item.eyebrow}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-light text-white/70">
                    {item.caption}
                  </p>
                </div>

                <span className="font-mono text-[10px] font-bold text-white/50 group-hover:text-white">
                  VIEW [+]
                </span>
              </div>

              {editable && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-lg">
                    Change Image
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Editorial Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-4xl flex-col items-center overflow-hidden rounded-2xl border-2 border-[var(--ev-text-light)] bg-[var(--ev-bg-dark)] shadow-2xl"
          >
            <div className="relative flex max-h-[75vh] w-full items-center justify-center overflow-hidden bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain filter grayscale contrast-110"
              />

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1
                  )
                }
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:bg-black cursor-pointer"
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
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                ›
              </button>
            </div>

            <div className="w-full bg-[var(--ev-bg-dark)] p-5 text-center text-white">
              <div className="font-mono text-[9px] font-bold tracking-widest text-[var(--ev-bronze-light)] uppercase">
                FIG. 0{activePhotoIndex! + 1} OF {displayItems.length} · THE UNION ARCHIVE
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">{activePhoto.title}</h3>
              <p className="mt-1 text-xs text-white/70">{activePhoto.caption}</p>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-sm text-white hover:bg-black cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
