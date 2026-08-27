import { Brain, LayoutGrid, Sparkles, Workflow, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { TiltCard } from "./ui/TiltCard";

const services = [
  {
    icon: Brain,
    title: "AI Products",
    who: "Founders with an AI idea that needs to actually work in production.",
    delivered:
      "RAG pipelines, OCR + ML classification, LLM features with explainable output — not demos, deployable systems.",
    tech: "Python · FastAPI · LangChain · vector DBs · Gemini",
  },
  {
    icon: LayoutGrid,
    title: "SaaS & Web Applications",
    who: "Teams that need a real product surface with auth, data, and payments.",
    delivered:
      "Full-stack apps with a considered architecture — modular backends, typed contracts, security built in.",
    tech: "Next.js · TypeScript · Postgres · NestJS · Prisma",
  },
  {
    icon: Sparkles,
    title: "Premium Websites",
    who: "Organizations and businesses whose site is their first impression.",
    delivered:
      "Fast, accessible, CMS-backed sites the owner can edit themselves — built mobile-first, not shrunk from desktop.",
    tech: "Next.js · Sanity · Tailwind · Vercel",
  },
  {
    icon: Workflow,
    title: "Automation",
    who: "Anyone doing by hand what a pipeline should be doing for them.",
    delivered:
      "Data pipelines, background workers, and reproducible workflows that run without babysitting.",
    tech: "Python · Celery · Redis · Docker",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    who: "Founders who need to put a real thing in front of users, soon.",
    delivered:
      "A focused, production-quality first version — architected so version two isn't a rewrite.",
    tech: "Next.js · FastAPI · Firebase · Vercel",
  },
];

export function Services() {
  return (
    <section id="services" data-chapter="core" className="scroll-mt-24 story-sec border-t border-line py-20 md:py-28">
      <div className="wrap">
        <SectionHeading index="02" eyebrow="Services" title="What I can build for you.">
          Organized by the outcome you need, not the stack I happen to like.
        </SectionHeading>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06} as="div">
                <TiltCard className="h-full">
                  <div className="group panel flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent/50">
                    <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-panel text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-2">
                      <span className="text-ink-3">For</span> {s.who}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      {s.delivered}
                    </p>
                    <p className="mt-4 border-t border-line pt-4 font-mono text-xs text-ink-3">
                      {s.tech}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}

          <Reveal delay={0.06} as="div">
            <div className="panel flex h-full flex-col justify-center gap-4 border-dashed p-6">
              <p className="t-body text-ink">
                Not sure which of these you need?
              </p>
              <p className="text-sm text-ink-2">
                Tell me the problem. I&apos;ll tell you the shortest honest path
                to shipping it.
              </p>
              <Button href="/#contact" variant="ghost" arrow className="self-start">
                Start a Project
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
