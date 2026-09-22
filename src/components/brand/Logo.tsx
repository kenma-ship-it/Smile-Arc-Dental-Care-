import { cn } from "@/lib/cn";
import { ToothMark } from "./ToothMark";

/** Mark + wordmark. The wordmark follows the signboard: flared serif caps in blue. */
export function Logo({
  tone = "dark",
  className,
  markClassName,
}: {
  tone?: "dark" | "light";
  className?: string;
  markClassName?: string;
}) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <ToothMark tone={light ? "light" : "brand"} className={cn("h-10 w-auto shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-brand text-[1.3rem] tracking-[0.07em]", light ? "text-white" : "text-primary")}>
          SMILE ARC
        </span>
        <span
          className={cn(
            "mt-[0.4rem] text-[0.58rem] font-semibold tracking-[0.42em]",
            light ? "text-mist" : "text-muted",
          )}
        >
          DENTAL CARE
        </span>
      </span>
    </span>
  );
}
