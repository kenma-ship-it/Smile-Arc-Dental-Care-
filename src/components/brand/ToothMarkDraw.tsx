"use client";

import { useId } from "react";
import { m, useReducedMotion } from "motion/react";
import { MARK_STROKES, MARK_VIEWBOX } from "./mark-data";
import { MarkGradients, type MarkTone } from "./ToothMark";

/**
 * Timing for each stroke, in the order the eye follows the logo:
 * the crown first, then the arc over the top, the root, the swoosh and the small tick.
 */
const timing: Record<string, { delay: number; duration: number }> = {
  crown: { delay: 0.2, duration: 1.5 },
  arc: { delay: 0.55, duration: 1.2 },
  root: { delay: 1.1, duration: 1.05 },
  swoosh: { delay: 1.6, duration: 0.7 },
  tick: { delay: 2.0, duration: 0.3 },
};

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * The hero's one orchestrated moment: the mark draws itself.
 * Each filled stroke is revealed by a mask that follows its centre line,
 * so the taper of the calligraphic shape stays intact.
 */
export function ToothMarkDraw({ className, tone = "brand" }: { className?: string; tone?: MarkTone }) {
  const id = `md${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const reduce = useReducedMotion();

  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <MarkGradients id={id} tone={tone} />
      {MARK_STROKES.map((s) => {
        const t = timing[s.id] ?? { delay: 0, duration: 1 };
        return (
          <g key={s.id}>
            <mask id={`${id}-m-${s.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="260" height="220">
              <m.path
                d={s.spine}
                fill="none"
                stroke="#fff"
                strokeWidth={14}
                strokeLinecap="butt"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: t.delay, duration: t.duration, ease }}
              />
            </mask>
            <path d={s.shape} fill={`url(#${id}-${s.tone === "green" ? "g" : "b"})`} mask={`url(#${id}-m-${s.id})`} />
          </g>
        );
      })}
    </svg>
  );
}
