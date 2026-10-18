"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { studio } from "@/lib/content";
import { cn } from "cn";

const projectTypes = ["New website", "Redesign", "Design system", "Not sure yet"];
const budgets = ["Under $40k", "$40–80k", "$80–150k", "$150k+"];
const timelines = ["As soon as we can", "This quarter", "This half", "Exploring"];

type Fields = {
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

function mailtoHref(fields: Fields) {
  const subject = `New project — ${fields.company}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company}`,
    `Website: ${fields.website || "—"}`,
    `Project: ${fields.projectType}`,
    `Budget: ${fields.budget}`,
    `Timeline: ${fields.timeline || "—"}`,
    "",
    fields.message,
  ].join("\n");
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Tell us who to address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = "We need a real email to reply.";
    if (fields.company.trim().length < 2) next.company = "Which company is this for?";
    if (!fields.projectType) next.projectType = "Choose the kind of work.";
    if (!fields.budget) next.budget = "A range keeps the first conversation honest.";
    if (fields.message.trim().length < 20) next.message = "A few sentences on the market and the website are enough.";
    return next;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[28px] bg-ink p-8 text-white md:p-10" role="status">
        <p className="eyebrow text-lime">Brief ready</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">The note is written.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          Open it in your email app and send. A producer replies within two business days, on your clock. If the draft does not open, write {studio.email} directly.
        </p>
        <a
          href={mailtoHref(fields)}
          className="mt-8 inline-flex h-12 items-center rounded-full bg-lime px-5 text-sm font-medium text-ink"
        >
          Open the email
        </a>
        <button
          type="button"
          className="mt-4 block text-sm text-white/60 underline underline-offset-4"
          onClick={() => {
            setSent(false);
            setFields(empty);
          }}
        >
          Write another brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[28px] border border-ink/10 bg-white p-6 md:p-8">
      {Object.values(errors).some(Boolean) ? (
        <p role="alert" className="mb-6 rounded-2xl bg-[#fff4f0] px-4 py-3 text-sm text-[#9a3412]">
          A few fields need another look before this can be sent.
        </p>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" id="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" value={fields.name} aria-invalid={Boolean(errors.name)} onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" value={fields.email} aria-invalid={Boolean(errors.email)} onChange={(event) => update("email", event.target.value)} />
        </Field>
        <Field label="Company" id="company" error={errors.company}>
          <Input id="company" name="company" autoComplete="organization" value={fields.company} aria-invalid={Boolean(errors.company)} onChange={(event) => update("company", event.target.value)} />
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
        <legend className="text-sm font-medium">Investment range</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgets.map((budget) => (
            <Choice key={budget} pressed={fields.budget === budget} onClick={() => update("budget", budget)}>
              {budget}
            </Choice>
          ))}
        </div>
        {errors.budget ? <p className="mt-2 text-sm text-[#9a3412]">{errors.budget}</p> : null}
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

      <Button type="submit" variant="ink" size="pill" className="mt-6">
        <span className="size-2 rounded-full bg-lime group-hover/button:bg-ink" aria-hidden />
        Prepare the email
      </Button>
      <p className="mt-4 text-xs leading-relaxed text-stone">
        Nothing is stored on a server. Preparing the email opens a draft to {studio.email} so you can send it yourself.
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
        "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
        pressed ? "border-ink bg-ink text-white" : "border-ink/15 bg-ivory text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}
