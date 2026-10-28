"use client";

import { useRef } from "react";
import { world } from "@/components/world/store";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * First visit in a tab: on the cobalt field the dot appears, a square draws
 * itself around it (the cube), the count reaches 100, and the panel lifts
 * onto the living grid. Later visits and reduced-motion visitors skip it.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const finish = () => {
      if (world.introDone) return;
      world.introDone = true;
      try {
        sessionStorage.setItem("cubical-intro-seen", "1");
      } catch {
        // storage blocked: the intro plays again next time
      }
      window.dispatchEvent(new Event("cubical:intro-done"));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = world.introDone || sessionStorage.getItem("cubical-intro-seen") === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) {
      node.style.display = "none";
      finish();
      return;
    }

    document.documentElement.classList.add("is-loading");
    const counter = { value: 0 };
    const digits = node.querySelector(".loader-count");
    const frame = node.querySelector<SVGRectElement>(".loader-frame");
    const length = frame?.getTotalLength() ?? 400;
    gsap.set(frame, { strokeDasharray: length, strokeDashoffset: length });

    gsap
      .timeline({ onComplete: () => (node.style.display = "none") })
      .from(".loader-dot", { scale: 0, duration: 0.7, ease: "back.out(2)" })
      .from(".loader-line", { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 0.1)
      .to(frame, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0.3)
      .to(
        counter,
        {
          value: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (digits) digits.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        },
        0.2
      )
      .to(".loader-mark", { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "power3.in" })
      .to(".loader-line", { yPercent: -110, duration: 0.5, stagger: 0.03, ease: "expo.in" }, "<")
      .add(() => {
        document.documentElement.classList.remove("is-loading");
        finish();
      })
      .to(node, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<0.2");
  });

  return (
    <div ref={root} className="loader fixed inset-0 z-[95] flex flex-col justify-between bg-cobalt px-[var(--page-margin)] py-8 text-paper" aria-hidden>
      <div className="flex items-center justify-between eyebrow">
        <span className="overflow-hidden">
          <span className="loader-line block">Cubical Dot</span>
        </span>
        <span className="overflow-hidden">
          <span className="loader-line block">Independent design studio · India</span>
        </span>
      </div>
      <div className="loader-mark flex flex-1 items-center justify-center">
        <svg viewBox="0 0 120 120" className="size-28 md:size-36" fill="none">
          <rect className="loader-frame" x="6" y="6" width="108" height="108" rx="0" stroke="currentColor" strokeWidth="2" />
          <circle className="loader-dot origin-center [transform-box:fill-box]" cx="60" cy="60" r="14" fill="#e1fc6d" />
        </svg>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="max-w-md text-[clamp(1.6rem,3.4vw,3rem)] leading-[1] font-bold tracking-[-0.028em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="loader-line block">A website</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="loader-line block">
              built to <span className="serif-i">convert.</span>
            </span>
          </span>
        </p>
        <span className="overflow-hidden">
          <span className="loader-line loader-count block font-mono text-[clamp(3rem,9vw,8rem)] leading-[0.85] font-medium tabular-nums">000</span>
        </span>
      </div>
    </div>
  );
}
