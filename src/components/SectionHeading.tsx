import type { ReactNode } from "react";
import { Reveal } from "./ui/Reveal";
import { KineticText } from "./ui/KineticText";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-2xl" id={id}>
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <span className="sec-index">§ {index}</span>
          <span className="h-px w-8 bg-line-2" />
          <span className="t-label">{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="t-head">
        <KineticText text={title} />
      </h2>
      {children && (
        <Reveal delay={0.15}>
          <p className="t-body mt-4 text-ink-2">{children}</p>
        </Reveal>
      )}
    </div>
  );
}
