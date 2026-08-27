import type { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  Boxes,
  Users,
  BrainCircuit,
  Globe,
  Workflow,
} from "lucide-react";

export type Template = {
  id: string;
  n: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  /** "built" = there's a real, shipped foundation; "ready" = build-ready from production patterns. */
  state: "built" | "ready";
  stateLabel: string;
  modules: string[];
  tech: string[];
  /** Optional link to the real project this foundation came from. */
  basisSlug?: string;
};

export const templates: Template[] = [
  {
    id: "ecommerce",
    n: "01",
    title: "E-Commerce",
    tagline:
      "A storefront, an ops dashboard, a delivery workspace, and a payments-aware backend — one system, typed end to end.",
    icon: ShoppingCart,
    state: "built",
    stateLabel: "Built foundation — VeeGo",
    modules: [
      "Storefront + cart + checkout",
      "Catalog & inventory",
      "Orders & fulfilment",
      "Payments & COD",
      "Admin dashboard",
      "Delivery-partner app",
    ],
    tech: ["Turborepo", "Next.js", "NestJS", "Prisma", "PostgreSQL"],
    basisSlug: "veego-commerce",
  },
  {
    id: "erp",
    n: "02",
    title: "ERP",
    tagline:
      "Run the whole back office — inventory, procurement, people, and finance — on one auditable data model.",
    icon: Boxes,
    state: "ready",
    stateLabel: "Build-ready",
    modules: [
      "Inventory & procurement",
      "HR & payroll",
      "Finance & invoicing",
      "Role-based access",
      "Reporting & exports",
    ],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Row-Level Security", "Redis"],
  },
  {
    id: "crm",
    n: "03",
    title: "CRM",
    tagline:
      "Pipelines, contacts, and deals with automation that does the follow-up you'd otherwise forget.",
    icon: Users,
    state: "ready",
    stateLabel: "Build-ready",
    modules: [
      "Contacts & companies",
      "Deal pipeline (kanban)",
      "Activity timeline",
      "Email & task automation",
      "Dashboards",
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Webhooks"],
  },
  {
    id: "ai-mvp",
    n: "04",
    title: "AI MVP",
    tagline:
      "Ship an AI product that actually works — RAG, OCR, or an LLM feature with explainable output, in front of users fast.",
    icon: BrainCircuit,
    state: "ready",
    stateLabel: "Build-ready",
    modules: [
      "RAG over your data",
      "OCR + ML classification",
      "Chat / assistant UI",
      "Vector search",
      "Usage & eval dashboards",
    ],
    tech: ["FastAPI", "LangChain", "Vector DB", "Next.js", "Gemini"],
  },
  {
    id: "automation",
    n: "05",
    title: "Automation",
    tagline:
      "The manual thing you do every day, turned into a pipeline that runs itself and tells you when it doesn't.",
    icon: Workflow,
    state: "ready",
    stateLabel: "Build-ready",
    modules: [
      "Scheduled data pipelines",
      "Background workers",
      "Third-party integrations",
      "Alerting & retries",
    ],
    tech: ["Python", "Celery", "Redis", "Docker"],
  },
  {
    id: "site",
    n: "06",
    title: "Premium Site",
    tagline:
      "A fast, accessible, CMS-backed marketing site the owner can edit themselves — built mobile-first, not shrunk from desktop.",
    icon: Globe,
    state: "built",
    stateLabel: "Built pattern — JPM, SRES, Kuber",
    modules: [
      "CMS-backed content",
      "SEO & structured data",
      "Forms (validated, spam-safe)",
      "Analytics",
      "Self-serve editing",
    ],
    tech: ["Next.js", "Sanity", "Tailwind", "Vercel"],
  },
];
