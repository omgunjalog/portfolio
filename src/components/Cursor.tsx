"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom pointer: a precise dot plus a ring that follows the cursor — and
 * magnetically SNAPS onto interactive elements, sizing to their bounds.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);
  const rw = useMotionValue(26);
  const rh = useMotionValue(26);
  const rr = useMotionValue(13);

  const cfg = { stiffness: 400, damping: 34, mass: 0.5 };
  const sx = useSpring(rx, cfg);
  const sy = useSpring(ry, cfg);
  const sw = useSpring(rw, cfg);
  const sh = useSpring(rh, cfg);
  const sr = useSpring(rr, cfg);
  const [snapped, setSnapped] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest(
        "a, button, [data-cursor]",
      ) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        const pad = 8;
        rx.set(r.left + r.width / 2);
        ry.set(r.top + r.height / 2);
        rw.set(r.width + pad * 2);
        rh.set(r.height + pad * 2);
        const br = parseFloat(getComputedStyle(el).borderRadius) || 6;
        rr.set(Math.min(br + pad, r.height / 2 + pad));
        setSnapped(true);
      } else {
        rx.set(e.clientX);
        ry.set(e.clientY);
        rw.set(26);
        rh.set(26);
        rr.set(13);
        setSnapped(false);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [dotX, dotY, rx, ry, rw, rh, rr]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, opacity: snapped ? 0 : 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 border border-accent/70"
        style={{
          x: sx,
          y: sy,
          width: sw,
          height: sh,
          borderRadius: sr,
          backgroundColor: snapped ? "rgba(245,165,36,0.08)" : "transparent",
          opacity: snapped ? 1 : 0.55,
        }}
      />
    </>
  );
}
