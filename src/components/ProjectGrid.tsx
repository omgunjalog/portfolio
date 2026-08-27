import { projects } from "@/lib/projects";
import { SectionHeading } from "./SectionHeading";
import { FeatureRow } from "./FeatureRow";
import { DragGallery } from "./DragGallery";
import { Reveal } from "./ui/Reveal";

export function ProjectGrid() {
  const featured = projects.filter((p) => p.featured);
  // order the drag strip: featured first, then the rest by year
  const all = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });

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

        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <DragGallery projects={all} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
