"use client";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RealCost() {
  const isMobile = useIsMobile();

  return (
    <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>IV</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The pattern</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, maxWidth: 760 }}>
              Here is what the research <em style={{ fontStyle: "italic", color: "var(--accent)" }}>actually says.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "start" }}>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                "Your brain generates creative solutions faster than the operational world can absorb them. So you end up with more on the list. Not less. More ideas that become tasks. More tasks that become the reason the thing you love has to wait.",
                "A 2026 meta-analysis synthesizing 47 studies found something specific: the ADHD traits that make you bold enough to start — the risk-taking, the pattern recognition, the willingness to move when others wait — are positively associated with entrepreneurial behavior.",
                "Inattention — the other side of the same brain — is negatively associated with what happens after you start.",
                "Not starting. After starting. The thing that got you here is working against you in the phase that determines whether it succeeds.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}>{p}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div style={{ position: "relative", background: "var(--bg-card)", border: "1px solid var(--border)", padding: isMobile ? "28px 24px" : "40px 36px", borderRadius: "0 8px 8px 0" }}>
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--accent)", transformOrigin: "0% 0%" }}
              />
              <blockquote style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 24, fontStyle: "italic", lineHeight: 1.45, color: "#F2EDE6", margin: 0, marginBottom: 22 }}>
                &ldquo;Every system you have tried has been trying to fix the inattention without understanding what drives it. The ADHD brain does not underperform in the presence of genuine direction. It overperforms. The scattering is the signal — not the problem.&rdquo;
              </blockquote>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                The absence of a single clear direction that your brain can fully lock onto. When that direction is named precisely, from the inside — everything else reorganises around it. Not through effort. Through alignment.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
