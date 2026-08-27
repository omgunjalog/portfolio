import { Fragment } from "react";

/**
 * A quiet kinetic band of scrolling labels. Pure CSS animation; halts under
 * prefers-reduced-motion via the global reduced-motion rule.
 */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-bg-2/85 backdrop-blur-[2px] py-4">
      <div
        className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-8"
        style={{ willChange: "transform" }}
      >
        {loop.map((it, i) => (
          <Fragment key={i}>
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-ink-2">
              {it}
            </span>
            <span className="text-accent">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
