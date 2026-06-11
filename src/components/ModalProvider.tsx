"use client";

import React, { useState } from "react";
import LeadModal from "./LeadModal";

/**
 * ModalProvider
 *
 * A thin client-side context that:
 *  1. Holds the modal open/close state.
 *  2. Renders the <LeadModal /> portal.
 *  3. Exposes a <ModalTrigger> child pattern via the `children` prop —
 *     any child can call window.dispatchEvent(new Event("open-lead-modal"))
 *     to open the modal without prop drilling.
 *
 * Usage in page.tsx (Server Component safe):
 *   <ModalProvider>
 *     <Footer />   ← contains buttons that fire the custom event
 *   </ModalProvider>
 */
export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for the global custom event so any component can trigger the modal
  React.useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-lead-modal", handler);
    return () => window.removeEventListener("open-lead-modal", handler);
  }, []);

  return (
    <>
      {children}
      <LeadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

/**
 * openLeadModal()
 *
 * Call this from any client component button's onClick to open the modal
 * without needing to thread props.
 *
 * Example:
 *   <button onClick={openLeadModal}>Initiate Project</button>
 */
export function openLeadModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-lead-modal"));
  }
}
