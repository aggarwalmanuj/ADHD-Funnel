"use client";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { getFunnelMetadata } from "../lib/client/funnel-metadata";

type Page = 1 | 2 | 3 | 4;

// The multi-step Clarity Call waitlist form card. Self-contained state, so each
// instance (the inline landing section and the modal) is independent. Pass
// `onClose` to render a close affordance - used by the modal.
export default function WaitlistFormCard({ onClose }: { onClose?: () => void }) {
  const isMobile = useIsMobile();
  const [page, setPage] = useState<Page>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    revenue: "",
    lastWeek: "",
    diagnosis: "",
    clarity: "",
    clarityOther: "",
    firstName: "",
    businessName: "",
    email: "",
    phone: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const clearErr = (k: string) => setErrors(e => { const n = { ...e }; delete n[k]; return n; });

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (page === 1 && !form.revenue) newErrors.revenue = "Please select your revenue range";
    if (page === 3) {
      if (!form.diagnosis) newErrors.diagnosis = "Please select an option";
      if (!form.clarity) newErrors.clarity = "Please select an option";
    }
    if (page === 4) {
      if (!form.firstName.trim()) newErrors.firstName = "Please enter your first name";
      if (!form.businessName.trim()) newErrors.businessName = "Please enter your business name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function next() { if (validate()) setPage(p => Math.min(p + 1, 4) as Page); }
  function back() { setPage(p => Math.max(p - 1, 1) as Page); }

  async function submit() {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          firstName: form.firstName,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          revenue: form.revenue,
          lastWeek: form.lastWeek,
          diagnosis: form.diagnosis,
          clarity: form.clarity,
          clarityOther: form.clarityOther,
          metadata: getFunnelMetadata(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong submitting your form. Please try again.");
      setSubmitting(false);
    }
  }

  const tabs = ["Revenue", "Your Week", "Your Brain", "Contact"];
  const progress = (page / 4) * 100;
  const inputStyle: React.CSSProperties = { width: "100%", borderRadius: 6, padding: "10px 14px", fontSize: 14, color: "#fff", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", outline: "none", fontFamily: "var(--font-body)", boxSizing: "border-box" };

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--border)" }}>

      {/* Close button - modal only */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      )}

      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", transition: "width 0.5s ease", width: `${progress}%`, background: "var(--accent)" }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <div key={i} style={{ flex: "1 0 auto", padding: "12px 8px", textAlign: "center", fontSize: isMobile ? 11 : 12, fontWeight: 500, fontFamily: "var(--font-body)", borderBottom: `2px solid ${page === i + 1 ? "var(--accent)" : "transparent"}`, color: page === i + 1 ? "var(--accent)" : page > i + 1 ? "rgba(232,150,42,0.45)" : "var(--text-dim)", transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {t}
          </div>
        ))}
      </div>

      {submitted ? (
        <div style={{ padding: isMobile ? "40px 24px" : "48px 40px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "rgba(232,150,42,0.1)", border: "1px solid rgba(232,150,42,0.28)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5 11-11" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 400, marginBottom: 10 }}>You&apos;re on the waitlist.</h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: 360, margin: "0 auto 28px", fontFamily: "var(--font-body)" }}>
            We&apos;ll review your submission and reach out when a spot opens. You&apos;ll hear from us either way.
          </p>
          <div style={{ borderRadius: 10, padding: "20px 24px", background: "rgba(232,150,42,0.06)", border: "1px solid rgba(232,150,42,0.2)", textAlign: "left" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8, fontFamily: "var(--font-body)" }}>Can&apos;t wait?</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 14, fontFamily: "var(--font-body)" }}>Book a paid Clarity Call directly and skip the queue. Same 30-minute session - available now.</p>
            <a href="https://calendly.com/manuj/skip-the-waitlist-priority-call-adhd" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 600, background: "var(--accent)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Book a Call Now - Skip the Line
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      ) : (
        <div style={{ padding: isMobile ? "28px 20px" : "36px" }}>

          {/* Page 1 - Revenue */}
          {page === 1 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>What&apos;s your business revenue range?</h3>
              <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Context for the call - not a filter.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { value: "under-1m", label: "Under $1M" },
                  { value: "1m-5m", label: "$1M – $5M" },
                  { value: "5m-20m", label: "$5M – $20M" },
                  { value: "20m-50m", label: "$20M – $50M" },
                  { value: "over-50m", label: "Over $50M" },
                ].map(opt => (
                  <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 6, cursor: "pointer", background: form.revenue === opt.value ? "rgba(232,150,42,0.07)" : "rgba(255,255,255,0.025)", border: `1px solid ${form.revenue === opt.value ? "rgba(232,150,42,0.38)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.15s" }}>
                    <input type="radio" name="revenue" value={opt.value} checked={form.revenue === opt.value} onChange={e => { set("revenue", e.target.value); clearErr("revenue"); }} style={{ accentColor: "var(--accent)", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: form.revenue === opt.value ? "#fff" : "rgba(255,255,255,0.62)", fontFamily: "var(--font-body)" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.revenue && <span style={{ fontSize: 12, color: "#d47070", display: "block", marginTop: 8, fontFamily: "var(--font-body)" }}>{errors.revenue}</span>}
            </div>
          )}

          {/* Page 2 - Last week */}
          {page === 2 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>What did your last week actually look like?</h3>
              <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Be specific. &ldquo;I spent 12 hours on a project nobody asked for&rdquo; is more useful than &ldquo;I&apos;m overwhelmed.&rdquo;</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Describe your last week <span style={{ color: "var(--accent)" }}>*</span></label>
                <textarea value={form.lastWeek} onChange={e => set("lastWeek", e.target.value)} placeholder="Tell us what consumed your attention, what got shipped, what stayed on the list..." rows={6} style={{ ...inputStyle, resize: "vertical", minHeight: 120, lineHeight: 1.6 }} />
              </div>
            </div>
          )}

          {/* Page 3 - Brain */}
          {page === 3 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>Two questions about how your brain works.</h3>
              <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Not filters - context for Manuj before the call.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", display: "block", marginBottom: 8, fontFamily: "var(--font-body)" }}>Have you been formally diagnosed with ADHD, or do you suspect it? <span style={{ color: "var(--accent)" }}>*</span></label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { value: "formally-diagnosed", label: "Formally diagnosed with ADHD" },
                      { value: "strongly-suspect", label: "Strongly suspect I have ADHD" },
                      { value: "regardless-of-label", label: "My brain works this way regardless of label" },
                      { value: "prefer-not-to-say", label: "Prefer not to say" },
                    ].map(opt => (
                      <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderRadius: 6, cursor: "pointer", background: form.diagnosis === opt.value ? "rgba(232,150,42,0.07)" : "rgba(255,255,255,0.025)", border: `1px solid ${form.diagnosis === opt.value ? "rgba(232,150,42,0.38)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.15s" }}>
                        <input type="radio" name="diagnosis" value={opt.value} checked={form.diagnosis === opt.value} onChange={e => { set("diagnosis", e.target.value); clearErr("diagnosis"); }} style={{ accentColor: "var(--accent)", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: form.diagnosis === opt.value ? "#fff" : "rgba(255,255,255,0.62)", fontFamily: "var(--font-body)" }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.diagnosis && <span style={{ fontSize: 12, color: "#d47070", display: "block", marginTop: 6, fontFamily: "var(--font-body)" }}>{errors.diagnosis}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", display: "block", marginBottom: 8, fontFamily: "var(--font-body)" }}>What would &ldquo;clarity&rdquo; actually mean for you right now? <span style={{ color: "var(--accent)" }}>*</span></label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { value: "finishing-what-i-start", label: "Finishing what I start" },
                      { value: "understanding-my-brain", label: "Understanding why my brain works this way" },
                      { value: "systems-that-dont-fight-me", label: "Building systems that don't fight me" },
                      { value: "survive-next-quarter", label: "Getting through the next quarter without burning out" },
                      { value: "other", label: "Something else" },
                    ].map(opt => (
                      <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderRadius: 6, cursor: "pointer", background: form.clarity === opt.value ? "rgba(232,150,42,0.07)" : "rgba(255,255,255,0.025)", border: `1px solid ${form.clarity === opt.value ? "rgba(232,150,42,0.38)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.15s" }}>
                        <input type="radio" name="clarity" value={opt.value} checked={form.clarity === opt.value} onChange={e => { set("clarity", e.target.value); clearErr("clarity"); }} style={{ accentColor: "var(--accent)", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: form.clarity === opt.value ? "#fff" : "rgba(255,255,255,0.62)", fontFamily: "var(--font-body)" }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {form.clarity === "other" && (
                    <input type="text" value={form.clarityOther} onChange={e => set("clarityOther", e.target.value)} placeholder="Tell us what clarity means for you..." style={{ ...inputStyle, marginTop: 8 }} />
                  )}
                  {errors.clarity && <span style={{ fontSize: 12, color: "#d47070", display: "block", marginTop: 6, fontFamily: "var(--font-body)" }}>{errors.clarity}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Page 4 - Contact */}
          {page === 4 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>Last bit - how do we reach you?</h3>
              <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>You&apos;ll hear back within 48 hours either way.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>First Name <span style={{ color: "var(--accent)" }}>*</span></label>
                    <input type="text" value={form.firstName} onChange={e => { set("firstName", e.target.value); clearErr("firstName"); }} placeholder="Your first name" style={inputStyle} />
                    {errors.firstName && <span style={{ fontSize: 12, color: "#d47070", fontFamily: "var(--font-body)" }}>{errors.firstName}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Business Name <span style={{ color: "var(--accent)" }}>*</span></label>
                    <input type="text" value={form.businessName} onChange={e => { set("businessName", e.target.value); clearErr("businessName"); }} placeholder="Your company" style={inputStyle} />
                    {errors.businessName && <span style={{ fontSize: 12, color: "#d47070", fontFamily: "var(--font-body)" }}>{errors.businessName}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Email Address <span style={{ color: "var(--accent)" }}>*</span></label>
                  <input type="email" value={form.email} onChange={e => { set("email", e.target.value); clearErr("email"); }} placeholder="you@company.com" style={inputStyle} />
                  {errors.email && <span style={{ fontSize: 12, color: "#d47070", fontFamily: "var(--font-body)" }}>{errors.email}</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Phone <span style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 400 }}>(optional - higher priority)</span></label>
                  <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            {page > 1 ? (
              <button suppressHydrationWarning onClick={back} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)", padding: "10px 20px", borderRadius: 9999, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                Back
              </button>
            ) : <span />}
            {page < 4 ? (
              <button suppressHydrationWarning onClick={next} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)", color: "var(--bg)", border: "none", padding: "12px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                Continue
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ) : (
              <button suppressHydrationWarning onClick={submit} disabled={submitting} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)", color: "var(--bg)", border: "none", padding: "12px 20px", borderRadius: 9999, fontSize: isMobile ? 13 : 14, fontWeight: 600, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.7 : 1, fontFamily: "var(--font-body)" }}>
                {submitting ? "Joining…" : "Join the Clarity Call Waitlist"}
                {!submitting && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
            )}
          </div>

          {submitError && (
            <p style={{ marginTop: 14, fontSize: 13, color: "#d47070", textAlign: "right", fontFamily: "var(--font-body)" }}>
              {submitError}
            </p>
          )}

        </div>
      )}
    </div>
  );
}
