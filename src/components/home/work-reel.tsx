"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import { studies } from "@/lib/content";
import { cn } from "cn";

export function WorkReel() {
  const track = useRef<HTMLDivElement>(null);

  function scrollByCards(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.86, 680) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="overflow-hidden bg-ivory text-ink">
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

      <div className="relative mt-10 lg:mt-14">
        <div
          ref={track}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pl-[var(--page-margin)] pr-[var(--page-margin)] [scroll-padding-left:var(--page-margin)] [scroll-snap-type:x_mandatory]"
        >
          {studies.map((study) => (
            <StudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>

      <div className="shell mt-7 flex items-center justify-between pb-16 lg:pb-20">
        <div className="flex gap-2">
          <NavButton direction={-1} onClick={() => scrollByCards(-1)} label="Scroll to previous studies" />
          <NavButton direction={1} onClick={() => scrollByCards(1)} label="Scroll to next studies" />
        </div>
        <p className="eyebrow hidden text-stone sm:block">Drag, swipe, or use the arrows</p>
      </div>
    </section>
  );
}

function StudyCard({ study }: { study: (typeof studies)[number] }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor="hot"
      className="section-card study-card group/button flex w-[78vw] shrink-0 flex-col overflow-hidden text-white [scroll-snap-align:start] sm:w-[22rem]"
    >
      <div className="relative h-52 shrink-0 sm:h-56">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_28%,transparent_100%)]">
          {study.cover ? (
            <img
              src={study.cover}
              alt=""
              className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover/button:scale-[1.04]"
            />
          ) : (
            <FieldArt variant={study.composition} tone={study.tone} motion="none" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-7 py-8 text-center">
        <p className="eyebrow text-white/50">
          {study.featured ? <span className="text-lime">Featured · </span> : null}
          {study.services[0]}
        </p>
        <h3 className="mt-4 text-[2.1rem] leading-[0.95] font-semibold tracking-[-0.05em] text-balance">
          {study.name}
        </h3>
        <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-snug font-medium tracking-[-0.02em] text-balance text-white/75">
          {study.headline}
        </p>
      </div>
    </Link>
  );
}

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: 1 | -1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group/button inline-flex size-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
    >
      <ArrowIcon className={cn("size-5", direction === -1 && "rotate-180")} />
    </button>
  );
}
