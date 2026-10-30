import Link from "next/link";
import { ArrowIcon } from "@/components/brand-button";
import { Stop } from "@/components/story-line";
import { services } from "@/lib/content";
import { cn } from "cn";

/**
 * Chapter 03, what we shape. A bento of six practices, each with a small
 * glyph built only from the mark's parts: the slab and the dot.
 */

function Glyph({ kind }: { kind: string }) {
  const base = "relative size-full";
  switch (kind) {
    case "website-design":
      return (
        <div className={base}>
          <div className="slab absolute inset-[12%] border-2 border-current [--slab:18px]">
            <div className="absolute inset-x-[10%] top-[14%] flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 rounded-full bg-current opacity-60" />
              ))}
            </div>
            <span className="glyph-bar absolute top-[36%] left-[10%] h-[10%] w-[55%] rounded-sm bg-current" />
            <span className="glyph-bar absolute top-[54%] left-[10%] h-[10%] w-[80%] rounded-sm bg-current opacity-50 [animation-delay:0.3s]" />
            <span className="absolute right-[10%] bottom-[12%] size-[16%] rounded-full bg-lime ring-2 ring-ink" />
          </div>
        </div>
      );
    case "website-redesign":
      return (
        <div className={cn(base, "grid place-items-center")}>
          <span className="glyph-morph block size-[58%] bg-current" />
        </div>
      );
    case "design-systems":
      return (
        <div className={cn(base, "grid grid-cols-2 gap-[8%] p-[16%]")}>
          <span className="slab bg-current [--slab:14px]" />
          <span className="bg-current opacity-60" />
          <span className="bg-current opacity-60" />
          <span className="glyph-pop m-auto size-[70%] rounded-full bg-lime ring-2 ring-ink" />
        </div>
      );
    case "digital-brand":
      return (
        <div className={cn(base, "flex items-end justify-center gap-[6%] p-[18%]")}>
          <span className="slab block aspect-square w-[58%] bg-current [--slab:20px]" />
          <span className="glyph-pop block aspect-square w-[28%] rounded-full bg-lime ring-2 ring-ink" />
        </div>
      );
    case "motion":
      return (
        <div className={cn(base, "p-[14%]")}>
          <span className="absolute inset-x-[14%] bottom-[22%] h-0.5 bg-current" />
          <span className="glyph-bounce absolute bottom-[22%] left-[14%] size-[18%] rounded-full bg-lime ring-2 ring-ink" />
        </div>
      );
    default:
      return (
        <div className={cn(base, "p-[16%]")}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="glyph-stack slab absolute size-[52%] border-2 border-current bg-paper [--slab:14px]"
              style={{ left: `${16 + i * 10}%`, top: `${16 + i * 10}%`, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
      );
  }
}

const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Services() {
  return (
    <section data-tone="paper" className="bg-paper text-ink" aria-labelledby="services-title">
      <div className="shell relative z-[2] pb-28 md:pb-40">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-10">
          <div>
            <p className="eyebrow text-stone">04 — What we do</p>
            <h2 id="services-title" className="mt-5 text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
              Six <span className="serif-i">practices</span>
              <Stop />
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-stone">
            One standard across all of them: a site a buyer in another timezone understands in ten seconds, without a call.
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.id} className={spans[index]}>
              <Link
                href={`/services#${service.id}`}
                data-cursor="Explore"
                className="group/cell slab flex h-full flex-col justify-between gap-6 border border-ink/12 bg-[#fbfaf6] p-6 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-cobalt hover:bg-cobalt hover:text-paper focus-visible:bg-cobalt focus-visible:text-paper md:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="eyebrow">{service.index}</span>
                  <ArrowIcon className="size-5 -rotate-45 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100" />
                </div>
                <div className={cn("mx-auto w-full text-cobalt transition-colors duration-500 group-hover/cell:text-paper", index === 0 ? "aspect-square max-w-[22rem]" : "aspect-square max-w-[9rem]")}>
                  <Glyph kind={service.id} />
                </div>
                <div>
                  <h3 className={cn("font-bold tracking-[-0.028em]", index === 0 ? "text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95]" : "text-2xl")}>{service.title}</h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-stone transition-colors duration-500 group-hover/cell:text-paper">
                    {service.line}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
