# villeto-web

Landing page for [villeto.com](https://villeto.com).

## What's in this repo

This repo contains **only** the public-facing marketing site. It has no auth, no dashboard, no backend calls.

| Path | Description |
|---|---|
| `src/app/page.tsx` | Root landing page |
| `src/components/landing/` | All landing page sections (Hero, FAQ, Footer, etc.) |

## Getting started

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000` by default.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | URL of the villeto-app repo (login, onboarding, dashboard) |

For local development, create `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

For production, set in Vercel:
```
NEXT_PUBLIC_APP_URL=https://app.villeto.com
```

## Vercel deployment

1. Create a new Vercel project linked to this repo
2. Add domain: `villeto.com`
3. Set `NEXT_PUBLIC_APP_URL=https://app.villeto.com` in Vercel environment variables
4. In your DNS provider, point `villeto.com` → Vercel

## Related repos

| Repo | Domain | Purpose |
|---|---|---|
| `villeto-web` ← you are here | villeto.com | Landing page |
| `villeto-app` | app.villeto.com | Onboarding + dashboard |
| `villeto-vendors` (future) | vendors.villeto.com | Vendor portal |
| `villeto-admin` (future) | admin.villeto.com | Internal admin |
