"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useMotionValue } from "motion/react";
import { DemoFlag } from "@/components/ui/DemoFlag";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { cases, type SmileCase } from "@/data/cases";
import { CASE_EVENT } from "@/lib/prefill";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Before / After comparison slider                                     */
/* ------------------------------------------------------------------ */

function CompareSlider({ c }: { c: SmileCase }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.max(4, Math.min(96, v));

  const onMove = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = clamp(((clientX - rect.left) / rect.width) * 100);
      pos.set(next);
      setPct(next);
    },
    [pos],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onMove(e.clientX);
    },
    [onMove],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current) onMove(e.clientX);
    },
    [onMove],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 3;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = clamp(pct - step);
        pos.set(next);
        setPct(next);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = clamp(pct + step);
        pos.set(next);
        setPct(next);
      }
    },
    [pct, pos],
  );

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[2.2/1] w-full cursor-col-resize select-none overflow-hidden rounded-lg border border-line bg-night-2"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (full width behind) */}
      <Image
        src={c.after}
        alt={c.altAfter}
        fill
        sizes="(min-width: 1024px) 52vw, 92vw"
        placeholder="blur"
        className="object-cover"
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={c.before}
          alt={c.altBefore}
          fill
          sizes="(min-width: 1024px) 52vw, 92vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-night/70 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-night/70 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        After
      </span>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]"
        style={{ left: `${pct}%` }}
        aria-hidden="true"
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-500"
        style={{ left: `${pct}%` }}
      >
        <Icon name="columns" className="h-4 w-4 text-[#0f2530]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery section with tabs                                            */
/* ------------------------------------------------------------------ */

const tabTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export function Gallery() {
  const [active, setActive] = useState(cases[0].id);
  const activeCase = cases.find((c) => c.id === active) ?? cases[0];

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (cases.some((c) => c.id === id)) setActive(id);
    };
    window.addEventListener(CASE_EVENT, handler);
    return () => window.removeEventListener(CASE_EVENT, handler);
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad border-t border-line-soft">
      <div className="wrap rail">
        <SectionHead id="gallery-title" title="Smile gallery">
          <p>Before and after photographs from the clinic. Drag the slider or use the arrow keys to compare.</p>
        </SectionHead>

        <div>
          {/* Tabs */}
          <div role="tablist" aria-label="Cases" className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {cases.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === active}
                aria-controls={`panel-${c.id}`}
                onClick={() => setActive(c.id)}
                className={cn(
                  "tap relative shrink-0 rounded-full px-5 text-[0.92rem] font-semibold transition-colors",
                  c.id === active ? "text-paper" : "text-ink-soft hover:text-ink",
                )}
              >
                {c.id === active && (
                  <m.span
                    layoutId="gallery-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={tabTransition}
                  />
                )}
                <span className="relative">{c.tabLabel}</span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeCase.id}
              id={`panel-${activeCase.id}`}
              role="tabpanel"
              aria-labelledby={activeCase.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <CompareSlider c={activeCase} />

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                {activeCase.treatment && (
                  <p className="text-sm font-semibold text-ink">
                    Treatment: <span className="text-accent">{activeCase.treatment}</span>
                  </p>
                )}
                {!activeCase.consentConfirmed && <DemoFlag>Consent to confirm</DemoFlag>}
              </div>

              {activeCase.extra && (
                <div className="mt-5 inline-flex items-center gap-4 rounded-lg border border-line bg-surface p-3">
                  <Image
                    src={activeCase.extra.image}
                    alt={activeCase.extra.alt}
                    width={80}
                    height={80}
                    placeholder="blur"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <p className="text-sm text-muted">{activeCase.extra.caption}</p>
                </div>
              )}

              <p className="mt-6 max-w-[40rem] text-[0.85rem] text-muted">
                Case photographs supplied by the clinic. Every patient&apos;s treatment is different, and results vary from person to person.
              </p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
