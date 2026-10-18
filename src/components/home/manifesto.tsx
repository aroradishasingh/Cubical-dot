"use client";

import { useRef } from "react";
import { Chapter } from "@/components/chapter";
import { principles } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

const sentence = "We design the websites premium brands use to enter their next market.";

export function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  const words = sentence.split(" ");

  useGSAP(() => {
    const fills = gsap.utils.toArray<HTMLElement>(".manifesto-fill");
    if (!fills.length) return;

    const reveal = () => {
      gsap.set(fills, { opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      fills.forEach((word, index) => {
        tl.to(word, { opacity: 1, duration: 1 }, index * 0.75);
      });
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", reveal);
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(fills, { opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 60%",
          scrub: true,
        },
      });
      fills.forEach((word, index) => {
        tl.to(word, { opacity: 1, duration: 1 }, index * 0.75);
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(fills, { opacity: 1 });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section className="bg-ink text-white">
      <div ref={root} className="relative lg:h-[200vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:min-h-[100svh] lg:items-center">
          <div className="shell grid w-full items-center gap-x-[var(--grid-gutter)] gap-y-12 py-28 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Chapter index="02" label="Belief" tone="light" />
              <p className="sr-only">{sentence}</p>
              <p aria-hidden className="display mt-8 text-[clamp(2.3rem,4.8vw,4.7rem)]">
                {words.map((word, index) => (
                  <span key={`${word}-${index}`} className="relative mr-[0.28em] inline-block">
                    <span className="text-white/25">{word}</span>
                    <span className="manifesto-fill absolute inset-0 text-ivory opacity-0 motion-reduce:opacity-100">
                      {word}
                    </span>
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4">
              {principles.map((principle) => (
                <article key={principle.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em]">{principle.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
