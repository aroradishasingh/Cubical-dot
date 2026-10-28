import type Lenis from "lenis";

/**
 * Shared mutable state between the DOM and the WebGL world. Plain object on
 * purpose: it is read every frame and must not trigger React renders.
 */
export const world = {
  /** 0 = every particle at the origin, 1 = fully formed. Driven by the loader. */
  burst: 0,
  /** Set by the loader once the intro has played (or was skipped). */
  introDone: false,
  /** False until the WebGL world has built its forms. */
  ready: false,
  lenis: null as Lenis | null,
};

/**
 * Grow the field out of its single dot. Runs on its own frame loop so a React
 * or GSAP context cleanup can never rewind it.
 */
export function burstWorld(duration = 2.8, delay = 0) {
  const from = world.burst;
  const start = performance.now() + delay * 1000;
  const step = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
    world.burst = from + (1 - from) * (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as unknown as { __world: typeof world }).__world = world;
}
