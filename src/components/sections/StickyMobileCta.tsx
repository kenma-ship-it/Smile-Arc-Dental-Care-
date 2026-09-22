"use client";

import { Icon } from "@/components/ui/Icon";
import { telUrl, whatsappUrl } from "@/data/clinic";
import { requestBooking } from "@/lib/prefill";

/** Fixed bottom bar on mobile: Call, WhatsApp, Book. Hidden on large screens. */
export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-sm lg:hidden">
      <div className="grid h-14 grid-cols-3">
        <a
          href={telUrl}
          className="flex flex-col items-center justify-center gap-0.5 text-[0.68rem] font-semibold text-ink"
        >
          <Icon name="phone" className="h-[1.1rem] w-[1.1rem]" />
          Call
        </a>
        <a
          href={whatsappUrl()}
          className="flex flex-col items-center justify-center gap-0.5 text-[0.68rem] font-semibold text-ink"
        >
          <Icon name="whatsapp" className="h-[1.1rem] w-[1.1rem]" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => requestBooking()}
          className="flex flex-col items-center justify-center gap-0.5 bg-tide-700 text-[0.68rem] font-semibold text-white"
        >
          <Icon name="calendar" className="h-[1.1rem] w-[1.1rem]" />
          Book
        </button>
      </div>
    </div>
  );
}
