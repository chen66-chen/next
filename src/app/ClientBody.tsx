"use client";

import { useEffect } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  // This component just handles client-side initialization
  useEffect(() => {
    // Apply classes or initializations needed only on the client side
    document.body.classList.add("antialiased");
  }, []);

  return <>{children}</>;
}
