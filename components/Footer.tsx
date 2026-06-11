"use client";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import Magnetic from "./Magnetic";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Final CTA — split layout */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
          {/* Left */}
          <FadeIn direction="left">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>IX</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The bottom line</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(28px,8vw,44px)" : "clamp(32px,3.5vw,52px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 20 }}>
              Your brain is not the problem.<br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Every system you&apos;ve been handed</em><br />
              was built for someone else&apos;s.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              We&apos;re onboarding in waves. Join the Clarity Call Waitlist and we&apos;ll reach out when a spot opens for your profile.
            </p>
          </FadeIn>

          {/* Right */}
          <FadeIn direction={isMobile ? "up" : "right"} delay={0.15}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: isMobile ? "32px 24px" : "48px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
              <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.65, fontFamily: "var(--font-heading)", fontStyle: "italic", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                &ldquo;This is not about working harder. It&apos;s about understanding the brain you actually have and building systems that work with it.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src="/people/manuj.jpeg" alt="Manuj Aggarwal" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)" }}>Manuj Aggarwal</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Founder, AIMerge</div>
                </div>
              </div>
              <Magnetic>
                <Link href="#waitlist" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 600, background: "var(--accent)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--font-body)", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Join the Clarity Call Waitlist
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "48px 20px 32px" : "56px 64px 40px" }}>
          {/* Top row */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr auto", gap: isMobile ? 40 : "48px 64px", marginBottom: 40 }}>

            {/* Brand column */}
            <div>
              <div style={{ opacity: 0.7, marginBottom: 20 }}>
                <Image src="/images/AI merge Logo.png" alt="AIMerge" width={140} height={40} style={{ height: "auto" }} />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)", marginBottom: 12, maxWidth: 260 }}>
                A diagnostic for life and work. A precise reflection of what is quietly running you, so the next decision can come from somewhere calmer.
              </p>
              <p style={{ fontSize: 13, fontStyle: "italic", color: "var(--text-dim)", fontFamily: "var(--font-heading)" }}>
                Reviewed in the Mensa Research Journal.
              </p>
            </div>

            {/* The Reading column */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)", marginBottom: 20 }}>The Reading</div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: "wrap", gap: isMobile ? "10px 24px" : 14 }}>
                {[
                  { label: "The Pain", href: "#pain" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Why Us", href: "#why-us" },
                  { label: "Voices", href: "#testimonials" },
                  { label: "Apply", href: "#waitlist" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", textDecoration: "none", fontFamily: "var(--font-body)", transition: "color 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn icon */}
            <div style={{ display: "flex", alignItems: isMobile ? "center" : "flex-start" }}>
              <Link href="https://www.linkedin.com/company/tetranoodle/posts/?feedView=all" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
            <span style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>© 2026 AIMerge. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
