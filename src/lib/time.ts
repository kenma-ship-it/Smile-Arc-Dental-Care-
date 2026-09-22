/**
 * Date helpers. The clinic works in India Standard Time, so "today" and "now"
 * are always calculated in Asia/Kolkata, whatever the visitor's device says.
 * Dates travel as ISO strings (YYYY-MM-DD) and times as "HH:mm".
 */

export const CLINIC_TZ = "Asia/Kolkata";

export type IstNow = {
  /** Today's date in IST, YYYY-MM-DD */
  iso: string;
  /** Minutes since midnight in IST */
  minutes: number;
  /** 0 = Sunday ... 6 = Saturday */
  weekday: number;
};

function parseIso(iso: string): [number, number, number] {
  const [y, m, d] = iso.split("-").map(Number);
  return [y, m, d];
}

export function weekdayOf(iso: string): number {
  const [y, m, d] = parseIso(iso);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = parseIso(iso);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function getIstNow(date: Date = new Date()): IstNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const iso = `${get("year")}-${get("month")}-${get("day")}`;
  return { iso, minutes: Number(get("hour")) * 60 + Number(get("minute")), weekday: weekdayOf(iso) };
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "17:30" -> "5:30 pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const utcDate = (iso: string) => {
  const [y, m, d] = parseIso(iso);
  return new Date(Date.UTC(y, m - 1, d));
};

export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(utcDate(iso));
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(utcDate(iso));
}

export function monthLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(utcDate(iso));
}

export function weekdayShort(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: "UTC" }).format(utcDate(iso));
}

export function relativeDayLabel(iso: string, todayIso: string): string {
  if (iso === todayIso) return "Today";
  if (iso === addDays(todayIso, 1)) return "Tomorrow";
  return formatDateShort(iso);
}
