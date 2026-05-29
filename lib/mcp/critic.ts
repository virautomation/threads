import { chat } from "../llm/gateway";

export interface CritiqueResult {
  pass: boolean;
  severity: "ok" | "warn" | "block";
  issues: string[];
}

/**
 * Automated safety/brand critic. Runs before any auto-scheduling so unsafe
 * content can't go live unreviewed. Strict for health/wellness niches
 * (women's health: hormones, menstruation, PCOS, etc.) where false medical
 * claims carry real-world and regulatory (e.g. BPOM) risk.
 *
 * Fails CLOSED: any parsing/LLM error returns block, so a broken critic never
 * silently lets content through.
 */
export async function critiqueDraft(text: string, accountLabel?: string): Promise<CritiqueResult> {
  const prompt = `Kamu adalah content safety reviewer untuk akun Threads${
    accountLabel ? ` "${accountLabel}"` : ""
  }. Niche utama: kesehatan kewanitaan (hormon, menstruasi, keputihan, PCOS, dll).

Tinjau KONTEN berikut sebelum dijadwalkan tayang otomatis. Cari masalah yang TIDAK bisa diperbaiki belakangan:

KRITERIA BLOCK (parah, jangan tayang):
- Klaim medis/khasiat yang salah atau tanpa dasar (mis. "pasti sembuh", "obat alami PCOS").
- Diagnosa atau resep pengobatan spesifik tanpa anjuran konsultasi tenaga medis.
- Saran kesehatan berbahaya / bisa bikin orang nunda ke dokter.
- Nyenggol isu sensitif: SARA, politik, tragedi/bencana terkini, body-shaming.
- Misinformasi.

KRITERIA WARN (boleh tayang tapi catat):
- Sedikit terlalu clickbait / overpromise ringan.
- Topik agak sensitif tapi disampaikan hati-hati.

OK (lolos):
- Edukasi/awareness yang akurat, framing "konsultasi ke dokter ya kalau X".
- Cerita relatable tanpa klaim medis berlebihan.

KONTEN:
"""
${text}
"""

Jawab HANYA dengan JSON valid, tanpa teks lain:
{"severity":"ok|warn|block","issues":["..."]}`;

  try {
    const llm = await chat({
      messages: [
        {
          role: "system",
          content:
            "Kamu reviewer keamanan konten yang teliti. Output JSON valid saja. Kalau ragu soal klaim medis, condong ke block.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      max_tokens: 400,
    });

    const parsed = extractJson(llm.text);
    const severity: CritiqueResult["severity"] =
      parsed.severity === "block" || parsed.severity === "warn" || parsed.severity === "ok"
        ? parsed.severity
        : "block";
    const issues = Array.isArray(parsed.issues) ? parsed.issues.map(String) : [];
    return { pass: severity !== "block", severity, issues };
  } catch (e) {
    return {
      pass: false,
      severity: "block",
      issues: [`Critic error (failing closed): ${e instanceof Error ? e.message : String(e)}`],
    };
  }
}

function extractJson(raw: string): { severity?: string; issues?: unknown } {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in critic output");
  return JSON.parse(match[0]);
}
