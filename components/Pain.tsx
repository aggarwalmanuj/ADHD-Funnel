"use client";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const cards = [
  {
    quote: "I just need more focus and discipline. If I try harder, this time it will stick.",
    sub: "Every system you've tried was built for a brain that isn't yours. You outgrew them in three weeks. Every time. That was never a discipline problem.",
  },
  {
    quote: "I have too many ideas and can't execute on any of them.",
    sub: "Your brain generates more in twenty minutes than most people produce in a week. That is not the problem to fix. It is the thing nobody has ever built a system around.",
  },
  {
    quote: "I've always been this way. This is just how I'm wired.",
    sub: "The stories you carry — those were put there. By every school that told you to settle down. By every framework that said just build the habit. That story was never yours.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Pain() {
  const isMobile = useIsMobile();

  return (
    <section id="pain" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>III</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The pattern</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 16, maxWidth: 600 }}>
              You already know<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>what this sounds like.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 20 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, borderColor: "var(--border)" },
                  hover: { y: -6, borderColor: "var(--accent)" },
                }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{ borderRadius: 12, padding: isMobile ? "28px 24px" : "36px 32px", background: "var(--bg-card)", border: "1px solid var(--border)", height: "100%", boxSizing: "border-box", cursor: "default" }}
              >
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(17px,1.8vw,22px)", fontStyle: "italic", lineHeight: 1.5, color: "rgba(255,255,255,0.88)", marginBottom: 16 }}>
                  <span style={{ color: "var(--accent)" }}>&ldquo;</span>{c.quote}<span style={{ color: "var(--accent)" }}>&rdquo;</span>
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{c.sub}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
