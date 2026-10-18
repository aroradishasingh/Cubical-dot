"use client";

import { useRef } from "react";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";
import type { Composition, Tone } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export function PageHero({
  index,
  label,
  title,
  lede,
  variant = "orbit",
  tone = "dusk",
  children,
}: {
  index: string;
  label: string;
  title: string;
  lede: string;
  variant?: Composition;
  tone?: Tone;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".page-hero-line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".page-hero-fade", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.06,
        delay: 0.25,
        ease: "power2.out",
      });
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
        <FieldArt variant={variant} tone={tone} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
      </div>
      <div className="shell relative z-10 flex min-h-[78svh] flex-col justify-end pt-32 pb-16 md:pb-20">
        <div className="page-hero-fade">
          <Chapter index={index} label={label} tone="light" />
        </div>
        <h1 className="display mt-6 max-w-4xl text-[clamp(3rem,7vw,6.2rem)]">
          <span className="block overflow-hidden pt-[0.02em] pb-[0.12em]">
            <span className="page-hero-line block">{title}</span>
          </span>
        </h1>
        <p className="page-hero-fade mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          {lede}
        </p>
        {children ? <div className="page-hero-fade mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
