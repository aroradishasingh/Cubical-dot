"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import { studies } from "@/lib/content";
import { cn } from "cn";

export function WorkReel() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#07060f] text-white">
      <div className="shell pt-20 lg:pt-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Chapter index="03" label="Work" tone="light" />
            <h2 className="display mt-4 text-[clamp(3.6rem,11.5vw,9rem)] leading-[0.86]">Services.</h2>
          </div>
          <div className="max-w-sm md:pb-2">
            <p className="text-base leading-relaxed text-white/70">
              Research, identity, campaigns, and the sites. Hover a study to see the work behind it.
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

      <div className="mt-12 border-t border-white/10 lg:mt-16">
        {studies.map((study, index) => (
          <StudyRow key={study.slug} study={study} open={index === active} onOpen={() => setActive(index)} />
        ))}
      </div>
    </section>
  );
}

function StudyRow({
  study,
  open,
  onOpen,
}: {
  study: (typeof studies)[number];
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="border-b border-white/10" onMouseEnter={onOpen}>
      <button
        type="button"
        onClick={onOpen}
        onFocus={onOpen}
        aria-expanded={open}
        className="shell flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
      >
        <span className="flex items-center gap-5 md:gap-8">
          <span className={cn("text-sm font-medium tabular-nums", open ? "text-lime" : "text-white/40")}>
            {study.index}
          </span>
          <span
            className={cn(
              "text-[1.9rem] leading-none font-semibold tracking-[-0.05em] transition-colors duration-300 md:text-[2.8rem]",
              open ? "text-white" : "text-white/35"
            )}
          >
            {study.name}
          </span>
        </span>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300 md:size-12",
            open ? "border-lime bg-lime text-ink" : "border-white/20 text-white/50"
          )}
          aria-hidden
        >
          <ArrowIcon className={cn("size-4 transition-transform duration-300", open && "-rotate-45")} />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-6 pb-8 md:grid-cols-12 md:pb-10">
            <p className="text-base leading-relaxed text-white/70 md:col-span-4">{study.headline}</p>
            <ul className="columns-2 gap-x-6 md:col-span-3">
              {study.services.map((service) => (
                <li key={service} className="mb-2 text-sm leading-snug text-white/55">
                  {service}
                </li>
              ))}
            </ul>
            <Link
              href={`/work/${study.slug}`}
              data-cursor="hot"
              className="group/button relative block h-40 overflow-hidden rounded-[4px] md:col-span-5 md:h-48"
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
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                View study
                <ArrowIcon className="size-3" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
