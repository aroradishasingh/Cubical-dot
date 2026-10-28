"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { world } from "@/components/world/store";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function MotionRoot() {
  const bar = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const navigating = useRef(false);

  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.35, refreshPriority: 100 },
    });

    const mm = gsap.matchMedia();
    // Weighted scroll, driven by GSAP's ticker so pinned scenes stay in lockstep.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
      world.lenis = lenis;
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (!world.introDone && document.querySelector(".loader")) lenis.stop();
      const resume = () => lenis.start();
      window.addEventListener("cubical:intro-done", resume);
      return () => {
        window.removeEventListener("cubical:intro-done", resume);
        gsap.ticker.remove(tick);
        lenis.destroy();
        world.lenis = null;
      };
    });

    // A dot and a trailing ring. Elements with data-cursor="Label" grow the ring and name the action.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dot = cursor.current;
      const halo = ring.current;
      const text = label.current;
      if (!dot || !halo || !text) return;
      gsap.set([dot, halo], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
      const rx = gsap.quickTo(halo, "x", { duration: 0.55, ease: "power3.out" });
      const ry = gsap.quickTo(halo, "y", { duration: 0.55, ease: "power3.out" });
      const move = (event: MouseEvent) => {
        dx(event.clientX);
        dy(event.clientY);
        rx(event.clientX);
        ry(event.clientY);
      };
      const over = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const labelled = target?.closest<HTMLElement>("[data-cursor]:not([data-cursor='hot'])");
        const hot = target?.closest("a, button, input, textarea, select, summary, [data-cursor]");
        if (labelled) {
          text.textContent = labelled.dataset.cursor ?? "";
          gsap.to(halo, { width: 96, height: 96, backgroundColor: "#e1fc6d", borderColor: "#101012", duration: 0.45, ease: "expo.out", overwrite: "auto" });
          gsap.to(text, { autoAlpha: 1, duration: 0.25 });
          gsap.to(dot, { scale: 0, duration: 0.25 });
        } else {
          gsap.to(halo, {
            width: hot ? 64 : 36,
            height: hot ? 64 : 36,
            backgroundColor: "rgba(225,252,109,0)",
            borderColor: hot ? "rgba(44,92,246,0.95)" : "rgba(10,10,10,0.3)",
            duration: 0.45,
            ease: "expo.out",
            overwrite: "auto",
          });
          gsap.to(text, { autoAlpha: 0, duration: 0.15 });
          gsap.to(dot, { scale: 1, duration: 0.25 });
        }
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

  // Page transitions: a lime disc grows from the click, the route changes underneath, then the disc lifts away.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      const panel = curtain.current;
      if (!panel || navigating.current) return;
      event.preventDefault();
      navigating.current = true;
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      gsap.set(panel, { display: "block", clipPath: `circle(0% at ${x} ${y})` });
      gsap.to(panel, {
        clipPath: `circle(150% at ${x} ${y})`,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
    };
    // Capture phase: runs before next/link, whose own handler then sees defaultPrevented and stands down.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const panel = curtain.current;
    world.lenis?.scrollTo(0, { immediate: true, force: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (!panel || !navigating.current) return;
    gsap.to(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.9,
      delay: 0.1,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(panel, { display: "none", clipPath: "none" });
        navigating.current = false;
      },
    });
  }, [pathname]);

  return (
    <>
      <div ref={bar} className="pointer-events-none fixed top-0 left-0 z-[70] h-[2px] w-full origin-left bg-cobalt" aria-hidden />
      <div
        ref={curtain}
        className="pointer-events-none fixed inset-0 z-[90] hidden bg-cobalt"
        aria-hidden
      >
        <div className="flex h-full items-center justify-center">
          <span className="size-5 rounded-full bg-lime" />
        </div>
      </div>
      <div
        ref={ring}
        className="studio-cursor pointer-events-none fixed top-0 left-0 z-[85] flex size-9 items-center justify-center rounded-full border border-ink/30"
        aria-hidden
      >
        <span ref={label} className="invisible text-[0.75rem] font-semibold tracking-[0.08em] text-ink uppercase opacity-0" />
      </div>
      <div ref={cursor} className="pointer-events-none fixed top-0 left-0 hidden" aria-hidden />
    </>
  );
}
