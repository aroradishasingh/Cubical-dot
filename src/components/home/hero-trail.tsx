"use client";

import { useEffect, useRef } from "react";

export function HeroTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log("hero trail mounted");
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[6]" aria-hidden />;
}
