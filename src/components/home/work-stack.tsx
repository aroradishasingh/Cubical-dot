"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { Stop } from "@/components/story-line";
import { studies } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

const featured = studies.slice(0, 5);

/**
 * Chapter 04, shapes we've made. Case studies arrive as a deck: each card
 * sticks, and the one beneath steps back as the next lands on it.
 */
export function WorkStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) return;
          gsap.to(card.querySelector(".stack-inner"), {
            scale: 0.92,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 14%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="ink" className="bg-ink text-paper" aria-labelledby="work-title">
      <div className="shell relative z-[2] py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-lime">03 — What we&apos;ve shipped</p>
            <h2 id="work-title" className="mt-5 text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
              Selected <span className="serif-i">work</span>
              <Stop />
            </h2>
          </div>
          <Link
            href="/work"
            className="eyebrow inline-flex h-11 items-center gap-2 rounded-full border border-paper/40 px-5 text-paper transition-colors hover:border-lime hover:text-lime"
          >
            All {studies.length} studies <ArrowIcon />
          </Link>
        </div>

        {/* Small screens get a compact 2-up grid instead of five full-height
            sticky cards stacked end to end, which read as repetitive scroll
            on a short viewport. The sticky deck is desktop-only (md:+). */}
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:hidden">
          {featured.map((study) => (
            <li key={study.slug}>
              <Link href={`/work/${study.slug}`} data-cursor="View" className="group/card block">
                <div className="slab relative aspect-[3/4] overflow-hidden bg-[#18181c] [--slab:18px]">
                  {study.cover ? (
                    <Image
                      src={study.cover}
                      alt=""
                      fill
                      sizes="50vw"
                      className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <p className="eyebrow mt-3 text-lime">{study.name}</p>
                <h3 className="mt-1 text-lg leading-tight font-extrabold tracking-[-0.02em]">{study.genre}</h3>
              </Link>
            </li>
          ))}
        </ul>

        <ol className="mt-16 hidden md:block">
          {featured.map((study, index) => (
            <li key={study.slug} className="stack-card md:sticky" style={{ top: `calc(12vh + ${index * 1.25}rem)` }}>
              <Link
                href={`/work/${study.slug}`}
                data-cursor="View"
                className="stack-inner group/card slab mb-6 grid origin-top overflow-hidden border border-paper/12 bg-[#18181c] [--slab:36px] md:mb-[8vh] md:min-h-[72vh] md:grid-cols-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto">
                  {study.cover ? (
                    <Image
                      src={study.cover}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col justify-between gap-10 p-7 md:col-span-5 md:p-10">
                  <div className="flex items-center justify-between eyebrow text-paper">
                    <span>
                      {study.index} / {String(studies.length).padStart(2, "0")}
                    </span>
                    <span>{study.year}</span>
                  </div>
                  <div>
                    <p className="eyebrow text-lime">{study.name}</p>
                    <h3 className="mt-3 text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[0.9] font-extrabold tracking-[-0.035em]">{study.genre}</h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/85">{study.summary}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-5">
                    <p className="text-sm text-paper/85">{study.services.slice(0, 3).join(" · ")}</p>
                    <span className="flex size-12 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover/card:scale-110">
                      <ArrowIcon className="size-5 -rotate-45" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
