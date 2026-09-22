/**
 * Rules for the demo booking calendar. Nothing here is real availability.
 * Swap `submitAppointment` in /lib/appointments.ts and replace /lib/slots.ts
 * with a call to the clinic's real calendar when going live.
 */
export const demo = {
  /** How many days ahead a patient can pick (including today) */
  bookingWindowDays: 30,
  /** Share of slots on ordinary days that show as already booked */
  bookedShare: 0.36,
  /**
   * Days of the month that show as "Fully booked" (any month).
   * Three values guarantee at least two appear in any 30-day window.
   */
  fullyBookedDaysOfMonth: [7, 14, 22] as number[],
};
