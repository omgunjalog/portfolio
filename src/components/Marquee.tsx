"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";

const wrapValue = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Kinetic label band that scrolls on its own and speeds up / reverses with the
 * page's scroll velocity — the marquee reacts to how fast you move.
 */
export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items, ...items];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollV = useVelocity(scrollY);
  const smoothV = useSpring(scrollV, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothV, [-1500, 0, 1500], [-4, 0, 4], {
    clamp: false,
  });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrapValue(-33.33, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * -2 * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden border-y border-line bg-bg-2/85 py-4 backdrop-blur-[2px]">
      <motion.div
        className="flex w-max items-center gap-8"
        style={reduce ? undefined : { x }}
      >
        {loop.map((it, i) => (
          <Fragment key={i}>
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-ink-2">
              {it}
            </span>
            <span className="text-accent">✦</span>
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}
