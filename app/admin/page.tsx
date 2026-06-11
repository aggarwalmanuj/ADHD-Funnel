"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type WaitlistEntry = {
  id: string;
  firstName: string;
  businessName: string;
  email: string;
  phone?: string;
  revenue?: string;
  lastWeek?: string;
  diagnosis?: string;
  clarity?: string;
  clarityOther?: string;
  source?: string;
  status?: string;
  createdAt: string;
};

type Badge = { label: string; bg: string; fg: string } | null;

// Derived badge for a submission. "Paid call" once the lead books a paid call;
// "Incomplete" when the core funnel answers are missing; otherwise no badge.
function badgeFor(e: WaitlistEntry): Badge {
  if (e.status === "paid-call") return { label: "Paid call", bg: "#dcfce7", fg: "#166534" };
  const incomplete = !e.revenue || !e.diagnosis || !e.clarity || !e.businessName;
  if (incomplete) return { label: "Incomplete", bg: "#fef3c7", fg: "#92400e" };
  return null;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

const C = {
  bg: "#f7f7f8",
  card: "#ffffff",
  border: "#e5e7eb",
  text: "#111827",
  dim: "#6b7280",
  link: "#2563eb",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [merging, setMerging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/waitlist", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        setEntries(data.entries ?? []);
        setAuthed(true);
      } else {
        setAuthed(true);
        setNotice(data.error ?? "Failed to load submissions.");
      }
    } catch {
      setNotice("Network error loading submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (signingIn) return;
    setSigningIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setPassword("");
        await load();
      } else {
        setLoginError(data.error ?? "Incorrect password.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setSigningIn(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setEntries([]);
  }

  async function mergeDuplicates() {
    if (merging) return;
    setMerging(true);
    setNotice(null);
    try {
      const res = await fetch("/api/admin/merge-duplicates", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setNotice(`Merged ${data.merged} group(s), removed ${data.removed} duplicate(s).`);
        await load();
      } else {
        setNotice(data.error ?? "Failed to merge duplicates.");
      }
    } catch {
      setNotice("Network error merging duplicates.");
    } finally {
      setMerging(false);
    }
  }

  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return entries.filter((e) => new Date(e.createdAt).getTime() >= cutoff).length;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((e) => {
      if (q) {
        const hay = `${e.firstName} ${e.businessName} ${e.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (from || to) {
        const day = (e.createdAt ?? "").slice(0, 10); // YYYY-MM-DD
        if (from && day < from) return false;
        if (to && day > to) return false;
      }
      return true;
    });
  }, [entries, search, from, to]);

  function exportCsv() {
    const cols: (keyof WaitlistEntry)[] = [
      "firstName", "businessName", "email", "phone", "revenue",
      "diagnosis", "clarity", "clarityOther", "lastWeek", "status", "source", "createdAt",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const head = cols.join(",");
    const rows = filtered.map((e) => cols.map((c) => esc(e[c])).join(","));
    const csv = [head, ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ── Login screen ── */
  if (authed === false) {
    return (
      <main style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", color: C.text }}>
        <form onSubmit={signIn} style={{ width: "100%", maxWidth: 360, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>Waitlist admin</h1>
          <p style={{ fontSize: 13, color: C.dim, margin: "0 0 20px" }}>Enter the admin password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 14, borderRadius: 8, border: `1px solid ${C.border}`, outline: "none", marginBottom: 12 }}
          />
          {loginError && <p style={{ fontSize: 13, color: "#b91c1c", margin: "0 0 12px" }}>{loginError}</p>}
          <button type="submit" disabled={signingIn} style={{ width: "100%", padding: "10px 12px", fontSize: 14, fontWeight: 600, borderRadius: 8, border: "none", background: "#111827", color: "#fff", cursor: signingIn ? "wait" : "pointer" }}>
            {signingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  const btn: React.CSSProperties = { padding: "9px 16px", fontSize: 14, fontWeight: 500, borderRadius: 9999, border: `1px solid ${C.border}`, background: C.card, color: C.text, cursor: "pointer" };
  const th: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dim, textAlign: "left", padding: "12px 16px", borderBottom: `1px solid ${C.border}` };
  const td: React.CSSProperties = { padding: "16px", borderBottom: `1px solid ${C.border}`, fontSize: 14, verticalAlign: "top" };

  return (
    <main style={{ minHeight: "100vh", background: C.bg, padding: "32px 20px", fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Waitlist</h1>
            <p style={{ fontSize: 14, color: C.dim, margin: "4px 0 0" }}>Submissions, newest first.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={btn} onClick={mergeDuplicates} disabled={merging}>{merging ? "Merging…" : "Merge duplicates"}</button>
            <button style={btn} onClick={exportCsv} disabled={!filtered.length}>Export CSV</button>
            <button style={btn} onClick={signOut}>Sign out</button>
          </div>
        </div>

        {notice && (
          <div style={{ marginBottom: 20, padding: "10px 14px", borderRadius: 8, background: "#eef2ff", border: "1px solid #c7d2fe", fontSize: 13, color: "#3730a3" }}>{notice}</div>
        )}

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
          <div style={{ flex: "1 1 200px", maxWidth: 260, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1 }}>{entries.length}</div>
            <div style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>Total signups</div>
          </div>
          <div style={{ flex: "1 1 200px", maxWidth: 260, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1 }}>{last7}</div>
            <div style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>Last 7 days</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ flex: "1 1 320px" }}>
            <label style={{ display: "block", fontSize: 13, color: C.dim, marginBottom: 6 }}>Search name, email or company</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", fontSize: 14, borderRadius: 9999, border: `1px solid ${C.border}`, background: "#f3f4f6", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: C.dim, marginBottom: 6 }}>From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: "10px 14px", fontSize: 14, borderRadius: 9999, border: `1px solid ${C.border}`, background: "#f3f4f6", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: C.dim, marginBottom: 6 }}>To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: "10px 14px", fontSize: 14, borderRadius: 9999, border: `1px solid ${C.border}`, background: "#f3f4f6", outline: "none" }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Company</th>
                <th style={{ ...th, textAlign: "right" }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td style={{ ...td, color: C.dim }} colSpan={4}>Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td style={{ ...td, color: C.dim }} colSpan={4}>No submissions match.</td></tr>
              ) : (
                filtered.map((e) => {
                  const badge = badgeFor(e);
                  const isOpen = expanded === e.id;
                  return (
                    <tr key={e.id}>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700 }}>{e.firstName || "—"}</span>
                          {badge && (
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, background: badge.bg, color: badge.fg }}>{badge.label}</span>
                          )}
                        </div>
                        <button onClick={() => setExpanded(isOpen ? null : e.id)} style={{ marginTop: 6, padding: 0, background: "none", border: "none", color: C.link, fontSize: 13, cursor: "pointer" }}>
                          {isOpen ? "Hide details" : "View details"}
                        </button>
                        {isOpen && (
                          <dl style={{ margin: "10px 0 0", display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 16px", fontSize: 13 }}>
                            <Detail label="Phone" value={e.phone} />
                            <Detail label="Revenue" value={e.revenue} />
                            <Detail label="Diagnosis" value={e.diagnosis} />
                            <Detail label="Clarity" value={e.clarity === "other" ? e.clarityOther : e.clarity} />
                            <Detail label="Last week" value={e.lastWeek} />
                            <Detail label="Source" value={e.source} />
                          </dl>
                        )}
                      </td>
                      <td style={td}>
                        <a href={`mailto:${e.email}`} style={{ color: C.link, textDecoration: "none" }}>{e.email}</a>
                      </td>
                      <td style={td}>{e.businessName || "—"}</td>
                      <td style={{ ...td, textAlign: "right", color: C.dim, whiteSpace: "nowrap" }}>{fmtDate(e.createdAt)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <>
      <dt style={{ color: "#6b7280", fontWeight: 600 }}>{label}</dt>
      <dd style={{ margin: 0, color: "#111827", whiteSpace: "pre-wrap" }}>{value}</dd>
    </>
  );
}
