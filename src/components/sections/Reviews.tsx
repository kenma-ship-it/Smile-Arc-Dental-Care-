"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Icon, StarIcon } from "@/components/ui/Icon";
import { clinic } from "@/data/clinic";
import { reviews, type Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Marquee (adapted from the supplied component)                        */
/* ------------------------------------------------------------------ */

type MarqueeProps = {
  children: ReactNode;
  direction?: "left" | "right";
  /** pixels per second */
  speed?: number;
  paused: boolean;
  className?: string;
};

/**
 * Content is rendered twice and the track slides by exactly half its width,
 * so the loop is seamless. Duration comes from the measured width, so the speed
 * stays constant however many reviews there are.
 */
function Marquee({ children, direction = "left", speed = 40, paused, className }: MarqueeProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(node.scrollWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (reduce) {
    // No motion: a plain horizontal scroller the visitor controls
    return (
      <div className={cn("no-scrollbar overflow-x-auto", className)}>
        <div className="flex w-max gap-4 px-1">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("marquee-fade overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max gap-4"
        style={{
          animationName: `marquee-${direction}`,
          animationDuration: width ? `${width / speed}s` : "0s",
          animationPlayState: paused || !width ? "paused" : "running",
        }}
      >
        <div ref={contentRef} className="flex shrink-0 gap-4">
          {children}
        </div>
        {/* Visual duplicate for the loop; hidden from screen readers and keyboard */}
        <div className="flex shrink-0 gap-4" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Review card                                                          */
/* ------------------------------------------------------------------ */

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col rounded-xl border border-line bg-surface p-5 shadow-lift sm:w-[22rem]">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-tide-500 text-sm font-bold text-white"
        >
          {initials(review.name)}
        </span>
        <figcaption className="min-w-0">
          <p className="truncate font-semibold text-ink">{review.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="flex gap-0.5" role="img" aria-label={`${review.stars} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  filled={i < review.stars}
                  className={cn("h-3.5 w-3.5", i < review.stars ? "text-[#f5b301]" : "text-line")}
                />
              ))}
            </span>
            <span className="text-xs text-muted">{review.when}</span>
          </div>
        </figcaption>
      </div>
      <blockquote className="mt-3.5 text-[0.95rem] leading-relaxed text-ink-soft">{review.text}</blockquote>
      <p className="mt-auto pt-4 text-xs font-medium text-muted">Google review</p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export function Reviews() {
  const [isPaused, setIsPaused] = useState(false);

  const hasReviews = reviews.length > 0;
  const half = Math.ceil(reviews.length / 2);
  // Two rows once there are enough reviews to fill them
  const rows = reviews.length >= 6 ? [reviews.slice(0, half), reviews.slice(half)] : [reviews];

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-pad overflow-hidden border-t border-line-soft bg-mint/50">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[36rem]">
            <h2 id="reviews-title" className="h-section">
              What patients say
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              Reviews from the clinic&apos;s Google Maps listing, shown exactly as patients wrote them.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {hasReviews && (
              <a
                href={clinic.maps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet btn-sm"
              >
                View on Google
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {hasReviews ? (
        <div
          className="mt-12 grid gap-4 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
          onPointerCancel={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {rows.map((row, i) => (
            <Marquee key={i} direction={i % 2 === 0 ? "left" : "right"} speed={i % 2 === 0 ? 38 : 32} paused={isPaused} className="py-2">
              {row.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Marquee>
          ))}
        </div>
      ) : (
        <div className="wrap">
          <div className="mt-10 flex flex-col items-start gap-6 rounded-xl border border-line bg-surface p-7 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex items-center gap-4">
              <p className="max-w-[30rem] text-[1.0625rem] text-ink-soft">
                Read what patients say about {clinic.doctor.name} on Google, or share your own experience.
              </p>
            </div>
            <a href={clinic.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read reviews on Google
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
