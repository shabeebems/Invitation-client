"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveTemplatePricing } from "@/lib/api";

const inputClass =
  "mt-1 h-9 w-full rounded-lg border border-zinc-200 bg-white pr-2 pl-6 text-sm font-medium text-zinc-900 tabular-nums outline-none focus:border-[#111827]";

export default function TemplatePricingForm({
  slug,
  actualPrice,
  offerPrice,
}: {
  slug: string;
  actualPrice?: number;
  offerPrice?: number;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState({ actual: String(actualPrice ?? ""), offer: String(offerPrice ?? "") });
  const [actual, setActual] = useState(saved.actual);
  const [offer, setOffer] = useState(saved.offer);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const dirty = actual !== saved.actual || offer !== saved.offer;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextActual = Number(actual);
    const nextOffer = Number(offer);

    if (!Number.isInteger(nextActual) || nextActual < 0 || !Number.isInteger(nextOffer) || nextOffer < 0) {
      setNote({ ok: false, text: "Use whole rupee amounts." });
      return;
    }

    if (nextOffer > nextActual) {
      setNote({ ok: false, text: "Offer can't be more than the actual price." });
      return;
    }

    setSaving(true);
    setNote(null);

    try {
      const result = await saveTemplatePricing(slug, { actualPrice: nextActual, offerPrice: nextOffer });
      const next = { actual: String(result.actualPrice ?? nextActual), offer: String(result.offerPrice ?? nextOffer) };
      setSaved(next);
      setActual(next.actual);
      setOffer(next.offer);
      setNote({ ok: true, text: "Saved" });
      router.refresh();
    } catch (error) {
      setNote({ ok: false, text: error instanceof Error ? error.message : "Could not save pricing" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 border-t border-zinc-100 pt-4" noValidate>
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Pricing</p>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-zinc-500">
          Actual
          <span className="relative block">
            <span className="pointer-events-none absolute top-1/2 left-2.5 mt-0.5 -translate-y-1/2 text-sm text-zinc-400">
              ₹
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              value={actual}
              onChange={(event) => setActual(event.target.value)}
              className={inputClass}
            />
          </span>
        </label>
        <label className="text-xs font-medium text-zinc-500">
          Offer
          <span className="relative block">
            <span className="pointer-events-none absolute top-1/2 left-2.5 mt-0.5 -translate-y-1/2 text-sm text-zinc-400">
              ₹
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              value={offer}
              onChange={(event) => setOffer(event.target.value)}
              className={inputClass}
            />
          </span>
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className={`text-xs ${note?.ok ? "text-emerald-700" : "text-red-600"}`} role="status">
          {note?.text}
        </span>
        <button
          type="submit"
          disabled={saving || !dirty}
          className="rounded-full bg-[#111827] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save pricing"}
        </button>
      </div>
    </form>
  );
}
