import Link from "next/link";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import { studies } from "@/lib/content";
import { cn } from "cn";

export function WorkReel() {
  return (
    <section className="bg-ivory text-ink">
      <div className="shell pt-20 lg:pt-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Chapter index="03" label="Work" />
            <h2 className="display mt-4 text-[clamp(3.6rem,11.5vw,9rem)] leading-[0.86]">Services.</h2>
          </div>
          <div className="max-w-sm md:pb-2">
            <p className="text-base leading-relaxed text-charcoal">
              Research, identity, campaigns, and the sites. Each study is the work, then the decision behind it.
            </p>
            <Link
              href="/work"
              className="mt-4 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4"
            >
              All studies
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-14 pb-20 lg:mt-20 lg:pb-28">
        {studies.map((study, index) => (
          <div
            key={study.slug}
            className="shell sticky top-20 pb-5 md:top-24 md:pb-7"
            style={{ zIndex: index + 1 }}
          >
            <StackCard study={study} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StackCard({ study, index }: { study: (typeof studies)[number]; index: number }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor="hot"
      className={cn(
        "section-card study-card group/button flex w-full flex-col overflow-hidden text-white shadow-[0_32px_64px_-28px_rgba(0,0,0,0.45)] md:grid md:min-h-[27rem] md:grid-cols-2",
        index % 3 === 1 && "study-card-b",
        index % 3 === 2 && "study-card-c"
      )}
    >
      <div className="relative h-52 shrink-0 md:h-full">
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] md:[mask-image:linear-gradient(to_right,black_55%,transparent_100%)]"
        >
          {study.cover ? (
            <img
              src={study.cover}
              alt=""
              className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover/button:scale-[1.03]"
            />
          ) : (
            <FieldArt variant={study.composition} tone={study.tone} motion="none" />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
        <p className="eyebrow text-white/50">
          {study.featured ? <span className="text-lime">Featured · </span> : null}
          {study.sector}
        </p>
        <h3 className="text-[2.6rem] leading-[0.92] font-semibold tracking-[-0.05em] text-balance md:text-[3.4rem]">
          {study.name}
        </h3>
        <p className="max-w-md text-base leading-relaxed text-white/75">{study.headline}</p>
        <div className="flex flex-wrap gap-2">
          {study.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70"
            >
              {service}
            </span>
          ))}
        </div>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium">
          View study
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
