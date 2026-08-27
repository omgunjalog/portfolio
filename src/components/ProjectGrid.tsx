import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, categoryLabel } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { SectionHeading } from "./SectionHeading";
import { FeatureRow } from "./FeatureRow";
import { Reveal } from "./ui/Reveal";

function projectHref(p: Project) {
  return p.caseStudy ? `/work/${p.slug}` : p.liveUrl ?? p.github ?? "#";
}

function IndexRow({ project, n }: { project: Project; n: number }) {
  const internal = Boolean(project.caseStudy);
  const href = projectHref(project);

  const inner = (
    <div className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 transition-colors md:grid-cols-[3rem_1fr_10rem_5rem_auto] md:gap-6">
      <span className="font-mono text-sm tabular-nums text-ink-3">
        {String(n + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </span>
        <span className="ml-3 hidden text-sm text-ink-2 md:inline">
          {project.tagline}
        </span>
      </span>
      <span className="hidden t-label text-ink-2! md:block">
        {categoryLabel[project.category]}
      </span>
      <span className="hidden font-mono text-xs text-ink-3 md:block">
        {project.year}
      </span>
      <ArrowRight
        size={16}
        className="justify-self-end text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
      />
    </div>
  );

  return (
    <li className="border-t border-line">
      {internal ? (
        <Link href={href} className="block px-1 hover:bg-bg-2">
          {inner}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="block px-1 hover:bg-bg-2"
        >
          {inner}
        </a>
      )}
    </li>
  );
}

export function ProjectGrid() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="story-sec scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title="Real projects, shipped for real people."
        >
          A grassroots movement, an engineering department, a creator-economy
          marketplace, an AI lighting rig. Different registers — all built to run
          in production.
        </SectionHeading>

        <div className="mt-10">
          {featured.map((p, i) => (
            <FeatureRow key={p.slug} project={p} n={i} />
          ))}
        </div>

        <div className="mt-16">
          <p className="t-label mb-2">More work</p>
          <ul className="border-b border-line">
            {rest.map((p, i) => (
              <IndexRow key={p.slug} project={p} n={featured.length + i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
