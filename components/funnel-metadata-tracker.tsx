"use client"

import { useEffect } from "react"
import { captureLandingMetadata } from "@/lib/client/funnel-metadata"

/**
 * Captures UTM params, referrer, and the landing URL on the first paint
 * of every fresh session. Mounted once from the root layout; uses
 * sessionStorage so the snapshot survives client-side route changes but
 * resets between true visits.
 */
export default function FunnelMetadataTracker() {
  useEffect(() => {
    captureLandingMetadata()
  }, [])
  return null
}
