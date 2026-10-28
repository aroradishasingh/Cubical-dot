"use client";

import { useRef } from "react";
import { Stop } from "@/components/story-line";
import { gsap, useGSAP } from "@/lib/gsap";

/** Chapter 02, the belief: what we're actually hired to fix, said plainly. */
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
    <>Premium brands</>,
    <>
      hire us when their <span className="serif-i">site</span>
    </>,
    <>still looks like a stopgap.</>,
    <>We rebuild it to match</>,
    <>
      the <span className="serif-i">price</span> they charge
    </>,
    <>and the market they&apos;re entering.</>,
  ];

  return (
    <section ref={root} data-tone="paper" className="bg-paper text-ink" aria-labelledby="intro-title">
      <div className="shell relative z-[2] grid gap-x-[var(--grid-gutter)] gap-y-12 py-28 md:py-40 lg:grid-cols-12">
        <p className="eyebrow flex items-center gap-3 text-stone lg:col-span-3">
          <Stop className="text-[2.2rem]" />
          <span>02 — The belief</span>
        </p>
        <div className="lg:col-span-9">
          <h2 id="intro-title" className="text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-bold tracking-[-0.03em]">
            {lines.map((line, index) => (
              <span key={index} className="block overflow-hidden pb-[0.05em]">
                <span className="intro-line block">{line}</span>
              </span>
            ))}
          </h2>
          <div className="mt-14 grid gap-8 border-t border-ink/15 pt-6 sm:grid-cols-2">
            <p className="text-lg leading-relaxed text-stone">
              We are hired by founders and brand leads whose price already says premium, and whose website still says otherwise.
            </p>
            <p className="text-lg leading-relaxed text-stone">
              Founder-led design, with specialist collaborators named before they join. You keep the same direction from first call to launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
