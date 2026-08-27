"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Headline that reveals word-by-word — each word slides up from behind a mask
 * as the line scrolls into view. One observer on the parent (reliable), which
 * staggers its word children.
 */
export function KineticText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            variants={word}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
