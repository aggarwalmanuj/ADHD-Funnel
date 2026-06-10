"use client";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const steps = [
  { num: "Step 01", title: "Join the Waitlist", body: "Four questions about your situation. Sixty seconds. Tell us what your week actually looks like and what clarity would mean for you right now." },
  { num: "Step 02", title: "Personal Review", body: "We read every submission ourselves. Within 48 hours — either a Clarity Call booking or an honest no and where else to look." },
  { num: "Step 03", title: "Your Clarity Call", body: "Thirty minutes with Manuj. He maps how your mind actually works under the conditions you operate in. The first call is free. You leave with a clearer picture before committing to anything." },
];

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section id="how-it-works" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>IV</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The waitlist</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 16, maxWidth: 500 }}>
              How the Clarity Call<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>waitlist works.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>We take on new clients in waves. The process is intentionally simple.</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap: isMobile ? 24 : 56, alignItems: "start" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: isMobile ? "24px 20px" : "32px 24px", background: "var(--bg-card)", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "var(--accent)", fontFamily: "var(--font-body)" }}>
                    {s.num}<span style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.2)" }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.3, fontFamily: "var(--font-body)" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {!isMobile && (
            <FadeIn direction="left" delay={0.2}>
              <div style={{ borderRadius: 10, overflow: "hidden", position: "relative", height: 360 }}>
                <Image src="/images/Meeting.jpg" alt="Clarity Call session" fill style={{ objectFit: "cover", opacity: 0.88 }} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
