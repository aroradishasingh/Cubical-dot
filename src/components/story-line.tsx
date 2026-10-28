"use client";

import { useEffect, useRef } from "react";

/**
 * "Follow the dot." One line runs through the whole page, from stop to stop.
 * Each chapter carries a stop (`<Stop />`), usually the period of its
 * headline. As you scroll, the lime dot draws the line down the page and
 * fills each stop as it arrives.
 *
 * The line sits above section backgrounds and below content, so it never
 * covers text. Its colour follows the section underneath (`data-tone`).
 */

const strokeFor: Record<string, string> = {
  paper: "#2c5cf6",
  cobalt: "#e1fc6d",
  ink: "#e1fc6d",
  lime: "#101012",
};

export function Stop({ className = "" }: { className?: string }) {
  return <span data-stop aria-hidden className={`story-stop ${className}`} />;
}

export function StoryLine({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dotLayer = useRef<SVGSVGElement>(null);
  const dot = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = root.current;
    const line = path.current;
    const pen = dot.current;
    const canvas = svg.current;
    const dotCanvas = dotLayer.current;
    if (!container || !line || !pen || !canvas || !dotCanvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stops: HTMLElement[] = [];
    let stopLengths: number[] = [];
    let samples: { y: number; len: number }[] = [];
    let total = 0;
    let current = 0;

    const build = () => {
      const box = container.getBoundingClientRect();
      const top = box.top + window.scrollY;
      canvas.setAttribute("viewBox", `0 0 ${box.width} ${container.scrollHeight}`);
      canvas.style.height = `${container.scrollHeight}px`;
      dotCanvas.setAttribute("viewBox", `0 0 ${box.width} ${container.scrollHeight}`);
      dotCanvas.style.height = `${container.scrollHeight}px`;

      stops = Array.from(container.querySelectorAll<HTMLElement>("[data-stop]"));
      const points = stops.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + window.scrollY - top + r.height / 2 };
      });
      if (points.length < 2) return;

      // Long stretches run down the page margin and change sides only in the
      // empty padding between sections, so the line stays out of the reading.
      // Every piece keeps y rising, so scroll maps cleanly onto the line.
      const w = box.width;
      const margin = Math.min(80, Math.max(20, w * 0.04));
      // The dot's outer glow has a 16px radius, so the lane needs at least
      // that much clearance plus a small buffer, or it clips against the
      // viewport edge on narrow screens.
      const lane = Math.max(24, margin / 2);
      const gutter = (x: number) => (x > w / 2 ? w - lane : lane);
      const bands = Array.from(container.querySelectorAll<HTMLElement>("[data-tone]")).map((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom + window.scrollY - top;
      });
      const bend = 150;
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        if (b.y - a.y < bend * 3) {
          const dy = (b.y - a.y) * 0.55;
          d += ` C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
          continue;
        }
        const ga = gutter(a.x);
        const gb = gutter(b.x);
        d += ` C ${a.x} ${a.y + bend * 0.6}, ${ga} ${a.y + bend * 0.4}, ${ga} ${a.y + bend}`;
        if (ga !== gb) {
          const mid = (a.y + b.y) / 2;
          const edges = bands.filter((y) => y > a.y + bend * 1.5 && y < b.y - bend * 1.5);
          const cross = edges.length ? edges.reduce((best, y) => (Math.abs(y - mid) < Math.abs(best - mid) ? y : best)) : mid;
          d += ` L ${ga} ${cross - 70} C ${ga} ${cross}, ${gb} ${cross}, ${gb} ${cross + 70}`;
        }
        d += ` L ${gb} ${b.y - bend} C ${gb} ${b.y - bend * 0.4}, ${b.x} ${b.y - bend * 0.6}, ${b.x} ${b.y}`;
      }
      line.setAttribute("d", d);

      // Body copy punches holes in the line, so it reads as passing beneath the text.
      const mask = canvas.querySelector("mask");
      if (mask) {
        const ns = "http://www.w3.org/2000/svg";
        mask.innerHTML = "";
        const full = document.createElementNS(ns, "rect");
        full.setAttribute("width", String(w));
        full.setAttribute("height", String(container.scrollHeight));
        full.setAttribute("fill", "white");
        mask.appendChild(full);
        container.querySelectorAll<HTMLElement>("p, h3, li a").forEach((el) => {
          if (el.querySelector("[data-stop]")) return;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const hole = document.createElementNS(ns, "rect");
          hole.setAttribute("x", String(r.left - box.left - 12));
          hole.setAttribute("y", String(r.top + window.scrollY - top - 8));
          hole.setAttribute("width", String(r.width + 24));
          hole.setAttribute("height", String(r.height + 16));
          hole.setAttribute("rx", "10");
          hole.setAttribute("fill", "black");
          mask.appendChild(hole);
        });
      }
      total = line.getTotalLength();
      line.style.strokeDasharray = `${total}`;

      samples = [];
      const steps = Math.max(200, Math.round(total / 6));
      for (let i = 0; i <= steps; i++) {
        const len = (i / steps) * total;
        samples.push({ y: line.getPointAtLength(len).y, len });
      }
      stopLengths = points.map((p) => lengthAtY(p.y));

      // Colour the line by the section beneath it: hard stops in a vertical gradient.
      const gradient = canvas.querySelector("linearGradient");
      if (gradient) {
        gradient.setAttribute("y2", String(container.scrollHeight));
        gradient.innerHTML = "";
        const bands = Array.from(container.querySelectorAll<HTMLElement>("[data-tone]"));
        const h = container.scrollHeight;
        for (const band of bands) {
          const r = band.getBoundingClientRect();
          const y1 = (r.top + window.scrollY - top) / h;
          const y2 = (r.bottom + window.scrollY - top) / h;
          const color = strokeFor[band.dataset.tone ?? "paper"] ?? strokeFor.paper;
          for (const offset of [y1, y2]) {
            const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop.setAttribute("offset", String(Math.min(1, Math.max(0, offset))));
            stop.setAttribute("stop-color", color);
            gradient.appendChild(stop);
          }
        }
      }
      update(true);
    };

    const lengthAtY = (y: number) => {
      let lo = 0;
      let hi = samples.length - 1;
      if (!samples.length) return 0;
      if (y <= samples[0].y) return 0;
      if (y >= samples[hi].y) return total;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid;
        else hi = mid;
      }
      const a = samples[lo];
      const b = samples[hi];
      return a.len + ((y - a.y) / Math.max(1e-6, b.y - a.y)) * (b.len - a.len);
    };

    const update = (snap = false) => {
      if (!total) return;
      const box = container.getBoundingClientRect();
      const penY = window.innerHeight * 0.62 - box.top;
      const target = reduced ? total : lengthAtY(penY);
      current = snap ? target : current + (target - current) * 0.18;
      line.style.strokeDashoffset = `${total - current}`;

      // Magnetic snap: within reach of a stop, draw the dot exactly on it
      // rather than at the fixed viewport line, so "arriving" always reads
      // as one dot landing on the period, never two circles near each other.
      let drawLen = current;
      for (const len of stopLengths) {
        if (Math.abs(current - len) < 40) {
          drawLen = len;
          break;
        }
      }
      const p = line.getPointAtLength(drawLen);
      pen.setAttribute("transform", `translate(${p.x} ${p.y})`);
      pen.style.opacity = current > 1 && current < total - 1 ? "1" : "0";
      stops.forEach((el, i) => el.classList.toggle("is-lit", current >= stopLengths[i] - 2));
    };

    let raf = 0;
    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };
    build();
    if (!reduced) raf = requestAnimationFrame(tick);

    const rebuild = () => requestAnimationFrame(build);
    const observer = new ResizeObserver(rebuild);
    observer.observe(container);
    document.fonts?.ready.then(rebuild);
    window.addEventListener("resize", rebuild);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", rebuild);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      {/*
        Two layers on purpose: the line itself stays at z-[1], under every
        section's z-[2] content, so it still reads as passing beneath text and
        cards. The travelling dot is the one thing that must never disappear
        as the eye's anchor, so it lives in its own layer above all section
        content (still safely under the header/cursor/loader, which sit in
        the z-70+ range) - the eye's anchor down the page, always visible.
      */}
      <svg ref={svg} className="pointer-events-none absolute inset-x-0 top-0 z-[1] w-full" aria-hidden>
        <defs>
          <linearGradient id="story-tone" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1" />
          <mask id="story-mask" maskUnits="userSpaceOnUse" />
        </defs>
        <path ref={path} fill="none" stroke="url(#story-tone)" strokeWidth="2" strokeLinecap="round" mask="url(#story-mask)" />
      </svg>
      <svg ref={dotLayer} className="pointer-events-none absolute inset-x-0 top-0 z-30 w-full" aria-hidden>
        <g ref={dot} style={{ opacity: 0 }}>
          {/* Glow kept small: on narrow screens body copy runs nearly edge
              to edge, and a wide halo sat on top of words as the dot passed. */}
          <circle r="11" fill="#e1fc6d" opacity="0.25" />
          <circle r="8" fill="#e1fc6d" stroke="#101012" strokeWidth="2" />
        </g>
      </svg>
      {children}
    </div>
  );
}
