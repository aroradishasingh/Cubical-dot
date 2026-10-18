"use client";

import { useRef } from "react";
import { Chapter } from "@/components/chapter";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
      tl.fromTo(
        ".method-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none" }
      );
      tl.from(".method-step", { y: 28, autoAlpha: 0, stagger: 0.08, ease: "power2.out" }, 0);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="bg-ink text-white">
      <div className="shell py-20 lg:py-28">
        <Chapter index="05" label="Method" tone="light" />
        <h2 className="display mt-6 max-w-3xl text-[clamp(2.4rem,4.6vw,4.4rem)]">Five movements. One story.</h2>
        <div className="relative mt-14">
          <div className="method-line absolute top-3 right-0 left-0 hidden h-px origin-left bg-lime md:block" />
          <ol className="grid gap-y-8 gap-x-[var(--grid-gutter)] md:grid-cols-5">
            {method.map((step) => (
              <li key={step.index} className="method-step relative">
                <span className="relative z-10 inline-flex size-7 items-center justify-center rounded-[8px] bg-lime text-xs font-semibold text-ink">
                  {step.index}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
