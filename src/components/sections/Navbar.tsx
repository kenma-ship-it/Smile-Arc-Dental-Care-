"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { clinic, telUrl, whatsappUrl } from "@/data/clinic";
import { useModalBehaviour } from "@/hooks/useDisclosure";
import { cn } from "@/lib/cn";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Smile gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Find us" },
];

/* Hoisted so Motion sees stable identities (a new object each render restarts animations) */
const headerVariants = { visible: { y: 0 }, hidden: { y: "-100%" } };
const headerTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
const sheetTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useModalBehaviour(open, sheetRef, close);

  /* Hide on scroll down, show on scroll up */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    setHidden(latest > previous && latest > 160);
  });

  return (
    <>
      <m.header
        variants={headerVariants}
        animate={hidden && !open ? "hidden" : "visible"}
        initial={false}
        transition={headerTransition}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="wrap flex h-[var(--header-height)] items-center justify-between gap-4">
          <a href="#top" aria-label={`${clinic.name}, back to top`} className="rounded-md">
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telUrl}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:text-ink xl:inline-flex"
            >
              <Icon name="phone" className="h-[1.05rem] w-[1.05rem]" />
              {clinic.phone.display}
            </a>
            <ThemeToggle />
            <BookButton size="sm" className="hidden sm:inline-flex">
              Book appointment
            </BookButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface/70 px-4 text-[0.9375rem] font-semibold text-ink lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
              Menu
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={sheetTransition}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper"
          >
            <div className="wrap flex h-[var(--header-height)] shrink-0 items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-semibold text-ink"
              >
                <Icon name="x" className="h-5 w-5" />
                Close
              </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="wrap flex-1 pt-6">
              <ul className="divide-y divide-line border-y border-line">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex min-h-[3.75rem] items-center justify-between font-display text-[1.75rem] text-ink"
                    >
                      {link.label}
                      <Icon name="arrow-right" className="h-5 w-5 text-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="wrap grid gap-3 pb-10 pt-8">
              <BookButton size="lg" className="w-full" onNavigate={close}>
                Book appointment
              </BookButton>
              <div className="grid grid-cols-2 gap-3">
                <Button href={telUrl} variant="quiet" icon="phone" className="w-full">
                  Call clinic
                </Button>
                <Button href={whatsappUrl()} variant="quiet" icon="whatsapp" className="w-full">
                  WhatsApp
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted">
                {clinic.hours.displayShort}: {clinic.hours.displaySessions[0]} and {clinic.hours.displaySessions[1]}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
