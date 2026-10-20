"use client";

import Link from "next/link";
import { useRef } from "react";
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
          ? "section-card study-card reel-card group/button flex h-[72vh] w-[min(40rem,46vw)] shrink-0 flex-col overflow-hidden text-white"
          : "section-card study-card group/button flex flex-col overflow-hidden text-white"
      }
    >
      <div className={wide ? "relative h-[46%] shrink-0" : "relative h-56 shrink-0"}>
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_28%,transparent_100%)]">
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
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-8 text-center">
        <p className="eyebrow text-white/50">
          {study.featured ? <span className="text-lime">Featured · </span> : null}
          {study.index}
        </p>
        <h3 className="mt-5 text-[2.75rem] leading-[0.92] font-semibold tracking-[-0.055em] text-balance md:text-[4.25rem]">
          {study.name}
        </h3>
        <p className="mx-auto mt-4 max-w-[18rem] text-base leading-snug font-medium tracking-[-0.03em] text-balance text-white/75">
          {study.headline}
        </p>
      </div>
    </Link>
  );
}
