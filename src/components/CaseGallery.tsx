"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoveHorizontal } from "lucide-react";

/** Draggable horizontal filmstrip of case-study screenshots — grab to scrub. */
export function CaseGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => {
      if (track.current) {
        setMax(Math.max(0, track.current.scrollWidth - track.current.offsetWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [images.length]);

  return (
    <section className="mt-10 border-t border-line pt-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="t-label">Gallery</p>
        {images.length > 1 && (
          <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-3">
            <MoveHorizontal size={14} className="text-accent" /> Drag to scrub
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          ref={track}
          className="flex w-max cursor-grab gap-5 pb-2 active:cursor-grabbing"
          drag={reduce || max === 0 ? false : "x"}
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.06}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
        >
          {images.map((g) => (
            <div
              key={g.src}
              className="relative aspect-video w-[82vw] max-w-[760px] shrink-0 overflow-hidden rounded-xl border border-line"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                draggable={false}
                sizes="760px"
                className="pointer-events-none object-cover object-top"
              />
            </div>
          ))}
        </motion.div>
        {max > 0 && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
        )}
      </div>
    </section>
  );
}
