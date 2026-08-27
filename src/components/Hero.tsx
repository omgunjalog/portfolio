"use client";

import { motion } from "motion/react";
import { site } from "@/lib/site";
import { useIntroReady } from "@/lib/useIntroReady";
import { MagneticButton } from "./ui/MagneticButton";
import { Button } from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const ready = useIntroReady();
  const show = ready ? "show" : "hidden";

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      data-chapter="tree"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,11,12,0.82) 0%, rgba(11,11,12,0.5) 45%, transparent 75%), radial-gradient(80% 70% at 25% 45%, rgba(11,11,12,0.6), transparent 75%)",
        }}
      />

      <motion.div
        className="wrap relative z-10 py-28"
        initial="hidden"
        animate={show}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div variants={item} transition={{ duration: 0.6, ease }} className="mb-8 flex items-center gap-3">
          <span className="t-label">Om Gunjal</span>
          <span className="h-px w-8 bg-line-2" />
          <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {site.availability}
          </span>
        </motion.div>

        <h1 className="t-hero max-w-[18ch]">
          <motion.span variants={item} transition={{ duration: 0.7, ease }} className="block">
            I build the thing
          </motion.span>
          <motion.span variants={item} transition={{ duration: 0.7, ease }} className="block">
            you need <span className="t-serif accent-text">shipped.</span>
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease }}
          className="t-body mt-8 max-w-[46ch] text-ink-2"
        >
          AI Product Builder & Full-Stack Developer. Production AI products, SaaS
          platforms, and websites — for startups, institutions, and grassroots
          organizations alike.
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="/#contact">Start a Project</MagneticButton>
          <Button href="/#work" variant="ghost" arrow>
            View My Work
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease }}
          className="mt-10 font-mono text-[0.7rem] text-ink-3"
        >
          Currently building{" "}
          <span className="text-ink-2">{site.currentlyBuilding}</span>
        </motion.p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3">
          <span className="h-8 w-px animate-pulse bg-line-2" />
          Scroll
        </span>
      </div>
    </section>
  );
}
