"use client";

import { useSyncExternalStore } from "react";
import { getIstNow, type IstNow } from "@/lib/time";

/**
 * One shared clock for the whole page (hero status, booking calendar, sticky bar).
 * Returns null on the server and during hydration so markup always matches,
 * then the current IST time once mounted. Updates when the minute changes.
 */
let snapshot: IstNow | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function tick() {
  const next = getIstNow();
  if (!snapshot || next.iso !== snapshot.iso || next.minutes !== snapshot.minutes) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    tick();
    timer = setInterval(tick, 20_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) clearInterval(timer);
  };
}

export function useIstNow(): IstNow | null {
  return useSyncExternalStore(subscribe, () => snapshot, () => null);
}
