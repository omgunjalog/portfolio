"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Per-route entrance. `template.tsx` remounts on every navigation, so this
 * content lift replays as a page transition each time — without a full-screen
 * overlay that could ever get stuck covering the page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
