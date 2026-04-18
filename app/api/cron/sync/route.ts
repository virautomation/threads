import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user";
import { syncUser } from "@/lib/sync";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorized(req: NextRequest): boolean {
  const expected = env.cronSecret();
  const header = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = new URL(req.url).searchParams.get("secret");
  return header === expected || query === expected;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ skipped: "no_user" });
  const result = await syncUser(user);
  return NextResponse.json(result);
}
