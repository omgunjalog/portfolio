"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const groups = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "Vite"] },
  { label: "Backend", items: ["Python", "FastAPI", "Flask", "Node.js", "Express", "NestJS"] },
  { label: "AI / ML", items: ["RAG pipelines", "OCR", "Vector databases", "scikit-learn", "LangChain", "Gemini API"] },
  { label: "Infrastructure", items: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "Docker", "Vercel"] },
];

export function Capabilities() {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };
  const item = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="story-sec border-t border-line py-20 md:py-28">
      <div className="wrap">
        <SectionHeading index="04" eyebrow="Capabilities" title="The stack I actually ship with.">
          Not a skills wall — the real spread behind the projects above.
        </SectionHeading>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              className="group/col h-full bg-bg-2 p-6 transition-colors duration-300 hover:bg-[#141417]"
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
            >
              <div className="mb-5 flex items-center gap-2">
                <h3 className="t-label text-accent!">{g.label}</h3>
                <motion.span
                  className="h-px flex-1 origin-left bg-line-2"
                  initial={reduce ? undefined : { scaleX: 0 }}
                  whileInView={reduce ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + gi * 0.06 }}
                />
              </div>
              <motion.ul
                className="space-y-2.5"
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, margin: "-10%" }}
              >
                {g.items.map((it) => (
                  <motion.li
                    key={it}
                    variants={reduce ? undefined : item}
                    className="group/item flex cursor-default items-center gap-2.5 text-sm text-ink-2 transition-all duration-200 hover:translate-x-1 hover:text-ink"
                  >
                    <span className="h-1 w-1 rounded-full bg-ink-3 transition-all duration-200 group-hover/item:w-3 group-hover/item:bg-accent" />
                    {it}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
