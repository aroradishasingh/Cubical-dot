"use client";

import { useRef } from "react";
import { Stop } from "@/components/story-line";
import { gsap, useGSAP } from "@/lib/gsap";

/** The belief: the problem we solve and why a brand should come to us. */
export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".intro-line", {
          yPercent: 100,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const lines = [
    <>Your product is premium.</>,
    <>
      Your <span className="serif-i">website</span>
    </>,
    <>
      should look it
      <Stop />
    </>,
  ];

  return (
    <section ref={root} data-tone="paper" className="bg-paper text-ink" aria-labelledby="intro-title">
      <div className="shell relative z-[2] grid gap-x-[var(--grid-gutter)] gap-y-12 py-28 md:py-40 lg:grid-cols-12">
        <div className="lg:col-span-10">
          <h2 id="intro-title" className="text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-bold tracking-[-0.03em]">
            {lines.map((line, index) => (
              <span key={index} className="block overflow-hidden pb-[0.05em]">
                <span className="intro-line block">{line}</span>
              </span>
            ))}
          </h2>
          <div className="mt-14 grid gap-8 border-t border-ink/15 pt-6 sm:grid-cols-2">
            <p className="text-lg leading-relaxed text-stone">
              Most growing brands outgrow their website without noticing. It looks generic, it doesn&apos;t match what they charge, and visitors decide in seconds whether to trust it.
            </p>
            <p className="text-lg leading-relaxed text-stone">
              We design websites and brand identities that look as premium as what you sell, so the right customers take you seriously from the first screen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
