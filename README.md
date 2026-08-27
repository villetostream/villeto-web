# Villeto — Landing Page Rebuild

Next.js 16 (App Router) Villeto marketing site

## Getting started

```bash
npm install
npm run dev
```

## Guided walkthrough email

The walkthrough form sends email through the Resend API. Copy `.env.example`
to `.env.local`, then set `RESEND_API_KEY` and `DEMO_REQUEST_FROM_EMAIL`.
The sender must use a domain verified in Resend. Production sends requests to
`info@villeto.com`.

## What's here

- `app/` — routes: home (`/`), product detail pages (`/products/[slug]`),
  solution detail pages (`/solutions/[slug]`), sitemap, robots, 404.
- `components/layout/` — Header (sticky, shrinks after 80px scroll, desktop
  mega-menu), MobileNav (full-screen accordion overlay), Footer, floating
  theme toggle.
- `components/sections/` — one file per landing-page section, in the same
  order as the original Figma composition.
- `components/ui/` — Button, Container, Reveal (scroll-in animation),
  Counter (count-up stat).
- `lib/content/` — every string of copy, typed and separated from markup,
  so content edits never require touching a component (DESIGN_RULES.md
  Section 9). This is also where the Products/Solutions mega-menu and
  detail-page copy lives.
- `lib/theme.ts` / `lib/theme-provider.tsx` — cookie-based theme (not
  localStorage), read server-side in `app/layout.tsx` for a zero-flash
  first paint.
- `public/images/` — every image from the Figma export, renamed to a
  semantic filename (see the mapping table in the assistant's write-up).

