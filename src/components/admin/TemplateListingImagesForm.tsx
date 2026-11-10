"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ListingPhotoCropModal from "@/components/admin/ListingPhotoCropModal";
import {
  imageUrl,
  uploadTemplateListingImage,
  type ListingImageSlot,
  type TemplateImage,
} from "@/lib/api";
import { LISTING_IMAGE_SLOTS, listingPhotos } from "@/lib/listing-photos";

const SLOTS: { slot: ListingImageSlot; label: string; frame: "front" | "back" }[] = [
  { slot: "listingFront", label: "Front photo", frame: "front" },
  { slot: "listingBack", label: "Back photo", frame: "back" },
];

export default function TemplateListingImagesForm({
  slug,
  images,
}: {
  slug: string;
  images?: TemplateImage[];
}) {
  const router = useRouter();
  const inputs = useRef<Partial<Record<ListingImageSlot, HTMLInputElement | null>>>({});
  const [current, setCurrent] = useState<TemplateImage[]>(images || []);
  const [cropping, setCropping] = useState<{ slot: ListingImageSlot; src: string } | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const fallback = listingPhotos(
    current.filter((image) => !(LISTING_IMAGE_SLOTS as string[]).includes(image.slot))
  );
  const active = SLOTS.find((item) => item.slot === cropping?.slot);

  const cropSrc = useRef("");

  const closeCrop = useCallback(() => {
    if (cropSrc.current) URL.revokeObjectURL(cropSrc.current);
    cropSrc.current = "";
    setCropping(null);
  }, []);

  useEffect(
    () => () => {
      if (cropSrc.current) URL.revokeObjectURL(cropSrc.current);
    },
    []
  );

  async function upload(slot: ListingImageSlot, file: File) {
    setNote(null);
    try {
      setCurrent(await uploadTemplateListingImage(slug, slot, file));
      setNote({ ok: true, text: "Saved" });
      closeCrop();
      router.refresh();
    } catch (error) {
      setNote({ ok: false, text: error instanceof Error ? error.message : "Could not upload photo" });
      throw error;
    }
  }

  return (
    <div className="mt-4 border-t border-zinc-100 pt-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Listing photos</p>
        <p className="text-[11px] text-zinc-400">Cropped to 5:4</p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3">
        {SLOTS.map(({ slot, label, frame }) => {
          const own = imageUrl(current, slot);
          const shown = own || fallback[frame];

          return (
            <div key={slot}>
              <button
                type="button"
                disabled={cropping !== null}
                onClick={() => inputs.current[slot]?.click()}
                className="group relative block aspect-[5/4] w-full overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-left hover:border-[#111827]"
                aria-label={`${own ? "Replace" : "Upload"} ${label.toLowerCase()}`}
              >
                {shown ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shown}
                    alt=""
                    className={`h-full w-full object-cover ${own ? "" : "opacity-45 grayscale"}`}
                  />
                ) : null}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-2 pt-5 pb-1.5 text-[11px] font-semibold text-white">
                  {own ? `${label} · Replace` : `${label} · Upload`}
                </span>
                {!own ? (
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                    Using invite photo
                  </span>
                ) : null}
              </button>
              <input
                ref={(el) => {
                  inputs.current[slot] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  setNote(null);
                  cropSrc.current = URL.createObjectURL(file);
                  setCropping({ slot, src: cropSrc.current });
                }}
              />
            </div>
          );
        })}
      </div>
      <p className={`mt-2 min-h-4 text-xs ${note?.ok ? "text-emerald-700" : "text-red-600"}`} role="status">
        {note?.text}
      </p>

      {cropping && active ? (
        <ListingPhotoCropModal
          imageSrc={cropping.src}
          frame={active.frame}
          label={active.label}
          onCancel={closeCrop}
          onConfirm={(file) => upload(cropping.slot, file)}
        />
      ) : null}
    </div>
  );
}
