import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { deleteSchedule } from "@/lib/repliz/client";

export const dynamic = "force-dynamic";

/** Delete a Repliz scheduled post from the Autopilot UI. Admin-session guarded. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { scheduleId } = await req.json().catch(() => ({}));
  if (typeof scheduleId !== "string" || !scheduleId) {
    return NextResponse.json({ error: "scheduleId required" }, { status: 400 });
  }

  try {
    await deleteSchedule(scheduleId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "delete_failed" },
      { status: 502 },
    );
  }
}
