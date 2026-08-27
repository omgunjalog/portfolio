import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <section className="grid min-h-[70vh] place-items-center pt-16">
        <div className="wrap text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="t-head mt-4">This page didn&apos;t make it to production.</h1>
          <p className="t-body mx-auto mt-3 max-w-md text-ink-2">
            The link is broken or the page has moved. The work, though, is all on
            the home page.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#180f02]"
          >
            Back home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
