"use client";

import { m, useReducedMotion } from "motion/react";
import { ToothMarkDraw } from "@/components/brand/ToothMarkDraw";
import { DemoFlag } from "@/components/ui/DemoFlag";
import { useIstNow } from "@/hooks/useIstNow";
import { useLocalBookings } from "@/hooks/useLocalBookings";
import { requestBooking } from "@/lib/prefill";
import { getNextOpenSlots } from "@/lib/slots";
import { formatTime, relativeDayLabel } from "@/lib/time";

const cardTransition = { delay: 2.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Right side of the hero: the clinic's tooth mark draws itself over faint arcs,
 * with a small card of the next open demo times underneath.
 */
export function HeroArt() {
  const now = useIstNow();
  const local = useLocalBookings();
  const reduce = useReducedMotion();
  const next = now ? getNextOpenSlots(now, local, 3) : [];

  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[30rem] lg:max-w-none">
      {/* soft wash + hairline arcs */}
      <div
        aria-hidden="true"
        className="absolute inset-[-4%] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--color-mint) 62%, transparent 100%)" }}
      />
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        <circle cx="50" cy="48" r="47" stroke="var(--color-line)" strokeWidth="0.25" />
        <circle cx="50" cy="48" r="38" stroke="var(--color-line)" strokeWidth="0.25" strokeDasharray="0.6 1.4" />
        <circle cx="50" cy="48" r="29" stroke="var(--color-line-soft)" strokeWidth="0.25" />
      </svg>

      <ToothMarkDraw className="absolute left-[9%] top-[5%] h-auto w-[82%]" />

      {next.length > 0 && (
        <m.div
          data-reveal
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardTransition}
          className="absolute inset-x-0 -bottom-4 rounded-[0.625rem] border border-line bg-surface/95 p-4 shadow-lift sm:inset-x-auto sm:bottom-0 sm:left-0 sm:w-[19.5rem]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Next open times</p>
            <DemoFlag>Demo slots</DemoFlag>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {next.map((slot) => (
              <li key={`${slot.date}-${slot.time}`}>
                <button
                  type="button"
                  onClick={() => requestBooking({ date: slot.date, time: slot.time })}
                  className="tap inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 text-sm font-semibold text-ink transition-colors hover:border-tide-500 hover:bg-tide-100"
                >
                  <span className="font-medium text-muted">{relativeDayLabel(slot.date, now!.iso)}</span>
                  {formatTime(slot.time)}
                </button>
              </li>
            ))}
          </ul>
        </m.div>
      )}
    </div>
  );
}
