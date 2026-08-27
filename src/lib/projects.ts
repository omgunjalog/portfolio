export type ProjectCategory = "product" | "client-site" | "ai-ml" | "template";
export type ProjectStatus = "live" | "in-progress" | "coming-soon";

export type CaseStudy = {
  overview: string;
  problem: string[];
  approach: string[];
  build: string[];
  experience: string[];
  /** Only measured, verifiable facts belong here. */
  result: string[];
  reflection: string[];
  /** Marked TODOs for real assets still needed — rendered as honest placeholders. */
  assetsNeeded?: string[];
};

export type Project = {
  title: string;
  slug: string;
  client?: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  year: number;
  role: string;
  /** Team credit, when the work was not solo. */
  contribution?: string;
  technologies: string[];
  /** Real screenshot path, or null to render a generated cover (never a fake screenshot). */
  image: string | null;
  gallery?: { src: string; alt: string }[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  status: ProjectStatus;
  metrics?: { label: string; value: string }[];
};

export const categoryLabel: Record<ProjectCategory, string> = {
  product: "Product",
  "client-site": "Client Site",
  "ai-ml": "AI / ML",
  template: "Template",
};

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  "coming-soon": "Coming soon",
};

export const projects: Project[] = [
  {
    title: "Jaihind Lok Chalwal",
    slug: "jaihind-lok-chalwal",
    client: "Jaihind People's Movement (JPM)",
    tagline: "A movement's home on the web — 24 routes, self-editable by the team.",
    description:
      "Production site for a grassroots social movement founded in 1999 in Sangamner. Eight focus areas, a monthly magazine, campaigns, and volunteer/donation flows — all editable by non-technical organisers through an embedded CMS.",
    category: "client-site",
    year: 2025,
    role: "Sole developer — design, build, CMS, and deployment.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Sanity CMS",
      "Tailwind CSS v4",
      "Playwright",
      "Vercel",
    ],
    image: "/work/jpm/01-homepage-hero.png",
    gallery: [
      { src: "/work/jpm/01-homepage-hero.png", alt: "JPM homepage hero with bilingual movement messaging" },
      { src: "/work/jpm/03-homepage-work-areas.png", alt: "The eight focus areas laid out as a grid" },
      { src: "/work/jpm/05-homepage-campaigns.png", alt: "Active campaigns section on the homepage" },
      { src: "/work/jpm/08-work.png", alt: "Work page detailing the movement's programmes" },
      { src: "/work/jpm/13-gallery.png", alt: "Photo gallery of movement activities" },
      { src: "/work/jpm/19-admin-panel.png", alt: "Embedded Sanity Studio admin panel for the team" },
    ],
    liveUrl: "https://jayhind-lok-chalwal.vercel.app",
    featured: true,
    status: "live",
    metrics: [
      { label: "Reforestation", value: "55,000+ trees" },
      { label: "Land greened", value: "100 acres" },
      { label: "Routes", value: "24" },
    ],
    caseStudy: {
      overview:
        "Jaihind People's Movement (JPM) is a non-profit founded in 1999 in Sangamner, Maharashtra, built on Gandhian thought and constitutional values. It works across eight areas — youth development, environment, education, agriculture, health, women's empowerment, employment, and entrepreneurship. The site had to speak to a Marathi-first audience, carry a monthly magazine, and — critically — be maintainable by organisers who don't write code.",
      problem: [
        "A movement this active generates content constantly: new campaigns, magazine issues, event galleries, volunteer drives. A static hand-coded site would have gone stale within a month and made the developer a permanent bottleneck.",
        "The audience is Marathi-first, on mobile, often on slower connections — so the site had to be fast and legible before it was anything else.",
      ],
      approach: [
        "I modelled every content type the movement actually produces in Sanity CMS — hero, focus areas, campaigns, magazine issues, galleries, testimonials — and embedded the Sanity Studio directly at /admin so the team edits their own site without leaving it.",
        "Server Components render the public pages statically for speed; only genuinely interactive pieces ship JavaScript to the browser.",
      ],
      build: [
        "Next.js 16 App Router with a mix of Server and Client Components; Tailwind CSS v4 for styling.",
        "Sanity.io as the content backbone, with an embedded Studio at /admin so organisers self-serve.",
        "Contact and volunteer forms are server-validated, rate-limited, and honeypot-protected, writing submissions straight into Sanity.",
        "Playwright smoke tests run in CI; a nightly script exports the full dataset as a backup. PWA manifest, generated sitemap, and a branded 404 round it out.",
      ],
      experience: [
        "The homepage opens on a bilingual hero and a live 'Green Movement' feed, then steps through the eight focus areas as a scannable grid rather than a wall of text.",
        "Every template was designed mobile-first and re-laid-out per breakpoint — not shrunk from desktop — because that's where the audience actually is.",
      ],
      result: [
        "Live and in daily use by the organisation at jayhind-lok-chalwal.vercel.app.",
        "The movement's Vani Saptashring Gad reforestation drive alone planted 55,000+ trees across 100 acres in 2025 — the kind of impact the site now documents and helps organise.",
        "Organisers publish new campaigns and magazine issues themselves, with no developer in the loop.",
      ],
      reflection: [
        "The real win wasn't the front end — it was handing a non-technical team a site they own. The moment they published their first campaign without me, the project had done its job.",
      ],
    },
  },
  {
    title: "Lettit",
    slug: "lettit",
    tagline: "An escrow-first operating system for the creator economy.",
    description:
      "A marketplace where creators own their careers and businesses discover, collaborate with, pay, and grow with them — escrow-first, with published fees and explainable AI. Built as a modular monolith with security enforced at the database layer.",
    category: "product",
    year: 2026,
    role: "Architect and full-stack developer.",
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "Row-Level Security",
      "Next.js 15",
      "LangChain",
      "Redis",
      "Docker",
    ],
    image: "/work/lettit/landing.png",
    gallery: [
      { src: "/work/lettit/landing.png", alt: "Lettit landing page — 'Let opportunities happen' with a live escrow-activity ticker" },
      { src: "/work/lettit/dashboard.png", alt: "Creator dashboard — escrow balance, trust score, active campaigns, and AI fair-range offers" },
    ],
    liveUrl: undefined,
    featured: true,
    status: "in-progress",
    caseStudy: {
      overview:
        "Lettit is an attempt to build the connective tissue between creators and the businesses that want to work with them: discovery, collaboration, escrow-protected payments, and growth — with published fees and explainable AI rather than a black box. India and global from day one.",
      problem: [
        "Creator marketplaces routinely fail on two fronts: money (who holds it, who releases it, what the platform quietly skims) and trust (opaque matching that no one can interrogate).",
        "The architectural temptation is to reach for microservices immediately and drown a pre-launch product in operational overhead.",
      ],
      approach: [
        "Escrow-first: funds are held and released against explicit milestones, and platform fees are published, not hidden.",
        "One deployable modular monolith containing every bounded context — a deliberate decision with a written justification and decision records, chosen over premature microservices.",
        "Security pushed down to the database: PostgreSQL Row-Level Security with two distinct DB roles, so the application's runtime role literally cannot perform the DDL that defines its own access policies.",
      ],
      build: [
        "FastAPI core as a modular monolith; a TypeScript client generated from the API's OpenAPI schema so the frontend and backend never drift.",
        "PostgreSQL 16/17 with RLS and a separate migration role; Redis for caching and queues; Alembic migrations.",
        "A separately deployable FastAPI + LangChain service for the explainable-AI matching layer.",
        "Next.js 15 for the creator + business product surface. Config refuses to boot in production with unsafe settings selected — the safety rail is code, not a checklist.",
      ],
      experience: [
        "The product surface is built around clarity about money and matching — the two things creators and businesses most distrust — surfaced rather than buried.",
      ],
      result: [
        "Core API architecture, database security model, and product surface are built; the platform is pre-launch.",
      ],
      reflection: [
        "The most interesting engineering here is invisible: making the database itself enforce that the app can't escalate its own privileges. It's the kind of decision a founder can't see on the surface but absolutely feels the day something goes wrong.",
      ],
      assetsNeeded: [
        "Gallery shows the product/landing design surface (pre-launch).",
        "[ADD LIVE URL] — when the platform reaches a shareable staging or launch state.",
      ],
    },
  },
  {
    title: "Lumora",
    slug: "lumora",
    tagline: "AI that turns music into light, in real time.",
    description:
      "A real-time, AI-driven lighting platform: it listens to audio, extracts beats, energy, and drops, maps them to lighting behaviour, and drives real DMX fixtures — with a live web dashboard and a virtual stage for previewing without hardware.",
    category: "ai-ml",
    year: 2025,
    role: "Sole developer — audio pipeline, engines, and dashboard.",
    technologies: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Audio DSP",
      "React",
      "Vite",
      "DMX / OLA",
    ],
    image: "/work/lumora/stage.png",
    gallery: [
      { src: "/work/lumora/stage.png", alt: "Lumora virtual stage with moving-head beams and the AI Brain panel reading BPM, mood, and intensity" },
      { src: "/work/lumora/stage-active.png", alt: "Lumora stage responding live with a scene preset applied" },
    ],
    featured: true,
    status: "in-progress",
    caseStudy: {
      overview:
        "Lumora is a real-time bridge from sound to light. Audio comes in from a microphone or a file; a feature engine pulls out RMS energy, BPM, beats, and drops and classifies the musical state; a lighting engine maps that to modes, intensity, speed, and effects, and pushes it to physical DMX fixtures — all controllable from a live web dashboard.",
      problem: [
        "Music-reactive lighting usually means either expensive proprietary consoles or crude 'flash on the beat' scripts. Neither understands the music.",
        "Real-time is unforgiving: analysis, mapping, and output all have to happen inside the latency budget of a beat, or the lights feel wrong.",
      ],
      approach: [
        "A clean pipeline of single-purpose engines — audio → features → lighting → output — so each stage can be reasoned about and tuned independently.",
        "A virtual stage renderer so the whole system can be developed and demoed without any physical rig attached.",
      ],
      build: [
        "Python audio engine capturing live input (sounddevice) or decoding WAV/MP3; a feature engine extracting energy, BPM, beats, drops, and state.",
        "A lighting engine mapping features to modes and effects, with DMX fixture profiles and channel management, output over Open Lighting Architecture.",
        "FastAPI + WebSocket server for real-time control, session recording, replay, scenes, and calibration; a React + Vite dashboard for live operation; a Pygame virtual stage with moving heads, lasers, strobes, and wash.",
      ],
      experience: [
        "The dashboard is built for a live operator: the state of the room is visible at a glance and adjustments land instantly, which is the whole point of a real-time tool.",
      ],
      result: [
        "A working end-to-end system — audio in, DMX out — with a browser dashboard and a hardware-free virtual stage for development and demos.",
      ],
      reflection: [
        "Getting the pipeline to feel musical rather than just synchronised was the hard, satisfying part — it's the difference between lights that blink and lights that dance.",
      ],
    },
  },
  {
    title: "SRES 2026",
    slug: "sres-2026",
    client: "Amrutvahini College of Engineering — Civil Department",
    tagline: "A conference site, shipped then deliberately simplified for production.",
    description:
      "The official website for SRES-26 — the International Conference on Sustainable and Resilient Engineering Systems, run by the Civil Department at Amrutvahini College of Engineering. Full-stack build with a Node/Express/MongoDB backend that was later simplified out of the public flow in favour of client-provided external forms — an honest 'ship, then simplify' story.",
    category: "client-site",
    year: 2026,
    role: "Full-stack developer — frontend, backend, and production hand-off.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS v4",
      "React Router",
      "Node.js / Express",
      "MongoDB",
    ],
    image: "/work/avcoe/sres.png",
    gallery: [
      { src: "/work/avcoe/sres.png", alt: "SRES-26 conference homepage — hero with dates, venue, and submit/register actions" },
    ],
    github: "https://github.com/omgunjalog/avcoe-civil-conference",
    featured: true,
    status: "in-progress",
    caseStudy: {
      overview:
        "A production website for SRES-26, the International Conference on Sustainable and Resilient Engineering Systems: programme, keynote speakers, committees, themes, registration, and abstract submission. What makes it worth telling isn't the feature list — it's the decision to remove complexity for the production deployment.",
      problem: [
        "Conferences need registration and abstract submission. The obvious build is a full backend with auth, tracking, and an admin panel — and that's exactly what I built first.",
        "But the client already had external registration and submission forms they trusted and controlled. Keeping a parallel custom backend live would have meant maintaining two sources of truth for no real gain.",
      ],
      approach: [
        "Build the full stack to understand the domain, then make the production deployment frontend-first: registration and abstract submission point at the client's own external forms.",
        "The public Vercel deployment deliberately does not expose the old tracking or admin routes — less surface area, less to break, nothing to maintain that the client didn't ask for.",
      ],
      build: [
        "Frontend: Vite + React + Tailwind CSS v4 + React Router, with React Hot Toast for feedback.",
        "Legacy backend (built, then retired from the public flow): Node.js, Express, MongoDB/Mongoose, Multer, JWT, and Nodemailer.",
        "Client-facing tutorial and architecture documentation written so the department can run the site after hand-off.",
      ],
      experience: [
        "A clean, structured conference site — programme and committees legible, the two actions attendees care about (register, submit) one tap away.",
      ],
      result: [
        "Built and deployed to production on Vercel (Vite + React) with a lean, low-maintenance frontend-first footprint. The public deployment is currently offline between conference cycles; the code and documentation are intact for redeployment.",
      ],
      reflection: [
        "The instinct to keep the backend I'd already written would have been the wrong one. Shipping well sometimes means deleting your own work when the simpler thing serves the client better.",
      ],
    },
  },
  {
    title: "NutriScan",
    slug: "nutriscan",
    tagline: "Point your camera at a food label; get a safety read.",
    description:
      "An OCR + ML tool that reads a food label from a photo, extracts the ingredients, checks them against allergy, health, and diet conflicts, and returns a risk level. Built with a team as a final-year academic project, with a later production-grade rebuild.",
    category: "ai-ml",
    year: 2025,
    role: "Team member — final-year academic project.",
    contribution:
      "Built with my team (Om, Pranali, Tejal, and others). My work centred on the backend and the OCR-to-ML pipeline that turns a label photo into a structured risk read.",
    technologies: [
      "Python",
      "Flask",
      "EasyOCR",
      "scikit-learn",
      "Firebase",
      "FastAPI (2.0)",
    ],
    image: null,
    github: "https://github.com/omgunjalog/NutriScan",
    featured: false,
    status: "in-progress",
    caseStudy: {
      overview:
        "NutriScan reads a food label from a photo and tells you whether it's safe for you — extracting ingredients with OCR and classifying risk against allergy, health, and diet profiles with a trained model. It started as a final-year academic project built with a team, and has since grown a production-oriented 2.0 backend.",
      problem: [
        "Reading ingredient lists is slow, and the risky bits hide behind unfamiliar names. People with allergies or dietary restrictions need a fast, trustworthy read.",
      ],
      approach: [
        "OCR the label, normalise the extracted ingredients, and classify overall risk with a trained model rather than a brittle keyword blocklist.",
      ],
      build: [
        "Original academic build: Flask, EasyOCR for extraction, a scikit-learn Random Forest for risk classification, Firebase for auth and storage.",
        "NutriScan 2.0 (rebuild): a FastAPI backend with SQLAlchemy + PostgreSQL, Celery + Redis workers, and a reproducible data/label/train/evaluate/promote model pipeline, with a Flutter frontend.",
      ],
      experience: [
        "The interaction is deliberately one-step: photo in, risk level out, with the flagged ingredients shown so the result is explainable rather than a bare verdict.",
      ],
      result: [
        "Delivered as a final-year academic project by the team; the 2.0 backend extends it toward a production-grade, retrainable system.",
      ],
      reflection: [
        "Credit where it's due — this was team work. My focus was the pipeline that turns a messy label photo into something a model can actually reason about.",
      ],
      assetsNeeded: ["[ADD SCREENSHOTS] — app screens from the team's build."],
    },
  },
  {
    title: "VeeGo Commerce",
    slug: "veego-commerce",
    tagline: "A production-ready e-commerce starter you can launch a storefront on.",
    description:
      "A reusable e-commerce template: a customer storefront, an operations/admin dashboard, a delivery-partner workspace, and a domain-driven backend modelling catalog, orders, payments, and delivery — sharing one design system and one set of typed contracts. Built as a hyperlocal grocery build; structured to drop into any commerce product.",
    category: "template",
    year: 2025,
    role: "Architect and full-stack developer.",
    technologies: [
      "Turborepo",
      "Next.js",
      "NestJS",
      "Prisma",
      "TypeScript",
      "Tailwind CSS",
    ],
    image: null,
    featured: false,
    status: "in-progress",
  },
  {
    title: "Kuber Empire",
    slug: "kuber-empire",
    client: "Kuber Empire — Sangamner",
    tagline: "A premium wedding venue, presented like one.",
    description:
      "A marketing site for a premium wedding venue in Sangamner — built to make an in-person, high-consideration purchase feel effortless online, with SEO and a direct enquiry path.",
    category: "client-site",
    year: 2025,
    role: "Sole developer — design and build.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/work/kuber/hero.png",
    featured: false,
    status: "in-progress",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const caseStudyProjects = projects.filter((p) => p.caseStudy);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
