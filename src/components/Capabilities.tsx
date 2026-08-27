import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./ui/Reveal";

const groups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "Vite"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Flask", "Node.js", "Express", "NestJS"],
  },
  {
    label: "AI / ML",
    items: [
      "RAG pipelines",
      "OCR",
      "Vector databases",
      "scikit-learn",
      "LangChain",
      "Gemini API",
    ],
  },
  {
    label: "Infrastructure",
    items: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "Docker", "Vercel"],
  },
];

export function Capabilities() {
  return (
    <section className="story-sec border-t border-line py-20 md:py-28">
      <div className="wrap">
        <SectionHeading index="04" eyebrow="Capabilities" title="The stack I actually ship with.">
          Not a skills wall — the real spread behind the projects above.
        </SectionHeading>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05} className="bg-bg-2">
              <div className="h-full p-6">
                <h3 className="t-label text-accent!">{g.label}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-ink-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-ink-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
