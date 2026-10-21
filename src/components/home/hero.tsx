"use client";

import { useRef } from "react";
import { BrandButton } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        ok: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean; ok: boolean };
        if (reduce) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-wallpaper", { autoAlpha: 0, duration: 1.2, ease: "power2.out" })
          .from(".hero-line", { yPercent: 110, duration: 0.9, stagger: 0.08 }, "-=0.7")
          .from(
            ".hero-rule",
            { scaleX: 0, duration: 0.55, ease: "power2.out", transformOrigin: "left center" },
            "-=0.4"
          )
          .from(".hero-fade", { y: 18, autoAlpha: 0, duration: 0.65, stagger: 0.07 }, "-=0.35");

        gsap.to(".hero-parallax", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        gsap.to(".hero-art", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      },
      root
    );
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="hero-art pointer-events-none absolute inset-0" aria-hidden>
        <img
          src="/hero-wallpaper.png"
          alt=""
          className="hero-wallpaper absolute top-0 right-0 h-[38%] w-[205%] max-w-none object-cover object-[right_8%] md:inset-x-0 md:-top-[12%] md:h-[124%] md:w-full md:object-[78%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[2%] via-ink via-[27%] to-ink md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink via-ink/70 to-transparent md:h-28 md:via-ink/35" />
      </div>
      <div className="hero-parallax shell relative z-10 flex min-h-[100svh] flex-col justify-end pt-28 pb-8 md:pb-10">
        <div className="hero-fade">
          <Chapter index="01" label="Arrival" tone="light" />
        </div>
        <h1 className="display mt-6 max-w-5xl text-[clamp(3.6rem,9.2vw,7.8rem)]">
          <span className="block overflow-hidden pt-[0.02em] pb-[0.08em]">
            <span className="hero-line block">Ideas</span>
          </span>
          <span className="mt-[-0.06em] block overflow-hidden pt-[0.02em] pb-[0.08em]">
            <span className="hero-line block">
              in <span className="motion-flow inline-block">motion.</span>
            </span>
          </span>
        </h1>
        <span className="hero-rule mt-6 block h-px w-28 origin-left bg-lime" />
        <p className="hero-fade mt-6 max-w-xl text-xl leading-snug font-medium tracking-[-0.02em] text-white md:text-2xl">
          Design in every detail.
        </p>
        <p className="hero-fade mt-4 max-w-[38rem] text-base leading-relaxed text-white/80">
          Cubical Dot designs and redesigns websites for premium brands selling across borders. The form stays simple. The idea gets bigger.
        </p>
        <div className="hero-fade mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <BrandButton href="/contact" variant="lime" size="pillLg" magnetic>
            Start a project
          </BrandButton>
          <BrandButton href="/work" variant="ghostLight" size="pillLg" magnetic>
            See the work
          </BrandButton>
        </div>
        <div className="hero-fade mt-14 flex flex-col gap-3 eyebrow border-t border-white/10 pt-5 text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <span>Website design & redesign</span>
          <span className="hidden sm:inline">By engagement</span>
          <span>Worldwide</span>
        </div>
      </div>
    </section>
  );
}
