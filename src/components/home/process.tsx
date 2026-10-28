"use client";

import { useRef } from "react";
import { Stop } from "@/components/story-line";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Chapter 05, from dot to market. Five movements on the cobalt field; a lime
 * rail fills as you read across them. All copy on cobalt is full paper or
 * lime, both above 4.5:1.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".process-rail",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process-list", start: "top 75%", end: "bottom 60%", scrub: 0.6 } }
        );
        gsap.from(".process-step", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".process-list", start: "top 78%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="cobalt" className="bg-cobalt text-paper" aria-labelledby="process-title">
      <div className="shell relative z-[2] py-28 md:py-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-lime">05 — The method</p>
            <h2 id="process-title" className="mt-5 text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
              From dot <span className="serif-i">to market</span>
              <Stop />
            </h2>
          </div>
          <p className="text-lg leading-relaxed lg:col-span-4">
            Eight to fourteen weeks. A senior direction on the first call that stays through launch.
          </p>
        </div>

        <div className="process-list relative mt-20">
          <div className="absolute top-[1.1rem] right-0 left-0 hidden h-0.5 bg-paper/30 lg:block" aria-hidden>
            <div className="process-rail h-full origin-left bg-lime" />
          </div>
          <ol className="grid gap-12 lg:grid-cols-5 lg:gap-[var(--grid-gutter)]">
            {method.map((step) => (
              <li key={step.index} className="process-step relative">
                <span className="relative z-10 grid size-9 place-items-center rounded-full bg-lime font-mono text-sm font-medium text-ink">
                  {step.index}
                </span>
                <h3 className="mt-6 text-[clamp(1.8rem,2.4vw,2.4rem)] leading-none font-bold tracking-[-0.028em]">{step.title}</h3>
                <p className="mt-4 text-base leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
