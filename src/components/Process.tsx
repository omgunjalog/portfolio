"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { n: "01", title: "Understand", body: "I start with your problem and your users, not a tech stack. What has to be true for this to be worth building?" },
  { n: "02", title: "Define", body: "We agree on the smallest thing that delivers real value, and the architecture that won't need a rewrite to grow." },
  { n: "03", title: "Design", body: "Interface, data model, and flows designed together — mobile-first, accessible, and honest about scope." },
  { n: "04", title: "Build", body: "Production code from day one: typed, tested where it matters, server-first, with security built in — not bolted on." },
  { n: "05", title: "Ship", body: "Deployed on Vercel with CI, documented for hand-off, and — where it fits — editable by you without a developer in the loop." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="story-sec border-t border-line py-20 md:py-28">
      <div className="wrap">
        <SectionHeading index="03" eyebrow="How I Work" title="Five steps, in order.">
          The same sequence whether it&apos;s a movement site or an escrow
          marketplace. It&apos;s why the work ships.
        </SectionHeading>

        <div ref={ref} className="relative mt-14">
          {/* drawing connector line */}
          <div className="absolute left-0 top-[7px] hidden h-px w-full bg-line md:block">
            <motion.div
              className="h-full origin-left bg-accent"
              style={reduce ? { scaleX: 1 } : { scaleX: draw }}
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="group relative"
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10 mb-5 block h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-accent" />
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm text-accent">{s.n}</span>
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
