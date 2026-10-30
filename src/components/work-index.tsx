"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { studies } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "cn";

/**
 * The full index as an editorial list over the wave floor. On a mouse, a
 * preview of the hovered study follows the cursor; on touch, each row carries
 * its own cover.
 */
export function WorkIndex() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const sectors = useMemo(() => ["All", ...Array.from(new Set(studies.map((study) => study.sector)))], []);
  const [sector, setSector] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = sector === "All" ? studies : studies.filter((study) => study.sector === sector);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const card = preview.current;
        if (!card) return;
        // Sits up and to the right of the cursor so the "View" disc never covers it.
        gsap.set(card, { xPercent: 18, yPercent: -75 });
        const x = gsap.quickTo(card, "x", { duration: 0.7, ease: "power3.out" });
        const y = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3.out" });
        const r = gsap.quickTo(card, "rotate", { duration: 0.9, ease: "power3.out" });
        let lastX = 0;
        const move = (event: MouseEvent) => {
          x(event.clientX);
          y(event.clientY);
          r(gsap.utils.clamp(-8, 8, (event.clientX - lastX) * 0.4));
          lastX = event.clientX;
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-form="3" className="relative text-ink">
      <div className="shell pb-28">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter studies by sector">
          {sectors.map((item) => {
            const selected = item === sector;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSector(item)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                  selected ? "border-lime bg-lime text-ink" : "border-ink/15 text-ink/75 hover:border-ink/15"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 border-t border-ink/15" onMouseLeave={() => setHovered(null)}>
          {visible.map((study, index) => (
            <li key={study.slug} className="border-b border-ink/15">
              <Link
                href={`/work/${study.slug}`}
                data-cursor="View"
                onMouseEnter={() => setHovered(index)}
                className="group/row grid items-baseline gap-x-6 gap-y-4 py-7 md:grid-cols-12 md:py-10"
              >
                <span className="eyebrow text-ink/65 tabular-nums md:col-span-1">{study.index}</span>
                <span
                  className={cn(
                    "text-[clamp(2.4rem,6vw,6rem)] leading-[0.9] font-bold tracking-[-0.04em] transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-6",
                    hovered !== null && hovered !== index ? "text-ink/65" : "text-ink",
                    hovered === index && "md:translate-x-4"
                  )}
                >
                  {hovered === index ? <span className="serif-i font-normal text-violet">{study.genre}</span> : study.genre}
                </span>
                <span className="text-sm leading-relaxed text-ink/65 md:col-span-3">{study.services.slice(0, 3).join(" · ")}</span>
                <span className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="eyebrow text-ink/65">{study.year}</span>
                  <ArrowIcon className="size-6 -rotate-45 text-ink/65 transition-colors group-hover/row:text-violet" />
                </span>
                {study.cover ? (
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-tl-[22px] rounded-br-[22px] md:hidden">
                    <Image src={study.cover} alt="" fill sizes="90vw" className="object-cover" />
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        {visible.length === 0 ? <p className="mt-10 text-ink/65">No studies in this sector yet.</p> : null}
      </div>

      <div
        ref={preview}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/3] w-[26vw] overflow-hidden rounded-tl-[28px] rounded-br-[28px] shadow-2xl shadow-black/60 transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block",
          hovered === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
        )}
        aria-hidden
      >
        {visible.map((study, index) =>
          study.cover ? (
            <Image
              key={study.slug}
              src={study.cover}
              alt=""
              fill
              sizes="26vw"
              className={cn("object-cover transition-opacity duration-500", hovered === index ? "opacity-100" : "opacity-0")}
            />
          ) : null
        )}
      </div>
    </section>
  );
}
