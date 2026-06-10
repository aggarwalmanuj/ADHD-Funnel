"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section style={{ minHeight: "100vh", paddingTop: 88, background: "var(--bg)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "24px 20px 64px" : "48px 64px 96px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 420px",
        gap: isMobile ? 40 : 64,
        alignItems: "start",
        minHeight: isMobile ? "auto" : "calc(100vh - 88px)",
      }}>

        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 28, fontFamily: "var(--font-body)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-dim)", display: "inline-block", flexShrink: 0 }} />
            For executives, founders, and operators with ADHD-style brains
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 4.6vw, 64px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 28, letterSpacing: "-0.005em", color: "#EAF0F4", fontVariationSettings: "'opsz' 144", textWrap: "balance" }}>
            Your ADHD brain knows exactly what it&apos;s capable of.{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)", fontVariationSettings: "'opsz' 144, 'SOFT' 7.6, 'WONK' 1" }}>Something keeps stopping it</em>{" "}
            right before it lands.
          </h1>

          {/* Subheadline */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: isMobile ? 15 : 16, lineHeight: 1.8, marginBottom: 28, color: "var(--text-muted)", maxWidth: 560 }}>
            According to research from the University of California San Francisco — <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>29% of entrepreneurs self-report ADHD.</strong> That is six times the general adult population. You did not end up here by accident. Your brain is built for this environment. The problem is that every system you have been handed was built for a different one.
          </p>

          {/* Bullets */}
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40, padding: 0, listStyle: "none" }}>
            {[
              "You can see the whole picture in sixty seconds. You cannot finish the email you started four times this week.",
              "You've tried every system. The time-blocking. The habit stacking. You outgrew each one in three weeks. Every time.",
              "Your talent is real. It is just not landing the way you know it should.",
            ].map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: isMobile ? 14 : 15, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-body)" }}
              >
                <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}>→</span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", gap: isMobile ? 12 : 20, flexWrap: "wrap" }}>
            <Link href="#waitlist" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 36px", borderRadius: 9999, fontSize: 14, fontWeight: 600, background: "#ffffff", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--font-body)", transition: "opacity 0.2s, transform 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Join the Clarity Call Waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <span style={{ fontSize: 13, color: "var(--text-dim)", fontFamily: "var(--font-body)", textAlign: isMobile ? "center" : "left" }}>
              We&apos;re onboarding in waves. 60 seconds to tell us about your situation.
            </span>
          </div>
        </motion.div>

        {/* Right column — image (hidden on mobile) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "stretch", paddingTop: 8, gap: 20 }}
          >
            <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", width: "100%", height: 540 }}>
              <Image src="/images/HeroSection.jpg" alt="Executive workspace" fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.92 }} priority />
            </div>
            <p style={{ fontSize: 14, fontStyle: "italic", lineHeight: 1.55, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-heading)", margin: 0, textAlign: "right", paddingLeft: 4, paddingRight: 4 }}>
              &ldquo;We&apos;re taking on new clients in waves. Fill out a 60-second form and we&apos;ll reach out when a spot opens for your profile.&rdquo;
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
