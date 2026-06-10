"use client";
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

function Check() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Cross() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
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

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 20 }}>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 10, padding: isMobile ? "28px 24px" : "36px", boxSizing: "border-box", background: "rgba(78,155,106,0.08)", border: "1px solid rgba(78,155,106,0.22)", height: "100%" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4e9b6a", marginBottom: 20, fontFamily: "var(--font-body)" }}>This is for you if</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, padding: 0, listStyle: "none" }}>
                {yes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                    <span style={{ color: "#4e9b6a" }}><Check /></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 10, padding: isMobile ? "28px 24px" : "36px", boxSizing: "border-box", background: "rgba(176,112,112,0.08)", border: "1px solid rgba(176,112,112,0.22)", height: "100%" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b07070", marginBottom: 20, fontFamily: "var(--font-body)" }}>This is not for you if</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, padding: 0, listStyle: "none" }}>
                {no.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                    <span style={{ color: "#b07070" }}><Cross /></span>{item}
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
