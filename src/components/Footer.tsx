import Link from "next/link";
import { Mail } from "lucide-react";
import { site, nav } from "@/lib/site";
import { GithubIcon } from "./ui/GithubIcon";

export function Footer() {
  return (
    <footer className="relative bg-bg/90 backdrop-blur-[2px] border-t border-line py-12">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[#180f02]"
            >
              O
            </span>
            Om Gunjal
          </Link>
          <p className="mt-3 text-sm text-ink-2">{site.role}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <p className="t-label mb-3">Sitemap</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="t-label mb-3">Elsewhere</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  <GithubIcon size={14} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Om Gunjal. All rights reserved.</p>
        <p>Built with Next.js.</p>
      </div>
    </footer>
  );
}
