"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import {
  categoryLabel,
  statusLabel,
  type Project,
} from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";

function href(p: Project) {
  return p.caseStudy ? `/work/${p.slug}` : (p.liveUrl ?? p.github ?? "#");
}

function Card({ project }: { project: Project }) {
  const internal = Boolean(project.caseStudy);
  const dot =
    project.status === "live"
      ? "bg-emerald-400"
      : project.status === "in-progress"
        ? "bg-accent"
        : "bg-ink-3";

  const inner = (
    <div className="group relative w-[300px] shrink-0 overflow-hidden border border-line bg-bg-2 transition-colors duration-300 hover:border-accent/50 sm:w-[360px]">
      <div className="relative aspect-video w-full overflow-hidden border-b border-line">
        <div className="graph-grid absolute inset-0 opacity-30" />
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            draggable={false}
            sizes="360px"
            className="pointer-events-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="t-label text-ink-2!">
            {categoryLabel[project.category]} · {project.year}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-ink-2">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            {statusLabel[project.status]}
          </span>
        </div>
        <h3 className="flex items-center gap-1.5 text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
          {project.title}
          <ArrowUpRight size={15} className="text-ink-3 transition-colors group-hover:text-accent" />
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">{project.tagline}</p>
      </div>
    </div>
  );

  return internal ? (
    <Link href={href(project)} className="block" draggable={false}>
      {inner}
    </Link>
  ) : (
    <a
      href={href(project)}
      target="_blank"
      rel="noreferrer noopener"
      className="block"
      draggable={false}
    >
      {inner}
    </a>
  );
}

/** A horizontally draggable filmstrip — grab and fling to browse every project. */
export function DragGallery({ projects }: { projects: Project[] }) {
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
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="t-label">Explore everything</p>
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-3">
          <MoveHorizontal size={14} className="text-accent" /> Drag
        </span>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          ref={track}
          className="flex w-max cursor-grab gap-5 pb-2 active:cursor-grabbing"
          drag={reduce ? false : "x"}
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.06}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((p) => (
            <Card key={p.slug} project={p} />
          ))}
        </motion.div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </div>
  );
}
