"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { type InvitationTemplate, type TemplateContent } from "@/lib/api";
import { saveUseDraft } from "@/lib/use-draft";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type DetailField = {
  key: keyof TemplateContent;
  label: string;
  required?: boolean;
  type?: "text" | "datetime-local";
  readOnly?: boolean;
  hint?: string;
};

function detailFieldsFor(categoryName: string): DetailField[] {
  if (/house\s*warm/i.test(categoryName)) {
    return [
      { key: "hostNames", label: "Host names", required: true },
      { key: "houseName", label: "House name", required: true },
      { key: "eventDateIso", label: "Event date and time", type: "datetime-local", required: true },
      { key: "weekday", label: "Weekday", readOnly: true, hint: "Filled from the date" },
      { key: "addressFull", label: "Full address" },
      { key: "venueCity", label: "City" },
    ];
  }

  if (/birthday/i.test(categoryName)) {
    return [
      { key: "celebrantName", label: "Birthday person", required: true },
      { key: "ageLabel", label: "Age label", required: true },
      { key: "hostNames", label: "Host names", required: true },
      { key: "eventDateIso", label: "Event date and time", type: "datetime-local", required: true },
      { key: "weekday", label: "Weekday", readOnly: true, hint: "Filled from the date" },
      { key: "venueName", label: "Venue" },
      { key: "venueCity", label: "City" },
    ];
  }

  if (/wedding|nikah|engag/i.test(categoryName)) {
    return [
      { key: "groomName", label: "Groom name", required: true },
      { key: "brideName", label: "Bride name", required: true },
      { key: "eventDateIso", label: "Event date and time", type: "datetime-local", required: true },
      { key: "weekday", label: "Weekday", readOnly: true, hint: "Filled from the date" },
      { key: "venueName", label: "Venue" },
      { key: "venueCity", label: "City" },
    ];
  }

  return [
    { key: "hostNames", label: "Host / celebrant names", required: true },
    { key: "eventDateIso", label: "Event date and time", type: "datetime-local", required: true },
    { key: "weekday", label: "Weekday", readOnly: true, hint: "Filled from the date" },
    { key: "venueName", label: "Venue" },
    { key: "venueCity", label: "City" },
  ];
}

