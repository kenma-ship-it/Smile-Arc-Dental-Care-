"use client";

import { useSyncExternalStore } from "react";
import { readTheme, THEME_EVENT, type Theme } from "@/lib/theme";

function subscribe(listener: () => void) {
  window.addEventListener(THEME_EVENT, listener);
  return () => window.removeEventListener(THEME_EVENT, listener);
}

/** Current theme. Null during server render and hydration, so markup always matches. */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, readTheme, () => null);
}
