export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

type PixelData = Record<string, unknown>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function pageview() {
  if (typeof window === "undefined" || !window.fbq) return
  window.fbq("track", "PageView")
}

export function track(name: string, data: PixelData = {}) {
  if (typeof window === "undefined" || !window.fbq) return
  window.fbq("track", name, data)
}

export function trackCustom(name: string, data: PixelData = {}) {
  if (typeof window === "undefined" || !window.fbq) return
  window.fbq("trackCustom", name, data)
}

/**
 * Track a standard Meta event, polling for `window.fbq` to exist first.
 *
 * Use this on any page reached via a full-page redirect (e.g. Stripe's
 * success URL) — fbevents.js loads async, so on slow connections `fbq`
 * may not be on `window` yet when the conversion code runs, and a
 * straight `track()` would silently drop the event.
 *
 * When `eventID` is supplied it is passed as the 4th fbq argument so
 * Meta can deduplicate this browser-side event against a matching
 * Conversions API call from the server.
 */
export function trackWhenReady(
  name: string,
  data: PixelData = {},
  eventID?: string,
  attempts = 30,
) {
  if (typeof window === "undefined") return
  const fire = () => {
    if (eventID) window.fbq?.("track", name, data, { eventID })
    else window.fbq?.("track", name, data)
  }
  if (window.fbq) {
    fire()
    return
  }
  if (attempts <= 0) return
  setTimeout(() => trackWhenReady(name, data, eventID, attempts - 1), 150)
}

export const ROUTE_EVENT_MAP: Record<string, string> = {
  "/": "Landing",
  "/admin": "Admin",
  "/challenge/audience": "Audience Select",
  "/challenge/question-1": "Question 1",
  "/challenge/question-2": "Question 2",
  "/challenge/question-3": "Question 3",
  "/challenge/question-4": "Question 4",
  "/challenge/question-5": "Question 5",
  "/challenge/beat-1": "Beat 1",
  "/challenge/beat-2": "Beat 2",
  "/challenge/beat-3": "Beat 3",
  "/challenge/beat-4": "Beat 4",
  "/challenge/beat-5": "Beat 5",
  "/challenge/processing": "Processing",
  "/challenge/summary": "Summary",
  "/challenge/offer": "Offer",
  "/challenge/report": "Report",
  "/challenge/thank-you": "Thank You",
  "/privacy": "Privacy",
  "/terms": "Terms",
}

/**
 * Look up the funnel event for a pathname after normalizing dynamic
 * segments. The challenge funnel mounts under `/challenge/[audience]/...`
 * but ROUTE_EVENT_MAP is keyed by the flat `/challenge/question-1` form;
 * without this normalization every real visit would miss the map and
 * silently fail to track. Add new dynamic-segment rules here, not at
 * callsites.
 */
export function routeEventName(pathname: string | null | undefined): string | undefined {
  if (!pathname) return undefined
  let normalized = pathname.replace(/\/+$/, "") || "/"
  // /challenge/<audience>/<step> -> /challenge/<step>
  normalized = normalized.replace(
    /^\/challenge\/(individual|team)(\/|$)/,
    "/challenge$2",
  )
  return ROUTE_EVENT_MAP[normalized]
}
