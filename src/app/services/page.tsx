import type { Metadata } from "next";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { FieldArt } from "@/components/field-art";
import { PageHero } from "@/components/page-hero";
import { faqs, investment, method, services } from "@/lib/content";

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

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={index % 2 === 0 ? "bg-white" : "bg-ivory"}
        >
          <div className="grid items-stretch lg:grid-cols-2">
            <div className={`relative min-h-[320px] lg:min-h-[460px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <FieldArt variant={service.composition} tone={service.tone} />
            </div>
            <div
              className={`flex flex-col justify-center px-[var(--page-margin)] py-14 ${
                index % 2 === 1
                  ? "lg:pr-[var(--grid-gutter)] lg:pl-[var(--page-margin)]"
                  : "lg:pr-[var(--page-margin)] lg:pl-[var(--grid-gutter)]"
              }`}
            >
              <p className="eyebrow text-stone">{service.index}</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] md:text-5xl">{service.title}</h2>
              <p className="mt-4 text-lg font-medium tracking-[-0.03em]">{service.line}</p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal">{service.detail}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-ink text-white">
        <div className="shell py-20">
          <p className="eyebrow text-white/70">Investment</p>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)]">A range, before the first call.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Premium work has a floor. Publishing it protects both calendars. The final number follows the page map, the markets, and whether we are designing, building, or both.
          </p>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {investment.map((tier) => (
              <article key={tier.title} className="rounded-[16px] border border-white/10 p-7">
                <p className="text-sm font-medium text-lime">{tier.range}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{tier.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/80">{tier.body}</p>
              </article>
            ))}
          </div>
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
                  <span className="grid size-8 shrink-0 place-items-center rounded-[16px] bg-ink text-lg text-lime transition-transform group-open:rotate-45" aria-hidden>
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
