"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@/components/chapter";
import { cn } from "cn";

type Slide = { src: string; label: string };

const slides: Slide[] = [
  { src: "/mcdonalds/cover.webp", label: "McCampus" },
  { src: "/trimble-modus/01.webp", label: "Modus" },
  { src: "/magazine/01.webp", label: "Magazine" },
  { src: "/breadwala/01.webp", label: "Breadwala" },
  { src: "/identity/07.webp", label: "Identity" },
  { src: "/personal/08.webp", label: "Personal" },
  { src: "/creatives/01.webp", label: "Social" },
  { src: "/presentations/art-01.webp", label: "Presentations" },
  { src: "/gen-ai/07.webp", label: "Gen AI" },
  { src: "/trimble-modus/05.webp", label: "Modus" },
  { src: "/creatives/10.webp", label: "Social" },
  { src: "/gen-ai/10.webp", label: "Gen AI" },
];

const SLIDE_MS = 2200;

export function ShowReel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-ivory text-ink">
      <div className="shell pt-20 lg:pt-28">
        <Chapter index="05" label="Reel" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display section-title max-w-xl">Show reel.</h2>
          <p className="max-w-sm text-base leading-relaxed text-charcoal">
            The work, cut together — campaigns, identities, and the sites, back to back.
          </p>
        </div>
      </div>

      <div className="relative mt-12 h-[60svh] overflow-hidden bg-ink lg:mt-16 lg:h-[82svh]" aria-hidden>
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity ease-out",
              index === active ? "z-[1] opacity-100 duration-700" : "opacity-0 duration-700"
            )}
          >
            <img
              src={slide.src}
              alt=""
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "size-full object-cover transition-transform duration-[2600ms] ease-out",
                index === active ? "scale-[1.06]" : "scale-100"
              )}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />
        <div className="shell absolute inset-x-0 bottom-6 z-[3] flex items-end justify-between md:bottom-10">
          <p className="display text-[clamp(1.8rem,4.5vw,3.4rem)] leading-none text-white">{slides[active].label}</p>
          <p className="eyebrow text-white/60">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
