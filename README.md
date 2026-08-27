# Om Gunjal — Portfolio & Freelance Site

Personal portfolio and freelance business site. Next.js 16 (App Router) ·
TypeScript · Tailwind CSS v4 · Motion · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where the content lives

All project content is **data, not markup** — adding or editing a project is a
content change, never a code change.

- **`src/lib/projects.ts`** — every project as a typed `Project`, plus full
  case-study copy for the featured ones. Set `caseStudy` to generate a
  `/work/<slug>` page automatically. Real screenshots go in `public/work/<slug>/`;
  projects without a screenshot render an honest branded cover (never a fake
  capture). `assetsNeeded` renders a visible "assets to add" block so nothing
  placeholder ever reads as finished.
- **`src/lib/site.ts`** — name, role, contact email, links, and the
  "currently building" line.

## Contact form

`src/app/api/contact/route.ts` validates server-side (name/email/message +
honeypot). With `RESEND_API_KEY` set it sends email via Resend; without it, the
form falls back to opening the visitor's mail client prefilled. API keys are
never exposed to the browser. See `.env.example`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — framework auto-detected, no config needed.
3. (Optional) add `RESEND_API_KEY` in Vercel → Settings → Environment Variables
   to enable server-side email.
4. (Optional) add a custom domain; update `site.url` in `src/lib/site.ts`.

## Still to add before a client-facing send

See the "assets to add" blocks on the Lettit, Lumora, and NutriScan case
studies, and swap any generated project covers for real screenshots as they
become available.
