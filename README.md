# Smile Arc Dental Care — Demo Website

Demo site for **Smile Arc Dental Care**, Dr. Janhavi Parab (B.D.S, Mumbai), Dental Surgeon.  
Shop No. 32, Shraddha CHS, Ambewadi, Kalachowki, Mumbai 400033.

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Tech stack

- **Next.js 16** (App Router, static export)
- **React 19**, TypeScript strict
- **Tailwind CSS v4** (CSS-based tokens, no config file)
- **Motion v13** (LazyMotion + `m` components, reduced-motion respected)
- Self-hosted fonts (Newsreader, Figtree, Marcellus, Noto Sans Devanagari)

## What to update before going live

1. **Google reviews** - Open the clinic's Google Maps listing and copy each review word for word (name, stars, date shown, text) into `src/data/reviews.ts`. While the list is empty the section shows a "Read reviews on Google" card; as soon as reviews are added, the scrolling two-row marquee appears automatically. Never edit, shorten or invent reviews.
2. **Case 1 photos** - Both Case 1 images carry the Google Gemini sparkle mark (bottom right), which suggests AI generation or editing. Replace them with the original camera files in `src/assets/cases/case-4-*.webp`.
3. **Patient consent** - Set `consentConfirmed: true` in `src/data/cases.ts` only after each patient (or guardian) agrees.
4. **Doctor's portrait** - Replace the placeholder in `src/components/sections/Doctor.tsx`.
5. **Booking** - The booking form is a demo (slots are sample data, saved in the browser only). Replace `submitAppointment` in `src/lib/appointments.ts` with a real API call.
6. **Search engines** - Change `robots: { index: false }` to `true` in `src/app/layout.tsx` and set `NEXT_PUBLIC_SITE_URL`.

## Light and dark mode

- The toggle is in the navbar and the mobile menu. First visit follows the device setting; the choice is then remembered.
- Colours live in `src/app/globals.css`: light values in `@theme`, dark values under `:root[data-theme="dark"]`. Use tokens such as `bg-surface`, `text-ink`, `text-muted`, `text-primary`, `text-accent` rather than fixed colours so new components switch automatically.
- The switch uses a circular reveal (View Transitions API), a colour fade in older browsers, and no animation for visitors who turn motion off.

## Project structure

```
src/
├── app/              # Next.js app router (layout, page, globals.css, fonts)
├── assets/           # Real case photos (WebP, crop-only, no edits)
├── components/
│   ├── brand/        # ToothMark logo, Logo wordmark
│   ├── motion/       # MotionProvider (LazyMotion wrapper)
│   ├── sections/     # Page sections (Hero, About, Services, Gallery, etc.)
│   └── ui/           # Button, Icon, DemoFlag, SectionHead, etc.
├── data/             # Clinic info, services, cases, FAQs, reviews
├── hooks/            # useIstNow, useLocalBookings, useDisclosure
└── lib/              # cn, time, slots, validation, appointments, prefill
```

## Content rules

- **Real patient photos** are crop-only. No retouching, AI alteration, or colour correction.
- **Reviews** must be pasted word-for-word from Google Maps. Never edit, shorten, or invent them.
- **No invented claims** — no specialisations, experience numbers, prices, or guarantees unless the clinic provides them.
- **Demo booking** uses deterministic seeded randomness so the same date always shows the same slots.
