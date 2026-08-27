import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { StoryBackground } from "@/components/three/StoryBackground";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { ChapterRail } from "@/components/ChapterRail";
import { SoundToggle } from "@/components/SoundToggle";
import { ScrollProgress } from "@/components/ScrollProgress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Om Gunjal — AI Product Builder & Full-Stack Developer",
    template: "%s — Om Gunjal",
  },
  description:
    "Om Gunjal builds AI-powered products, SaaS platforms, and production websites — from a grassroots movement site and an institutional conference platform to an escrow-first creator marketplace and real-time AI lighting.",
  keywords: [
    "Om Gunjal",
    "AI Product Builder",
    "Full-Stack Developer",
    "Next.js",
    "FastAPI",
    "freelance developer",
    "Sangamner",
  ],
  authors: [{ name: "Om Gunjal" }],
  creator: "Om Gunjal",
  openGraph: {
    type: "website",
    url: site.url,
    title: "Om Gunjal — AI Product Builder & Full-Stack Developer",
    description:
      "Builds AI-powered products, SaaS platforms, and production websites — for startups, institutions, and grassroots organizations alike.",
    siteName: "Om Gunjal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Gunjal — AI Product Builder & Full-Stack Developer",
    description:
      "Builds AI-powered products, SaaS platforms, and production websites.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Om Gunjal",
  jobTitle: "AI Product Builder & Full-Stack Developer",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sangamner",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Full-Stack Development",
    "Next.js",
    "FastAPI",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#180f02]"
        >
          Skip to content
        </a>
        <BackgroundEffects />
        <StoryBackground />
        <Cursor />
        <Loader />
        <ScrollProgress />
        <ChapterRail />
        <SoundToggle />
        <Navbar />
        <main id="main">{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
