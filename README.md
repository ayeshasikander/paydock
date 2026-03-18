# PayDev Hub (PayDock)

Developer utility dashboard: **webhook tester**, **fee calculator**, component/docs placeholders. Dark UI (emerald + slate), responsive layout.

## Quick start

```bash
npm install
cp .env.example .env.local   # demo mode (mock data) — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo vs live data

| `NEXT_PUBLIC_USE_MOCK_DATA` | Behavior |
|----------------------------|----------|
| `true` (recommended for demos) | **Mock**: in-memory webhooks (sample rows on first load), demo dashboard stats, `/api/fees` returns `source: "mock"`. Amber banner in UI. |
| `false` or unset | **Live**: webhooks stored in `data/webhooks.json` (lowdb), survives restarts. No demo banner. |

After changing env, restart `npm run dev`.

## Project structure

- `src/app` — routes (`/webhook-tester`, `/fee-calculator`, `/api/webhook`, `/api/fees`, …)
- `src/lib` — `config.ts`, `gateways.ts`, `fees.ts`, `mockData.ts`, `mockWebhookStore.ts`, `webhookDb.ts`
- `src/hooks` — `useWebhooks`, `useFees`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Tech

Next.js 16, React 19, Tailwind 4, Zustand, Framer Motion, lowdb (live webhooks), cmdk-ready.
