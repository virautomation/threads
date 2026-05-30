import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { setAccountActive } from "@/lib/repliz/settings";

export const dynamic = "force-dynamic";

/** Toggle a Repliz account active/inactive from the Autopilot UI. Admin-session guarded. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const accountId = String(body?.accountId ?? "");
  const username = body?.username != null ? String(body.username) : null;
  const active = Boolean(body?.active);
  if (!accountId) return NextResponse.json({ error: "accountId required" }, { status: 400 });

  try {
    await setAccountActive(accountId, username, active);
    return NextResponse.json({ ok: true, accountId, active });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "update_failed" },
      { status: 500 },
    );
  }
}
