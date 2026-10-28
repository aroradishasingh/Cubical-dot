"use client";

import { useEffect, useRef } from "react";

/**
 * A calm matrix of small squares on the cobalt field. Near the pointer the
 * squares swell and round their top-left and bottom-right corners until each
 * one is the Cubical Dot slab. With no pointer, a slow attractor wanders the
 * grid on its own. A click sends a ring through it.
 *
 * Lens cells stay in the blue family so large paper type above them keeps at
 * least 3:1 contrast; small copy should sit where the field is masked out.
 */
export function GridField({ cell = 54, className }: { cell?: number; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const ctx = node.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let size = cell;
    let cols = 0;
    let rows = 0;
    let scales = new Float32Array(0);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = node.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = width < 640 ? cell * 0.72 : cell;
      cols = Math.ceil(width / size) + 1;
      rows = Math.ceil(height / size) + 1;
      scales = new Float32Array(cols * rows);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);

    const pointer = { x: -9999, y: -9999, last: -10 };
    const lens = { x: width * 0.7, y: height * 0.4 };
    const ripples: { x: number; y: number; t: number }[] = [];
    let time = 0;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      pointer.x = x;
      pointer.y = y;
      pointer.last = time;
    };
    const onDown = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const y = event.clientY - rect.top;
      if (y < 0 || y > rect.height) return;
      ripples.push({ x: event.clientX - rect.left, y, t: time });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const draw = (dt: number) => {
      time += dt;
      ctx.clearRect(0, 0, width, height);

      // Follow the pointer; when it rests, drift on a slow figure-of-eight.
      const idle = time - pointer.last > 2.5;
      const tx = idle ? width * (0.62 + Math.sin(time * 0.23) * 0.28) : pointer.x;
      const ty = idle ? height * (0.42 + Math.sin(time * 0.37) * 0.24) : pointer.y;
      const k = 1 - Math.exp(-dt * (idle ? 1.2 : 7));
      lens.x += (tx - lens.x) * k;
      lens.y += (ty - lens.y) * k;

      const radius = Math.max(170, Math.min(width, height) * 0.3);
      for (let i = ripples.length - 1; i >= 0; i--) if (time - ripples[i].t > 2) ripples.splice(i, 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * size + size / 2;
          const cy = r * size + size / 2;
          const d = Math.hypot(cx - lens.x, cy - lens.y);
          let target = Math.max(0, 1 - d / radius);
          target = target * target * (3 - 2 * target);
          for (const ripple of ripples) {
            const age = time - ripple.t;
            const ring = Math.abs(Math.hypot(cx - ripple.x, cy - ripple.y) - age * 520);
            target = Math.max(target, Math.max(0, 1 - ring / 70) * (1 - age / 2));
          }
          const index = r * cols + c;
          const s = Math.min(1, Math.max(0, scales[index] + (target - scales[index]) * (1 - Math.exp(-dt * 9))));
          scales[index] = s;

          const side = size * (0.14 + s * 0.78);
          const x = cx - side / 2;
          const y = cy - side / 2;
          const round = side * 0.29 * s;
          const sharp = side * 0.04;
          ctx.fillStyle = s < 0.02 ? "rgba(242,240,233,0.22)" : `rgba(${Math.round(62 + s * 18)},${Math.round(106 + s * 18)},255,${0.25 + s * 0.75})`;
          ctx.beginPath();
          ctx.roundRect(x, y, side, side, [round || sharp, sharp, round || sharp, sharp]);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // A still: the lens resting beside the headline.
      lens.x = width * 0.72;
      lens.y = height * 0.38;
      for (let i = 0; i < 60; i++) draw(0.05);
    } else {
      raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(node);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [cell]);

  return <canvas ref={canvas} className={className} aria-hidden />;
}
