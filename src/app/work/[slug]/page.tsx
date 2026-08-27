import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ImageOff } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import {
  caseStudyProjects,
  getProject,
  categoryLabel,
  statusLabel,
} from "@/lib/projects";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${categoryLabel[project.category]}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Om Gunjal`,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal as="section" className="grid gap-4 py-8 md:grid-cols-[180px_1fr] md:gap-10">
      <h2 className="t-label text-accent!">{title}</h2>
      <div className="max-w-2xl space-y-4">
        {items.map((p, i) => (
          <p key={i} className="t-body text-ink-2">
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;

  return (
    <>
      <article className="pt-28 md:pt-32">
        <div className="wrap">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} /> All work
          </Link>

          {/* Header */}
          <header className="mt-8 border-b border-line pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="t-label text-ink-2!">
                {categoryLabel[project.category]}
              </span>
              <span className="text-ink-3">·</span>
              <span className="font-mono text-xs text-ink-3">{project.year}</span>
              <span className="text-ink-3">·</span>
              <span className="font-mono text-xs text-ink-3">
                {statusLabel[project.status]}
              </span>
            </div>

            <h1 className="t-hero mt-5">{project.title}</h1>
            <p className="t-body mt-4 max-w-2xl text-ink-2">{project.tagline}</p>

            {project.client && (
              <p className="mt-3 text-sm text-ink-3">Client: {project.client}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl} external arrow>
                  Visit live site
                </Button>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon size={16} /> Repository
                </a>
              )}
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <dt className="t-label mb-1.5">Role</dt>
                <dd className="text-sm text-ink-2">{project.role}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="t-label mb-1.5">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-ink-2"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            {project.contribution && (
              <p className="mt-6 rounded-xl border border-line bg-panel px-4 py-3 text-sm text-ink-2">
                <span className="font-medium text-ink">Team project. </span>
                {project.contribution}
              </p>
            )}
          </header>

          {/* Lead image */}
          {project.image ? (
            <Reveal as="div" className="mt-10">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.tagline}`}
                  fill
                  sizes="(max-width: 1120px) 100vw, 1120px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </Reveal>
          ) : null}

          {/* Metrics */}
          {project.metrics && (
            <Reveal as="div" className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-bg-2 p-6">
                  <p className="text-2xl font-semibold text-accent">
                    <Counter value={m.value} />
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{m.label}</p>
                </div>
              ))}
            </Reveal>
          )}

          {/* Narrative */}
          <div className="mt-6 divide-y divide-line">
            <Block title="Overview" items={[cs.overview]} />
            <Block title="Problem" items={cs.problem} />
            <Block title="Approach" items={cs.approach} />
            <Block title="Build" items={cs.build} />
            <Block title="Experience" items={cs.experience} />
            <Block title="Result" items={cs.result} />
            <Block title="Reflection" items={cs.reflection} />
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-10 border-t border-line pt-10">
              <p className="t-label mb-6">Gallery</p>
              <div className="grid gap-5 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <Reveal as="div" key={g.src}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Honest placeholders for assets still needed */}
          {cs.assetsNeeded && cs.assetsNeeded.length > 0 && (
            <section className="mt-10 rounded-2xl border border-dashed border-line-2 p-6">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <ImageOff size={16} className="text-ink-3" />
                Assets to add before this goes client-facing
              </p>
              <ul className="mt-3 space-y-1.5">
                {cs.assetsNeeded.map((a) => (
                  <li key={a} className="font-mono text-xs text-ink-3">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CTA */}
          <div className="my-16 flex flex-col items-start gap-4 rounded-2xl border border-line bg-bg-2 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="t-head">Want something like this?</h2>
              <p className="mt-2 text-sm text-ink-2">
                Tell me the problem — I&apos;ll tell you the shortest path to
                shipping it.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#180f02]"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
