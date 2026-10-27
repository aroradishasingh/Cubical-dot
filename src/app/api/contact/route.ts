import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  projectType?: string;
  timeline?: string;
  message?: string;
  company_website?: string; // honeypot field; real visitors never fill this in
  renderedAt?: number;
};

const MIN_FILL_TIME_MS = 2000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const website = (body.website ?? "").trim();
  const projectType = (body.projectType ?? "").trim();
  const timeline = (body.timeline ?? "").trim();
  const message = (body.message ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Tell us who to address.";
  if (!isValidEmail(email)) errors.email = "We need a real email to reply.";
  if (!projectType) errors.projectType = "Choose the kind of work.";
  if (message.length < 20) errors.message = "A few sentences on the market and the website are enough.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Spam trap: a filled honeypot or a submission faster than a human can type
  // both look like success to the caller, but the email is never sent.
  const honeypotFilled = (body.company_website ?? "").trim().length > 0;
  const submittedTooFast =
    typeof body.renderedAt === "number" && Date.now() - body.renderedAt < MIN_FILL_TIME_MS;
  if (honeypotFilled || submittedTooFast) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form cannot send email.");
    return NextResponse.json(
      { ok: false, error: "The form isn't connected yet. Please email us directly." },
      { status: 503 }
    );
  }

  const from = process.env.RESEND_FROM_EMAIL || "Cubical Dot <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || "mayank@cubicaldot.com";

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Website: ${website || "-"}`,
    `Project: ${projectType}`,
    `Timeline: ${timeline || "-"}`,
    "",
    message,
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New project - ${company || name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the email:", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "Could not send that just now. Please email us directly." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send that just now. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
