"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** A card that tilts in 3D toward the cursor and lifts a soft accent glow. */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 0, active: false });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * 8,
      ry: (px - 0.5) * 10,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT((s) => ({ ...s, rx: 0, ry: 0, active: false }))}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{ transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-300"
        style={{
          opacity: t.active ? 1 : 0,
          background: `radial-gradient(60% 60% at ${t.gx}% ${t.gy}%, rgba(244,165,42,0.12), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
