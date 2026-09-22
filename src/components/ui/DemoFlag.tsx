import type { ReactNode } from "react";
import { SHOW_DEMO_FLAGS } from "@/data/clinic";
import { cn } from "@/lib/cn";

/** Marks placeholder or sample content while the site is a demo. Hidden when demo flags are off. */
export function DemoFlag({ children = "Sample", className }: { children?: ReactNode; className?: string }) {
  if (!SHOW_DEMO_FLAGS) return null;
  return <span className={cn("flag", className)}>{children}</span>;
}
