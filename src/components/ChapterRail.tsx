"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { scrollStore } from "./three/scrollStore";

const CHAPTERS = ["Seed", "System", "Work", "Engine", "Bloom"];

/** A slim right-side rail: narrative progress + jump-to-chapter. Desktop only. */
export function ChapterRail() {
  const pathname = usePathname();
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setP((prev) => prev + (scrollStore.p - prev) * 0.15);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (pathname !== "/") return null;

  const active = Math.round(p * (CHAPTERS.length - 1));

  const jump = (i: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: (i / (CHAPTERS.length - 1)) * max,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {CHAPTERS.map((c, i) => {
        const on = i === active;
        return (
          <button
            key={c}
            type="button"
            data-cursor
            onClick={() => jump(i)}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${c}`}
          >
            <span
              className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                on
                  ? "text-accent opacity-100"
                  : "text-ink-3 opacity-0 group-hover:opacity-100"
              }`}
            >
              {c}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                on ? "w-8 bg-accent" : "w-4 bg-line-2 group-hover:bg-ink-3"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
