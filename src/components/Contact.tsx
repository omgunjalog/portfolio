import { Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";
import { GithubIcon } from "./ui/GithubIcon";

export function Contact() {
  return (
    <section id="contact" data-chapter="bloom" className="scroll-mt-24 story-sec border-t border-line py-20 md:py-28">
      <div className="wrap grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading index="06" eyebrow="Contact" title="Have an idea worth building?">
            Tell me what you&apos;re trying to make. I&apos;ll reply with the
            shortest honest path to shipping it — no pitch deck required.
          </SectionHeading>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line text-accent">
                    <Mail size={16} />
                  </span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line text-accent">
                    <GithubIcon size={16} />
                  </span>
                  github.com/omgunjalog
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-line text-accent">
                  <MapPin size={16} />
                </span>
                {site.location}
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.06} as="div">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
