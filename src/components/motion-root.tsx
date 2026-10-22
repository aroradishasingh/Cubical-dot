"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function MotionRoot() {
  const bar = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.35,
        refreshPriority: 100,
      },
    });

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dot = cursor.current;
      if (!dot) return;
      gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
      const move = (event: MouseEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const over = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const hot = target?.closest("a, button, input, textarea, select, summary, [data-cursor='hot']");
        gsap.to(dot, { scale: hot ? 2.4 : 1, duration: 0.3, overwrite: "auto" });
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
      };
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => mm.revert();
  });

  return (
    <>
      <div ref={bar} className="pointer-events-none fixed top-0 left-0 z-[70] h-[3px] w-full origin-left bg-lime" aria-hidden />
      <div
        ref={cursor}
        className="studio-cursor pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference size-3.5 rounded-full bg-lime"
        aria-hidden
      />
    </>
  );
}
