import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { PageHero } from "@/components/page-hero";
import { faqs, method, services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Website design, website redesign, design systems, digital brand, motion, and product interfaces for premium international brands.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Services"
        title="Design beyond boundaries."
        lede="The practice is website design and redesign for premium brands. The surrounding work - systems, brand, motion, product - exists so the site still holds together after launch."
        form="cube"
      >
        <BrandButton href="/contact" variant="lime">
          Get in touch
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

      {/* Each practice is a row with its own rhythm: number, name, promise, detail. */}
      <section data-form="4" className="relative text-ink">
        <div className="shell py-24 md:py-36">
          <p className="eyebrow text-ink/65">Six practices</p>
          <ul className="mt-10 border-t border-ink/15">
            {services.map((service) => (
              <li
                id={service.id}
                key={service.id}
                className="grid gap-x-[var(--grid-gutter)] gap-y-5 border-b border-ink/15 py-12 md:grid-cols-12 md:py-16"
              >
                <span className="serif-i text-5xl leading-none text-ink/65 md:col-span-1">{service.index}</span>
                <h2 className="text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.92] font-bold tracking-[-0.035em] md:col-span-5">
                  {service.title}
                </h2>
                <div className="md:col-span-5 md:col-start-8">
                  <p className="text-xl leading-snug font-medium tracking-[-0.03em] text-ink">
                    <Accent line={service.line} accent={service.accent} />
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink/75">{service.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-stone">Questions</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.028em]">Before you write.</h2>
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
                Get in touch
              </BrandButton>
              <Link href="/work" className="ml-5 text-sm font-medium underline decoration-violet decoration-2 underline-offset-4">
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
      <span className="serif-i text-violet">{line.slice(start, end)}</span>
      {line.slice(end)}
    </>
  );
}
