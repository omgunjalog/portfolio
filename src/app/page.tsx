import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Capabilities } from "@/components/Capabilities";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { StorySpacer } from "@/components/StorySpacer";

export default function Home() {
  return (
    <>
      {/* 00 · Seed */}
      <Hero />

      {/* 01 · System */}
      <StorySpacer
        eyebrow="Chapter 01 · System"
        chapter="globe"
        words={[
          { text: "Every" },
          { text: "idea" },
          { text: "starts" },
          { text: "as" },
          { text: "a" },
          { text: "seed.", break: true },
          { text: "I" },
          { text: "grow" },
          { text: "it" },
          { text: "into" },
          { text: "a" },
          { text: "system.", serif: true, accent: true },
        ]}
      />

      <ProjectGrid />

      <Marquee
        items={[
          "AI PRODUCTS",
          "SAAS PLATFORMS",
          "PREMIUM WEBSITES",
          "RAG PIPELINES",
          "ESCROW SYSTEMS",
          "REAL-TIME 3D",
          "SHIPPED, NOT DEMOED",
        ]}
      />

      {/* 02 · Engine */}
      <StorySpacer
        eyebrow="Chapter 02 · Engine"
        chapter="core"
        words={[
          { text: "One" },
          { text: "engine", serif: true, accent: true },
          { text: "behind", break: true },
          { text: "all" },
          { text: "of" },
          { text: "it." },
        ]}
      />

      <Services />
      <Process />
      <Capabilities />
      <About />

      {/* 03 · Bloom */}
      <StorySpacer
        eyebrow="Chapter 03 · Bloom"
        chapter="bloom"
        words={[
          { text: "The" },
          { text: "same" },
          { text: "system,", break: true },
          { text: "many", serif: true, accent: true },
          { text: "shapes.", serif: true, accent: true },
        ]}
        footer={
          <div className="mt-8 flex justify-center">
            <Link
              href="/templates"
              data-cursor
              className="inline-flex items-center gap-2 rounded-[3px] border border-line-2 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Explore templates <ArrowUpRight size={16} />
            </Link>
          </div>
        }
      />

      <Contact />
      <Footer />
    </>
  );
}
