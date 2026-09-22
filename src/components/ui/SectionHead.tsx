import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Left-rail heading used by the long sections. Sticky on large screens. */
export function SectionHead({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("rail-head", className)}>
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {children && <div className="mt-5 max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted [.on-dark_&]:text-mist">{children}</div>}
    </header>
  );
}
