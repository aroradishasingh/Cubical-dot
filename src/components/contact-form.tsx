"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { studio } from "@/lib/content";
import { cn } from "cn";

const projectTypes = ["New website", "Redesign", "Design system", "Not sure yet"];
const timelines = ["As soon as we can", "This quarter", "This half", "Exploring"];

type Fields = {
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  timeline: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  website: "",
  projectType: "",
  timeline: "",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Tell us who to address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = "We need a real email to reply.";
    if (!fields.projectType) next.projectType = "Choose the kind of work.";
    if (fields.message.trim().length < 20) next.message = "A few sentences on the market and the website are enough.";
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company_website: honeypot, renderedAt }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setErrorMessage(result.error || "Could not send that just now. Please email us directly.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMessage("Could not reach the server. Please email us directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[8px] bg-ink p-8 text-white md:p-10" role="status">
        <p className="eyebrow text-lime">Brief sent</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">We have it.</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
          A producer replies within two business days. If it is urgent, write {studio.email} directly.
        </p>
        <button
          type="button"
          className="mt-8 block text-sm text-white/60 underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            setFields(empty);
          }}
        >
          Write another brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[8px] border border-ink/10 bg-white p-6 md:p-8">
      {Object.values(errors).some(Boolean) ? (
        <p role="alert" className="mb-6 rounded-2xl bg-[#fff4f0] px-4 py-3 text-sm text-[#9a3412]">
          A few fields need another look before this can be sent.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="mb-6 rounded-2xl bg-[#fff4f0] px-4 py-3 text-sm text-[#9a3412]">
          {errorMessage}{" "}
          <a href={`mailto:${studio.email}`} className="underline">
            {studio.email}
          </a>
        </p>
      ) : null}
      {/* Honeypot: hidden from sighted and screen-reader users, bots fill every field they can find. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" id="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" value={fields.name} aria-invalid={Boolean(errors.name)} onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" value={fields.email} aria-invalid={Boolean(errors.email)} onChange={(event) => update("email", event.target.value)} />
        </Field>
        <Field label="Company" id="company" optional>
          <Input id="company" name="company" autoComplete="organization" value={fields.company} onChange={(event) => update("company", event.target.value)} />
        </Field>
        <Field label="Website" id="website" optional>
          <Input id="website" name="website" type="url" placeholder="https://" value={fields.website} onChange={(event) => update("website", event.target.value)} />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">Project</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <Choice key={type} pressed={fields.projectType === type} onClick={() => update("projectType", type)}>
              {type}
            </Choice>
          ))}
        </div>
        {errors.projectType ? <p className="mt-2 text-sm text-[#9a3412]">{errors.projectType}</p> : null}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">
          Timeline <span className="font-normal text-stone">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {timelines.map((timeline) => (
            <Choice key={timeline} pressed={fields.timeline === timeline} onClick={() => update("timeline", timeline)}>
              {timeline}
            </Choice>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field label="The brief" id="message" error={errors.message}>
          <Textarea
            id="message"
            name="message"
            placeholder="The market, the website you have, and what the next one has to do."
            value={fields.message}
            aria-invalid={Boolean(errors.message)}
            onChange={(event) => update("message", event.target.value)}
          />
        </Field>
      </div>

      <Button type="submit" variant="ink" size="pill" className="mt-6" disabled={status === "sending"}>
        <span className="size-2 rounded-full bg-lime group-hover/button:bg-ink" aria-hidden />
        {status === "sending" ? "Sending..." : "Send the brief"}
      </Button>
      <p className="mt-4 text-sm leading-relaxed text-charcoal">
        This goes straight to our inbox, nothing else. See our{" "}
        <Link href="/privacy" className="underline decoration-lime decoration-2 underline-offset-2">
          privacy policy
        </Link>
        . You can also write {studio.email} directly.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  optional,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="font-normal text-stone"> (optional)</span> : null}
      </Label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#9a3412]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Choice({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "h-10 rounded-[8px] border px-4 text-sm font-medium transition-colors",
        pressed ? "border-ink bg-ink text-white" : "border-ink/15 bg-ivory text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}
