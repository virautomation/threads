export interface PerformanceContext {
  avgViews: number;
  avgEngagementRate: number; // 0..1
  dominantTopics?: string;
  post: {
    text: string | null;
    publishedAt: string;
    views: number;
    likes: number;
    replies: number;
    reposts: number;
    quotes: number;
    shares: number;
    engagementRate: number;
  };
}

export function buildPerformancePrompt(ctx: PerformanceContext): string {
  const pctVsAvg = ctx.avgViews > 0 ? ((ctx.post.views / ctx.avgViews) * 100 - 100).toFixed(1) : "0";
  return `Kamu adalah content strategist yang menganalisa performa post Threads.

KONTEKS AKUN (30 hari):
- Rata-rata views per post: ${ctx.avgViews}
- Rata-rata engagement rate: ${(ctx.avgEngagementRate * 100).toFixed(2)}%
${ctx.dominantTopics ? `- Topik dominan: ${ctx.dominantTopics}\n` : ""}
POST YANG DIANALISA:
Konten: """
${ctx.post.text ?? "(tanpa teks)"}
"""
Dipublish: ${ctx.post.publishedAt}
Views: ${ctx.post.views} (${pctVsAvg}% vs rata-rata)
Engagement rate: ${(ctx.post.engagementRate * 100).toFixed(2)}%
Likes: ${ctx.post.likes} | Replies: ${ctx.post.replies} | Reposts: ${ctx.post.reposts} | Quotes: ${ctx.post.quotes} | Shares: ${ctx.post.shares}

TASK:
Analisa dalam Bahasa Indonesia natural, ringkas tapi spesifik:
1. Apakah post ini over- atau under-performed? Seberapa signifikan?
2. Faktor spesifik dari KONTEN (hook, tone, topik, struktur, panjang, CTA, timing) yang kemungkinan mempengaruhi performa.
3. 2–3 rekomendasi konkret kalau mau bikin post serupa.

Hindari generic advice. Fokus pada observasi yang spesifik untuk post ini. Format output dalam markdown dengan heading singkat.`;
}

export interface PatternContext {
  periodDays: number;
  topPosts: Array<{ text: string | null; views: number; engagementRate: number }>;
  bottomPosts: Array<{ text: string | null; views: number; engagementRate: number }>;
}

export function buildPatternPrompt(ctx: PatternContext): string {
  const fmt = (p: { text: string | null; views: number; engagementRate: number }, i: number) =>
    `${i + 1}. [views=${p.views}, ER=${(p.engagementRate * 100).toFixed(2)}%] ${
      (p.text ?? "(no text)").replace(/\s+/g, " ").slice(0, 240)
    }`;

  return `Kamu adalah content strategist yang mendeteksi pola di antara post Threads top performer vs bottom performer.

PERIODE: ${ctx.periodDays} hari terakhir.

TOP ${ctx.topPosts.length} POST (by engagement rate):
${ctx.topPosts.map(fmt).join("\n")}

BOTTOM ${ctx.bottomPosts.length} POST (by engagement rate):
${ctx.bottomPosts.map(fmt).join("\n")}

TASK:
Tulis laporan pola dalam Bahasa Indonesia natural. Format markdown dengan heading. Bahas:
1. **Apa yang membedakan TOP dari BOTTOM** — topik, gaya bahasa, panjang, struktur hook, ada tidaknya pertanyaan/CTA, format (list/cerita/opinion), timing kalau terlihat.
2. **Pola spesifik 2-3 hal yang konsisten muncul di TOP** dengan contoh kutipan dari post.
3. **Pola yang membuat BOTTOM under-perform**, dengan contoh.
4. **3 rekomendasi konkret** untuk post berikutnya berdasarkan pola yang terdeteksi.

Spesifik dan dapat ditindak — hindari saran generik seperti "buat konten yang menarik".`;
}
