import type { Metadata } from "next";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { PageHero } from "@/components/page-hero";
import { faqs, method, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, website redesign, design systems, digital brand, motion, and product interfaces for premium international brands.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Services"
        title="Design beyond boundaries."
        lede="The practice is website design and redesign for premium brands. The surrounding work — systems, brand, motion, product — exists so the site still holds together after launch."
        variant="stack"
        tone="violet"
      >
        <BrandButton href="/contact" variant="lime">
          Start a project
        </BrandButton>
      </PageHero>

      <section className="bg-ivory">
        <div className="shell py-16">
          <p className="max-w-2xl text-lg leading-relaxed text-charcoal">
            Engagements run eight to fourteen weeks. You meet a senior direction on the first call and you keep that direction through launch. Specialists join only when the work needs them.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {method.map((step) => (
              <li key={step.index} className="rounded-3xl border border-ink/10 bg-white p-5">
                <p className="text-xs font-semibold text-violet">{step.index}</p>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em]">{step.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-charcoal">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#07060f]">
        <div className="shell grid gap-4 py-16 md:grid-cols-2 md:py-24 xl:grid-cols-3">
          {services.map((service) => (
            <article id={service.id} key={service.id} className="section-card flex min-h-[380px] flex-col justify-center px-8 py-12 text-center text-white md:min-h-[440px] md:px-10">
              <p className="eyebrow text-white/55">{service.index}</p>
              <h2 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.045em] text-balance md:text-4xl">{service.title}</h2>
              <p className="mx-auto mt-4 max-w-sm text-lg leading-snug font-medium tracking-[-0.03em] text-balance text-white/90">
                <Accent line={service.line} accent={service.accent} />
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/65">{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ivory">
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-stone">Questions</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em]">Before you write.</h2>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-ink text-lg text-lime transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-4 text-base leading-relaxed text-charcoal">{faq.a}</p>
              </details>
            ))}
            <div className="mt-10">
              <BrandButton href="/contact" variant="ink">
                Start a project
              </BrandButton>
              <Link href="/work" className="ml-5 text-sm font-medium underline decoration-lime decoration-2 underline-offset-4">
                See the studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Accent({ line, accent }: { line: string; accent: string }) {
  const start = line.toLowerCase().indexOf(accent.toLowerCase());
  if (start < 0) return line;
  const end = start + accent.length;
  return (
    <>
      {line.slice(0, start)}
      <span className="text-[#d4c6ff]">{line.slice(start, end)}</span>
      {line.slice(end)}
    </>
  );
}
