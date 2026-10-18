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
      {variant === "orbit" ? (
        <>
          <div
            className={cn(
              "absolute -bottom-[22%] -left-[8%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle_at_32%_30%,#b7c4ff,#4a3cff_42%,#140b4a_78%)]",
              hero && "hero-sphere-blue will-change-transform",
              idle && "float-b"
            )}
          />
          <div
            className={cn(
              "absolute top-[10%] right-[6%] h-[58%] w-[48%] rounded-[18%] bg-[linear-gradient(165deg,#b49bff_0%,#6318ff_40%,#240a78_100%)] shadow-[0_30px_80px_rgba(99,24,255,0.35)]",
              hero && "hero-slab will-change-transform",
              idle && "float-c"
            )}
          />
          <div
            className={cn(
              "absolute right-[14%] bottom-[16%] aspect-square w-[24%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#f7ffc4,#d7ff3f_38%,#8fbe00_74%)] shadow-[0_0_70px_rgba(215,255,63,0.45)]",
              hero && "hero-sphere-lime will-change-transform",
              idle && "float-a"
            )}
          />
        </>
      ) : null}
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
