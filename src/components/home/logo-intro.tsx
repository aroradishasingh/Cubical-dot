"use client";

import { useRef } from "react";
import { markGeometry, slabPath } from "@/components/mark";
import { gsap, useGSAP } from "@/lib/gsap";

const letters = "Cubical Dot".split("");
const { viewBox, square, corners, dot, blue, lime, word } = markGeometry;
const dotStart = { cx: square - 3.5, cy: square - 3.5, r: 3.5 };
const sharp = slabPath(0, 0, 0, 0, square);
const wordSize = 0.95;
const wordGap = 0.42;
const wordTail = 0.24;
const markEm = 101.67 / square;
const topBand = (corners.tl * 2) / square;
const wordLeft = markEm + wordGap * wordSize;
const gridLine = "bg-white/40";

export function LogoIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.display = "none";
      return;
    }

    const strokeRect = node.querySelector(".build-stroke-rect") as SVGGeometryElement | null;
    const strokeDot = node.querySelector(".build-stroke-dot") as SVGGeometryElement | null;
    const fillSlab = node.querySelector(".build-fill-slab") as SVGPathElement | null;
    if (!strokeRect || !strokeDot || !fillSlab) return;

    document.documentElement.style.overflow = "hidden";
    fillSlab.setAttribute("d", sharp);

    const rectLength = strokeRect.getTotalLength();
    const dotLength = strokeDot.getTotalLength();
    gsap.set(strokeRect, { strokeDasharray: rectLength, strokeDashoffset: rectLength });
    gsap.set(strokeDot, { strokeDasharray: dotLength, strokeDashoffset: dotLength, autoAlpha: 0 });
    node.querySelectorAll(".grid-dashed").forEach((shape) => {
      const length = (shape as SVGGeometryElement).getTotalLength();
      gsap.set(shape, { strokeDasharray: "3 2.2", strokeDashoffset: length });
    });
    gsap.set(".build-grid", { autoAlpha: 0 });
    gsap.set(".grid-h", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".grid-v", { scaleY: 0, transformOrigin: "center top" });
    gsap.set(".build-word-slot", { width: 0 });
    gsap.set(".build-letter", { yPercent: 110 });
    gsap.set(".build-mark", {
      scale: window.innerWidth < 800 ? 1.7 : 2.05,
      transformOrigin: "50% 50%",
    });
    gsap.set(".build-progress", { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        document.documentElement.style.overflow = "";
        node.style.display = "none";
      },
    });

    tl.addLabel("stroke", 0.2);
    tl.to(strokeRect, { strokeDashoffset: 0, duration: 1.15 }, "stroke");

    tl.addLabel("fill", "+=0.12");
    tl.to(fillSlab, { autoAlpha: 1, duration: 0.55 });
    tl.to(strokeRect, { autoAlpha: 0, duration: 0.35 }, "<0.22");

    tl.addLabel("radius", "+=0.08");
    const radii = { tl: 0, br: 0 };
    tl.to(radii, {
      tl: corners.tl,
      br: corners.br,
      duration: 0.75,
      onUpdate: () => {
        fillSlab.setAttribute("d", slabPath(radii.tl, 0, radii.br, 0, square));
      },
    });

    tl.addLabel("dot", "+=0.12");
    tl.set(strokeDot, { autoAlpha: 1 });
    tl.to(strokeDot, { strokeDashoffset: 0, duration: 0.4 });
    tl.set(strokeDot, { strokeDasharray: 1000, strokeDashoffset: 0 });
    tl.to([strokeDot, ".build-fill-dot"], {
      attr: { cx: dot.cx, cy: dot.cy, r: dot.r },
      duration: 1.05,
    });
    tl.to(".build-fill-dot", { autoAlpha: 1, duration: 0.32 });
    tl.to(strokeDot, { autoAlpha: 0, duration: 0.24 }, "<");

    tl.addLabel("word", "+=0.14");
    tl.to(".build-mark", { scale: 1, duration: 0.9, ease: "power3.inOut" });
    tl.to(".build-word-slot", {
      width: () => node.querySelector(".intro-word")?.scrollWidth ?? 680,
      duration: 0.9,
      ease: "power3.inOut",
    }, "<");
    tl.to(".build-letter", {
      yPercent: 0,
      duration: 0.55,
      stagger: 0.03,
      ease: "power3.out",
    }, "<0.14");

    tl.addLabel("grid", "+=0.22");
    tl.set(".build-grid", { autoAlpha: 1 });
    tl.to(".grid-h", { scaleX: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" });
    tl.to(".grid-v", { scaleY: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" }, "<");
    tl.to(".grid-dashed", { strokeDashoffset: 0, duration: 0.95, stagger: 0.08, ease: "power1.out" }, "<");

    tl.addLabel("clear", "+=0.28");
    tl.to(".build-grid", { autoAlpha: 0, duration: 0.5 });
    tl.to(".intro-progress", { autoAlpha: 0, duration: 0.3 }, "<");
    tl.to({}, { duration: 0.4 });

    const dock = () => {
      const lockup = node.querySelector(".intro-lockup") as HTMLElement | null;
      const target = document.querySelector("[data-site-logo]") as HTMLElement | null;
      if (!lockup || !target) return { x: 0, y: 0, scale: 1 };
      const from = lockup.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const scale = to.height > 0 && from.height > 0 ? to.height / from.height : 1;
      return {
        scale,
        x: to.left - from.left,
        y: to.top - from.top,
      };
    };
    let parked: ReturnType<typeof dock> | null = null;
    const place = () => (parked ??= dock());

    tl.addLabel("dock");
    tl.to(
      ".intro-lockup",
      {
        x: () => place().x,
        y: () => place().y,
        scale: () => place().scale,
        duration: 0.95,
        ease: "power3.inOut",
        transformOrigin: "0% 0%",
      },
      "dock"
    );
    tl.to(node, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, "dock+=0.7");

    tl.to(".build-progress", { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);
    tl.timeScale(1.18);

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, { scope: root });

  const brX = square - corners.br;
  const brY = square - corners.br;

  return (
    <div
      ref={root}
      className="logo-intro fixed inset-0 z-[80] flex items-center justify-center bg-ink px-5"
      role="status"
      aria-live="polite"
      aria-label="Loading Cubical Dot"
    >
      <div className="intro-lockup relative inline-flex items-end text-[clamp(2.55rem,11.5vw,9.25rem)]">
        <svg viewBox={viewBox} className="build-mark h-[1em] w-auto overflow-visible" aria-hidden>
          <path className="build-fill-slab opacity-0" d={sharp} fill={blue} />
          <circle className="build-fill-dot opacity-0" cx={dotStart.cx} cy={dotStart.cy} r={dotStart.r} fill={lime} />
          <rect
            className="build-stroke-rect"
            x="0.8"
            y="0.8"
            width={square - 1.6}
            height={square - 1.6}
            fill="none"
            stroke="#f9f9f7"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={320}
            strokeDashoffset={320}
          />
          <circle
            className="build-stroke-dot opacity-0"
            cx={dotStart.cx}
            cy={dotStart.cy}
            r={dotStart.r}
            fill="none"
            stroke="#f9f9f7"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <g className="build-grid" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6">
            <circle className="grid-dashed" cx={corners.tl} cy={corners.tl} r={corners.tl} vectorEffect="non-scaling-stroke" />
            <circle className="grid-dashed" cx={brX} cy={brY} r={corners.br} vectorEffect="non-scaling-stroke" />
            <circle className="grid-dashed" cx={dot.cx} cy={dot.cy} r={dot.r} vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div className="flex items-end text-[0.95em] leading-none [translate:0_0.157em]">
          <div className="w-[0.42em] shrink-0" />
          <div className="build-word-slot w-0 overflow-x-clip">
            <div
              className="intro-word font-logo inline-block w-max leading-none font-medium tracking-[-0.02em] whitespace-nowrap"
              style={{ color: word }}
            >
              {letters.map((letter, index) =>
                letter === " " ? (
                  <span key={index} className="inline-block w-[0.28em]" />
                ) : (
                  <span key={index} className="inline-block overflow-x-visible overflow-y-clip align-bottom">
                    <span className="build-letter inline-block">{letter}</span>
                  </span>
                )
              )}
              <span className="inline-block" style={{ width: `${wordTail}em` }} />
            </div>
          </div>
        </div>

        <div
          className="build-grid pointer-events-none absolute inset-x-0 z-10"
          style={{ top: `-${topBand}em`, bottom: 0 }}
        >
          {[0, topBand, topBand + 0.27, topBand + 0.5].map((top) => (
            <div key={top} className={`grid-h absolute right-0 left-0 h-px ${gridLine}`} style={{ top: `${top}em` }} />
          ))}
          <div className={`grid-h absolute inset-x-0 bottom-0 h-px ${gridLine}`} />
          {[0, 1, (dot.cx - dot.r) / square, (dot.cx + dot.r) / square, wordLeft].map((left) => (
            <div key={left} className={`grid-v absolute top-0 bottom-0 w-px ${gridLine}`} style={{ left: `${left}em` }} />
          ))}
          <div className={`grid-v absolute top-0 right-0 bottom-0 w-px ${gridLine}`} />
        </div>
      </div>

      <div className="intro-progress absolute bottom-10 left-1/2 h-px w-28 -translate-x-1/2 bg-white/15">
        <div className="build-progress h-px w-full origin-left bg-lime" />
      </div>
    </div>
  );
}
