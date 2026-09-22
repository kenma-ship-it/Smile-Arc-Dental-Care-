"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * One provider for the whole site.
 * - `reducedMotion="user"` turns off transform and layout animation for visitors who ask for it.
 * - `LazyMotion` + `m` components keep the animation runtime small. `domMax` is needed for
 *   layout animation (shared pills in the booking form and gallery tabs).
 * - `strict` throws if a full `motion.*` component sneaks in and undoes the saving.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
