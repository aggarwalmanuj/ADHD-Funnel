"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const STORAGE_KEY = "aimerge:cookie-consent"
const EVENT_NAME = "aimerge:cookie-consent"

type Choice = "accepted" | "rejected"

/**
 * GDPR cookie consent banner. Shown on first visit, dismissed once the
 * visitor has chosen Accept or Reject. The choice is persisted in
 * localStorage so it survives reloads and route changes.
 *
 * On dismissal we fire a `aimerge:cookie-consent` CustomEvent (detail:
 * "accepted" | "rejected"). Other client-side trackers (FB Pixel,
 * PostHog) can listen for it and gate their loading on consent. The
 * server-side script tags currently render unconditionally; gating
 * those is a separate refactor that the event hook makes possible.
 *
 * The banner is wrapped in a data-palette="marine" subtree so the
 * editorial tokens (--ink, --background, s-btn, etc.) resolve even
 * when mounted outside a palette wrapper (e.g. on /privacy, /terms).
 */
export function CookieConsent() {
  const [shown, setShown] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      // Privacy mode or storage disabled - we still surface the banner.
    }
    if (stored === "accepted" || stored === "rejected") return
    // Stagger the appearance behind hero animations so it never competes
    // for first-paint attention. 900ms lets the headline settle.
    const t = window.setTimeout(() => setShown(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  const dismiss = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // No persistence available; the choice still applies for this session.
    }
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: choice }),
    )
    setExiting(true)
    window.setTimeout(() => setShown(false), 380)
  }

  if (!shown) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      aria-live="polite"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        padding: "0 16px 16px",
        fontFamily: "var(--font-body)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 20,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          boxShadow: "0 30px 80px -30px rgba(0,0,0,0.65)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 8,
            }}
          >
            A quiet note
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
              margin: 0,
            }}
          >
            We use a small set of cookies to keep the site running and to
            understand which parts of the reading land. Your responses are
            confidential and will never be shared with third parties. They may
            be reviewed by the AI Merge team to personalize your experience and
            ensure the right support reaches you.{" "}
            <Link
              href="/privacy"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Read the privacy notes
            </Link>
            .
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={() => dismiss("rejected")}
            style={{
              padding: "10px 18px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "var(--text-muted)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            style={{
              padding: "10px 18px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              border: "1px solid var(--accent)",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-dark)";
              e.currentTarget.style.borderColor = "var(--accent-dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
