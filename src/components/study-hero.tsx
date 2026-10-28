"use client";

import { useRef } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { StudyMedia } from "@/components/study-media";
import type { Study } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export function StudyHero({ study }: { study: Study }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".study-line", {
        yPercent: 110,
        duration: 0.95,
        ease: "power3.out",
      });
      gsap.from(".study-fade", {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.06,
        delay: 0.2,
        ease: "power2.out",
      });
      gsap.to(".study-shift", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} data-form="3" className="relative min-h-[100svh] overflow-hidden bg-night text-white">
      <div className="study-shift absolute inset-0">
        <StudyMedia study={study} motion="idle" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/10" />
      </div>
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pt-32 pb-14">
        <div className="study-fade">
          <Breadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/work", label: "Work" },
              { label: study.name },
            ]}
          />
        </div>
        <p className="study-fade eyebrow mt-8 text-white/60">
          ({study.index}) — {study.sector}
        </p>
        <p className="study-fade serif-i mt-4 text-[clamp(1.6rem,3vw,2.6rem)] leading-none text-lime">{study.name}</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(2.8rem,6.6vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em]">
          <span className="block overflow-hidden pt-[0.02em] pb-[0.12em]">
            <span className="study-line block">{study.headline}</span>
          </span>
        </h1>
        <dl className="study-fade mt-10 grid gap-[var(--grid-gutter)] border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Client", study.name],
            ["Markets", study.markets],
            ["Year", study.year],
            ["Services", study.services.join(", ")],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="eyebrow text-white/70">{label}</dt>
              <dd className="mt-2 text-sm leading-snug text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
