"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { site } from "@/lib/site";

const projectTypes = [
  "AI Product",
  "SaaS / Web App",
  "Website",
  "Automation",
  "MVP",
  "Not sure yet",
];
const budgets = ["< ₹50k", "₹50k – ₹2L", "₹2L – ₹5L", "₹5L+", "Let's discuss"];

type State = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-[3px] border border-line bg-panel px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      projectType: String(fd.get("projectType") || ""),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.ok) {
        setState("sent");
        form.reset();
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setState("error");
        return;
      }
      if (json.reason === "not-configured") {
        // Graceful, honest fallback: open the visitor's mail client
        // prefilled. Nothing is silently dropped.
        const mailto = `mailto:${json.to}?subject=${encodeURIComponent(
          json.subject,
        )}&body=${encodeURIComponent(json.body)}`;
        window.location.href = mailto;
        setState("sent");
        form.reset();
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="panel flex flex-col items-start gap-3 p-8">
        <div className="grid h-11 w-11 place-items-center rounded-[3px] bg-accent/10 text-accent">
          <Check size={20} />
        </div>
        <h3 className="text-lg font-semibold">Thanks — that&apos;s on its way.</h3>
        <p className="text-sm text-ink-2">
          If your email app just opened, hit send to reach me directly.
          Otherwise I&apos;ll be in touch at the address you gave. You can also
          email me at{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6 md:p-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="t-label mb-2 block">
            Name
          </label>
          <input id="name" name="name" className={inputClass} placeholder="Your name" />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="t-label mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="t-label mb-2 block">
            Project type
          </label>
          <select id="projectType" name="projectType" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="t-label mb-2 block">
            Budget range
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="t-label mb-2 block">
          What do you want to build?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="A sentence or two about the problem and who it's for."
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-7 py-3.5 text-sm font-semibold text-[#180f02] transition-colors hover:bg-accent-2 disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send it"
        )}
      </button>
      {state === "error" && !Object.keys(errors).length && (
        <p className="text-xs text-red-400">
          Something went wrong. Email me directly at {site.email}.
        </p>
      )}
    </form>
  );
}
