# PRD: Threads Content Analytics & LLM Insights

**Product Name (working title):** ThreadLens
**Owner:** Bhskin
**Status:** Draft v1.0
**Last updated:** 18 April 2026

---

## 1. Ringkasan Eksekutif

ThreadLens adalah aplikasi web internal untuk analisa konten Threads (Meta) yang terhubung dengan LLM. Aplikasi ini mengambil data post dan insights dari akun Threads milik user melalui Threads Graph API, menyimpannya secara historis, lalu menggunakan LLM untuk memberikan insight yang actionable — seperti pola konten yang performa, rekomendasi ide post baru, dan analisa tren performa akun.

Aplikasi ini **bukan** tool scheduling/posting dan **bukan** social listening tool — fokus tunggalnya adalah memahami konten sendiri lebih dalam dengan bantuan AI.

---

## 2. Latar Belakang & Masalah

Membuat konten Threads yang konsisten performa-nya sulit karena:

1. **Dashboard native Threads terbatas** — metrik tersedia, tapi tidak ada layer analisa kualitatif. User hanya lihat angka, bukan "kenapa".
2. **Pola konten sulit dikenali manual** — saat punya 100+ post, sulit ingat post mana yang mirip dan kenapa hasilnya beda.
3. **Ide konten baru sering buntu** — user tahu ada post yang works, tapi sulit ekstrak formula-nya.
4. **Data tidak terkonsolidasi** — kalau mau analisa historis lebih dari window default Threads, data harus disimpan sendiri.

LLM (terutama Claude) sangat cocok mengisi gap ini karena bisa membaca konten, memahami konteks bahasa Indonesia, dan menghubungkan pola kualitatif dengan data kuantitatif.

---

## 3. Goals & Non-Goals

### Goals
- Menyediakan dashboard analitik konten Threads yang lebih dalam dari native app
- Menggunakan LLM untuk menjawab pertanyaan "kenapa post ini performa?" dalam bahasa natural
- Menyimpan data historis konten + insights sehingga bisa dianalisa lintas waktu
- Mempercepat ideasi konten baru berdasarkan pola top performer sendiri

### Non-Goals (explicitly out of scope for v1)
- Scheduling atau auto-posting ke Threads
- Analisa akun orang lain / kompetitor publik (Threads API tidak mengizinkan)
- Reply management / inbox management
- Multi-platform (Instagram, X, TikTok) — Threads only dulu
- Mobile app native — web only

---

## 4. Target User

**Primary user:** Brand owner / content creator yang mengelola akun Threads sendiri atau tim kecil (1–3 orang) dengan volume 20+ post per bulan.

**Persona utama — "Rina, Brand Owner FMCG":**
- Mengelola akun Threads brand-nya sendiri
- Posting 3–5x per minggu
- Ingin tahu konten jenis apa yang paling efektif
- Tidak punya waktu analisa manual setiap minggu
- Familiar dengan dashboard tapi bukan data analyst

---

## 5. Assumptions (perlu dikonfirmasi)

| # | Asumsi | Status |
|---|--------|--------|
| A1 | Target: single user dulu (Bhskin sendiri), multi-user di fase berikutnya | ⚠️ Perlu konfirmasi |
| A2 | LLM provider: Claude API (Anthropic) sebagai default | ⚠️ Perlu konfirmasi |
| A3 | Bahasa interface: Bahasa Indonesia | ✅ Sesuai konteks user |
| A4 | Akun Threads yang dianalisa: milik user yang oauth (tidak ambil data orang lain) | ✅ Constraint API |
| A5 | Deploy: self-hosted di VPS atau Vercel, bukan SaaS publik | ⚠️ Perlu konfirmasi |

---

## 6. Scope Fitur v1 (MVP)

### F1 — Authentication & Connection
- Login via Threads OAuth (`threads_basic`, `threads_manage_insights`)
- Simpan long-lived access token (60 hari) di database terenkripsi
- Auto-refresh token sebelum expired
- Disconnect / re-connect account

### F2 — Data Sync
- **Initial sync:** ambil semua post historis user saat pertama connect (up to limit API)
- **Incremental sync:** cron job tiap 6 jam untuk ambil post baru + update insights post lama (insights berubah seiring waktu)
- **Manual sync button:** user bisa trigger sync kapan saja
- Status sync terlihat di UI (last synced at, next sync)

