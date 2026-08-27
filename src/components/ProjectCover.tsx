import type { Project } from "@/lib/projects";
import { categoryLabel } from "@/lib/projects";

/**
 * For projects without a real screenshot yet, render an honest branded
 * cover — obviously a graphic, never mistakable for a product capture.
 * Deterministic per project so it stays stable.
 */
export function ProjectCover({ project }: { project: Project }) {
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-2">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`grid-${project.slug}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="var(--border)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`cg-${project.slug}`} cx="78%" cy="18%" r="80%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill={`url(#grid-${project.slug})`} />
        <rect width="400" height="260" fill={`url(#cg-${project.slug})`} />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="t-label">{categoryLabel[project.category]}</span>
        <span
          className="font-mono text-5xl font-semibold text-ink/90"
          aria-hidden
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
