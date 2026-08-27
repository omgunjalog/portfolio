"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";

/**
 * The project frame as an interactive object: it tilts in 3D toward the
 * cursor, a warm spotlight tracks the pointer, and the image drifts on scroll.
 */
export function FeatureMedia({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const py = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 16,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 150,
    damping: 16,
  });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(38% 48% at ${spotX} ${spotY}, rgba(255,214,140,0.35), transparent 72%)`;

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
              transformPerspective: 1000,
            }
      }
      className="relative aspect-video w-full overflow-hidden border border-line bg-bg-2 transition-colors duration-500 group-hover:border-accent/50"
    >
      <div className="graph-grid absolute inset-0 opacity-30" />
      <motion.div
        style={reduce ? undefined : { y: py }}
        className="absolute inset-x-0 -inset-y-[11%]"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </motion.div>

      {/* cursor spotlight */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      {/* corner ticks — read as a framed object */}
      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
    </motion.div>
  );
}
