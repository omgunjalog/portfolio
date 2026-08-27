"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A thin accent bar across the top that fills with scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
