"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

export type Word = {
  text: string;
  accent?: boolean;
  serif?: boolean;
  break?: boolean;
};

function WordSpan({
  word,
  i,
  n,
  progress,
  reduce,
}: {
  word: Word;
  i: number;
  n: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // each word scrubs in sequentially as the band crosses the viewport
  const start = 0.12 + (i / n) * 0.4;
  const opacity = useTransform(
    progress,
    [start, start + 0.1, 0.84, 0.97],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, start + 0.1], [22, 0]);
  const blur = useTransform(progress, [start, start + 0.1], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const cls = [
    word.serif ? "t-serif" : "",
    word.accent ? "accent-text" : "",
  ].join(" ");

  return (
    <>
      <motion.span
        className={`inline-block ${cls}`}
        style={reduce ? undefined : { opacity, y, filter }}
      >
        {word.text}
      </motion.span>{" "}
      {word.break && <span className="block" aria-hidden />}
    </>
  );
}

/**
 * A chapter break whose narration reveals WORD BY WORD, scrubbed to scroll,
 * while the system-graph morphs behind it in the open.
 */
export function StorySpacer({
  eyebrow,
  words,
  footer,
  height = "95vh",
  chapter,
}: {
  eyebrow?: string;
  words: Word[];
  footer?: ReactNode;
  height?: string;
  chapter?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const eyeOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.85, 0.97], [0, 1, 1, 0]);
  const footOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 0.97], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      data-chapter={chapter}
      className="relative flex items-center justify-center"
      style={{ minHeight: height }}
    >
      {/* soft scrim so words read over the bright graph */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 42% at 50% 46%, rgba(11,11,12,0.72), transparent 75%)",
        }}
      />
      <div className="wrap relative text-center">
        {eyebrow && (
          <motion.p className="sec-index mb-6" style={reduce ? undefined : { opacity: eyeOpacity }}>
            {eyebrow}
          </motion.p>
        )}
        <div className="mx-auto max-w-4xl text-3xl font-medium leading-[1.12] tracking-tight md:text-5xl md:leading-[1.1]">
          {words.map((w, i) => (
            <WordSpan
              key={i}
              word={w}
              i={i}
              n={words.length}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
        {footer && (
          <motion.div style={reduce ? undefined : { opacity: footOpacity }}>
            {footer}
          </motion.div>
        )}
      </div>
    </section>
  );
}
