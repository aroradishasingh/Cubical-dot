import { useId } from "react";
import { cn } from "cn";
import type { Composition, Tone } from "@/lib/content";

const grounds: Record<Tone, string> = {
  dusk: "bg-[#07060f]",
  violet: "bg-[#14082e]",
  ink: "bg-[#0a0a0a]",
  grove: "bg-[#10140a]",
};

type FieldArtProps = {
  variant?: Composition;
  tone?: Tone;
  className?: string;
  motion?: "hero" | "idle" | "none";
};

export function FieldArt({
  variant = "orbit",
  tone = "dusk",
  className,
  motion = "idle",
}: FieldArtProps) {
  const idle = motion === "idle";
  const hero = motion === "hero";

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", grounds[tone], className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,24,255,0.45),transparent_46%)]" />
      {variant === "orbit" ? <OrbitField hero={hero} idle={idle} /> : null}
      {variant === "eclipse" ? (
        <>
          <div
            className={cn(
              "absolute top-[14%] left-[8%] h-[70%] w-[58%] rounded-[18%] bg-[linear-gradient(160deg,#7d5cff,#2a0f86)]",
              idle && "float-c"
            )}
          />
          <div
            className={cn(
              "absolute top-[20%] right-[8%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle_at_34%_30%,#f4ffb0,#d7ff3f_40%,#6f9a00_78%)] shadow-[0_0_80px_rgba(215,255,63,0.4)]",
              idle && "float-a"
            )}
          />
          <div className="absolute bottom-[10%] left-[18%] h-16 w-16 rounded-2xl bg-ink" />
        </>
      ) : null}
      {variant === "stack" ? (
        <>
          <div className="absolute top-[12%] right-[18%] flex w-[46%] flex-col gap-3">
            <div className={cn("h-24 rounded-[1.6rem] bg-[linear-gradient(135deg,#8d6bff,#6318ff)]", idle && "float-a")} />
            <div className="h-20 rounded-[1.6rem] bg-lime" />
            <div className="h-20 rounded-[1.6rem] bg-ivory" />
            <div className={cn("h-20 rounded-[1.6rem] bg-ink ring-1 ring-white/10", idle && "float-b")} />
          </div>
          <div className="absolute bottom-[8%] left-[8%] aspect-square w-[34%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#9aa8ff,#2c1d88_70%)]" />
        </>
      ) : null}
      {variant === "cascade" ? (
        <>
          <div
            className={cn(
              "absolute -bottom-[18%] left-[6%] aspect-square w-[52%] rounded-full bg-[radial-gradient(circle_at_40%_30%,#6d7cff,#1a1464_60%,transparent_72%)]",
              idle && "float-b"
            )}
          />
          <div className={cn("absolute top-[16%] left-[18%] size-24 rounded-[1.4rem] bg-ivory", idle && "float-a")} />
          <div className="absolute top-[22%] left-[38%] size-8 rounded-full bg-lime" />
          <div className="absolute top-[42%] right-[16%] size-28 rounded-[1.6rem] bg-violet" />
          <div className="absolute top-[48%] right-[8%] size-10 rounded-full bg-lime" />
          <div className={cn("absolute bottom-[22%] right-[28%] size-16 rounded-2xl bg-ink ring-1 ring-white/15", idle && "float-c")} />
          <div className="absolute right-[22%] bottom-[16%] size-6 rounded-full bg-ivory" />
        </>
      ) : null}
      {variant === "split" ? (
        <>
          <div className="absolute inset-y-[12%] left-[8%] w-[42%] rounded-[2rem] bg-ivory" />
          <div
            className={cn(
              "absolute inset-y-[18%] right-[10%] w-[38%] rounded-[2rem] bg-[linear-gradient(180deg,#7a4dff,#2a0d86)]",
              idle && "float-a"
            )}
          />
          <div
            className={cn(
              "absolute top-[39%] left-[40%] aspect-square w-[18%] rounded-full bg-lime shadow-[0_0_50px_rgba(215,255,63,0.5)]",
              idle && "float-b"
            )}
          />
        </>
      ) : null}
    </div>
  );
}

function OrbitField({ hero, idle }: { hero: boolean; idle: boolean }) {
  const id = useId().replace(/:/g, "");
  const slab = `${id}-slab`;
  const orb = `${id}-orb`;
  const lime = `${id}-lime`;
  const shade = `${id}-shade`;

  return (
    <div className="absolute top-[4.25rem] right-[var(--page-margin)] w-[min(40%,156px)] sm:top-[11%] sm:w-[min(32%,360px)] lg:top-[10%] lg:w-[min(28vw,520px)]">
      <div className="relative aspect-square w-full">
      <div
        className={cn(
          "absolute top-[30%] left-[20%] z-0 aspect-square w-[78%]",
          hero && "hero-sphere-blue will-change-transform",
          idle && "float-b"
        )}
      >
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <defs>
            <radialGradient id={orb} cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#8A7CFF" />
              <stop offset="52%" stopColor="#4E3AF2" />
              <stop offset="100%" stopColor="#2A16C8" />
            </radialGradient>
            <filter id={`${shade}-orb`} x="-35%" y="-35%" width="170%" height="180%">
              <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#0c0624" floodOpacity="0.38" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="84" fill={`url(#${orb})`} filter={`url(#${shade}-orb)`} />
        </svg>
      </div>
      <div
        className={cn(
          "absolute top-[8%] left-[1%] z-10 aspect-square w-[66%]",
          hero && "hero-slab will-change-transform",
          idle && "float-a"
        )}
      >
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <defs>
            <linearGradient id={slab} x1="8%" y1="92%" x2="92%" y2="6%">
              <stop offset="0%" stopColor="#2C5CF6" />
              <stop offset="46%" stopColor="#6846FF" />
              <stop offset="100%" stopColor="#D5C6FF" />
            </linearGradient>
            <filter id={`${shade}-slab`} x="-40%" y="-40%" width="180%" height="190%">
              <feDropShadow dx="8" dy="16" stdDeviation="9" floodColor="#140830" floodOpacity="0.4" />
            </filter>
          </defs>
          <g transform="rotate(-18 100 100)">
            <rect x="32" y="32" width="136" height="136" rx="34" fill={`url(#${slab})`} filter={`url(#${shade}-slab)`} />
          </g>
        </svg>
      </div>
      <div
        className={cn(
          "absolute top-[12%] right-[1%] z-20 aspect-square w-[40%]",
          hero && "hero-sphere-lime will-change-transform",
          idle && "float-a [animation-delay:-3.2s]"
        )}
      >
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <defs>
            <radialGradient id={lime} cx="36%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#F7FFD6" />
              <stop offset="24%" stopColor="#E7FF78" />
              <stop offset="58%" stopColor="#C6F034" />
              <stop offset="100%" stopColor="#7EAE00" />
            </radialGradient>
            <filter id={`${shade}-lime`} x="-40%" y="-40%" width="180%" height="190%">
              <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#3d5200" floodOpacity="0.28" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="82" fill={`url(#${lime})`} filter={`url(#${shade}-lime)`} />
        </svg>
      </div>
      </div>
    </div>
  );
}
