import { clinic } from "@/data/clinic";
import { demo } from "@/data/demo";
import { addDays, fromMinutes, toMinutes, weekdayOf, type IstNow } from "./time";

export type SessionId = "morning" | "evening";
export type SlotStatus = "available" | "booked" | "requested" | "past";

export type Slot = { time: string; session: SessionId; status: SlotStatus };

/** Only slot + service are stored for demo requests - never a name or phone number. */
export type StoredBooking = { date: string; time: string; serviceId: string };

export type DayCell = {
  iso: string;
  day: number;
  weekday: number;
  isToday: boolean;
  /** open = has free slots; closed = clinic closed; full = nothing left to pick */
  status: "open" | "closed" | "full";
};

/* ------------------------------------------------------------------ */
/* Seeded randomness: the same date always gives the same demo slots.   */
/* ------------------------------------------------------------------ */

function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function seeded(input: string): number {
  // mulberry32, one step
  let a = (fnv1a(input) + 0x6d2b79f5) >>> 0;
  a = Math.imul(a ^ (a >>> 15), a | 1);
  a ^= a + Math.imul(a ^ (a >>> 7), a | 61);
  return ((a ^ (a >>> 14)) >>> 0) / 4294967296;
}

/* ------------------------------------------------------------------ */
/* Rules                                                                */
/* ------------------------------------------------------------------ */

export const slotTimes: { time: string; session: SessionId }[] = clinic.hours.sessions.flatMap((s) => {
  const list: { time: string; session: SessionId }[] = [];
  for (let t = toMinutes(s.open); t + clinic.hours.slotMinutes <= toMinutes(s.close); t += clinic.hours.slotMinutes) {
    list.push({ time: fromMinutes(t), session: s.id });
  }
  return list;
});

export const isOpenDay = (iso: string) => clinic.hours.openWeekdays.includes(weekdayOf(iso));

export const isFullyBooked = (iso: string) => demo.fullyBookedDaysOfMonth.includes(Number(iso.slice(8, 10)));

const isDemoBooked = (iso: string, time: string) => seeded(`${iso}T${time}`) < demo.bookedShare;

export function getDaySlots(iso: string, now: IstNow, local: StoredBooking[]): Slot[] {
  if (!isOpenDay(iso)) return [];
  const full = isFullyBooked(iso);
  return slotTimes.map(({ time, session }) => {
    let status: SlotStatus = "available";
    if (iso === now.iso && toMinutes(time) <= now.minutes) status = "past";
    else if (local.some((b) => b.date === iso && b.time === time)) status = "requested";
    else if (full || isDemoBooked(iso, time)) status = "booked";
    return { time, session, status };
  });
}

export function getBookableDays(now: IstNow): DayCell[] {
  return Array.from({ length: demo.bookingWindowDays }, (_, i) => {
    const iso = addDays(now.iso, i);
    const weekday = weekdayOf(iso);
    let status: DayCell["status"] = "open";
    if (!isOpenDay(iso)) status = "closed";
    else if (isFullyBooked(iso)) status = "full";
    else if (iso === now.iso && !getDaySlots(iso, now, []).some((s) => s.status === "available")) status = "full";
    return { iso, day: Number(iso.slice(8, 10)), weekday, isToday: iso === now.iso, status };
  });
}

export function getNextOpenSlots(now: IstNow, local: StoredBooking[], count: number) {
  const found: { date: string; time: string }[] = [];
  for (const cell of getBookableDays(now)) {
    if (cell.status !== "open") continue;
    for (const slot of getDaySlots(cell.iso, now, local)) {
      if (slot.status === "available") found.push({ date: cell.iso, time: slot.time });
      if (found.length === count) return found;
    }
  }
  return found;
}

/** Is the clinic open right now, and if not, when does it next open? */
export function getClinicStatus(now: IstNow):
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDate: string } {
  if (isOpenDay(now.iso)) {
    for (const s of clinic.hours.sessions) {
      if (now.minutes >= toMinutes(s.open) && now.minutes < toMinutes(s.close)) return { open: true, closesAt: s.close };
    }
    const nextToday = clinic.hours.sessions.find((s) => now.minutes < toMinutes(s.open));
    if (nextToday) return { open: false, opensAt: nextToday.open, opensDate: now.iso };
  }
  for (let i = 1; i <= 7; i++) {
    const iso = addDays(now.iso, i);
    if (isOpenDay(iso)) return { open: false, opensAt: clinic.hours.sessions[0].open, opensDate: iso };
  }
  return { open: false, opensAt: clinic.hours.sessions[0].open, opensDate: addDays(now.iso, 1) };
}
