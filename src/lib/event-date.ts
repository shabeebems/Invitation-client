/** Shared event-date helpers for invite editors and forms. */

export const EVENT_DATE_TOO_SOON_MESSAGE =
  "Event date must be after today. The earliest you can choose is tomorrow.";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toLocalDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Local calendar date key for the earliest allowed event day (tomorrow). */
export function earliestEventDateKey(now = new Date()) {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return toLocalDateKey(tomorrow);
}

/** `datetime-local` min value: start of tomorrow. */
export function minDatetimeLocal(now = new Date()) {
  return `${earliestEventDateKey(now)}T00:00`;
}

/** True when the chosen calendar day is tomorrow or later. */
export function isEventDateAllowed(value: string, now = new Date()) {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return toLocalDateKey(date) >= earliestEventDateKey(now);
}

export function toDatetimeLocal(iso?: string) {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

function formatClock(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const h12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

export type EventDateParts = {
  weekday: string;
  day: string;
  monthYear: string;
  time: string;
};

export function partsFromEventDate(value: string, categoryName = "wedding"): EventDateParts {
  if (!value) {
    return { weekday: "", day: "", monthYear: "", time: "" };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { weekday: "", day: "", monthYear: "", time: "" };
  }

  const clock = formatClock(date);
  const house = /house/i.test(categoryName);
  const wedding = /wedding|nikah|engag|royal/i.test(categoryName) || !categoryName;

  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    day: String(date.getDate()),
    monthYear: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    time: house ? `${clock} onwards` : wedding ? `At ${clock}` : clock,
  };
}

/** Normalize datetime-local or ISO input to a stored ISO string. */
export function toEventDateIso(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toISOString();
}
