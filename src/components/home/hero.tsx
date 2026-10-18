"use client";

import { useRef } from "react";
import { BrandButton } from "@/components/brand-button";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
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
        tl.from(".hero-slab", {
          scale: 0.72,
          rotation: -14,
          autoAlpha: 0,
          duration: 1.15,
          transformOrigin: "60% 40%",
        })
          .from(
            ".hero-sphere-lime",
            { x: 90, scale: 0.4, autoAlpha: 0, duration: 0.95, ease: "back.out(1.5)" },
            "-=0.72"
          )
          .from(".hero-sphere-blue", { y: 70, autoAlpha: 0, duration: 1.05 }, "-=0.85")
          .from(".hero-line", { yPercent: 110, duration: 0.9, stagger: 0.08 }, "-=0.55")
          .from(
            ".hero-rule",
            { scaleX: 0, duration: 0.55, ease: "power2.out", transformOrigin: "left center" },
            "-=0.4"
          )
          .from(".hero-fade", { y: 18, autoAlpha: 0, duration: 0.65, stagger: 0.07 }, "-=0.35");

        gsap.to(".hero-slab", {
          y: -22,
          rotation: 4,
          duration: 7.5,
          delay: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-sphere-lime", {
          y: -16,
          duration: 4.8,
          delay: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-sphere-blue", {
          y: 18,
          duration: 6.4,
          delay: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

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
          yPercent: 10,
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
      <div className="hero-art absolute inset-0">
        <FieldArt variant="orbit" tone="dusk" motion="hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25 md:bg-gradient-to-r md:from-ink md:from-20% md:via-ink/75 md:via-48% md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="hero-parallax relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-28 pb-8 md:px-10 md:pb-10 lg:px-16">
        <div className="hero-fade">
          <Chapter index="01" label="Arrival" tone="light" />
        </div>
        <h1 className="display mt-6 max-w-5xl text-[clamp(3.6rem,9.2vw,7.8rem)]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block">Ideas</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block">in motion.</span>
          </span>
        </h1>
        <span className="hero-rule mt-6 block h-px w-28 origin-left bg-lime" />
        <p className="hero-fade mt-6 max-w-xl text-lg leading-snug font-medium tracking-[-0.03em] text-white md:text-2xl">
          Design in every detail.
        </p>
        <p className="hero-fade mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
          Cubical Dot designs and redesigns websites for premium brands selling across borders. The form stays simple. The idea gets bigger.
        </p>
        <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row">
          <BrandButton href="/contact" variant="lime" size="pillLg" magnetic>
            Start a project
          </BrandButton>
          <BrandButton href="/work" variant="ghostLight" size="pillLg" magnetic>
            See the work
          </BrandButton>
        </div>
        <div className="hero-fade mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs tracking-[0.14em] text-white/50 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>Website design & redesign</span>
          <span className="hidden sm:inline">By engagement</span>
          <span>Worldwide</span>
        </div>
      </div>
    </section>
  );
}
