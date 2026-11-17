"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { studies } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "cn";

/**
 * The full index as an editorial list. On a mouse, a preview of the hovered
 * study follows the cursor; on touch, each row carries its own cover.
 *
 * `/work` shows it over the wave floor; the home page shows the same list on
 * the ink field (`dark`) under its own heading, so every study is one click away.
 */
export function WorkIndex({ dark = false, heading }: { dark?: boolean; heading?: React.ReactNode }) {
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
    <section
      ref={root}
      {...(dark ? { "data-tone": "ink", "aria-labelledby": "work-title" } : { "data-form": "3" })}
      className={cn("relative", dark ? "bg-ink text-paper" : "text-ink")}
    >
      <div className={cn("shell", dark ? "relative z-[2] py-28 md:py-40" : "pb-28")}>
        {heading}
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
                  selected ? "border-lime bg-lime text-ink" : dark ? "border-paper/20 text-paper/75 hover:border-paper/40" : "border-ink/15 text-ink/75 hover:border-ink/15"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        <ul className={cn("mt-10 border-t", dark ? "border-paper/15" : "border-ink/15")} onMouseLeave={() => setHovered(null)}>
          {visible.map((study, index) => (
            <li key={study.slug} className={cn("border-b", dark ? "border-paper/15" : "border-ink/15")}>
              <Link
                href={`/work/${study.slug}`}
                data-cursor="View"
                onMouseEnter={() => setHovered(index)}
                className={cn("group/row grid items-baseline gap-x-6 gap-y-4 md:grid-cols-12", dark ? "py-5 md:py-6" : "py-7 md:py-10")}
              >
                <span className={cn("eyebrow tabular-nums md:col-span-1", dark ? "text-paper/65" : "text-ink/65")}>{study.index}</span>
                <span
                  className={cn(
                    "leading-[0.9] font-bold tracking-[-0.04em] transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-6",
                    dark ? "text-[clamp(1.9rem,3.6vw,3.6rem)]" : "text-[clamp(2.4rem,6vw,6rem)]",
                    hovered !== null && hovered !== index ? (dark ? "text-paper/55" : "text-ink/65") : dark ? "text-paper" : "text-ink",
                    hovered === index && "md:translate-x-4"
                  )}
                >
                  {hovered === index ? <span className={cn("serif-i font-normal", dark ? "text-lime" : "text-violet")}>{study.genre}</span> : study.genre}
                </span>
                <span className={cn("text-sm leading-relaxed md:col-span-3", dark ? "text-paper/65" : "text-ink/65")}>{study.services.slice(0, 3).join(" · ")}</span>
                <span className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className={cn("eyebrow", dark ? "text-paper/65" : "text-ink/65")}>{study.year}</span>
                  <ArrowIcon
                    className={cn(
                      "size-6 -rotate-45 transition-colors",
                      dark ? "text-paper/65 group-hover/row:text-lime" : "text-ink/65 group-hover/row:text-violet"
                    )}
                  />
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
        {visible.length === 0 ? <p className={cn("mt-10", dark ? "text-paper/65" : "text-ink/65")}>No studies in this sector yet.</p> : null}
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
