"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageFile } from "@/lib/crop-image";
import { LISTING_PHOTO_RATIO } from "@/lib/listing-photos";

/** Keeps very large camera photos under the upload limit; anything smaller keeps its own resolution. */
const MAX_OUTPUT_WIDTH = 3000;
/** Below this the photo will look soft on high-density screens. */
const LOW_RES_WIDTH = 640;

/** Crop width in source pixels → exported size, always exactly 5:4. */
function outputSize(cropWidth: number) {
  const width = Math.min(MAX_OUTPUT_WIDTH, Math.round(cropWidth));
  return { width, height: Math.round(width / LISTING_PHOTO_RATIO) };
}

/** Same tilt the photo gets on the listing card, so the preview matches what visitors see. */
const FRAME_TILT = { front: 3.5, back: -8 } as const;

export default function ListingPhotoCropModal({
  imageSrc,
  frame,
  label,
  onCancel,
  onConfirm,
}: {
  imageSrc: string;
  frame: keyof typeof FRAME_TILT;
  label: string;
  onCancel: () => void;
  onConfirm: (file: File) => Promise<void>;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [pixels, setPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  const onCropComplete = useCallback((nextArea: Area, nextPixels: Area) => {
    setArea(nextArea);
    setPixels(nextPixels);
  }, []);

  async function handleConfirm() {
    if (!pixels || saving) return;
    setSaving(true);
    setError("");

    try {
      const file = await getCroppedImageFile(
        imageSrc,
        pixels,
        `listing-${frame}-${Date.now()}.jpg`,
        "image/jpeg",
        0.92,
        outputSize(pixels.width)
      );
      await onConfirm(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not crop this image. Try another photo.");
      setSaving(false);
    }
  }

  const scale = area ? 100 / area.width : 1;
  const previewStyle: CSSProperties | undefined = area
    ? {
        width: "100%",
        transformOrigin: "0 0",
        transform: `translate(${-area.x * scale}%, ${-area.y * scale}%) scale(${scale})`,
      }
    : undefined;
  const lowRes = pixels !== null && pixels.width < LOW_RES_WIDTH;

  return (
    <div className="fixed inset-0 z-[13000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Crop ${label.toLowerCase()}`}
        className="flex max-h-[calc(100svh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5">
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">Crop {label.toLowerCase()}</h2>
            <p className="text-xs text-zinc-500">Zoom 1 takes the largest 5:4 area of the photo. Zoom in and drag to tighten.</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Cancel
          </button>
        </div>

        <div className="grid min-h-0 gap-4 overflow-y-auto p-5 sm:grid-cols-[minmax(0,1fr)_11rem]">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[min(100%,calc(52svh*1.25))] overflow-hidden rounded-xl bg-zinc-900">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              maxZoom={4}
              aspect={LISTING_PHOTO_RATIO}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid
              objectFit="contain"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">On the card</p>
            <div className="grid place-items-center rounded-xl bg-[#f6f1e7] px-4 py-6">
              <div
                className="w-full bg-white p-1 shadow-[0_1px_1px_rgb(60_45_20/0.08),0_8px_16px_-8px_rgb(60_45_20/0.45)]"
                style={{ transform: `rotate(${FRAME_TILT[frame]}deg)` }}
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-zinc-100">
                  {previewStyle ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageSrc} alt="" className="absolute top-0 left-0 max-w-none" style={previewStyle} />
                  ) : null}
                </div>
              </div>
            </div>
            {pixels ? (
              <p className={`text-xs ${lowRes ? "text-amber-700" : "text-zinc-500"}`}>
                {lowRes
                  ? `Low resolution (${Math.round(pixels.width)} px wide) — may look soft.`
                  : `5:4 · saves at ${outputSize(pixels.width).width} × ${outputSize(pixels.width).height} px`}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 text-xs font-medium text-zinc-500">
            Zoom
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-full accent-[#111827]"
            />
          </label>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-zinc-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleConfirm()}
              disabled={saving || !pixels}
              className="rounded-full bg-[#111827] px-4 py-2 text-xs font-semibold text-white hover:bg-black disabled:opacity-50"
            >
              {saving ? "Uploading…" : "Crop & upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
