/**
 * Snapshot the attribution metadata we want stored alongside every
 * funnel submission: UTM params, the original referrer, the landing URL,
 * and the current PostHog distinct + session ids. Stored in
 * sessionStorage so it survives client-side route changes within the
 * funnel but resets between true visits.
 *
 * The PostHog ids let the admin panel jump straight from a row to the
 * matching session replay. The UTM/referrer pair makes the funnel
 * attributable per response without standing up a separate analytics
 * join.
 */
import posthog from "posthog-js"

export type FunnelMetadata = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  referrer?: string
  landing_url?: string
  landing_path?: string
  posthog_distinct_id?: string
  posthog_session_id?: string
}

const STORAGE_KEY = "aimerge:funnel-metadata"
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

function readStored(): FunnelMetadata | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as FunnelMetadata) : null
  } catch {
    return null
  }
}

function writeStored(meta: FunnelMetadata) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(meta))
  } catch {
    /* private mode / quota — accept loss */
  }
}

/**
 * Called once on first paint of the landing experience. Captures UTM
 * params + referrer + landing URL into sessionStorage so later funnel
 * steps can attach them to their submissions. Skips overwriting an
 * existing snapshot — the FIRST landing within a session wins.
 */
export function captureLandingMetadata() {
  if (typeof window === "undefined") return
  if (readStored()) return

  const url = new URL(window.location.href)
  const meta: FunnelMetadata = {}
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)
    if (value) meta[key] = value.slice(0, 200)
  }
  const ref = document.referrer
  if (ref) meta.referrer = ref.slice(0, 500)
  meta.landing_url = window.location.href.slice(0, 1000)
  meta.landing_path = url.pathname.slice(0, 500)
  writeStored(meta)
}

/**
 * Return the full attribution snapshot for the current session, merging
 * the stored UTM/referrer data with the LIVE PostHog distinct + session
 * ids. PostHog ids are read fresh each call because the session id
 * rotates over time; the stored copy would go stale.
 */
export function getFunnelMetadata(): FunnelMetadata {
  const base = readStored() ?? {}
  try {
    const distinctId = posthog?.get_distinct_id?.()
    const sessionId = posthog?.get_session_id?.()
    if (distinctId) base.posthog_distinct_id = String(distinctId)
    if (sessionId) base.posthog_session_id = String(sessionId)
  } catch {
    /* posthog not loaded — leave ids unset */
  }
  return base
}
