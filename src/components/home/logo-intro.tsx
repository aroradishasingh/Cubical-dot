"use client";

import { useRef } from "react";
import { markGeometry, slabPath } from "@/components/mark";
import { gsap, useGSAP } from "@/lib/gsap";

const letters = "Cubical Dot".split("");
const { viewBox, square, corners, dot, blue, lime, word } = markGeometry;
const dotStart = { cx: square - 3.5, cy: square - 3.5, r: 3.5 };
const sharp = slabPath(0, 0, 0, 0, square);

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
    node.querySelectorAll(".grid-shape").forEach((shape) => {
      const length = (shape as SVGGeometryElement).getTotalLength();
      gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
    });
    gsap.set(".grid-line", { strokeDasharray: 100, strokeDashoffset: 100 });
    gsap.set(".build-grid", { autoAlpha: 0 });
    gsap.set(".build-guide", { scaleX: 0, transformOrigin: "left center" });
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
    tl.to(".build-tm", { autoAlpha: 1, duration: 0.28 }, "-=0.12");

    tl.addLabel("grid", "+=0.22");
    tl.set(".build-grid", { autoAlpha: 1 });
    tl.to(".grid-line, .grid-shape", {
      strokeDashoffset: 0,
      duration: 0.9,
      stagger: 0.045,
      ease: "power1.out",
    });
    tl.to(".build-guide", { scaleX: 1, duration: 0.75, ease: "power2.out" }, "<");

    tl.addLabel("clear", "+=0.28");
    tl.to(".build-grid, .build-guide", { autoAlpha: 0, duration: 0.5 });
    tl.to({}, { duration: 0.7 });
    tl.to(node, { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" });

    tl.to(".build-progress", { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);

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
          <g className="build-grid" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1.15">
            <rect className="grid-shape" x="0" y="0" width={square} height={square} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={square / 2} y1="0" x2={square / 2} y2={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1="0" y1={square / 2} x2={square} y2={square / 2} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={corners.tl} y1="0" x2={corners.tl} y2={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1="0" y1={corners.tl} x2={square} y2={corners.tl} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={brX} y1="0" x2={brX} y2={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1="0" y1={brY} x2={square} y2={brY} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <path className="grid-shape" d={`M ${corners.tl} 0 A ${corners.tl} ${corners.tl} 0 0 1 0 ${corners.tl}`} vectorEffect="non-scaling-stroke" />
            <path className="grid-shape" d={`M ${square} ${brY} A ${corners.br} ${corners.br} 0 0 1 ${brX} ${square}`} vectorEffect="non-scaling-stroke" />
            <rect
              className="grid-shape"
              x={dot.cx - dot.r}
              y={dot.cy - dot.r}
              width={dot.r * 2}
              height={dot.r * 2}
              vectorEffect="non-scaling-stroke"
            />
            <line className="grid-line" x1={dot.cx} y1={dot.cy - dot.r} x2={dot.cx} y2={dot.cy + dot.r} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={dot.cx - dot.r} y1={dot.cy} x2={dot.cx + dot.r} y2={dot.cy} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
          </g>

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
        </svg>

        <div className="build-word-slot w-0 overflow-x-clip text-[0.95em] leading-none [translate:0_0.157em]">
          <div
            className="intro-word font-logo ml-[0.42em] inline-block w-max leading-none font-medium tracking-[-0.02em] whitespace-nowrap"
            style={{ color: word }}
          >
            {letters.map((letter, index) =>
              letter === " " ? (
                <span key={index} className="inline-block w-[0.28em]" />
              ) : (
                <span key={index} className="inline-block overflow-hidden align-bottom">
                  <span className="build-letter inline-block">{letter}</span>
                </span>
              )
            )}
            <sup className="build-tm ml-[0.12em] align-super text-[0.34em] font-medium opacity-0">™</sup>
          </div>
        </div>

        <div className="build-guide pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white/20" />
        <div className="build-guide pointer-events-none absolute inset-x-0 top-[27%] h-px origin-left scale-x-0 bg-white/20" />
        <div className="build-guide pointer-events-none absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-white/20" />
      </div>

      <div className="absolute bottom-10 left-1/2 h-px w-28 -translate-x-1/2 bg-white/15">
        <div className="build-progress h-px w-full origin-left bg-lime" />
      </div>
    </div>
  );
}
