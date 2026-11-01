"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type InvitationTemplate, type TemplateContent } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import {
  EVENT_DATE_TOO_SOON_MESSAGE,
  isEventDateAllowed,
  minDatetimeLocal,
  partsFromEventDate,
} from "@/lib/event-date";
import { saveUseDraft } from "@/lib/use-draft";

type DetailField = {
  key: keyof TemplateContent;
  label: string;
  required?: boolean;
  type?: "text" | "datetime-local" | "tel";
  readOnly?: boolean;
  hint?: string;
  placeholder?: string;
};

const PHONE_FIELD: DetailField = {
  key: "contactPhone",
  label: "Mobile number",
  type: "tel",
  required: true,
  placeholder: "e.g. +91 98765 43210",
};

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s()-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

const WEEKDAY_FIELD: DetailField = {
  key: "weekday",
  label: "Weekday",
  readOnly: true,
  placeholder: "Filled from the date",
};

const DATE_FIELD: DetailField = {
  key: "eventDateIso",
  label: "Event date and time",
  type: "datetime-local",
  required: true,
};

function detailFieldsFor(categoryName: string): DetailField[] {
  if (/house\s*warm/i.test(categoryName)) {
    return [
      { key: "hostNames", label: "Host names", required: true, placeholder: "e.g. Rahul & Priya" },
      { key: "houseName", label: "House name", required: true, placeholder: "e.g. Parambil House" },
      DATE_FIELD,
      WEEKDAY_FIELD,
      { key: "addressFull", label: "Full address", placeholder: "House, street and area" },
      { key: "venueCity", label: "City", placeholder: "e.g. Kozhikode" },
      PHONE_FIELD,
    ];
  }

  if (/wedding|nikah|engag/i.test(categoryName)) {
    return [
      { key: "groomName", label: "Groom name", required: true, placeholder: "Enter groom's name" },
      { key: "brideName", label: "Bride name", required: true, placeholder: "Enter bride's name" },
      {
        key: "hostNames",
        label: "Groom's parents",
        required: true,
        placeholder: "e.g. Mr. Abdul Rahman & Mrs. Amina",
      },
      {
        key: "brideParents",
        label: "Bride's parents",
        required: true,
        placeholder: "e.g. Mr. Nizar Ahmed & Mrs. Suhara",
      },
      DATE_FIELD,
      WEEKDAY_FIELD,
      { key: "venueName", label: "Venue", required: true, placeholder: "e.g. Grand Palace Hall" },
      { key: "venueCity", label: "City", placeholder: "e.g. Kozhikode" },
      PHONE_FIELD,
    ];
  }

  return [
    { key: "hostNames", label: "Host / celebrant names", required: true, placeholder: "Enter names" },
    DATE_FIELD,
    WEEKDAY_FIELD,
    { key: "venueName", label: "Venue", required: true, placeholder: "e.g. Grand Palace Hall" },
    { key: "venueCity", label: "City", placeholder: "e.g. Kozhikode" },
    PHONE_FIELD,
  ];
}

const inputClass =
  "mt-1.5 h-10 w-full rounded-md border border-[#ddd1bb] bg-[#fffdf8] px-3 text-sm text-[#173a2c] outline-none transition-[border-color,box-shadow] placeholder:text-[#b7b9b1] focus:border-[#173a2c] focus:shadow-[0_0_0_3px_rgba(23,58,44,0.1)]";

export default function UseTemplateForm({ template }: { template: InvitationTemplate }) {
  const router = useRouter();
  const categoryName = template.categoryName || "";
  const fields = useMemo(() => detailFieldsFor(categoryName), [categoryName]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  function setEventDate(value: string) {
    if (value && !isEventDateAllowed(value)) {
      setError(EVENT_DATE_TOO_SOON_MESSAGE);
      return;
    }

    setError("");
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

    if (details.eventDateIso && !isEventDateAllowed(details.eventDateIso)) {
      setError(EVENT_DATE_TOO_SOON_MESSAGE);
      return;
    }

    if (!isValidPhone(String(details.contactPhone || "").trim())) {
      setError("Enter a valid mobile number");
      return;
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
    router.push(`/user/use/${template.slug}/edit`);
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <p className="text-xs font-medium text-[#8d8f87]">
        Step 1 of 2 · {template.categoryName || "Invitation"}
      </p>
      <h1 className={`${cormorant.className} mt-1.5 text-[2.1rem] leading-tight font-semibold text-[#173a2c]`}>
        A few details first
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#686d65]">
        These go onto <span className="font-semibold text-[#173a2c]">{template.name}</span>. Next, you can edit
        every detail and publish when ready.
      </p>

      <div className="mt-7 border-t border-[#e5dac7] pt-6">
        <label className="block text-[13px] font-medium text-[#3a4a40]">
          Invitation title<span className="text-[#8a2c33]"> *</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Give this invitation a name"
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.key}
              className={`block text-[13px] font-medium text-[#3a4a40] ${
                field.key === "addressFull" ? "sm:col-span-2" : ""
              }`}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span>
                  {field.label}
                  {field.required ? <span className="text-[#8a2c33]"> *</span> : null}
                </span>
                {field.hint ? <span className="text-[11px] font-normal text-[#8d8f87]">{field.hint}</span> : null}
              </span>
              <input
                required={field.required}
                readOnly={field.readOnly}
                type={field.type || "text"}
                inputMode={field.type === "tel" ? "tel" : undefined}
                autoComplete={field.type === "tel" ? "tel" : undefined}
                maxLength={field.type === "tel" ? 20 : undefined}
                placeholder={field.placeholder}
                min={field.type === "datetime-local" ? minDatetimeLocal() : undefined}
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
                  field.readOnly ? "cursor-default border-[#e5dac7] bg-[#efe8da] text-[#686d65] focus:border-[#e5dac7] focus:shadow-none" : ""
                }`}
              />
            </label>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-[13px] text-[#8a2c33]" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 border-t border-[#e5dac7] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/#templates"
          className="text-center text-[13px] font-semibold text-[#686d65] underline-offset-4 hover:text-[#173a2c] hover:underline sm:text-left"
        >
          Back to templates
        </Link>
        <button
          type="submit"
          className="h-10 rounded-md bg-[#173a2c] px-5 text-[13px] font-semibold text-[#fbf6ea] transition-colors hover:bg-[#245440]"
        >
          Continue to editor
        </button>
      </div>
    </form>
  );
}
