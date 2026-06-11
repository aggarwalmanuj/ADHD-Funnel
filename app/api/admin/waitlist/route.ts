import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/server/admin-auth"
import { isCosmosConfigured, fetchWaitlist } from "@/lib/server/cosmos-db"
import { redactError } from "@/lib/security"

// GET /api/admin/waitlist — all waitlist submissions, newest first (auth required).
export async function GET(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  if (!isCosmosConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Cosmos DB not configured" },
      { status: 503 }
    )
  }

  try {
    const entries = await fetchWaitlist()
    return NextResponse.json({ ok: true, entries })
  } catch (e) {
    console.error("[admin/waitlist]", redactError(e))
    return NextResponse.json(
      { ok: false, error: "Failed to read waitlist" },
      { status: 502 }
    )
  }
}
