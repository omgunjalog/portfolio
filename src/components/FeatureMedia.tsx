"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";

/**
 * The project frame as an interactive object: it tilts toward the cursor, a
 * warm spotlight tracks the pointer, and on hover the image ripples via an
 * animated SVG turbulence/displacement filter (a liquid distortion).
 */
export function FeatureMedia({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const uid = useId().replace(/[:]/g, "");
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const hover = useRef(0);
  const targetHover = useRef(0);

  // liquid ripple: ramp displacement toward hover and drift turbulence
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const loop = (t: number) => {
      hover.current += (targetHover.current - hover.current) * 0.08;
      const h = hover.current;
      if (dispRef.current)
        dispRef.current.setAttribute("scale", (h * 26).toFixed(2));
      if (turbRef.current) {
        const bf = 0.008 + 0.004 * Math.sin(t / 900) + h * 0.004;
        turbRef.current.setAttribute("baseFrequency", `${bf.toFixed(4)} ${(bf * 1.4).toFixed(4)}`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

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
  const spotlight = useMotionTemplate`radial-gradient(38% 48% at ${spotX} ${spotY}, rgba(255,214,140,0.4), transparent 72%)`;

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => (targetHover.current = 1)}
      onMouseLeave={() => {
        targetHover.current = 0;
        mx.set(0.5);
        my.set(0.5);
      }}
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

      {!reduce && (
        <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
          <filter id={`liquid-${uid}`}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008 0.011"
              numOctaves={2}
              seed={3}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div
        className="absolute inset-0"
        style={reduce ? undefined : { filter: `url(#liquid-${uid})` }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
    </motion.div>
  );
}
