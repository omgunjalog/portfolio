import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Understand",
    body: "I start with your problem and your users, not a tech stack. What has to be true for this to be worth building?",
  },
  {
    n: "02",
    title: "Define",
    body: "We agree on the smallest thing that delivers real value, and the architecture that won't need a rewrite to grow.",
  },
  {
    n: "03",
    title: "Design",
    body: "Interface, data model, and flows designed together — mobile-first, accessible, and honest about scope.",
  },
  {
    n: "04",
    title: "Build",
    body: "Production code from day one: typed, tested where it matters, server-first, with security built in — not bolted on.",
  },
  {
    n: "05",
    title: "Ship",
    body: "Deployed on Vercel with CI, documented for hand-off, and — where it fits — editable by you without a developer in the loop.",
  },
];

export function Process() {
  return (
    <section className="story-sec border-t border-line py-20 md:py-28">
      <div className="wrap">
        <SectionHeading index="03" eyebrow="How I Work" title="Five steps, in order.">
          The same sequence whether it&apos;s a movement site or an escrow
          marketplace. It&apos;s why the work ships.
        </SectionHeading>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="bg-bg-2">
              <div className="flex h-full flex-col p-6">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
