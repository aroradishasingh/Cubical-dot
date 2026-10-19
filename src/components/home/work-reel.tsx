"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import { studies } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export function WorkReel() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => {
        const el = track.current;
        if (!el) return 0;
        return Math.max(0, el.scrollWidth - window.innerWidth);
      };
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.85,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section className="bg-ivory text-ink">
      <div className="shell pt-20 pb-8 lg:pt-24">
        <Chapter index="03" label="Work" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-[clamp(2.6rem,5vw,4.6rem)]">Selected studies.</h2>
          <div className="max-w-sm">
            <p className="text-base leading-relaxed text-charcoal">
              Representative engagements, written so you can see how a project is framed, designed, and judged.
            </p>
            <Link href="/work" className="mt-4 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4">
              All studies
            </Link>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-[var(--grid-gutter)] pb-20 lg:hidden">
        {studies.map((study) => (
          <StudyCard key={study.slug} study={study} />
        ))}
      </div>

      <section ref={root} className="relative hidden lg:block">
        <div className="flex h-[100svh] items-center overflow-hidden">
          <div ref={track} className="flex items-center gap-4 pr-[12vw] pl-[var(--page-margin)] will-change-transform">
            {studies.map((study) => (
              <StudyCard key={study.slug} study={study} wide />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

function StudyCard({
  study,
  wide = false,
}: {
  study: (typeof studies)[number];
  wide?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor="hot"
      className={
        wide
          ? "section-card reel-card group/button flex h-[72vh] w-[min(40rem,46vw)] shrink-0 flex-col overflow-hidden text-white"
          : "section-card group/button flex flex-col overflow-hidden text-white"
      }
    >
      <div
        className={
          wide
            ? "relative mx-5 mt-5 h-[52%] overflow-hidden rounded-[20px] bg-[#07060f]"
            : "relative mx-4 mt-4 h-64 overflow-hidden rounded-[20px] bg-[#07060f]"
        }
      >
        {study.cover ? (
          <img
            src={study.cover}
            alt=""
            className="absolute top-1/2 left-1/2 h-full max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-700 ease-out group-hover/button:scale-[1.03]"
          />
        ) : (
          <FieldArt variant={study.composition} tone={study.tone} motion="none" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center px-8 py-6 text-center">
        <p className="eyebrow text-white/55">
          {study.index} / {study.sector}
        </p>
        <h3 className="mt-3 text-[1.75rem] font-semibold tracking-[-0.045em] text-balance md:text-4xl">{study.name}</h3>
        <p className="mx-auto mt-3 max-w-md text-lg leading-snug font-medium tracking-[-0.03em] text-balance text-white/90">
          {study.headline}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">{study.summary}</p>
        <span className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-medium text-lime">
          View case study
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
