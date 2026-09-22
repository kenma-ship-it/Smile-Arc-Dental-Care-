/**
 * Light / dark theme.
 * The inline script in layout.tsx sets data-theme on <html> before first paint,
 * so there is no flash of the wrong theme. After that, this module owns it.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "smilearc.theme";
export const THEME_EVENT = "smilearc:theme";

/** Runs before React loads. Kept tiny and dependency-free. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t}catch(e){}})();`;

export function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0c171c" : "#fafcfb");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * Switches theme with a circular reveal that grows from the toggle button.
 * Falls back to a short colour cross-fade, and to an instant switch when the
 * visitor has asked for reduced motion.
 */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionDoc;

  if (reduce) {
    apply(theme);
    return;
  }

  if (doc.startViewTransition && origin) {
    const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    const transition = doc.startViewTransition(() => apply(theme));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
          { duration: 620, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    return;
  }

  root.classList.add("theme-switching");
  apply(theme);
  window.setTimeout(() => root.classList.remove("theme-switching"), 500);
}