### F3 — Dashboard Overview
- Ringkasan akun: total post, total views, total engagement, follower count
- Grafik performa 30 hari terakhir (views, likes, replies, reposts)
- Top 5 post by engagement rate
- Top 5 post by views
- Filter periode: 7 / 30 / 90 / custom

### F4 — Post List & Detail
- List semua post dengan kolom: preview teks, tanggal, views, likes, replies, reposts, quotes, shares, engagement rate
- Sortable & filterable
- Klik post → halaman detail: konten lengkap, media, semua metrik, link ke post asli, tombol "Analisa dengan AI"

### F5 — LLM Analysis (core differentiator)

Empat mode analisa:

**5a. Performance Analysis (single post)**
- Input: 1 post + metriknya + benchmark rata-rata akun user
- Output: Penjelasan kualitatif kenapa post ini di atas/bawah rata-rata (hook, tone, topik, panjang, timing)

**5b. Pattern Detection (batch post)**
- Input: top 20 post + bottom 20 post dari periode tertentu
- Output: Laporan pola — apa yang membedakan top dari bottom (topik, gaya bahasa, format, panjang, CTA, dll)

**5c. Content Idea Generator**
- Input: top performer posts + optional brief tambahan dari user
- Output: 5–10 ide post baru dengan draft hook, dalam gaya yang terbukti works untuk akun ini

**5d. Ask Anything (chat mode)**
- User bisa chat bebas dengan AI yang sudah punya konteks data akun
- Contoh: "minggu lalu engagement turun, kenapa ya?", "bandingin post yang pake pertanyaan vs yang statement"
- AI punya tool access ke data DB untuk jawab (RAG + function calling)

### F6 — Export
- Export post list ke CSV
- Export LLM analysis ke Markdown
- Export chart ke PNG

---

## 7. Out of Scope v1 (future candidates)

- Multi-user / multi-tenant dengan tier pricing
- Competitor manual input (paste konten kompetitor untuk dibandingkan)
- Content calendar view
- Scheduling & auto-post (butuh `threads_content_publish` scope + app review)
- Image/video content analysis (hanya teks di v1)
- Notifikasi email mingguan berisi insight auto-generated
- A/B testing tracker untuk varian konten
- Integrasi ke Notion/Google Sheets untuk reporting

---

## 8. User Flows

### Flow 1: Onboarding
```
Landing page → Klik "Connect Threads" → OAuth redirect ke Threads →
User approve permissions → Callback ke app → Initial sync (loading screen dengan progress) →
Dashboard dengan data sudah terisi
```

### Flow 2: Analisa Performa Post
```
Dashboard → Post List → Klik post tertentu → Halaman detail post →
Klik "Analisa dengan AI" → LLM streaming response muncul →
User bisa follow-up dengan pertanyaan lanjutan di chat
```

### Flow 3: Cari Ide Konten
```
Dashboard → Menu "Content Ideas" → Pilih periode referensi (misal 30 hari terakhir) →
Optional: tambah brief ("mau bikin konten tentang self-care") →
Klik "Generate" → 5–10 ide muncul dengan hook draft →
User bisa copy / save favorit / re-generate
```

---

## 9. Technical Architecture (high-level)

### Stack
- **Frontend & Backend:** Next.js 14 (App Router) + TypeScript
- **Design System:** shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React (default shadcn)
- **Charts:** Recharts (direkomendasikan shadcn untuk charts)
- **Theme:** next-themes (dark/light mode support built-in)
- **Database:** PostgreSQL (hosted di Supabase/Neon)
- **ORM:** Prisma
- **Auth:** NextAuth.js (custom Threads provider) atau custom OAuth handler
- **LLM:** Anthropic Claude API (Claude Sonnet 4.6 untuk analisa, Haiku 4.5 untuk tasks ringan)
- **Background jobs:** Inngest / Trigger.dev / simple cron via Vercel Cron
- **Hosting:** Vercel (atau VPS kalau ada concern billing LLM)

### Design System Details (shadcn/ui)

Komponen shadcn yang akan dipakai di v1:

