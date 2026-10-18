"use client";

import { useRef } from "react";
import { Chapter } from "@/components/chapter";
import { principles } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

const sentence = "We design the websites premium brands use to enter their next market.";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const words = sentence.split(" ");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.7,
        },
      });
      tl.to(".manifesto-word", {
        color: "#f9f9f7",
        stagger: 0.08,
        ease: "none",
      });
    });
    mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".manifesto-word", {
        color: "#f9f9f7",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="bg-ink text-white">
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-12 px-5 py-28 md:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-8">
          <Chapter index="02" label="Belief" tone="light" />
          <p className="sr-only">{sentence}</p>
          <p aria-hidden className="display mt-8 text-[clamp(2.3rem,4.8vw,4.7rem)]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="manifesto-word mr-[0.28em] inline-block text-[#a3a3a3]">
                {word}
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4">
          {principles.map((principle) => (
            <article key={principle.title} className="principle-card rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{principle.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-white/80">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
