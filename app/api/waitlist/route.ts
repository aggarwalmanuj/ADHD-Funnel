import { NextResponse } from "next/server"
import { z } from "zod"
import { isCosmosConfigured, appendWaitlistEntry } from "@/lib/server/cosmos-db"
import { redactError } from "@/lib/security"

// Clarity Call waitlist submission from the landing page (components/WaitlistForm.tsx).
// Mirrors the validation/graceful-skip style of /api/sheets/append. Every string
// is trimmed and length-capped server-side (defence in depth) so a malicious
// client can't inflate documents past Cosmos's 2 MB item ceiling.
const str = (max: number) =>
  z.preprocess(
    (v) => (v == null ? "" : String(v).trim().slice(0, max)),
    z.string().max(max)
  )

const metadataSchema = z
  .object({
    utm_source: str(200).optional(),
    utm_medium: str(200).optional(),
    utm_campaign: str(200).optional(),
    utm_term: str(200).optional(),
    utm_content: str(200).optional(),
    referrer: str(500).optional(),
    landing_url: str(1000).optional(),
    landing_path: str(500).optional(),
    posthog_distinct_id: str(200).optional(),
    posthog_session_id: str(200).optional(),
  })
  .optional()

const bodySchema = z.object({
  firstName: str(200).pipe(z.string().min(1, "First name is required")),
  businessName: str(200).pipe(z.string().min(1, "Business name is required")),
  email: z.preprocess(
    (v) => (v == null ? "" : String(v).trim().slice(0, 320)),
    z.string().max(320).email("Invalid email format")
  ),
  phone: str(40).optional(),
  revenue: str(40).optional(),
  lastWeek: str(5000).optional(),
  diagnosis: str(80).optional(),
  clarity: str(80).optional(),
  clarityOther: str(500).optional(),
  metadata: metadataSchema,
})

export async function POST(request: Request) {
  // No Cosmos configured (e.g. local dev without secrets): accept the
  // submission so the UI can still show its success state, but don't pretend
  // to have stored it.
  if (!isCosmosConfigured()) {
    console.warn("[waitlist] Skipped: Cosmos DB not configured.")
    return NextResponse.json({ ok: true, skipped: true, reason: "not_configured" })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const { metadata, ...entry } = parsed.data
    const id = await appendWaitlistEntry({
      ...entry,
      source: "adhd-landing",
      metadata,
    })
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    console.error("[waitlist]", redactError(e))
    return NextResponse.json(
      { ok: false, error: "Failed to save submission" },
      { status: 502 }
    )
  }
}
