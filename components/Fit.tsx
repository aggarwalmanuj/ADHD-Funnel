"use client";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const yes = [
  "You're a founder or executive whose brain moves faster than your calendar",
  "You've started everything and finished almost nothing this month",
  "You've tried every system and outgrown each one in three weeks",
  "You're ready to stop fighting your brain and start operating from it",
];
const no = [
  "You're looking for an ADHD diagnosis or medication management",
  "You want a 30-day productivity course or habit-tracking app",
  "You need this to be a simple fix that requires no real change",
  "You're not ready to be honest about what's actually running",
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Check({ delay = 0 }: { delay?: number }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <motion.path
        d="M2 8l4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
      />
    </svg>
  );
}
function Cross({ delay = 0 }: { delay?: number }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <motion.path
        d="M3 3l10 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay, ease: EASE }}
      />
      <motion.path
        d="M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: delay + 0.18, ease: EASE }}
      />
    </svg>
  );
}

export default function Fit() {
  const isMobile = useIsMobile();

  return (
    <section style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>VII</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>Be honest with yourself</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, maxWidth: 500 }}>
              Who this is<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>for and not for.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 32 }}>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 6, padding: isMobile ? "32px 28px" : "44px 40px", boxSizing: "border-box", background: "var(--bg-card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", height: "100%" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 24 : 28, fontWeight: 500, color: "var(--accent)", marginBottom: 24 }}>This is for you if</h4>
              <ul style={{ display: "flex", flexDirection: "column", padding: 0, listStyle: "none", margin: 0 }}>
                {yes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, fontSize: 15, lineHeight: 1.6, color: "#F2EDE6", fontFamily: "var(--font-body)", padding: "14px 0", borderBottom: i === yes.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <span style={{ color: "var(--accent)" }}><Check delay={i * 0.1} /></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 6, padding: isMobile ? "32px 28px" : "44px 40px", boxSizing: "border-box", border: "1px solid var(--border)", height: "100%", opacity: 0.7 }}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 24 : 28, fontWeight: 500, color: "#F2EDE6", marginBottom: 24 }}>This is not for you if</h4>
              <ul style={{ display: "flex", flexDirection: "column", padding: 0, listStyle: "none", margin: 0 }}>
                {no.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)", fontFamily: "var(--font-body)", padding: "14px 0", borderBottom: i === no.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <span style={{ color: "var(--text-dim)" }}><Cross delay={i * 0.1} /></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
