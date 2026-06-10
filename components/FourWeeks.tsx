"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useIsMobile } from "../hooks/useIsMobile";

const items = [
  {
    num: "01",
    title: "Something that names your specific direction",
    body: "Not a goal. Not a mission statement. The specific thing your brain can fully lock onto and sustain. Named from the inside, not from analysis. When your brain has this, the scattering stops — not through discipline, through alignment.",
  },
  {
    num: "02",
    title: "Something that shows you where the scattering came from",
    body: "The specific moment, the specific belief, why multiple directions felt safer than one. When you see this, the patience strategy stops being the default. Direction becomes the default.",
  },
  {
    num: "03",
    title: "A private AI system calibrated to how your brain actually operates",
    body: "Not the average brain's operating system. Yours. Secure. No generic templates. Built around the bursts, the depth, the pattern recognition — how you specifically work. Not how you're supposed to work.",
  },
  {
    num: "04",
    title: "The human protocol that holds it",
    body: "Not three weeks of inspiration. Actual structural change. The piece that makes this different from every productivity system, app, or framework you have tried before.",
  },
  {
    num: "05",
    title: "One conversation per week that actually lands",
    body: "Not five conversations where nothing quite arrives. One. Fully. The ease of not managing everything around it — your brain working with you, not against you.",
  },
];

export default function FourWeeks() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px" : "96px 64px" }}>
        <FadeIn>
          <div style={{ marginBottom: isMobile ? 40 : 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>V</span>
              <span style={{ width: 24, height: 1, background: "var(--border)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-body)" }}>The process</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 20, maxWidth: 760 }}>
              What changes <em style={{ fontStyle: "italic", color: "var(--accent)" }}>in four weeks.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", fontFamily: "var(--font-body)", maxWidth: 640 }}>
              This is not another system layered on top of the same pattern. Here is what the process actually does.
            </p>
          </div>
        </FadeIn>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
          {items.map((it, i) => {
            const isHovered = hovered === i;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <li
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ display: "grid", gridTemplateColumns: isMobile ? "60px 1fr" : "80px 1fr", gap: isMobile ? 16 : 24, padding: isMobile ? "28px 0" : "36px 0", borderBottom: i === items.length - 1 ? "none" : "1px solid var(--border)", alignItems: "start", cursor: "default" }}
                >
                  <motion.span
                    animate={{ x: isHovered ? -3 : 0, opacity: isHovered ? 1 : 0.85 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 44 : 60, fontWeight: 300, color: "var(--accent)", lineHeight: 1, display: "inline-block" }}
                  >
                    {it.num}
                  </motion.span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <motion.span
                        animate={{ width: isHovered ? (isMobile ? 24 : 40) : 0, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }}
                      />
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 20 : 24, fontWeight: 500, color: "#F2EDE6", lineHeight: 1.25, margin: 0 }}>{it.title}</h3>
                    </div>
                    <motion.p
                      animate={{ color: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.78)" }}
                      transition={{ duration: 0.5 }}
                      style={{ fontSize: 15, lineHeight: 1.7, fontFamily: "var(--font-body)", margin: 0 }}
                    >
                      {it.body}
                    </motion.p>
                  </div>
                </li>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
