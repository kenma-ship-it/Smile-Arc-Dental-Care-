"use client";

import { AnimatePresence, m } from "motion/react";
import { useTheme } from "@/hooks/useTheme";
import { setTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/* Hoisted so Motion sees stable objects */
const iconIn = { opacity: 1, rotate: 0, scale: 1 };
const iconOutSun = { opacity: 0, rotate: -90, scale: 0.5 };
const iconOutMoon = { opacity: 0, rotate: 90, scale: 0.5 };
const iconTransition = { type: "spring" as const, stiffness: 320, damping: 22 };

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

/**
 * Switches between light and dark. The icon spins and swaps; the page itself
 * changes with a circular reveal that starts at this button (see lib/theme.ts).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTheme(dark ? "light" : "dark", { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line bg-surface/70 text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {/* Render nothing until the theme is known, so server and client markup match */}
      {theme && (
        <AnimatePresence mode="wait" initial={false}>
          {dark ? (
            <m.span key="moon" initial={iconOutMoon} animate={iconIn} exit={iconOutMoon} transition={iconTransition} className="flex">
              <Moon />
            </m.span>
          ) : (
            <m.span key="sun" initial={iconOutSun} animate={iconIn} exit={iconOutSun} transition={iconTransition} className="flex">
              <Sun />
            </m.span>
          )}
        </AnimatePresence>
      )}
    </button>
  );
}
