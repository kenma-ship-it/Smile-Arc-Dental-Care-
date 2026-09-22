"use client";

import { requestBooking, type BookingPrefill } from "@/lib/prefill";
import { Button, type ButtonStyleProps } from "./Button";

type Props = ButtonStyleProps & {
  prefill?: BookingPrefill;
  /** Runs first, for example to close a menu before scrolling */
  onNavigate?: () => void;
};

/**
 * Scrolls to the booking form and pre-selects a service, date or time if given.
 * Renders a real link to #book, so it still works if JavaScript is blocked.
 */
export function BookButton({ prefill, onNavigate, children, ...style }: Props) {
  return (
    <Button
      {...style}
      href="#book"
      onClick={(event) => {
        event.preventDefault();
        if (onNavigate) {
          onNavigate();
          window.setTimeout(() => requestBooking(prefill), 80);
        } else {
          requestBooking(prefill);
        }
      }}
    >
      {children}
    </Button>
  );
}
