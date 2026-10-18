"use client";

import { useId, useRef } from "react";
import { Chapter } from "@/components/chapter";
import { gsap, useGSAP } from "@/lib/gsap";

const letters = "Cubical Dot".split("");

const horizontal = [16, 32, 50, 68, 84];
const vertical = [10, 24, 38, 52, 66, 80, 92];

const captions: Record<string, string> = {
  stroke: "Stroke",
  fill: "Fill",
  radius: "Radius",
  dot: "The dot",
  wordmark: "Wordmark",
  grid: "Grid",
};

export function LogoBuild() {
  const root = useRef<HTMLElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const gradientId = useId().replace(/:/g, "");

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const setFinal = () => {
      gsap.set(".build-stroke-rect, .build-stroke-dot, .build-grid", { autoAlpha: 0 });
      gsap.set(".build-fill-rect", { autoAlpha: 1, attr: { rx: 18 } });
      gsap.set(".build-fill-dot", { autoAlpha: 1, attr: { cx: 86, cy: 32, r: 12 } });
      gsap.set(".build-letter", { yPercent: 0 });
      gsap.set(".build-word-slot", { width: "auto" });
      gsap.set(".build-word", { color: "#f9f9f7", "--stroke": 0 });
      gsap.set(".build-tm", { autoAlpha: 1 });
      gsap.set(".build-hint", { autoAlpha: 0 });
      if (caption.current) caption.current.textContent = "Cubical Dot";
    };

    mm.add("(prefers-reduced-motion: reduce)", () => {
      setFinal();
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const strokeRect = root.current?.querySelector(".build-stroke-rect") as SVGGeometryElement | null;
      const strokeDot = root.current?.querySelector(".build-stroke-dot") as SVGGeometryElement | null;
      const fillRect = root.current?.querySelector(".build-fill-rect");
      const fillDot = root.current?.querySelector(".build-fill-dot");
      const box = root.current?.querySelector(".grid-box") as SVGGeometryElement | null;
      if (!strokeRect || !strokeDot || !fillRect || !fillDot || !box) return;

      const rectLength = strokeRect.getTotalLength();
      const dotLength = strokeDot.getTotalLength();
      const boxLength = box.getTotalLength();

      gsap.set(strokeRect, { strokeDasharray: rectLength, strokeDashoffset: rectLength });
      gsap.set(strokeDot, { strokeDasharray: dotLength, strokeDashoffset: dotLength, autoAlpha: 0 });
      gsap.set(box, { strokeDasharray: boxLength, strokeDashoffset: boxLength });
      gsap.set(".grid-line, .grid-axis", { strokeDasharray: 100, strokeDashoffset: 100 });
      gsap.set(".build-grid", { autoAlpha: 0 });
      gsap.set(".build-word-slot", { width: 0 });
      gsap.set(".build-mark", {
        scale: window.innerWidth < 800 ? 3.15 : 2.15,
        transformOrigin: "50% 50%",
      });
      gsap.set(".build-progress", { scaleX: 0, transformOrigin: "left center" });

      const distance = window.innerWidth < 800 ? 2400 : 3600;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${distance}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          if (!caption.current) return;
          const time = tl.time();
          const order = ["stroke", "fill", "radius", "dot", "wordmark", "grid"];
          let label = "Scroll";
          order.forEach((name) => {
            const at = tl.labels[name];
            if (typeof at === "number" && time >= at + 0.08) label = captions[name];
          });
          caption.current.textContent = label;
        },
      });

      tl.addLabel("stroke", 0);
      tl.to(".build-hint", { autoAlpha: 0, duration: 0.25 }, 0.08);
      tl.to(strokeRect, { strokeDashoffset: 0, duration: 1.35 }, 0);

      tl.addLabel("fill");
      tl.to(fillRect, { autoAlpha: 1, duration: 0.85 }, "+=0.05");
      tl.to(strokeRect, { autoAlpha: 0, duration: 0.4 }, "-=0.35");

      tl.addLabel("radius");
      tl.to(fillRect, { attr: { rx: 18 }, duration: 1.05 });

      tl.addLabel("dot", "+=0.06");
      tl.set(strokeDot, { autoAlpha: 1 });
      tl.to(strokeDot, { strokeDashoffset: 0, duration: 0.55 });
      tl.set(strokeDot, { strokeDasharray: 1000, strokeDashoffset: 0 });
      tl.to([strokeDot, fillDot], {
        attr: { cx: 86, r: 12 },
        duration: 1.55,
        ease: "power2.inOut",
      });
      tl.to(fillDot, { autoAlpha: 1, duration: 0.32 }, "+=0.04");
      tl.to(strokeDot, { autoAlpha: 0, duration: 0.28 }, "<");
      tl.to(fillDot, { attr: { r: 14.4 }, duration: 0.2, ease: "power2.out" });
      tl.to(fillDot, { attr: { r: 12 }, duration: 0.26, ease: "power2.inOut" });

      tl.addLabel("wordmark", "+=0.1");
      tl.to(".build-mark", { scale: 1, duration: 0.9, ease: "power2.inOut" });
      tl.to(".build-word-slot", {
        width: () => root.current?.querySelector(".build-word")?.scrollWidth ?? 640,
        duration: 0.95,
        ease: "power2.inOut",
      }, "<");
      tl.from(".build-letter", {
        yPercent: 110,
        duration: 0.7,
        stagger: 0.04,
        ease: "power2.out",
      }, "<0.16");
      tl.to(".build-word", { color: "#f9f9f7", "--stroke": 0, duration: 0.5 }, "+=0.06");
      tl.to(".build-tm", { autoAlpha: 1, duration: 0.25 }, "<0.08");

      tl.addLabel("grid", "+=0.28");
      tl.set(".build-grid", { autoAlpha: 1 });
      tl.to(".grid-axis", { strokeDashoffset: 0, duration: 0.55 });
      tl.to(".grid-line", {
        strokeDashoffset: 0,
        duration: 0.75,
        stagger: { each: 0.045, from: "center" },
      }, "<0.08");
      tl.to(box, { strokeDashoffset: 0, duration: 0.85 }, "<0.12");
      tl.to({}, { duration: 0.7 });

      tl.to(".build-progress", { scaleX: 1, duration: tl.duration() }, 0);
    }, root);

    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="logo-build relative bg-ink text-white" aria-label="Logo drawn on scroll">
      <p className="sr-only">Cubical Dot. Scrolling draws the mark, the wordmark, and a construction grid.</p>
      <div className="relative flex h-[100svh] flex-col items-center justify-center px-5">
        <div className="absolute top-24 left-5 md:top-28 md:left-10 lg:left-16">
          <Chapter index="00" label="The mark" tone="light" />
        </div>
        <p ref={caption} className="eyebrow absolute top-24 right-5 text-lime md:top-28 md:right-10 lg:right-16">
          Scroll
        </p>

        <div className="build-lockup relative flex items-center gap-[0.18em] text-[clamp(1.75rem,9vw,8.6rem)]">
          <svg
            viewBox="0 0 100 64"
            className="build-mark h-[0.95em] w-auto shrink-0 overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9a78ff" />
                <stop offset="45%" stopColor="#6318ff" />
                <stop offset="100%" stopColor="#2a0d8c" />
              </linearGradient>
            </defs>
            <rect className="build-fill-rect opacity-0" x="0" y="0" width="64" height="64" rx="0" fill={`url(#${gradientId})`} />
            <circle className="build-fill-dot opacity-0" cx="62" cy="32" r="4" fill="#d7ff3f" />
            <rect
              className="build-stroke-rect"
              x="0.8"
              y="0.8"
              width="62.4"
              height="62.4"
              rx="0"
              fill="none"
              stroke="#f9f9f7"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={400}
              strokeDashoffset={400}
            />
            <circle
              className="build-stroke-dot"
              cx="62"
              cy="32"
              r="4"
              fill="none"
              stroke="#f9f9f7"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray={80}
              strokeDashoffset={80}
            />
          </svg>

          <div className="build-word-slot overflow-hidden">
          <div className="build-word inline-block w-max text-[1em] leading-none font-bold tracking-[-0.055em] whitespace-nowrap">
            {letters.map((letter, index) =>
              letter === " " ? (
                <span key={index} className="inline-block w-[0.28em]" aria-hidden />
              ) : (
                <span key={index} className="inline-block overflow-hidden align-bottom">
                  <span className="build-letter inline-block">{letter}</span>
                </span>
              )
            )}
            <sup className="build-tm ml-[0.08em] align-super text-[0.35em] font-semibold opacity-0">™</sup>
          </div>
          </div>

          <div className="build-grid pointer-events-none absolute -inset-x-[5%] -inset-y-[42%]" aria-hidden>
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {horizontal.map((y) => (
              <line
                key={`h-${y}`}
                className={y === 50 ? "grid-axis" : "grid-line"}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                pathLength={100}
                stroke={y === 50 ? "#d7ff3f" : "rgba(249,249,247,0.55)"}
                strokeWidth={y === 50 ? 1.4 : 1}
                vectorEffect="non-scaling-stroke"
                strokeDasharray={100}
                strokeDashoffset={100}
              />
            ))}
            {vertical.map((x) => (
              <line
                key={`v-${x}`}
                className="grid-line"
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                pathLength={100}
                stroke="rgba(249,249,247,0.42)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={100}
                strokeDashoffset={100}
              />
            ))}
            <rect
              className="grid-box"
              x="4"
              y="8"
              width="92"
              height="84"
              fill="none"
              stroke="#d7ff3f"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          </div>
        </div>

        <p className="build-hint eyebrow absolute bottom-16 text-white/55">Scroll to draw the mark</p>
        <div className="absolute bottom-10 left-1/2 h-px w-28 -translate-x-1/2 bg-white/15">
          <div className="build-progress h-px w-full origin-left bg-lime" />
        </div>
      </div>
    </section>
  );
}
