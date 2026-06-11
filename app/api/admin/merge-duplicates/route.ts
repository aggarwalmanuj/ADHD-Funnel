import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/server/admin-auth"
import { isCosmosConfigured, mergeDuplicateWaitlistEntries } from "@/lib/server/cosmos-db"
import { redactError } from "@/lib/security"

// POST /api/admin/merge-duplicates — collapse same-email submissions (auth required).
export async function POST(request: Request) {
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
    const result = await mergeDuplicateWaitlistEntries()
    return NextResponse.json({ ok: true, ...result })
  } catch (e) {
    console.error("[admin/merge-duplicates]", redactError(e))
    return NextResponse.json(
      { ok: false, error: "Failed to merge duplicates" },
      { status: 502 }
    )
  }
}
