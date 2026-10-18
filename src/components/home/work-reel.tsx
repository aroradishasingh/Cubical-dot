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
      const tween = gsap.to(track.current, {
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

      gsap.utils.toArray<HTMLElement>(".reel-card .study-art").forEach((art) => {
        const card = art.closest(".reel-card");
        if (!card) return;
        gsap.fromTo(
          art,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-8 md:px-10 lg:px-16 lg:pt-24">
        <Chapter index="03" label="Work" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-[clamp(2.6rem,5vw,4.6rem)]">Selected studies.</h2>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-stone md:text-base">
              Representative engagements, written so you can see how a project is framed, designed, and judged.
            </p>
            <Link href="/work" className="mt-4 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4">
              All studies
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-20 md:px-10 lg:hidden">
        {studies.map((study) => (
          <StudyCard key={study.slug} study={study} />
        ))}
      </div>

      <section ref={root} className="relative hidden lg:block">
        <div className="flex h-[100svh] items-center overflow-hidden">
          <div ref={track} className="flex h-[74vh] items-stretch gap-5 pr-[12vw] pl-16 will-change-transform">
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
          ? "reel-card group/button flex w-[46vw] shrink-0 flex-col overflow-hidden rounded-[28px] bg-ink text-white"
          : "group/button overflow-hidden rounded-[28px] bg-ink text-white"
      }
    >
      <div className={wide ? "relative h-[58%] overflow-hidden" : "relative h-64 overflow-hidden"}>
        <div className="study-art absolute inset-[-8%] transition-transform duration-700 ease-out group-hover/button:scale-105">
          <FieldArt variant={study.composition} tone={study.tone} motion="none" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <p className="eyebrow text-white/50">
            {study.index} / {study.sector}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-[-0.045em] md:text-4xl">{study.name}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{study.summary}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime">
          View case study
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