function toDatetimeLocal(iso?: string) {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatClock(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const h12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

function partsFromEventDate(value: string, categoryName: string) {
  if (!value) {
    return { weekday: "", day: "", monthYear: "", time: "" };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { weekday: "", day: "", monthYear: "", time: "" };
  }

  const clock = formatClock(date);
  const house = /house\s*warm/i.test(categoryName);
  const wedding = /wedding|nikah|engag/i.test(categoryName);
  const birthday = /birthday/i.test(categoryName);

  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    day: String(date.getDate()),
    monthYear: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    time: house ? `${clock} onwards` : wedding || birthday ? `At ${clock}` : clock,
  };
}

const inputClass =
  "mt-2 w-full rounded-2xl border border-[#e0d5c6] bg-[#fcfbf9] px-4 py-3.5 text-sm font-medium text-[#143027] outline-none transition placeholder:text-zinc-400 focus:border-[#c4a574] focus:bg-white focus:shadow-[0_0_0_4px_rgba(196,165,116,0.15)]";

export default function UseTemplateForm({ template }: { template: InvitationTemplate }) {
  const router = useRouter();
  const categoryName = template.categoryName || "";
  const fields = useMemo(() => detailFieldsFor(categoryName), [categoryName]);
  const [name, setName] = useState(template.name);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const next: Record<string, string> = {};

    for (const field of fields) {
      const value = template.content[field.key];
      next[field.key] =
        field.type === "datetime-local"
          ? toDatetimeLocal(typeof value === "string" ? value : "")
          : typeof value === "string"
            ? value
            : "";
    }

    const derived = partsFromEventDate(next.eventDateIso || "", categoryName);
    next.weekday = derived.weekday || next.weekday || "";

    setDetails(next);
  }, [categoryName, fields, template.content]);

  function setEventDate(value: string) {
    const derived = partsFromEventDate(value, categoryName);
    setDetails((current) => ({
      ...current,
      eventDateIso: value,
      weekday: derived.weekday,
    }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Invitation title is required");
      return;
    }

    for (const field of fields) {
      if (field.required && !String(details[field.key] || "").trim()) {
        setError(`${field.label} is required`);
        return;
      }
    }

    setError("");

    const payload: Record<string, string> = {};

    for (const field of fields) {
      if (field.readOnly) {
        continue;
      }

      const value = String(details[field.key] || "").trim();
      if (!value) {
        continue;
      }

      payload[field.key] =
        field.type === "datetime-local" && value && !value.endsWith("Z")
          ? new Date(value).toISOString()
          : value;
    }

    const derived = partsFromEventDate(details.eventDateIso || "", categoryName);
    if (derived.weekday) {
      payload.weekday = derived.weekday;
      payload.day = derived.day;
      payload.monthYear = derived.monthYear;
      payload.time = derived.time;
    }

    saveUseDraft(template.slug, {
      name: name.trim(),
      content: payload as Partial<TemplateContent>,
    });
    router.push(`/use/${template.slug}/edit`);
  }

  return (
    <form
      onSubmit={(event) => void onSubmit(event)}
      className="overflow-hidden rounded-[32px] border border-[#e8dfd0] bg-[#faf6ee] shadow-[0_24px_60px_rgba(20,48,39,0.08)]"
    >
      <div className="border-b border-[#ebe3d6] bg-[#143027] px-6 py-7 text-white sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#d6c4a2]/20 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#d6c4a2] uppercase">
            {template.categoryName || "Invitation"}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            Step 1 of 2
          </span>
        </div>
        <h1 className={`${display.className} mt-4 text-3xl font-medium tracking-tight sm:text-4xl`}>
          A few details first
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
          These go onto <span className="font-semibold text-[#d6c4a2]">{template.name}</span>. Next opens
          the invitation so you can edit every detail, then publish when you are ready.
        </p>
      </div>

      <div className="px-6 py-7 sm:px-8">
        <div className="mb-7 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-zinc-400 uppercase">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143027] text-[11px] text-[#f3ead8]">
            1
          </span>
          Details
          <span className="h-px flex-1 bg-[#e8dfd0]" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e0d5c6] text-[11px] text-zinc-400">
            2
          </span>
          Edit & publish
        </div>

        <label className="block text-sm font-semibold text-[#143027]">
          Invitation title
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Give this invitation a name"
          />
        </label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.key}
              className={`block text-sm font-semibold text-[#143027] ${
                field.key === "addressFull" ? "sm:col-span-2" : ""
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span>
                  {field.label}
                  {field.required ? <span className="text-[#8a7048]"> *</span> : null}
                </span>
                {field.hint ? (
                  <span className="text-[11px] font-medium tracking-normal text-zinc-400 normal-case">
                    {field.hint}
                  </span>
                ) : null}
              </span>
              <input
                required={field.required}
                readOnly={field.readOnly}
                type={field.type || "text"}
                value={details[field.key] || ""}
                onChange={(event) => {
                  if (field.key === "eventDateIso") {
                    setEventDate(event.target.value);
                    return;
                  }

                  setDetails((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }));
                }}
                className={`${inputClass} ${
                  field.readOnly ? "cursor-default bg-[#f0ebe3] text-zinc-600 focus:shadow-none" : ""
                }`}
              />
            </label>
          ))}
        </div>

        {error ? (
          <p className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/#templates`}
            className="order-2 text-center text-sm font-semibold text-zinc-500 hover:text-[#143027] sm:order-1 sm:text-left"
          >
            ← Back to templates
          </Link>
          <button
            type="submit"
            className="order-1 rounded-full bg-[#143027] px-8 py-3.5 text-sm font-semibold text-[#f3ead8] shadow-[0_12px_28px_rgba(20,48,39,0.22)] transition hover:bg-[#1c4034] sm:order-2"
          >
            Continue to editor
          </button>
        </div>
      </div>
    </form>
  );
}
