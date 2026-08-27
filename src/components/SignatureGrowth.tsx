"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The site's one signature moment. A line grows from a seed into an
 * organic branching form, then resolves into a small connected network
 * of nodes — the movement work (growth) meeting the products (systems).
 * Draws itself once on load; renders as a finished still under
 * prefers-reduced-motion.
 */

const branches = [
  "M200,470 C200,400 198,360 200,300",
  "M200,336 C176,320 140,300 118,258",
  "M200,300 C210,262 250,250 286,236",
  "M200,300 C200,240 198,196 200,150",
  "M200,206 C182,188 150,184 120,168",
  "M200,196 C220,178 254,176 286,160",
  "M200,150 C192,120 176,104 150,92",
  "M200,150 C208,120 226,104 252,92",
];

const nodes = [
  { cx: 118, cy: 258, r: 5 },
  { cx: 286, cy: 236, r: 5 },
  { cx: 120, cy: 168, r: 4 },
  { cx: 286, cy: 160, r: 4 },
  { cx: 150, cy: 92, r: 4 },
  { cx: 252, cy: 92, r: 4 },
  { cx: 200, cy: 150, r: 6 },
  { cx: 200, cy: 300, r: 5 },
];

// Faint links that make the canopy read as a network, not just a tree.
const links = [
  ["M120,168 L150,92"],
  ["M150,92 L252,92"],
  ["M252,92 L286,160"],
  ["M120,168 L200,150"],
  ["M286,160 L200,150"],
];

export function SignatureGrowth() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 480"
      className="h-full w-full"
      role="img"
      aria-label="An abstract line growing from a seed into a branching network of connected nodes."
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--border-strong)" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <ellipse cx="200" cy="150" rx="150" ry="150" fill="url(#glow)" />

      {/* Network links */}
      {links.map((d, i) => (
        <motion.path
          key={`l-${i}`}
          d={d[0]}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.22}
          strokeWidth={1}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 + i * 0.12, ease: "easeInOut" }}
        />
      ))}

      {/* Branches */}
      {branches.map((d, i) => (
        <motion.path
          key={`b-${i}`}
          d={d}
          fill="none"
          stroke="url(#stem)"
          strokeWidth={i === 0 ? 3 : 2}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: 1 }}
          transition={{
            duration: 1.1,
            delay: reduce ? 0 : 0.2 + i * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth={1.5}
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={reduce ? undefined : { scale: 1, opacity: 1 }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : 1.5 + i * 0.09,
            ease: "backOut",
          }}
        />
      ))}

      {/* Seed */}
      <motion.circle
        cx={200}
        cy={470}
        r={4}
        fill="var(--accent)"
        initial={reduce ? false : { scale: 0 }}
        animate={reduce ? undefined : { scale: 1 }}
        style={{ transformOrigin: "200px 470px" }}
        transition={{ duration: 0.4, ease: "backOut" }}
      />
    </svg>
  );
}
