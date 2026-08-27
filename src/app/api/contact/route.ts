import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  // Honeypot — real users never fill this.
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept, do nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = "Please add your name.";
  if (!data.email?.trim() || !EMAIL_RE.test(data.email))
    errors.email = "Please add a valid email.";
  if (!data.message?.trim() || data.message.trim().length < 10)
    errors.message = "A sentence or two about the project helps.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const subject = `New project inquiry — ${data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project type: ${data.projectType || "—"}`,
    `Budget: ${data.budget || "—"}`,
    "",
    data.message,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;

  // No provider configured yet — tell the client to fall back to a
  // prefilled email so the message still reaches its destination.
  // We never pretend a message was sent when it wasn't.
  if (!key) {
    return NextResponse.json(
      { ok: false, reason: "not-configured", subject, body, to: site.email },
      { status: 200 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [site.email],
        reply_to: data.email,
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, reason: "not-configured", subject, body, to: site.email },
        { status: 200 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "not-configured", subject, body, to: site.email },
      { status: 200 },
    );
  }
}
