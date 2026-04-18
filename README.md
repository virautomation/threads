# ThreadLens

Threads content analytics + LLM insights. Single-user MVP per `PRD-threads-analytics.md`.

## Stack

- Next.js 14 App Router + TypeScript
- shadcn-style components on Radix UI + Tailwind v3
- Recharts (charts), next-themes (dark/light), sonner (toasts), lucide-react
- Supabase (PostgreSQL, schema `threadlens`) — accessed via service-role on the server only
- Threads Graph API — `threads_basic`, `threads_manage_insights`
- LLM via OpenRouter (default models: Claude Sonnet 4.6 / Haiku 4.5)
- Vercel Cron for incremental sync every 6h

## Setup

```bash
npm install
cp .env.local.example .env.local        # then fill in the blanks
openssl rand -hex 32                     # → TOKEN_ENCRYPTION_KEY
openssl rand -hex 24                     # → CRON_SECRET
```

### Supabase

1. Open the SQL editor on your Supabase project and run `supabase/migrations/20260418000000_threadlens_init.sql`.
2. Add `threadlens` to `PGRST_DB_SCHEMAS` (Project Settings → API → Exposed schemas) and **Save**. PostgREST needs to know the schema exists.
3. Copy your `service_role` key into `SUPABASE_SERVICE_ROLE_KEY`.

### Meta / Threads app

Register a Meta Developer app with the **Threads** product enabled.
- App ID → `META_APP_ID`
- App Secret → `META_APP_SECRET`
- Redirect URI (must match Meta dashboard exactly) → `META_REDIRECT_URI=http://localhost:3000/api/auth/threads/callback`
- Permissions/scopes requested: `threads_basic`, `threads_manage_insights`

### OpenRouter

- API key → `OPENROUTER_API_KEY`
- Optional model overrides via `OPENROUTER_MODEL_ANALYSIS` and `OPENROUTER_MODEL_LIGHT`.

## Run

```bash
npm run dev      # http://localhost:3000
```

Visit `/settings` → **Connect Threads** to do OAuth. After the callback succeeds, optionally pin the user by copying the displayed UUID into `APP_USER_ID` in `.env.local`.

## Sync

- **Manual:** the **Sync now** button on the dashboard / settings page.
- **Cron:** `vercel.json` schedules `/api/cron/sync?secret=$CRON_SECRET` every 6 hours. The route also accepts `Authorization: Bearer $CRON_SECRET`.

## LLM analysis

- **Performance** (per post): open `/posts`, click a row → "Analisa dengan AI".
- **Pattern detection** (across posts): `/analysis` → choose period + sample size → Generate.

Both calls go through OpenRouter (`POST /api/analysis/{performance,pattern}`) and are persisted to `threadlens.llm_analysis`.

## Out of scope (per PRD §7)

`scheduling`, `auto-posting`, `competitor analysis`, `multi-platform`, `mobile native`, `Idea Generator`, `Chat/Ask Anything`. Idea & Chat modes are slotted for a follow-up — see `lib/analysis/prompts.ts` to extend.

## Project layout

```
app/
  api/auth/threads/...         OAuth start, callback, disconnect
  api/sync/route.ts            Manual sync trigger
  api/cron/sync/route.ts       Cron-driven sync (auth via secret)
  api/analysis/{performance,pattern}/route.ts
  page.tsx                     Dashboard
  posts/page.tsx               Post list (sortable + CSV export)
  posts/[id]/page.tsx          Post detail + Performance analysis
  analysis/page.tsx            Pattern detection + history
  settings/page.tsx            Connect / disconnect / sync state

components/
  ui/                          shadcn primitives
  dashboard/                   KPI cards, perf chart, period select, sync button
  posts/                       Post table
  analysis/                    Performance button, Pattern runner
  settings/                    Disconnect dialog
  sidebar-nav.tsx, topbar.tsx, theme-toggle.tsx, theme-provider.tsx, empty-connect.tsx

lib/
  env.ts                       Env loader with required-checks
  crypto.ts                    AES-256-GCM for access tokens
  supabase/server.ts           Service-role client (schema: threadlens)
  threads/api.ts               OAuth + Graph API client
  threads/types.ts
  user.ts                      getCurrentUser + token decryption helper
  sync.ts                      Initial + incremental sync logic
  llm/openrouter.ts            chat() + chatStream()
  analysis/prompts.ts          Performance + Pattern prompt templates
  queries.ts                   Dashboard + post queries
  markdown.tsx                 Minimal markdown renderer for LLM output
  utils.ts                     cn(), formatters

supabase/migrations/
  20260418000000_threadlens_init.sql
```
