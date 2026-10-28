"use client";

import { useRef } from "react";
import { GridField } from "@/components/grid-field";
import type { FormName } from "@/components/world/forms";
import { world } from "@/components/world/store";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Inner-page opening: the cobalt field and living grid from the home page,
 * at a calmer scale. The last word of the title is set light.
 * (`form` is accepted for parity with the other variations and unused here.)
 */
export function PageHero({
  index,
  label,
  title,
  lede,
  children,
}: {
  index: string;
  label: string;
  title: string;
  lede: string;
  form?: FormName;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const words = title.split(" ");
  const last = words.pop();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const play = () => {
          gsap.from(".ph-word", { yPercent: 110, duration: 1.3, stagger: 0.07, ease: "expo.out", delay: 0.3 });
          gsap.from(".ph-fade", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, delay: 0.6, ease: "expo.out" });
        };
        if (world.introDone) play();
        else window.addEventListener("cubical:intro-done", play, { once: true });
        return () => window.removeEventListener("cubical:intro-done", play);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-cobalt text-paper">
      <GridField cell={46} className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_75%)]" />
      <div className="shell pointer-events-none relative z-[2] flex min-h-[86svh] flex-col justify-end pt-36 pb-14 md:pb-20">
        <p className="ph-fade eyebrow text-lime">
          {index} — {label}
        </p>
        <h1 className="mt-6 max-w-[14ch] text-[clamp(3.4rem,9.5vw,10rem)] leading-[0.86] font-extrabold tracking-[-0.03em]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.22em] pb-[0.06em] align-bottom">
              <span className="ph-word inline-block">{word}</span>
            </span>
          ))}
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="ph-word serif-i inline-block pr-[0.04em]">{last}</span>
          </span>
        </h1>
        <div className="mt-10 grid gap-8 border-t border-paper/40 pt-6 md:grid-cols-12">
          <p className="ph-fade text-lg leading-snug md:col-span-6 md:text-xl">{lede}</p>
          {children ? <div className="ph-fade pointer-events-auto md:col-span-4 md:col-start-9 md:justify-self-end">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
