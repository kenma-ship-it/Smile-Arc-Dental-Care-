"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only when the wrapper is close to the viewport.
 * The wrapper keeps a fixed minimum height so nothing jumps when content arrives.
 */
export function LazyMount({
  children,
  minHeight,
  rootMargin = "500px 0px",
  className,
}: {
  children: ReactNode;
  minHeight: number | string;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}
