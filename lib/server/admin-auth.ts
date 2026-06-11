import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Cookie-based auth for the /admin waitlist panel.
 *
 * The raw password never goes in the cookie — on login we store an HMAC of a
 * fixed string keyed by ADMIN_PASSWORD. That token is verifiable statelessly
 * (no session store) and rotates automatically if the password changes.
 */

export const ADMIN_COOKIE = "wl_admin"
const SESSION_PAYLOAD = "waitlist-admin-v1"

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? ""
}

export function isAdminConfigured(): boolean {
  return adminPassword().length > 0
}

export function sessionToken(): string {
  return createHmac("sha256", adminPassword()).update(SESSION_PAYLOAD).digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8")
  const bb = Buffer.from(b, "utf8")
  if (ab.length !== bb.length) return false
  try {
    return timingSafeEqual(ab, bb)
  } catch {
    return false
  }
}

export function verifyPassword(provided: string): boolean {
  const expected = adminPassword()
  if (!expected) return false
  return safeEqual(provided ?? "", expected)
}

/** True when the request carries a valid admin session cookie. */
export function isAuthed(request: Request): boolean {
  if (!isAdminConfigured()) return false
  const cookieHeader = request.headers.get("cookie") ?? ""
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
  if (!match) return false
  const value = decodeURIComponent(match.slice(ADMIN_COOKIE.length + 1))
  return safeEqual(value, sessionToken())
}
