"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { openWaitlist } from "../lib/waitlist-modal";

const NAV_LINKS = [
  { label: "The Pain",     href: "#pain" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why us",       href: "#why-us" },
  { label: "Apply",        href: "#waitlist" },
];

export default function Nav() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  useEffect(() => {
    if (open && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open, isMobile]);

  // Heights - mobile stays fixed; desktop shrinks on scroll
  const navHeight = isMobile ? 88 : scrolled ? 64 : 88;
  const logoW = isMobile ? 160 : scrolled ? 120 : 180;
  const logoH = isMobile ? 46 : scrolled ? 36 : 52;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(10,10,15,0.97)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "border-color 0.4s ease, height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          height: navHeight,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            paddingLeft: isMobile ? 20 : 64,
            paddingRight: isMobile ? 20 : 64,
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, justifySelf: "start", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
          <Image src="/images/AI merge Logo.png" alt="AIMerge" width={logoW} height={logoH} priority style={{ height: "auto", width: logoW, transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }} />
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32, justifySelf: "center" }}>
            {NAV_LINKS.map((link, i) => {
              const isHovered = hoveredLink === i;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "#waitlist" ? (e => { e.preventDefault(); openWaitlist(); }) : undefined}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{ position: "relative", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.005em", color: isHovered ? "#ffffff" : "var(--text-muted)", textDecoration: "none", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 8, transition: "color 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "inline-block",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(0) scale(1)" : "translateX(-4px) scale(0.5)",
                      transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                      flexShrink: 0,
                    }}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <Link href="#waitlist" onClick={e => { e.preventDefault(); openWaitlist(); }} style={{ fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 8, paddingLeft: 22, paddingRight: 22, paddingTop: 11, paddingBottom: 11, borderRadius: 9999, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", background: "var(--accent)", color: "var(--bg)", textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s", justifySelf: "end" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Join the Clarity Call Waitlist
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <motion.path
                d="M3 6h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={open ? { d: "M5 5L17 17" } : { d: "M3 6h16" }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.path
                d="M3 11h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: "11px 11px" }}
              />
              <motion.path
                d="M3 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={open ? { d: "M5 17L17 5" } : { d: "M3 16h16" }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              />
            </svg>
          </button>
        )}
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: "fixed", top: 88, left: 0, right: 0, bottom: 0, height: "calc(100vh - 88px)", zIndex: 49, background: "rgba(10,10,15,0.98)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border)", padding: "40px 20px 32px", overflowY: "auto", willChange: "clip-path, opacity, transform" }}
          >
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {NAV_LINKS.map(link => (
                <motion.div
                  key={link.href}
                  variants={{
                    open: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] } },
                    closed: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
                  }}
                >
                  <Link href={link.href} onClick={e => { if (link.href === "#waitlist") { e.preventDefault(); openWaitlist(); } setOpen(false); }}
                    style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.85)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--border)" }}
                  >{link.label}</Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.32, 0.72, 0, 1] } },
                  closed: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
                }}
              >
                <Link href="#waitlist" onClick={e => { e.preventDefault(); openWaitlist(); setOpen(false); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, padding: "14px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, background: "var(--accent)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--font-body)" }}
                >
                  Join the Clarity Call Waitlist
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
