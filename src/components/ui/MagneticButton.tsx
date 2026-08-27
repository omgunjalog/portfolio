"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/**
 * A button that leans toward the cursor. One small, intentional
 * micro-interaction — disabled entirely under reduced-motion.
 */
export function MagneticButton({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.25 });
  }

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
      className="group inline-flex items-center gap-2 rounded-[3px] bg-accent px-7 py-3.5 text-sm font-semibold text-[#180f02] will-change-transform"
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}
