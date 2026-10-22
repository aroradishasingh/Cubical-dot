"use client";

import { useEffect, useRef } from "react";

const PALETTE = ["#2C5CF6", "#7C4DFF", "#E1FC6D", "#F4F0FF"];

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  age: number;
  life: number;
  color: string;
};

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function HeroTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mql.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let sparks: Spark[] = [];
    let lastX = -1;
    let lastY = -1;
    let rafId = 0;

    function onMove(event: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) {
        lastX = -1;
        lastY = -1;
        return;
      }

      const hasLast = lastX >= 0;
      const dx = hasLast ? x - lastX : 0;
      const dy = hasLast ? y - lastY : 0;
      const dist = Math.hypot(dx, dy);
      const steps = hasLast ? Math.min(Math.max(Math.round(dist / 10), 1), 6) : 1;

      for (let i = 0; i < steps; i++) {
        const t = steps === 1 ? 1 : i / (steps - 1);
        const px = hasLast ? lastX + dx * t : x;
        const py = hasLast ? lastY + dy * t : y;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)] || "#D7FF3F";
        const spark: Spark = {
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.4 - dx * 0.015,
          vy: (Math.random() - 0.5) * 0.4 - dy * 0.015 - 0.25,
          size: 10 + Math.random() * 14,
          age: 0,
          life: 42 + Math.random() * 18,
          color: color,
        };
        sparks.push(spark);
      }
      if (sparks.length > 140) {
        sparks = sparks.slice(sparks.length - 140);
      }
      lastX = x;
      lastY = y;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      const next: Spark[] = [];
      for (const s of sparks) {
        if (s.age >= s.life) continue;
        s.age = s.age + 1;
        s.x = s.x + s.vx;
        s.y = s.y + s.vy;
        s.vx = s.vx * 0.96;
        s.vy = s.vy * 0.96;
        const t = s.age / s.life;
        const alpha = Math.max(0, 1 - t) * 0.5;
        const radius = s.size * (1 - t * 0.5);
        const gradient = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius);
        gradient.addColorStop(0, hexToRgba(s.color, alpha));
        gradient.addColorStop(1, hexToRgba(s.color, 0));
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx!.fill();
        next.push(s);
      }
      sparks = next;

      ctx!.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[6]" aria-hidden />;
}
