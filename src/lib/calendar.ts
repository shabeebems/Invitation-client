export type CalendarEventDetails = {
  title: string;
  description?: string;
  location?: string;
  startIso?: string;
  endIso?: string;
};

function formatIcsDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarUrl({
  title,
  description = "",
  location = "",
  startIso,
  endIso,
}: CalendarEventDetails): string {
  const start = startIso ? formatIcsDate(startIso) : "";
  const end = endIso ? formatIcsDate(endIso) : start;
  const dates = start && end ? `${start}/${end}` : "";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
  });

  if (dates) {
    params.set("dates", dates);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile({
  title,
  description = "",
  location = "",
  startIso,
  endIso,
}: CalendarEventDetails): void {
  const now = formatIcsDate(new Date().toISOString());
  const start = startIso ? formatIcsDate(startIso) : now;
  const end = endIso ? formatIcsDate(endIso) : start;

  const sanitize = (text: string) => text.replace(/[\r\n]+/g, "\\n").replace(/[,;]/g, "\\$&");

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Inviteo//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@inviteo.app`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${sanitize(title)}`,
    `DESCRIPTION:${sanitize(description)}`,
    `LOCATION:${sanitize(location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "invitation"}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
