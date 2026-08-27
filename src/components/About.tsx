import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" data-chapter="core" className="scroll-mt-24 story-sec border-t border-line py-20 md:py-28">
      <div className="wrap grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading index="05" eyebrow="About" title="Who's building this." />

        <div className="max-w-2xl space-y-5">
          <Reveal>
            <p className="t-body text-ink">
              I&apos;m Om — I design and build software that runs in production.
              My work spans three registers most portfolios never touch at once:
              a grassroots environmental movement, a college engineering
              department, and AI products from health-tech to real-time lighting.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-body text-ink-2">
              I work full-stack, from the database up. That means I care about the
              parts a founder can&apos;t see on the surface but feels the day
              something goes wrong — how money moves, how access is enforced, how
              the thing behaves under load — as much as the parts they can.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-body text-ink-2">
              I&apos;d rather ship one honest, well-built thing than promise ten.
              When the simpler path serves you better, I&apos;ll tell you — even
              when it means deleting work I&apos;ve already done.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="font-mono text-xs text-ink-3">
              Based in {site.location}. Available worldwide.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
