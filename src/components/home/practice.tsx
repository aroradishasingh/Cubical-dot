"use client";

import Link from "next/link";
import { useState } from "react";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";
import { cn } from "cn";

export function Practice() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="bg-ivory text-ink">
      <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <Chapter index="04" label="Practice" />
          <h2 className="display mt-6 text-[clamp(2.4rem,4vw,3.8rem)]">Design beyond boundaries.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-charcoal">
            Website design and redesign for companies that charge a premium and intend to look like it. Hover a practice. The field on the right is the temperament of the work.
          </p>
          <Link href="/services" className="mt-6 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4">
            Explore services
          </Link>
        </div>
        <div className="lg:col-span-4">
          <ul className="border-t border-ink/10">
            {services.map((service, index) => {
              const selected = index === active;
              return (
                <li key={service.id} className="border-b border-ink/10">
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 py-4 text-left"
                    aria-pressed={selected}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className={cn("pt-1.5 text-sm font-medium tabular-nums", selected ? "text-violet" : "text-stone")}>{service.index}</span>
                    <span className="min-w-0">
                      <span className={cn("block text-xl font-semibold tracking-[-0.03em] md:text-2xl", selected && "text-ink")}>
                        {service.title}
                      </span>
                      <span className={cn("grid transition-[grid-template-rows,opacity] duration-300", selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <span className="overflow-hidden">
                          <span className="mt-1 block text-base leading-relaxed text-charcoal">{service.line}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal className="lg:col-span-4">
          <Link
            href={`/services#${current.id}`}
            className="group/button relative block h-[420px] overflow-hidden rounded-[8px] lg:h-full lg:min-h-[520px]"
          >
            <FieldArt key={current.id} variant={current.composition} tone={current.tone} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 text-white">
              <p className="eyebrow text-lime">{current.index}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{current.title}</p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
