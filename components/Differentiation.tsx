"use client";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const EASE = [0.22, 1, 0.36, 1] as const;

const rows = [
  {
    tag: "Not productivity advice",
    title: "No 5am routines. No eating the frog.",
    body: "We don't tell you to wake up at 5am, time-block your calendar, or eat the frog. Every productivity system you have tried was designed for a brain that operates differently than yours. Adding another one on top of the same pattern does not help.",
  },
  {
    tag: "Not therapy",
    title: "We don't diagnose or prescribe.",
    body: "We don't diagnose, prescribe medication, or ask about your childhood. We work with the brain you have, in the business you're running, right now. Practical, private, outcome-focused.",
  },
  {
    tag: "A system for your brain",
    title: "Built for how you actually operate.",
    body: "The private AI vault holds the context you'd lose track of. The four-week protocol builds a system around how you actually operate - not the average brain. The diagnostic names what's happening without the shame.",
  },
];

export default function Differentiation() {
  const isMobile = useIsMobile();

  return (
    <section id="why-us" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>V</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The difference</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, maxWidth: 560 }}>
              Why this, not another<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>productivity system.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {rows.map((r, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                style={{ position: "relative", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", gap: isMobile ? 8 : 48, padding: isMobile ? "28px 8px" : "36px 16px", borderTop: "1px solid var(--border)", alignItems: "start", overflow: "hidden", cursor: "default" }}
              >
                <motion.div
                  aria-hidden
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "rgba(255,255,255,0.02)" }}
                />
                <motion.span
                  variants={{ rest: { x: 0, color: "var(--accent)" }, hover: { x: 6, color: "var(--accent)" } }}
                  transition={{ duration: 0.55, ease: EASE }}
                  style={{ position: "relative", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: isMobile ? 0 : 4, fontFamily: "var(--font-body)", display: "inline-block" }}
                >
                  {r.tag}
                </motion.span>
                <div style={{ position: "relative" }}>
                  <h3 style={{ fontSize: isMobile ? 17 : 19, fontWeight: 600, color: "#fff", marginBottom: 8, fontFamily: "var(--font-body)" }}>{r.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{r.body}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Mensa note */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 40, padding: isMobile ? "20px" : "24px 32px", borderRadius: 10, background: "rgba(232,150,42,0.05)", border: "1px solid rgba(232,150,42,0.15)" }}>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              This methodology is published in the <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Mensa Research Journal</strong> - peer-reviewed, documented, tested across 14 transformations in multiple countries. One trained therapist said it reached something in three days that her own decades of practice had never touched. 4 patents in AI/ML. Microsoft, IBM, Pearson Education background.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
