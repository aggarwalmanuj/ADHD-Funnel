"use client";
import { useState } from "react";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

type Page = 1 | 2 | 3 | 4;

export default function WaitlistForm() {
  const isMobile = useIsMobile();
  const [page, setPage] = useState<Page>(1);
  const [submitted, setSubmitted] = useState(false);
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
    if (page === 2 && form.lastWeek.trim().length < 10) newErrors.lastWeek = "Please describe your last week";
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
  function submit() { if (!validate()) return; console.log("Form submitted:", { ...form, source: "adhd" }); setTimeout(() => setSubmitted(true), 600); }

  const tabs = ["Revenue", "Your Week", "Your Brain", "Contact"];
  const progress = (page / 4) * 100;
  const inputStyle: React.CSSProperties = { width: "100%", borderRadius: 6, padding: "10px 14px", fontSize: 14, color: "#fff", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", outline: "none", fontFamily: "var(--font-body)", boxSizing: "border-box" };

  const sidePoints = [
    { label: "Personal review", body: "We read every submission ourselves — not a CRM." },
    { label: "48-hour response", body: "A booking or an honest no. Either way, you hear back." },
    { label: "First call is free", body: "Thirty minutes with Manuj. No commitment to anything." },
    { label: "Built for your brain", body: "Not a course. Not therapy. A system for how you actually operate." },
  ];

  return (
    <section id="waitlist" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>

        {/* Section header */}
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>VIII</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>Clarity Call Waitlist</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08 }}>
              Join the <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Clarity Call</em> Waitlist
            </h2>
          </div>
        </FadeIn>

        {/* Two-column split — stacks on mobile */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 64, alignItems: "start" }}>

          {/* LEFT — context */}
          <FadeIn direction="left" delay={0.1}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 36, fontFamily: "var(--font-body)" }}>
              We read every submission personally and reach out when a spot opens for your profile. You&apos;ll hear from us either way.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {sidePoints.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(232,150,42,0.1)", border: "1px solid rgba(232,150,42,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-body)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4, fontFamily: "var(--font-body)" }}>{p.label}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{p.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat callout */}
            <div style={{ marginTop: 36, padding: "20px 24px", borderRadius: 10, background: "rgba(232,150,42,0.05)", border: "1px solid rgba(232,150,42,0.15)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 40, fontWeight: 400, color: "var(--accent)", lineHeight: 1, marginBottom: 8 }}>29%</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                of entrepreneurs self-report ADHD — six times the general adult population. <span style={{ color: "rgba(255,255,255,0.45)" }}>— Freeman MD, UCSF</span>
              </p>
            </div>
          </FadeIn>

          {/* RIGHT — form */}
          <FadeIn direction={isMobile ? "up" : "right"} delay={0.15}>
            <div style={{ borderRadius: 12, overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--border)" }}>

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
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 14, fontFamily: "var(--font-body)" }}>Book a paid Clarity Call directly and skip the queue. Same 30-minute session — available now.</p>
                    {/* TODO: Replace # with paid booking URL when ready */}
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 600, background: "var(--accent)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--font-body)" }}>
                      Book a Call Now — Skip the Line
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ padding: isMobile ? "28px 20px" : "36px" }}>

                  {/* Page 1 — Revenue */}
                  {page === 1 && (
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>What&apos;s your business revenue range?</h3>
                      <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Context for the call — not a filter.</p>
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

                  {/* Page 2 — Last week */}
                  {page === 2 && (
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>What did your last week actually look like?</h3>
                      <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Be specific. &ldquo;I spent 12 hours on a project nobody asked for&rdquo; is more useful than &ldquo;I&apos;m overwhelmed.&rdquo;</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Describe your last week <span style={{ color: "var(--accent)" }}>*</span></label>
                        <textarea value={form.lastWeek} onChange={e => { set("lastWeek", e.target.value); clearErr("lastWeek"); }} placeholder="Tell us what consumed your attention, what got shipped, what stayed on the list..." rows={6} style={{ ...inputStyle, resize: "vertical", minHeight: 120, lineHeight: 1.6 }} />
                        <div style={{ textAlign: "right", fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>
                          {form.lastWeek.trim() === "" ? 0 : form.lastWeek.trim().split(/\s+/).length} words
                        </div>
                        {errors.lastWeek && <span style={{ fontSize: 12, color: "#d47070", fontFamily: "var(--font-body)" }}>{errors.lastWeek}</span>}
                      </div>
                    </div>
                  )}

                  {/* Page 3 — Brain */}
                  {page === 3 && (
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>Two questions about how your brain works.</h3>
                      <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.65, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Not filters — context for Manuj before the call.</p>
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

                  {/* Page 4 — Contact */}
                  {page === 4 && (
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 22, fontWeight: 400, marginBottom: 6 }}>Last bit — how do we reach you?</h3>
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
                          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>Phone <span style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 400 }}>(optional — higher priority)</span></label>
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
                      <button suppressHydrationWarning onClick={submit} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)", color: "var(--bg)", border: "none", padding: "12px 20px", borderRadius: 9999, fontSize: isMobile ? 13 : 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                        Join the Clarity Call Waitlist
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
