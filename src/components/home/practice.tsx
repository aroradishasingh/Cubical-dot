"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { services } from "@/lib/content";
import { cn } from "cn";

export function Practice() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#07060f] text-white">
      <div className="shell pt-20 lg:pt-28">
        <Chapter index="04" label="Practice" tone="light" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display section-title max-w-xl">Design beyond boundaries.</h2>
          <div className="max-w-sm md:pb-1">
            <p className="text-base leading-relaxed text-white/70">
              Website design and redesign for companies that charge a premium and intend to look like it. Hover a practice to see the work behind it.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4"
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 lg:mt-16">
        {services.map((service, index) => (
          <PracticeRow key={service.id} service={service} open={index === active} onOpen={() => setActive(index)} />
        ))}
      </div>
    </section>
  );
}

function PracticeRow({
  service,
  open,
  onOpen,
}: {
  service: (typeof services)[number];
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
        className="shell flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
      >
        <span className="flex items-center gap-5 md:gap-8">
          <span className={cn("text-sm font-medium tabular-nums", open ? "text-lime" : "text-white/40")}>
            {service.index}
          </span>
          <span
            className={cn(
              "text-[2.2rem] leading-none font-semibold tracking-[-0.05em] transition-colors duration-300 md:text-[3.4rem]",
              open ? "text-white" : "text-white/35"
            )}
          >
            {service.title}
          </span>
        </span>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300 md:size-14",
            open ? "border-lime bg-lime text-ink" : "border-white/20 text-white/50"
          )}
          aria-hidden
        >
          <ArrowIcon className={cn("size-4 transition-transform duration-300 md:size-5", open && "-rotate-45")} />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-8 pb-10 md:grid-cols-12 md:pb-14">
            <p className="text-base leading-relaxed text-white/70 md:col-span-5">{service.detail}</p>
            <ul className="columns-2 gap-x-6 md:col-span-3">
              {service.capabilities.map((capability) => (
                <li key={capability} className="mb-2 text-sm leading-snug text-white/55">
                  {capability}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 md:col-span-4">
              {service.preview.map((src) => (
                <div key={src} className="h-24 w-32 shrink-0 overflow-hidden rounded-[4px] md:h-28 md:w-40">
                  <img src={src} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
