import type { CSSProperties } from "react";
import { cn } from "cn";
import { designedFor } from "@/lib/content";

/**
 * Logos are sized by visual weight, not by a shared height. A wide wordmark
 * (NVIDIA, Fire-Boltt) gets less height than a compact one (Amazon, vivo), so
 * no single brand shouts louder than the rest. `--logo-base` sets the overall
 * scale per breakpoint; the factor is capped so square marks stay modest.
 */
function logoScale(ratio: number) {
  return Math.min(1 / Math.sqrt(ratio), 0.5).toFixed(3);
}

function LogoRow({ id }: { id: string }) {
  return (
    <ul className="flex items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {designedFor.map((company) => (
        <li key={`${id}-${company.name}`} className="flex h-10 items-center gap-10 md:h-12 md:gap-14">
          <img
            src={company.src}
            alt=""
            width={Math.round(company.ratio * 100)}
            height={100}
            style={{ "--logo-scale": logoScale(company.ratio) } as CSSProperties}
            className="block h-[calc(var(--logo-base)*var(--logo-scale))] w-auto shrink-0 select-none"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
          <span className="size-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

export function DesignedFor({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-ivory py-12 text-ink [--logo-base:48px] md:py-16 md:[--logo-base:56px]", className)}
      aria-labelledby="designed-for"
    >
      <h2 id="designed-for" className="shell eyebrow flex items-center justify-center gap-3 text-center text-stone">
        <span className="size-1.5 rounded-full bg-lime" aria-hidden />
        The team has designed for
      </h2>
      <ul className="sr-only">
        {designedFor.map((company) => (
          <li key={company.name}>{company.name}</li>
        ))}
      </ul>
      <div
        className="marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-10"
        aria-hidden
      >
        <div className="marquee-track flex w-max items-center">
          <LogoRow id="a" />
          <div className="marquee-copy flex">
            <LogoRow id="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
