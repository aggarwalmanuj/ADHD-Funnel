"use client";
import Image from "next/image";
import FadeIn from "./FadeIn";
import CountUp from "./CountUp";
import { useIsMobile } from "../hooks/useIsMobile";

const logos = [
  { src: "https://www.aimerge.live/logos/microsoft.png?dpl=dpl_4t9nuv3RZs2gMjxMZ9Q8r9UFdCmC", alt: "Microsoft", w: 56, h: 56 },
  { src: "https://www.aimerge.live/logos/ibm.png?dpl=dpl_4t9nuv3RZs2gMjxMZ9Q8r9UFdCmC", alt: "IBM", w: 100, h: 40 },
  { src: "https://www.aimerge.live/logos/tmobile.png?dpl=dpl_4t9nuv3RZs2gMjxMZ9Q8r9UFdCmC", alt: "T-Mobile", w: 56, h: 56 },
  { src: "https://www.aimerge.live/logos/pearson.png?dpl=dpl_4t9nuv3RZs2gMjxMZ9Q8r9UFdCmC", alt: "Pearson", w: 56, h: 56 },
  { src: "https://www.aimerge.live/logos/un.png?dpl=dpl_4t9nuv3RZs2gMjxMZ9Q8r9UFdCmC", alt: "United Nations", w: 56, h: 56 },
];

const stats = [
  { label: "Patents", value: "4 US patents in AI/ML" },
  { label: "Published", value: "Mensa Research Journal — peer-reviewed" },
  { label: "Experience", value: "30 years building systems" },
  { label: "Reach", value: "6 continents · 14 transformations" },
];

const adhdStats = [
  { value: 29, suffix: "%", body: "of entrepreneurs self-report ADHD — 6× the general adult population", source: "Freeman MD, UCSF" },
  { value: 44, suffix: "%", body: "of entrepreneurs under 45 report ADHD symptoms", source: "BDC, 2025" },
  { value: 47, suffix: "", body: "studies confirming ADHD traits that help you start work against you after you start", source: "Sage Journals, 2026" },
];

export default function Credibility() {
  const isMobile = useIsMobile();

  return (
    <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "320px 1fr", gap: isMobile ? 40 : 80, alignItems: "start", marginBottom: 48 }}>
          <FadeIn direction="left">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>II</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>30 years · six continents · peer-reviewed</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 16 }}>
              Built by a 30-year operator.<br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>Peer-reviewed.</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              Works with executives at the intersection of high performance and ADHD-style cognition. Peer-reviewed in the Mensa Research Journal.
            </p>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            {/* Logo grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "20px 16px" : "24px 32px", alignItems: "center", justifyItems: "center", marginBottom: 40 }}>
              {logos.map((logo, i) => (
                <div key={i}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", transition: "filter 0.25s, opacity 0.25s", filter: "grayscale(100%) brightness(1.6)", opacity: 0.55, cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%) brightness(1)"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(100%) brightness(1.6)"; e.currentTarget.style.opacity = "0.55"; }}
                >
                  <Image src={logo.src} alt={logo.alt} width={isMobile ? Math.round(logo.w * 0.8) : logo.w} height={isMobile ? Math.round(logo.h * 0.8) : logo.h} style={{ display: "block", objectFit: "contain" }} />
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--border)" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ padding: "16px 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "120px 1fr", gap: isMobile ? 4 : 16, alignItems: "baseline", borderBottom: "1px solid var(--border)", ...(i % 2 === 0 ? { paddingRight: isMobile ? 12 : 32, borderRight: "1px solid var(--border)" } : { paddingLeft: isMobile ? 12 : 32 }) }}>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>{s.label}</span>
                  <span style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ADHD stat bar */}
        <FadeIn delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 1, background: "var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {adhdStats.map((s, i) => (
              <div key={i} style={{ background: "var(--bg-card)", padding: isMobile ? "24px 20px" : "28px 32px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(32px,8vw,48px)" : "clamp(36px,4vw,56px)", fontWeight: 400, color: "var(--accent)", lineHeight: 1, marginBottom: 10 }}><CountUp to={s.value} suffix={s.suffix} /></div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", marginBottom: 8 }}>{s.body}</p>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>— {s.source}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
