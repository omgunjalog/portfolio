"use client";

import { useEffect, useState } from "react";

/**
 * True once the intro loader has finished (or immediately if it won't show).
 * Lets hero content stage its entrance right as the curtain lifts.
 */
export function useIntroReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-shown") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || document.visibilityState === "hidden") {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("intro:done", on, { once: true });
    // safety: never wait forever
    const t = setTimeout(on, 2600);
    return () => {
      window.removeEventListener("intro:done", on);
      clearTimeout(t);
    };
  }, []);

  return ready;
}
