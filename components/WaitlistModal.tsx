"use client";
import { useEffect, useState } from "react";
import WaitlistFormCard from "./WaitlistFormCard";
import { WAITLIST_OPEN_EVENT } from "../lib/waitlist-modal";

// Centered modal that holds the Clarity Call waitlist form. Opens when any CTA
// dispatches the shared open-waitlist event (see lib/waitlist-modal.ts), rather
// than scrolling the page to the inline section. Mounted once at the page root.
export default function WaitlistModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(WAITLIST_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(WAITLIST_OPEN_EVENT, onOpen);
  }, []);

  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join the Clarity Call Waitlist"
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        overflowY: "auto",
        background: "rgb(70,70,76)",
        animation: "waitlist-modal-fade 0.18s ease-out",
      }}
    >
      {/* Stop backdrop click from closing when interacting with the card */}
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, margin: "auto" }}>
        <WaitlistFormCard onClose={() => setOpen(false)} />
      </div>
      <style>{`@keyframes waitlist-modal-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
