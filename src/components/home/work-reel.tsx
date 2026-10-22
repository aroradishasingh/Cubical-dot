"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { studies } from "@/lib/content";
import { cn } from "cn";

const THUMB_OVERRIDES: Record<string, string[]> = {
  presentations: ["/presentations/art-01.webp", "/presentations/art-02.webp", "/presentations/art-03.webp"],
  supr: ["/supr/cover.webp", "/supr/01.webp", "/supr/02.webp"],
};

function thumbsFor(slug: string) {
  return THUMB_OVERRIDES[slug] ?? [`/${slug}/01.webp`, `/${slug}/02.webp`, `/${slug}/03.webp`];
}

export function WorkReel() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-black text-white">
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
          <StudyRow
            key={study.slug}
            study={study}
            thumbs={thumbsFor(study.slug)}
            open={index === active}
            onOpen={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}

function StudyRow({
  study,
  thumbs,
  open,
  onOpen,
}: {
  study: (typeof studies)[number];
  thumbs: string[];
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="border-b border-white/10" onMouseEnter={onOpen} onFocus={onOpen}>
      <div className="shell grid grid-cols-1 items-start gap-x-6 gap-y-4 py-7 md:grid-cols-12 md:py-9">
        <div className="flex items-center gap-4 md:col-span-5 md:items-start">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/30 text-xs text-white/60">
            {index1(study)}
          </span>
          <span
            className={cn(
              "inline-block px-2 py-0.5 font-mono text-[1.7rem] leading-none font-bold tracking-tight uppercase transition-colors duration-300 md:text-[2.6rem]",
              open ? "bg-white text-ink" : "text-white/85"
            )}
          >
            {study.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 pl-11 md:col-span-6 md:pl-0">
          {study.services.map((service) => (
            <span key={service} className="font-mono text-[0.7rem] tracking-wider text-white/50 uppercase">
              {service}
            </span>
          ))}
        </div>

        <div className="hidden justify-end md:col-span-1 md:flex">
          <Link
            href={`/work/${study.slug}`}
            data-cursor="hot"
            className={cn("text-lime transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
            aria-hidden={!open}
            tabIndex={open ? 0 : -1}
          >
            <ArrowIcon className="size-6 -rotate-45" />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="shell flex gap-3 pb-7 md:pb-9">
            {thumbs.map((src) => (
              <Link
                key={src}
                href={`/work/${study.slug}`}
                data-cursor="hot"
                className="size-20 shrink-0 overflow-hidden rounded-[2px] md:size-24"
              >
                <img src={src} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function index1(study: { index: string }) {
  return String(Number(study.index));
}
