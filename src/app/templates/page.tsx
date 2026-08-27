import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { templates } from "@/lib/templates";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Marquee } from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Templates — Production Starters",
  description:
    "Production-grade starting points for e-commerce, ERP, CRM, AI MVPs, automation, and premium websites — built on patterns shipped in real projects.",
};

export default function TemplatesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44">
        <div className="graph-grid absolute inset-0 -z-10 opacity-40" />
        <div className="wrap">
          <div className="mb-6 flex items-center gap-3">
            <span className="sec-index">§ Templates</span>
            <span className="h-px w-8 bg-line-2" />
            <span className="t-label">Production starters</span>
          </div>
          <h1 className="t-hero max-w-[16ch]">
            Starting lines, <span className="t-serif accent-text">not</span> blank
            pages.
          </h1>
          <p className="t-body mt-8 max-w-[54ch] text-ink-2">
            Every kind of product below shares the same spine — typed contracts,
            a real data model, security built in. Some are shipped foundations I
            can adapt to you; others are build-ready from patterns proven in
            production. Pick a lane; I&apos;ll get you to a working v1.
          </p>
        </div>
      </section>

      <Marquee
        items={[
          "E-COMMERCE",
          "ERP",
          "CRM",
          "AI MVP",
          "AUTOMATION",
          "PREMIUM SITES",
          "TYPED END-TO-END",
          "SHIP THE V1",
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {templates.map((tpl, i) => {
            const Icon = tpl.icon;
            return (
              <Reveal key={tpl.id} delay={(i % 2) * 0.06} as="div">
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col border border-line bg-bg-2 p-7">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-sm tabular-nums text-accent">
                        {tpl.n}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-[3px] border border-line text-accent">
                        <Icon size={20} />
                      </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-medium tracking-tight">
                      {tpl.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      {tpl.tagline}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                      {tpl.modules.map((m) => (
                        <li
                          key={m}
                          className="flex items-center gap-2 text-sm text-ink-2"
                        >
                          <Check size={13} className="shrink-0 text-accent" />
                          {m}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {tpl.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-[2px] border border-line px-2.5 py-1 font-mono text-[0.68rem] text-ink-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                          tpl.state === "built" ? "text-emerald-400" : "text-ink-2"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            tpl.state === "built" ? "bg-emerald-400" : "bg-accent"
                          }`}
                        />
                        {tpl.stateLabel}
                      </span>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                      >
                        Start a build
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="wrap mt-10">
          <p className="max-w-2xl font-mono text-xs leading-relaxed text-ink-3">
            Honest note: E-Commerce and Premium Site are backed by real, shipped
            work. ERP, CRM, AI MVP, and Automation are build-ready starting points
            based on the same production patterns — not off-the-shelf products.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="t-head">Don&apos;t see your exact thing?</h2>
            <p className="mt-2 text-ink-2">
              These are starting points, not a menu. Tell me what you&apos;re
              building.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] bg-accent px-7 py-3.5 text-sm font-semibold text-[#180f02]"
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
