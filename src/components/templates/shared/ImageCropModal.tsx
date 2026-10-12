"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageFile } from "@/lib/crop-image";

export default function ImageCropModal({
  imageSrc,
  open,
  aspect = 4 / 5,
  title = "Crop photo",
  confirmLabel = "Save cropped photo",
  onCancel,
  onConfirm,
}: {
  imageSrc: string;
  open: boolean;
  aspect?: number;
  title?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: (file: File) => void | Promise<void>;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
    setSaving(false);
    setError("");

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedArea(pixels);
  }, []);

  async function handleConfirm() {
    if (!croppedArea || saving) return;
    setSaving(true);
    setError("");

    try {
      const file = await getCroppedImageFile(imageSrc, croppedArea, `portrait-${Date.now()}.jpg`);
      await onConfirm(file);
    } catch {
      setError("Could not crop this image. Try another photo.");
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[13000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="rr-crop-modal flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center justify-between border-b border-[#e7d3a433] px-4 py-3">
          <h2 className="font-caps text-[11px] tracking-[0.2em] text-[#e7d3a4] uppercase">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="font-caps text-[10px] tracking-[0.14em] text-[#e7d3a4b3] uppercase hover:text-[#e7d3a4]"
          >
            Cancel
          </button>
        </div>

        <div className="relative h-[min(58vh,420px)] w-full bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid
            objectFit="contain"
          />
        </div>

        <div className="space-y-3 px-4 py-4">
          <label className="flex items-center gap-3">
            <span className="font-caps shrink-0 text-[9px] tracking-[0.16em] text-[#b9893e] uppercase">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-full accent-[#b9893e]"
            />
          </label>

          {error ? <p className="text-xs text-red-400">{error}</p> : null}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="font-caps rounded-full border border-[#e7d3a459] px-4 py-2 text-[10px] tracking-[0.14em] text-[#e7d3a4] uppercase"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleConfirm()}
              disabled={saving || !croppedArea}
              className="rr-crop-modal-confirm font-caps rounded-full border px-4 py-2 text-[10px] tracking-[0.14em] uppercase disabled:opacity-50"
            >
              {saving ? "Saving…" : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
