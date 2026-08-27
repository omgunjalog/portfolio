"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to a target when scrolled into view. Parses the numeric part of a
 * string like "55,000+ trees" and animates just the number, keeping suffix.
 */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);

  useEffect(() => {
    if (!match || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(`${match[1]}0${match[3]}`);
      return;
    }
    const target = Number(match[2].replace(/,/g, ""));
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(target * eased);
      setDisplay(`${match[1]}${n.toLocaleString()}${match[3]}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce, match]);

  return <span ref={ref}>{display}</span>;
}
