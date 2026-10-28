"use client";

import { useRef } from "react";
import { Stop } from "@/components/story-line";
import { principles } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Chapter 06, the principles. Three words set huge; each one gains weight
 * (the variable font's wght axis) as it reaches the middle of the screen.
 */
export function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".principle-word").forEach((word) => {
          gsap.fromTo(
            word,
            { fontWeight: 220 },
            {
              fontWeight: 800,
              ease: "none",
              scrollTrigger: { trigger: word, start: "top 85%", end: "center 50%", scrub: 0.4 },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="paper" className="bg-paper text-ink" aria-labelledby="principles-title">
      <div className="shell relative z-[2] py-28 md:py-40">
        <p id="principles-title" className="eyebrow text-stone">
          06 — What we stand on
        </p>
        <ul className="mt-10">
          {principles.map((principle, index) => (
            <li key={principle.title} className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12 md:items-center md:py-10">
              <span className="eyebrow text-stone md:col-span-1">0{index + 1}</span>
              <p className="principle-word text-[clamp(3.6rem,12vw,12rem)] leading-[0.85] font-extrabold tracking-[-0.04em] md:col-span-7">
                {principle.title.replace(".", "")}
                {index === principles.length - 1 ? <Stop /> : "."}
              </p>
              <p className="max-w-sm text-lg leading-relaxed text-stone md:col-span-4">{principle.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
