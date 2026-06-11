// Shared trigger for the Clarity Call waitlist modal. CTAs across the page
// (Hero, Nav, Footer) dispatch this event; <WaitlistModal /> listens for it.
// A DOM event keeps the triggers decoupled from the modal — no context
// provider has to wrap the whole tree.
export const WAITLIST_OPEN_EVENT = "open-waitlist"

export function openWaitlist(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(WAITLIST_OPEN_EVENT))
  }
}