**Layout & Navigation**
- `Sidebar` (shadcn sidebar-07 block) — main navigation
- `Breadcrumb`, `Separator`, `ScrollArea`

**Data Display**
- `Card` — dashboard widgets, post cards
- `Table` (+ TanStack Table) — post list dengan sorting/filtering
- `Badge` — status labels, engagement tier
- `Avatar` — akun profile
- `Chart` (shadcn chart wrapper untuk Recharts) — grafik performa

**Forms & Input**
- `Button`, `Input`, `Textarea`, `Select`, `Command` (untuk search)
- `DatePicker` + `Calendar` — filter periode
- `Switch`, `Checkbox`, `RadioGroup`
- `Form` (react-hook-form + zod) — validation

**Feedback & Overlay**
- `Dialog`, `Sheet` (drawer) — detail post, settings
- `Toast` (Sonner) — notifikasi sync, error
- `AlertDialog` — konfirmasi disconnect account
- `Tooltip`, `HoverCard` — info tambahan metric
- `Skeleton` — loading states
- `Progress` — progress sync

**LLM-specific UI**
- `Tabs` — switch antar mode analisa (Performance / Pattern / Ideas / Chat)
- Chat UI custom pakai primitives shadcn (bukan komponen bawaan, build sendiri dengan `ScrollArea` + `Textarea` + streaming markdown renderer)
- `Collapsible` — untuk expand/collapse reasoning LLM

**Theme & Style**
- Base color: **Slate** atau **Zinc** (netral, cocok untuk data-heavy app)
- Accent: custom warna brand (bisa di-tune di `globals.css` CSS variables)
- Mode: light + dark (toggle di header)
- Radius: `0.5rem` (default shadcn) — modern tapi tidak terlalu playful
- Font: Geist Sans (default Next.js 14) atau Inter

### Data Model (simplified)
```
User
  id, email, threads_user_id, access_token (encrypted),
  token_expires_at, created_at

Post
  id, user_id, threads_post_id, text, media_type, media_url,
  permalink, published_at, last_insights_sync_at

PostInsights
  id, post_id, views, likes, replies, reposts, quotes, shares,
  snapshot_at (supaya bisa track perubahan metrik over time)

AccountInsights
  id, user_id, followers_count, views, snapshot_at

LlmAnalysis
  id, user_id, type (performance|pattern|ideas|chat),
  input_context (jsonb), output (text), model_used,
  tokens_used, created_at

ChatSession / ChatMessage (untuk mode 5d)
```

### External APIs
- Threads Graph API (`https://graph.threads.net/v1.0/`)
  - Endpoints utama: `/me`, `/me/threads`, `/{post-id}/insights`, `/me/threads_insights`
- Anthropic API (`https://api.anthropic.com/v1/messages`)

### Security
- Access token Threads di-encrypt at rest (AES-256)
- LLM API key hanya di server, tidak pernah expose ke client
- Rate limiting di endpoint LLM (prevent abuse kalau multi-user)
- Log user actions untuk audit

---

## 10. Metrics of Success

### Product metrics (kalau single-user, ini KPI untuk diri sendiri)
- Frekuensi user buka aplikasi per minggu (target: 3x/minggu)
- Jumlah LLM analysis di-trigger per minggu (target: 5+)
- Jumlah ide konten yang benar-benar dipost dari generator (target: 2+/minggu)

### Business impact (proxy)
- Peningkatan rata-rata engagement rate akun Threads user setelah 1 bulan pakai (target: +20%)
- Peningkatan views per post (target: +15%)

### Technical health
- Sync job success rate > 99%
- API error rate < 1%
- P95 latency dashboard < 1.5 detik
- LLM response time (non-streaming) < 10 detik untuk pattern analysis

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Threads API rate limit terlalu ketat untuk sync frequent | High | Cache agresif di DB, sync incremental (hanya post baru / post dengan insights baru), exponential backoff |
| Token expired / user revoke akses tanpa notice | Medium | Deteksi 401 error, auto-redirect ke re-auth flow, tampilkan banner "reconnect required" |
| Biaya LLM membengkak kalau banyak analisa | Medium | Cache hasil analisa per post (invalidate kalau insights berubah signifikan), batasi input context (top 20 post, bukan semua), pakai Haiku untuk task ringan |
| Threads API mengubah field/endpoint | Medium | Abstraction layer untuk API calls, version pinning, monitoring error |
| User post mengandung konten sensitif yang diproses LLM | Low | Disclose di ToS, data hanya dikirim ke Anthropic (yang punya ZDR option), opsi opt-out analisa |
| Single point of failure kalau cuma deploy Vercel free tier | Low | Plan upgrade ke paid tier kalau traffic naik, atau migrasi ke VPS |

