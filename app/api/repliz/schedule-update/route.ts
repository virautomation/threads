import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateSchedule } from "@/lib/repliz/client";
import { THREADS_TEXT_LIMIT } from "@/lib/threads/api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Update a scheduled post (text/time) from the Autopilot UI. Admin-session guarded. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const scheduleId = String(body?.scheduleId ?? "");
  const scheduleAt = String(body?.scheduleAt ?? "");
  const topic = body?.topic != null ? String(body.topic) : undefined;
  const rawSegments: unknown = body?.segments;

  if (!scheduleId) return NextResponse.json({ error: "scheduleId required" }, { status: 400 });

  const segments = Array.isArray(rawSegments)
    ? rawSegments.map((s) => String(s ?? "").trim()).filter(Boolean)
    : [];
  if (segments.length === 0) return NextResponse.json({ error: "segments required" }, { status: 400 });

  const tooLong = segments.find((s) => s.length > THREADS_TEXT_LIMIT);
  if (tooLong) {
    return NextResponse.json(
      { error: `Segment melebihi ${THREADS_TEXT_LIMIT} karakter (${tooLong.length}).` },
      { status: 400 },
    );
  }

  const when = Date.parse(scheduleAt);
  if (Number.isNaN(when)) return NextResponse.json({ error: "scheduleAt tidak valid" }, { status: 400 });

  try {
    await updateSchedule(scheduleId, {
      description: segments[0],
      replies: segments.slice(1),
      topic,
      scheduleAt: new Date(when).toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "update_failed" },
      { status: 502 },
    );
  }
}
