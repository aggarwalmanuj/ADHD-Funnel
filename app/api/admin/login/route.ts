import { NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  isAdminConfigured,
  sessionToken,
  verifyPassword,
} from "@/lib/server/admin-auth"

// POST /api/admin/login — exchange the admin password for a session cookie.
export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin password is not configured" },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const password = String((body as { password?: unknown })?.password ?? "")
  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  })
  return res
}
