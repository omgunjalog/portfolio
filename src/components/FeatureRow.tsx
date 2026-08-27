"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel, statusLabel } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { FeatureMedia } from "./FeatureMedia";

const SHAPE: Record<string, string> = {
  "jaihind-lok-chalwal": "tree",
  lettit: "ledger",
  lumora: "spectrum",
  "sres-2026": "globe",
};

function projectHref(p: Project) {
  return p.caseStudy ? `/work/${p.slug}` : (p.liveUrl ?? p.github ?? "#");
}

function StatusTag({ status }: { status: Project["status"] }) {
  const dot =
    status === "live"
      ? "bg-emerald-400"
      : status === "in-progress"
        ? "bg-accent"
        : "bg-ink-3";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-2">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {statusLabel[status]}
    </span>
  );
}

function Wrapper({
  internal,
  href,
  children,
}: {
  internal: boolean;
  href: string;
  children: ReactNode;
}) {
  return internal ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}

const chips = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const chip = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function FeatureRow({ project, n }: { project: Project; n: number }) {
  const flip = n % 2 === 1;
  const internal = Boolean(project.caseStudy);
  const href = projectHref(project);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dir = flip ? -1 : 1;
  const textX = useTransform(scrollYProgress, [0, 0.4], [46 * dir, 0]);
  const mediaX = useTransform(scrollYProgress, [0, 0.4], [-34 * dir, 0]);
  const fade = useTransform(scrollYProgress, [0.02, 0.34], [0, 1]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["36%", "-36%"]);

  const body = (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block font-mono text-sm tabular-nums text-accent transition-transform duration-300 group-hover:scale-125">
          {String(n + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-line-2 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
        <span className="t-label text-ink-2!">{categoryLabel[project.category]}</span>
        <span className="text-ink-3">·</span>
        <span className="font-mono text-xs text-ink-3">{project.year}</span>
      </div>

      <h3 className="text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-4xl">
        {project.title}
      </h3>
      {project.client && <p className="mt-1.5 text-sm text-ink-3">{project.client}</p>}

      <p className="mt-4 max-w-md text-ink-2">{project.tagline}</p>

      <motion.div
        className="mt-6 flex flex-wrap gap-1.5"
        variants={reduce ? undefined : chips}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.6 }}
      >
        {project.technologies.slice(0, 5).map((t) => (
          <motion.span
            key={t}
            variants={reduce ? undefined : chip}
            className="rounded-[2px] border border-line px-2.5 py-1 font-mono text-[0.68rem] text-ink-2 transition-colors duration-200 hover:border-accent/60 hover:text-ink"
          >
            {t}
          </motion.span>
        ))}
      </motion.div>

      <div className="mt-7 flex items-center gap-5">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent">
          {internal ? "Read case study" : "Visit project"}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
        <StatusTag status={project.status} />
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      data-chapter={SHAPE[project.slug]}
      className="relative border-t border-line py-14 md:py-20"
    >
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: ghostY }}
        className="pointer-events-none absolute right-2 top-2 select-none font-mono text-[7rem] font-bold leading-none text-ink/[0.035] md:right-8 md:text-[11rem]"
      >
        {String(n + 1).padStart(2, "0")}
      </motion.span>

      <Wrapper internal={internal} href={href}>
        <div className="group relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
          <motion.div
            style={reduce ? undefined : { x: mediaX, opacity: fade }}
            className={flip ? "md:order-2" : ""}
          >
            <FeatureMedia project={project} />
          </motion.div>
          <motion.div
            style={reduce ? undefined : { x: textX, opacity: fade }}
            className={flip ? "md:order-1" : ""}
          >
            {body}
          </motion.div>
        </div>
      </Wrapper>
    </div>
  );
}
