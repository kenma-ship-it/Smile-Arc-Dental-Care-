"use client";

import { useSyncExternalStore } from "react";
import { BOOKINGS_EVENT, readLocalBookings } from "@/lib/appointments";
import type { StoredBooking } from "@/lib/slots";

const EMPTY: StoredBooking[] = [];
let cacheKey = "[]";
let cacheValue: StoredBooking[] = EMPTY;

function getSnapshot(): StoredBooking[] {
  const next = readLocalBookings();
  const key = JSON.stringify(next);
  if (key !== cacheKey) {
    cacheKey = key;
    cacheValue = next.length ? next : EMPTY;
  }
  return cacheValue;
}

function subscribe(listener: () => void) {
  window.addEventListener(BOOKINGS_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(BOOKINGS_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

/** Demo requests made in this browser. Empty on the server. */
export function useLocalBookings(): StoredBooking[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
