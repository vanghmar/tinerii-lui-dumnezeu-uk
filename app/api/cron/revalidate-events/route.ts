import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Triggered daily by Vercel Cron (see vercel.json) right after UTC midnight,
// so the "days to go" countdowns tick over exactly once a day instead of
// drifting on a rolling revalidate window. Vercel signs cron requests with
// CRON_SECRET as a Bearer token — verify it so this endpoint can't be hit
// by anyone else to force-refresh the cache on demand.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/en", "layout");

  return NextResponse.json({ success: true, revalidatedAt: new Date().toISOString() });
}
