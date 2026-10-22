"use client";

import { useRef, useState } from "react";
import { Chapter } from "@/components/chapter";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "cn";

// A full-bleed motion reel cut from the site's own stills, paced like a video
// edit but built live in the page: no video file, no player. Every scene hands
// off with a different transition: the lime dot of the mark irises the loop
// open and shut, with blinds, a zoom-through, a match cut, a slash, a dot
// flood, a curtain, a card shuffle and a push in between.
// It fills the viewport at any size, swaps to portrait layouts on phones, and
// rebuilds its timeline on resize so every iris and sweep fits the frame.
// Stills are pre-sized copies in /public/reel (largest size each is shown at).

// The mark's slab: rounded top-left and bottom-right, sharp elsewhere.
const slab = "rounded-tl-[2.4cqmin] rounded-br-[2.4cqmin]";

// Same night-sky glow as the site's section cards.
const glow = {
  backgroundColor: "#070614",
  backgroundImage:
    "radial-gradient(88% 80% at 108% 114%, #f9f9f7 0%, #e1fc6d 13%, #6318ff 38%, rgba(44, 92, 246, 0.3) 56%, transparent 72%), linear-gradient(168deg, #07060f 0%, #0b0720 46%, #16124e 100%)",
};

function Shot({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={`/reel/${src}`}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}

function Tag({ index, kind, name }: { index: string; kind: string; name: string }) {
  return (
    <div className="absolute bottom-[max(3.5rem,9cqh)] left-[var(--page-margin)] z-10 text-white">
      <div className="overflow-hidden">
        <p className="tag-line eyebrow flex items-center gap-3 text-white/75">
          <span className="size-1.5 rounded-full bg-lime" />
          {index}
          <span className="opacity-40">/</span>
          {kind}
        </p>
      </div>
      <div className="overflow-hidden pb-[0.12em]">
        <p className="tag-line display mt-2 text-[clamp(2.2rem,7cqmin,5.5rem)]">{name}</p>
      </div>
    </div>
  );
}

const campaignCycle = ["creatives-20.webp", "creatives-12.webp", "creatives-17.webp", "creatives-08.webp"];
const panelsA = ["creatives-09.webp", "creatives-28.webp", "creatives-06.webp"];
const panelsB = ["creatives-30.webp", "creatives-18.webp", "creatives-15.webp"];
const gridTiles = [
  "creatives-01.webp",
  "creatives-05.webp",
  "creatives-10.webp",
  "creatives-13.webp",
  "creatives-16.webp",
  "creatives-31.webp",
];
const scattered = [
  { src: "identity-01.webp", pos: "left-[5%] top-[9%] w-[22%] portrait:left-[4%] portrait:top-[12%] portrait:w-[46%]", r: -6 },
  { src: "personal-08.webp", pos: "right-[6%] top-[7%] w-[20%] portrait:right-[4%] portrait:top-[17%] portrait:w-[42%]", r: 5 },
  { src: "identity-06.webp", pos: "left-[11%] bottom-[10%] w-[18%] portrait:left-[6%] portrait:bottom-[17%] portrait:w-[44%]", r: 4 },
  { src: "personal-07.webp", pos: "right-[13%] bottom-[9%] w-[19%] portrait:right-[5%] portrait:bottom-[13%] portrait:w-[40%]", r: -4 },
  { src: "identity-08.webp", pos: "left-[40%] top-[5%] w-[14%] portrait:left-[30%] portrait:top-[28%] portrait:w-[34%]", r: 3 },
  { src: "personal-04.webp", pos: "left-[45%] bottom-[6%] w-[15%] portrait:left-[34%] portrait:bottom-[29%] portrait:w-[32%]", r: -3 },
];
const deck = [
  "presentations-art-01.webp",
  "magazine-02.webp",
  "presentations-public-01.webp",
  "presentations-art-07.webp",
  "presentations-inshorts-01.webp",
];
const illustrations = ["illustrations-01.webp", "illustrations-02.webp", "illustrations-07.webp"];
const blindColors = ["bg-violet", "bg-[#2c5cf6]", "bg-lime", "bg-violet", "bg-[#2c5cf6]", "bg-lime"];
const SLICES = 5;

/** Builds the whole edit for a frame of the given size. */
function buildTimeline(width: number, height: number, onUpdate: (tl: gsap.core.Timeline) => void) {
  const portrait = height > width;
  const tl = gsap.timeline({ paused: true, repeat: -1, onUpdate: () => onUpdate(tl) });

  // Irises are sized in pixels so the dot matches the .dot element exactly
  // and the open state always clears the corners.
  const dotRadius = 0.07 * Math.min(width, height);
  const fullRadius = Math.hypot(width, height) / 2 + 4;
  const iris = (radius: number) => `circle(${radius}px at 50% 50%)`;

  gsap.set(".scene", { autoAlpha: 0 });
  gsap.set(".s-panels .pb", { yPercent: (i: number) => (i % 2 ? -100 : 100) });
  gsap.set(".blind", { scaleY: 0 });
  gsap.set(".slash", { xPercent: -110, skewX: -24 });
  gsap.set(".flood", { clipPath: iris(0) });

  const show = (scene: string, at: number) => tl.set(scene, { autoAlpha: 1 }, at);
  const hide = (scene: string, at: number) => tl.set(scene, { autoAlpha: 0 }, at);
  const tag = (scene: string, at: number) =>
    tl.from(`${scene} .tag-line`, { yPercent: 110, duration: 0.5, stagger: 0.07, ease: "power3.out" }, at);

  // 1. McCampus irises open out of the lime dot.
  tl.fromTo(".dot", { scale: 0, autoAlpha: 1 }, { scale: 1, duration: 0.35, ease: "back.out(2.4)" }, 0);
  show(".s-mc", 0.3);
  tl.fromTo(".s-mc", { clipPath: iris(dotRadius) }, { clipPath: iris(fullRadius), duration: 0.85, ease: "expo.inOut" }, 0.3)
    .to(".dot", { scale: 5, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0.3)
    .fromTo(".s-mc img", { scale: 1.35 }, { scale: 1.04, duration: 2.6, ease: "power2.out" }, 0.3);
  tag(".s-mc", 0.8);

  // Blinds: brand-coloured bars rise, the scene swaps, they drop away.
  tl.set(".blind", { transformOrigin: "50% 100%" }, 2.5)
    .to(".blind", { scaleY: 1, duration: 0.38, stagger: 0.045, ease: "power3.in" }, 2.5)
    .set(".blind", { transformOrigin: "50% 0%" }, 3.05)
    .to(".blind", { scaleY: 0, duration: 0.42, stagger: 0.045, ease: "power3.out" }, 3.05);
  hide(".s-mc", 3.05);
  show(".s-modus", 3.05);

  // 2. Modus: slides swing in in 3D and drift at different speeds.
  tl.fromTo(
    ".s-modus .base",
    { rotateY: 28, xPercent: -18, transformPerspective: 1400 },
    { rotateY: 0, xPercent: 0, duration: 0.9, ease: "expo.out" },
    3.1
  )
    .from(".s-modus .card-a", { xPercent: 140, rotate: 12, duration: 0.7, ease: "expo.out" }, 3.4)
    .from(
      ".s-modus .card-b",
      portrait
        ? { xPercent: -140, rotate: -10, duration: 0.7, ease: "expo.out" }
        : { yPercent: 160, rotate: -10, duration: 0.7, ease: "expo.out" },
      3.6
    )
    .to(".s-modus .base", { x: -0.015 * width, duration: 2, ease: "none" }, 3.9)
    .to(".s-modus .card-a", { y: -0.016 * height, duration: 1.8, ease: "none" }, 4.1)
    .to(".s-modus .card-b", { x: 0.016 * width, duration: 1.6, ease: "none" }, 4.3);
  tag(".s-modus", 3.4);

  // Zoom-through: Modus rushes past the camera into the next card.
  tl.to(".s-modus", { scale: 2.4, filter: "blur(14px)", autoAlpha: 0, duration: 0.45, ease: "expo.in" }, 5.4);
  show(".s-campaigns", 5.7);
  tl.fromTo(
    ".s-campaigns",
    { scale: 0.55, filter: "blur(14px)" },
    { scale: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out" },
    5.7
  );

  // 3. Campaigns: the word types up, a window pops open and flicks through
  //    work, then grows to fill the frame (a match cut into the panels).
  tl.from(".s-campaigns .letter", { yPercent: 115, duration: 0.55, stagger: 0.035, ease: "power4.out" }, 5.75)
    .from(".s-campaigns .window", { scale: 0, rotate: -12, duration: 0.5, ease: "back.out(1.8)" }, 6.05);
  campaignCycle.forEach((_, i) => {
    if (!i) return;
    tl.set(`.s-campaigns .cycle-${i}`, { autoAlpha: 1 }, 6.15 + i * 0.38).fromTo(
      `.s-campaigns .cycle-${i}`,
      { scale: 1.25 },
      { scale: 1, duration: 0.38, ease: "power3.out" },
      6.15 + i * 0.38
    );
  });
  tl.to(".s-campaigns .window", { width, height, borderRadius: 0, duration: 0.55, ease: "expo.inOut" }, 7.65);

  // 4. Panels rise over the full-frame shot, then swap in opposite directions.
  show(".s-panels", 8.2);
  tl.fromTo(
    ".s-panels",
    { backgroundColor: "rgba(10,10,10,0)" },
    { backgroundColor: "rgba(10,10,10,1)", duration: 0.5 },
    8.2
  ).from(".s-panels .pa", { yPercent: 105, duration: 0.6, stagger: 0.08, ease: "expo.out" }, 8.2);
  hide(".s-campaigns", 8.8);
  tl.to(".s-panels .pa", { yPercent: (i: number) => (i % 2 ? 100 : -100), duration: 0.6, stagger: 0.07, ease: "expo.inOut" }, 9.5)
    .to(".s-panels .pb", { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "expo.inOut" }, 9.5)
    .fromTo(".s-panels .pb img", { scale: 1.3 }, { scale: 1, duration: 1.2, ease: "power2.out" }, 9.5);

  // Slash: a skewed lime blade cuts across.
  tl.to(".slash", { xPercent: 110, duration: 0.7, ease: "power2.inOut" }, 10.45);
  hide(".s-panels", 10.8);
  show(".s-grid", 10.8);

  // 5. Social grid: tiles flip in, then the camera dives into one tile.
  tl.from(".s-grid .tile", {
    rotateY: -90,
    transformPerspective: 900,
    autoAlpha: 0,
    duration: 0.55,
    ease: "power3.out",
    stagger: { each: 0.06, from: "random" },
  }, 10.85);
  tag(".s-grid", 11.2);
  tl.to(".s-grid .grid-inner", {
    scale: 3.2,
    // Centre of the third tile: top-middle in 3×2, middle-left in 2×3.
    transformOrigin: portrait ? "25% 50%" : "50% 25%",
    filter: "blur(10px)",
    duration: 0.5,
    ease: "expo.in",
  }, 12.55);
  hide(".s-grid", 13.05);
  show(".s-bread", 13.05);

  // 6. Breadwala arrives in slices, then a second shot splits open.
  tl.from(".s-bread .slice", {
    xPercent: (i: number) => (i % 2 ? 100 : -100),
    duration: 0.7,
    stagger: 0.05,
    ease: "expo.out",
  }, 13.05)
    .fromTo(".s-bread .slice img", { scale: 1.25 }, { scale: 1.05, duration: 1.6, ease: "power2.out" }, 13.05)
    .fromTo(
      ".s-bread .second",
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "expo.inOut" },
      14.3
    )
    .fromTo(".s-bread .second img", { scale: 1.2 }, { scale: 1, duration: 1.2, ease: "power2.out" }, 14.3);
  tag(".s-bread", 13.3);

  // Dot flood: the lime dot swells to fill the frame, then shrinks away.
  tl.fromTo(".flood", { clipPath: iris(0) }, { clipPath: iris(fullRadius), duration: 0.45, ease: "expo.in" }, 15.3);
  hide(".s-bread", 15.75);
  show(".s-identity", 15.75);
  tl.to(".flood", { clipPath: iris(0), duration: 0.5, ease: "expo.out" }, 15.75);

  // 7. Identity: the work flies in around the word, then scatters.
  tl.from(".s-identity .word", { yPercent: 115, rotate: 4, duration: 0.7, ease: "power4.out" }, 15.85)
    .from(".s-identity .bit", {
      xPercent: (i: number) => (i % 2 ? 260 : -260),
      yPercent: (i: number) => (i < 2 || i === 4 ? -180 : 180),
      rotate: (i: number) => (i % 2 ? 35 : -35),
      duration: 0.8,
      stagger: 0.07,
      ease: "power4.out",
    }, 15.95)
    .to(".s-identity .bit", { y: -0.012 * height, duration: 1.4, stagger: 0.05, ease: "none" }, 16.75)
    .to(".s-identity .bit", {
      xPercent: (i: number) => (i % 2 ? 220 : -220),
      scale: 1.5,
      autoAlpha: 0,
      duration: 0.45,
      stagger: 0.03,
      ease: "power3.in",
    }, 18.0)
    .to(".s-identity .word", { yPercent: -115, duration: 0.4, ease: "power3.in" }, 18.05);

  // 8. Gen AI wipes up from below, then the next shot pushes it aside.
  show(".s-genai", 18.35);
  tl.fromTo(
    ".s-genai",
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" },
    18.35
  ).fromTo(".s-genai .first img", { scale: 1.3 }, { scale: 1.05, duration: 1.8, ease: "power2.out" }, 18.35);
  hide(".s-identity", 18.95);
  tl.to(".s-genai .first", { xPercent: -35, duration: 0.75, ease: "expo.inOut" }, 19.7)
    .fromTo(".s-genai .second", { xPercent: 100 }, { xPercent: 0, duration: 0.75, ease: "expo.inOut" }, 19.7)
    .fromTo(".s-genai .second img", { scale: 1.2 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 19.7);
  tag(".s-genai", 18.8);

  // 9. Decks: a curtain rises, the deck lands, cards get flicked off the top.
  show(".s-decks", 20.95);
  tl.fromTo(
    ".s-decks",
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "expo.inOut" },
    20.95
  ).from(".s-decks .card", {
    yPercent: 140,
    rotate: (i: number) => (i % 2 ? 8 : -8),
    duration: 0.7,
    stagger: 0.05,
    ease: "expo.out",
  }, 21.15);
  hide(".s-genai", 21.5);
  deck.slice(0, -1).forEach((_, i) => {
    tl.to(`.s-decks .card-${i}`, {
      xPercent: i % 2 ? 150 : -150,
      yPercent: -30,
      rotate: i % 2 ? 22 : -22,
      duration: 0.45,
      ease: "power3.in",
    }, 21.8 + i * 0.32);
  });
  tag(".s-decks", 21.4);

  // Push: illustrations shove the deck up and out.
  show(".s-illo", 23.3);
  tl.fromTo(".s-illo", { yPercent: 100 }, { yPercent: 0, duration: 0.65, ease: "expo.inOut" }, 23.3)
    .to(".s-decks", { yPercent: -45, duration: 0.65, ease: "expo.inOut" }, 23.3);
  hide(".s-decks", 23.95);

  // 10. Illustrations: panels unmask in alternating directions.
  tl.fromTo(
    ".s-illo .panel",
    { clipPath: (i: number) => (i % 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)") },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, stagger: 0.1, ease: "expo.inOut" },
    23.55
  ).fromTo(".s-illo .panel img", { scale: 1.35 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 23.55);

  // Close the loop: iris back down into the dot, and the dot winks out.
  tl.fromTo(".s-illo", { clipPath: iris(fullRadius) }, { clipPath: iris(dotRadius), duration: 0.65, ease: "expo.inOut" }, 25.6)
    .set(".dot", { scale: 1, autoAlpha: 1 }, 26.2);
  hide(".s-illo", 26.2);
  tl.to(".dot", { scale: 0, duration: 0.3, ease: "back.in(2.4)" }, 26.3);

  return tl;
}

export function ShowReel() {
  const frame = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const userPaused = useRef(false);
  const fill = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const el = frame.current;
      if (!el) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = (tl: gsap.core.Timeline) => {
        if (fill.current) fill.current.style.transform = `scaleX(${tl.time() / tl.duration()})`;
      };

      // Build (and on resize, rebuild) the edit for the frame's current size,
      // carrying the playhead across so a resize never restarts the reel.
      let ctx: gsap.Context | undefined;
      let size = "";
      const build = () => {
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height || `${width}x${height}` === size) return;
        size = `${width}x${height}`;
        const time = tlRef.current?.time() ?? (prefersReduced ? 1.6 : 0);
        const wasPlaying = tlRef.current ? !tlRef.current.paused() : false;
        ctx?.revert();
        ctx = gsap.context(() => {
          const tl = buildTimeline(width, height, progress);
          tl.seek(time, false);
          if (wasPlaying) tl.play();
          tlRef.current = tl;
        }, el);
      };
      build();

      let resizeTimer = 0;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(build, 150);
      });
      ro.observe(el);

      // Most shots start hidden or off-frame, where lazy loading never fires,
      // so fetch the whole reel once it gets near the viewport.
      const preload = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
          preload.disconnect();
        },
        { rootMargin: "100% 0px" }
      );
      preload.observe(el);

      // Plays itself while on screen, like the rest of the page's motion.
      const io = new IntersectionObserver(
        ([entry]) => {
          const tl = tlRef.current;
          if (!tl) return;
          if (entry.isIntersecting && !userPaused.current && !prefersReduced) {
            tl.play();
            setPlaying(true);
          } else if (!entry.isIntersecting) {
            tl.pause();
            setPlaying(false);
          }
        },
        { threshold: 0.35 }
      );
      io.observe(el);

      return () => {
        window.clearTimeout(resizeTimer);
        ro.disconnect();
        preload.disconnect();
        io.disconnect();
        ctx?.revert();
      };
    },
    { scope: frame }
  );

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (tl.paused()) {
      userPaused.current = false;
      tl.play();
      setPlaying(true);
    } else {
      userPaused.current = true;
      tl.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={frame}
      aria-label="Show reel"
      className="relative h-[100svh] min-h-[28rem] w-full overflow-hidden bg-ink text-white [container-type:size]"
    >
      <div aria-hidden className="absolute inset-0">
        {/* 1. McCampus */}
        <div className="scene s-mc absolute inset-0 overflow-hidden bg-ink">
          <Shot src="mcdonalds-cover.webp" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <Tag index="01" kind="McDonald's" name="McCampus" />
        </div>

        {/* 2. Modus */}
        <div className="scene s-modus absolute inset-0" style={glow}>
          <div
            className={cn(
              "base absolute left-[4%] top-[8%] h-[84%] w-[66%] overflow-hidden shadow-2xl portrait:left-[5%] portrait:top-[12%] portrait:h-[30%] portrait:w-[90%]",
              slab
            )}
          >
            <Shot src="trimble-modus-01.webp" />
          </div>
          <div
            className={cn(
              "card-a absolute right-[4%] top-[10%] h-[38%] w-[38%] overflow-hidden shadow-2xl portrait:top-[44%] portrait:right-[5%] portrait:h-[17%] portrait:w-[62%]",
              slab
            )}
          >
            <Shot src="trimble-modus-12.webp" />
          </div>
          <div
            className={cn(
              "card-b absolute bottom-[10%] right-[10%] h-[40%] w-[34%] overflow-hidden shadow-2xl portrait:bottom-auto portrait:left-[5%] portrait:right-auto portrait:top-[58%] portrait:h-[17%] portrait:w-[62%]",
              slab
            )}
          >
            <Shot src="trimble-modus-13.webp" />
          </div>
          <Tag index="02" kind="Trimble" name="Modus" />
        </div>

        {/* 3. Campaigns */}
        <div className="scene s-campaigns absolute inset-0 grid place-items-center" style={glow}>
          <p className="display flex overflow-hidden pb-[0.15em] text-[min(15cqw,30cqh)] text-white">
            {"Campaigns".split("").map((ch, i) => (
              <span key={i} className="letter inline-block">
                {ch}
              </span>
            ))}
            <span className="letter inline-block text-lime">.</span>
          </p>
          <div className="window absolute inset-0 m-auto size-[34cqmin] overflow-hidden rounded-[2.4cqmin] shadow-2xl">
            {campaignCycle.map((src, i) => (
              <Shot key={src} src={src} className={cn(`cycle-${i}`, i && "invisible")} />
            ))}
          </div>
        </div>

        {/* 4. Panels */}
        <div className="scene s-panels absolute inset-0 grid grid-cols-3 gap-[1.6cqmin] p-[3cqmin] portrait:grid-cols-1 portrait:grid-rows-3">
          {panelsA.map((src, i) => (
            <div key={src} className={cn("relative overflow-hidden", slab)}>
              <div className="pa absolute inset-0">
                <Shot src={src} />
              </div>
              <div className="pb absolute inset-0 overflow-hidden">
                <Shot src={panelsB[i]} />
              </div>
            </div>
          ))}
        </div>

        {/* 5. Grid */}
        <div className="scene s-grid absolute inset-0 overflow-hidden" style={glow}>
          <div className="grid-inner absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1.2cqmin] p-[1.2cqmin] portrait:grid-cols-2 portrait:grid-rows-3">
            {gridTiles.map((src) => (
              <div key={src} className={cn("tile relative overflow-hidden", slab)}>
                <Shot src={src} />
              </div>
            ))}
          </div>
          <Tag index="04" kind="Brands & launches" name="Social" />
        </div>

        {/* 6. Breadwala */}
        <div className="scene s-bread absolute inset-0 overflow-hidden bg-violet">
          {Array.from({ length: SLICES }, (_, i) => (
            <div
              key={i}
              className="slice absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(${(i * 100) / SLICES}% 0% ${100 - ((i + 1) * 100) / SLICES}% 0%)` }}
            >
              <Shot src="breadwala-04.webp" />
            </div>
          ))}
          <div className="second absolute inset-0 overflow-hidden">
            <Shot src="breadwala-06.webp" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <Tag index="05" kind="Packaging" name="Breadwala" />
        </div>

        {/* 7. Identity */}
        <div className="scene s-identity absolute inset-0 grid place-items-center overflow-hidden bg-ivory">
          <p className="display relative z-10 overflow-hidden pb-[0.15em] text-[min(14cqw,28cqh)]">
            <span className="word inline-block">
              <span className="motion-flow">Identity</span>
              <span className="text-violet">.</span>
            </span>
          </p>
          {scattered.map(({ src, pos, r }) => (
            <div
              key={src}
              className={cn("bit absolute aspect-[4/3] overflow-hidden shadow-xl", slab, pos)}
              style={{ rotate: `${r}deg` }}
            >
              <Shot src={src} />
            </div>
          ))}
        </div>

        {/* 8. Gen AI */}
        <div className="scene s-genai absolute inset-0 overflow-hidden">
          <div className="first absolute inset-0 overflow-hidden">
            <Shot src="gen-ai-07.webp" />
          </div>
          <div className="second absolute inset-0 overflow-hidden">
            <Shot src="gen-ai-14.webp" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <Tag index="07" kind="House of Aroras" name="Gen AI" />
        </div>

        {/* 9. Decks */}
        <div className="scene s-decks absolute inset-0 grid place-items-center overflow-hidden" style={glow}>
          {deck.map((src, i) => (
            <div
              key={src}
              className={cn(
                `card card-${i}`,
                "relative aspect-video w-[min(62cqw,110cqh)] overflow-hidden shadow-2xl [grid-area:1/1] portrait:w-[88cqw]",
                slab
              )}
              style={{ zIndex: deck.length - i, rotate: `${(i % 3) - 1}deg` }}
            >
              <Shot src={src} />
            </div>
          ))}
          <Tag index="08" kind="Decks & editorial" name="Presentations" />
        </div>

        {/* 10. Illustration */}
        <div className="scene s-illo absolute inset-0 grid grid-cols-3 gap-[1.6cqmin] bg-ivory p-[3cqmin] portrait:grid-cols-1 portrait:grid-rows-3">
          {illustrations.map((src) => (
            <div key={src} className={cn("panel relative overflow-hidden", slab)}>
              <Shot src={src} />
            </div>
          ))}
        </div>

        {/* Transitions */}
        <div className="pointer-events-none absolute inset-0 z-20 flex">
          {blindColors.map((color, i) => (
            <div key={i} className={cn("blind h-full flex-1", color)} />
          ))}
        </div>
        <div className="slash pointer-events-none absolute -inset-y-[10%] left-[-50%] z-20 w-[200%] bg-lime" />
        <div className="flood pointer-events-none absolute inset-0 z-20 bg-lime" />
        <div className="dot pointer-events-none invisible absolute inset-0 z-20 m-auto size-[14cqmin] rounded-full bg-lime" />
      </div>

      {/* Chrome: the section label, a quiet pause control and a progress hairline. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="shell pointer-events-none absolute inset-x-0 top-24 z-30 md:top-28">
        <Chapter index="05" label="Reel" tone="light" />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause show reel" : "Play show reel"}
        className="absolute bottom-[max(3.5rem,9cqh)] right-[var(--page-margin)] z-30 grid size-10 place-items-center rounded-full border border-white/25 bg-ink/30 text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        {playing ? (
          <svg viewBox="0 0 12 12" className="size-3 fill-current" aria-hidden>
            <rect x="2" y="1.5" width="2.6" height="9" />
            <rect x="7.4" y="1.5" width="2.6" height="9" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="size-3 fill-current" aria-hidden>
            <path d="M3 1.5v9l7.5-4.5z" />
          </svg>
        )}
      </button>
      <div className="absolute inset-x-0 bottom-0 z-30 h-[2px] bg-white/10">
        <div ref={fill} className="h-full origin-left bg-lime" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}
