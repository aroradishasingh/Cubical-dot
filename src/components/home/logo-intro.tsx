"use client";

import { useRef } from "react";
import { markGeometry } from "@/components/mark";
import { gsap, useGSAP } from "@/lib/gsap";

const letters = "Cubical Dot".split("");
const { viewBox, square, radius, dot, blue, lime, word } = markGeometry;

const radiusX = [radius, square - radius];
const radiusY = [radius, square - radius];

export function LogoIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("cubical-intro") === "1";
    if (reduce || seen) {
      node.style.display = "none";
      return;
    }

    window.sessionStorage.setItem("cubical-intro", "1");
    document.documentElement.style.overflow = "hidden";

    let timeline: gsap.core.Timeline | null = null;

    const strokeRect = node.querySelector(".build-stroke-rect") as SVGGeometryElement | null;
    const strokeDot = node.querySelector(".build-stroke-dot") as SVGGeometryElement | null;
    const gridShapes = node.querySelectorAll(".grid-shape");
    if (!strokeRect || !strokeDot) return;

      const rectLength = strokeRect.getTotalLength();
      const dotLength = strokeDot.getTotalLength();
      gsap.set(strokeRect, { strokeDasharray: rectLength, strokeDashoffset: rectLength });
      gsap.set(strokeDot, { strokeDasharray: dotLength, strokeDashoffset: dotLength, autoAlpha: 0 });
      gridShapes.forEach((shape) => {
        const length = (shape as SVGGeometryElement).getTotalLength();
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(".grid-line", { strokeDasharray: 100, strokeDashoffset: 100 });
      gsap.set(".build-guide", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".build-grid", { autoAlpha: 1 });
      gsap.set(".build-letter", { yPercent: 110 });

      let cancelled = false;
      const build = () => {
      if (cancelled || !root.current) return;
      timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          document.documentElement.style.overflow = "";
          if (root.current) root.current.style.display = "none";
        },
      });

      const tl = timeline;
      tl.to(".grid-line, .grid-shape", {
        strokeDashoffset: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "power1.out",
      });
      tl.to(".build-guide", { scaleX: 1, duration: 0.55, ease: "power2.out" }, 0.2);
      tl.to(strokeRect, { strokeDashoffset: 0, duration: 0.8 }, 0.4);

      tl.to(".build-fill-rect", { autoAlpha: 1, duration: 0.4 }, 1.15);
      tl.to(strokeRect, { autoAlpha: 0, duration: 0.28 }, 1.32);
      tl.to(".build-fill-rect", { attr: { rx: radius }, duration: 0.55 }, 1.58);

      tl.set(strokeDot, { autoAlpha: 1 }, 2.15);
      tl.to(strokeDot, { strokeDashoffset: 0, duration: 0.32 }, 2.15);
      tl.set(strokeDot, { strokeDasharray: 1000, strokeDashoffset: 0 }, 2.47);
      tl.to([strokeDot, ".build-fill-dot"], {
        attr: { cx: dot.cx, r: dot.r },
        duration: 0.8,
      }, 2.5);
      tl.to(".build-fill-dot", { autoAlpha: 1, duration: 0.28 }, 3.18);
      tl.to(strokeDot, { autoAlpha: 0, duration: 0.22 }, 3.22);

      tl.to(".build-letter", {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.028,
        ease: "power3.out",
      }, 3.05);
      tl.to(".build-tm", { autoAlpha: 1, duration: 0.25 }, 3.65);

      tl.to(".build-grid, .build-guide", { autoAlpha: 0, duration: 0.45 }, 4.15);
      tl.to(root.current, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 5.05);
      };

      if (document.fonts.status === "loaded") build();
      else document.fonts.ready.then(build);

    return () => {
      cancelled = true;
      timeline?.kill();
      document.documentElement.style.overflow = "";
    };
  }, { scope: root });

  return (
    <div
      ref={root}
      className="logo-intro fixed inset-0 z-[80] flex items-center justify-center bg-ink px-5"
      aria-hidden
    >
      <div className="intro-lockup relative inline-flex items-end text-[clamp(2.55rem,11.5vw,9.25rem)]">
        <svg viewBox={viewBox} className="build-mark h-[1em] w-auto overflow-visible" aria-hidden>
          <g className="build-grid" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1">
            <rect className="grid-shape" x="0" y="0" width={square} height={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={square / 2} y1="0" x2={square / 2} y2={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            {radiusX.map((x) => (
              <line key={`rx-${x}`} className="grid-line" x1={x} y1="0" x2={x} y2={square} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            ))}
            {radiusY.map((y) => (
              <line key={`ry-${y}`} className="grid-line" x1="0" y1={y} x2={square} y2={y} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            ))}
            <rect
              className="grid-shape"
              x={dot.cx - dot.r}
              y={dot.cy - dot.r}
              width={dot.r * 2}
              height={dot.r * 2}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100}
              vectorEffect="non-scaling-stroke"
            />
            <line className="grid-line" x1={dot.cx} y1={dot.cy - dot.r} x2={dot.cx} y2={dot.cy + dot.r} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
            <line className="grid-line" x1={dot.cx - dot.r} y1={dot.cy} x2={dot.cx + dot.r} y2={dot.cy} pathLength={100} strokeDasharray={100} strokeDashoffset={100} vectorEffect="non-scaling-stroke" />
          </g>

          <rect className="build-fill-rect opacity-0" x="0" y="0" width={square} height={square} rx="0" fill={blue} />
          <circle className="build-fill-dot opacity-0" cx="62" cy={dot.cy} r="4" fill={lime} />
          <rect
            className="build-stroke-rect"
            x="0.6"
            y="0.6"
            width={square - 1.2}
            height={square - 1.2}
            rx="0"
            fill="none"
            stroke="#f9f9f7"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={300}
            strokeDashoffset={300}
          />
          <circle
            className="build-stroke-dot opacity-0"
            cx="62"
            cy={dot.cy}
            r="4"
            fill="none"
            stroke="#f9f9f7"
            strokeWidth="1.15"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={40}
            strokeDashoffset={40}
          />
        </svg>

        <div className="intro-word font-logo mb-[-0.155em] ml-[0.48em] text-[0.93em] leading-none font-medium tracking-[-0.02em] whitespace-nowrap" style={{ color: word }}>
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

        <div className="build-guide pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white/20" />
        <div className="build-guide pointer-events-none absolute inset-x-0 top-[34%] h-px origin-left scale-x-0 bg-white/20" />
        <div className="build-guide pointer-events-none absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-white/20" />
      </div>
    </div>
  );
}
