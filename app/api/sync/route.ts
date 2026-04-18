import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user";
import { syncUser } from "@/lib/sync";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "not_connected" }, { status: 400 });
  const url = new URL(req.url);
  const full = url.searchParams.get("full") === "1";
  const result = await syncUser(user, { full });
  return NextResponse.json(result);
}
