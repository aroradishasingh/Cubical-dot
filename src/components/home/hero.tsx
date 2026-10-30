"use client";

import { useRef } from "react";
import { BrandButton } from "@/components/brand-button";
import { GridField } from "@/components/grid-field";
import { Stop } from "@/components/story-line";
import { world } from "@/components/world/store";
import { gsap, useGSAP } from "@/lib/gsap";

/** Chapter 01, the idea. Cobalt field, living grid, the first stop of the line. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-line", { yPercent: 110 });
        gsap.set(".hero-fade", { autoAlpha: 0, y: 16 });
        const enter = () =>
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .to(".hero-line", { yPercent: 0, duration: 1.5, stagger: 0.1 }, 0.2)
            .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7);
        if (world.introDone) enter();
        else window.addEventListener("cubical:intro-done", enter, { once: true });
        return () => window.removeEventListener("cubical:intro-done", enter);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="cobalt" className="relative overflow-hidden bg-cobalt text-paper" aria-labelledby="hero-title">
      <GridField className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_82%)]" />
      <div className="shell pointer-events-none relative z-[2] flex min-h-[100svh] flex-col pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-4 eyebrow text-paper">
          <span>Independent design studio · India</span>
          <span className="hidden sm:inline">Websites for brands crossing borders</span>
        </div>

        <h1 id="hero-title" className="mt-auto text-[clamp(4.2rem,13.5vw,14.5rem)] leading-[0.84] font-extrabold tracking-[-0.03em]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="hero-line block">Websites</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">
              that <span className="serif-i">convert.</span>
              <Stop />
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 border-t border-paper/40 pt-6 md:grid-cols-12 md:items-end">
          <p className="hero-fade max-w-xl text-lg leading-snug md:col-span-6 md:text-xl">
            Cubical Dot designs and redesigns websites for premium brands entering their next market - faster pages, a clearer path to inquiry, and a site that matches the price you charge.
          </p>
          <div className="hero-fade pointer-events-auto flex flex-wrap gap-3 md:col-span-5 md:col-start-8 md:justify-end">
            <BrandButton href="/contact" variant="lime" size="pillLg" magnetic>
              Get in touch
            </BrandButton>
            <BrandButton href="/work" variant="ghostLight" size="pillLg" magnetic>
              See the work
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
