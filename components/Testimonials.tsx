"use client";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>VI</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The proof</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, maxWidth: 600 }}>
              What happens when<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>the pattern is removed.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 20 }}>
          {/* Nick Harauz */}
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 12, padding: isMobile ? "28px 24px" : "40px", background: "var(--bg-card)", border: "1px solid var(--border)", height: "100%", boxSizing: "border-box" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 12, fontFamily: "var(--font-body)" }}>After four weeks</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
                The stress part of his brain went silent.
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 16 : 18, fontStyle: "italic", lineHeight: 1.65, color: "rgba(255,255,255,0.85)", marginBottom: 14 }}>
                <span style={{ color: "var(--accent)" }}>&ldquo;</span>TetraNoodle disrupted the stories I was telling myself and realigned me to the purpose and action I actually want to create.<span style={{ color: "var(--accent)" }}>&rdquo;</span>
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 20, fontFamily: "var(--font-body)" }}>
                Better sleep. Less cravings. For the first two days it felt like stepping into a new body. People stopped and made eye contact. Old connections reappeared.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), #C57E20)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--bg)", flexShrink: 0, fontFamily: "var(--font-body)" }}>N</div>
                <div>
                  <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)" }}>Nick Harauz</strong>
                  <span style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>Video Producer, ADHD</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Bansari Ranpura */}
          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 12, padding: isMobile ? "28px 24px" : "40px", background: "var(--bg-card)", border: "1px solid var(--border)", height: "100%", boxSizing: "border-box" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 12, fontFamily: "var(--font-body)" }}>After ten days</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
                Her mind started trusting her body again.
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 16 : 18, fontStyle: "italic", lineHeight: 1.65, color: "rgba(255,255,255,0.85)", marginBottom: 14 }}>
                <span style={{ color: "var(--accent)" }}>&ldquo;</span>My mind has finally started trusting my body again.<span style={{ color: "var(--accent)" }}>&rdquo;</span>
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 20, fontFamily: "var(--font-body)" }}>
                Habits aligned without force. Calm in situations that would normally shake her. She danced from night until 6:30 in the morning - no crash, no soreness the next day.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), #C57E20)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--bg)", flexShrink: 0, fontFamily: "var(--font-body)" }}>B</div>
                <div>
                  <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)" }}>Bansari Ranpura</strong>
                  <span style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>Entrepreneur, ADHD-adjacent</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
