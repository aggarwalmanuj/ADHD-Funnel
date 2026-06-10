"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        transformOrigin: "0% 50%",
        scaleX,
        background: "var(--accent)",
        opacity: 0.85,
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}
