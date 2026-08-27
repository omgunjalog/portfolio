"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

const paras = [
  "I'm Om — I design and build software that runs in production. My work spans three registers most portfolios never touch at once: a grassroots environmental movement, a college engineering department, and AI products from health-tech to real-time lighting.",
  "I work full-stack, from the database up. That means I care about the parts a founder can't see on the surface but feels the day something goes wrong — how money moves, how access is enforced, how the thing behaves under load — as much as the parts they can.",
  "I'd rather ship one honest, well-built thing than promise ten. When the simpler path serves you better, I'll tell you — even when it means deleting work I've already done.",
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" data-chapter="core" className="scroll-mt-24 story-sec border-t border-line py-20 md:py-28">
      <div className="wrap grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading index="05" eyebrow="About" title="Who's building this." />

        <div className="max-w-2xl space-y-5">
          {paras.map((p, i) => (
            <motion.p
              key={i}
              className={`t-body ${i === 0 ? "text-ink" : "text-ink-2"}`}
              initial={reduce ? undefined : { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {p}
            </motion.p>
          ))}
          <motion.p
            className="font-mono text-xs text-ink-3"
            initial={reduce ? undefined : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Based in {site.location}. Available worldwide.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