---

## 12. Timeline (estimasi solo dev + Claude Code)

| Fase | Durasi | Deliverable |
|------|--------|-------------|
| **M0 — Setup** | 2 hari | Next.js project, DB schema, env setup, Meta Developer app |
| **M1 — Auth & Sync** | 4 hari | OAuth flow, initial sync, background job untuk incremental sync |
| **M2 — Dashboard** | 4 hari | Overview, post list, post detail (tanpa LLM dulu) |
| **M3 — LLM v1** | 5 hari | Performance analysis + pattern detection + basic prompt engineering |
| **M4 — LLM v2** | 4 hari | Content idea generator + chat mode dengan function calling |
| **M5 — Polish** | 3 hari | Export, error handling, loading states, empty states, mobile responsive |
| **M6 — QA & deploy** | 2 hari | Testing end-to-end, deploy production, monitoring |
| **Total** | **~24 hari kerja** | MVP siap dipakai sendiri |

---

## 13. Open Questions

Yang masih perlu diputuskan sebelum mulai coding:

1. **Single-user vs multi-user?** Kalau multi-user, perlu tambahan kerja untuk tenant isolation, billing, tier management.
2. **LLM provider default?** Claude API, atau kasih opsi user bisa input API key sendiri (untuk hemat biaya kalau multi-user)?
3. **Hosting?** Vercel (gampang, tapi ada concern cost kalau background job banyak) vs VPS (lebih kontrol, tapi perlu setup sendiri).
4. **Mau integrasi dengan tool lain yang sudah Bhskin pakai?** Misal push insight mingguan ke Slack/WhatsApp, atau simpan note ke Notion.
5. **Prioritas 4 mode analisa LLM** — kalau harus pick 2 untuk MVP pertama, pilih yang mana?

---

## 14. Appendix

### A. Referensi Threads API Fields

**Post fields (yang dipakai):**
`id, text, media_type, media_url, permalink, timestamp, username, is_quote_post`

**Post insights metrics:**
`views, likes, replies, reposts, quotes, shares`

**Account insights metrics:**
`views, likes, replies, reposts, quotes, followers_count, follower_demographics`

### B. Contoh Prompt LLM untuk Mode Performance Analysis (draft)

```
Kamu adalah content strategist yang menganalisa performa post Threads.

KONTEKS AKUN:
- Rata-rata views per post (30 hari): {avg_views}
- Rata-rata engagement rate: {avg_engagement}
- Topik dominan akun: {dominant_topics}

POST YANG DIANALISA:
Konten: "{post_text}"
Dipublish: {published_at}
Views: {views} ({pct_vs_avg}% vs rata-rata)
Likes: {likes}, Replies: {replies}, Reposts: {reposts}

TASK:
Analisa dalam bahasa Indonesia yang natural:
1. Apakah post ini over/under-performed? Seberapa signifikan?
2. Faktor-faktor spesifik dari KONTEN (hook, tone, topik, struktur, panjang, CTA) yang kemungkinan mempengaruhi performa
3. 2-3 rekomendasi konkret kalau mau bikin post serupa

Hindari generic advice. Fokus pada observasi yang spesifik untuk post ini.
```

### C. Perkiraan Biaya Operasional Bulanan (single user, ~100 post/bulan)

| Komponen | Biaya |
|----------|-------|
| Vercel Hobby / Pro | $0–$20 |
| PostgreSQL (Supabase/Neon free tier) | $0 |
| Anthropic API (estimasi 200 analisa/bulan) | $5–$15 |
| Domain | $1/bulan (amortized) |
| **Total** | **~$6–$36/bulan** |

---

*PRD ini adalah living document. Update versi kalau ada perubahan scope mayor.*
