import Image from "next/image";
import { Stop } from "@/components/story-line";
import { founders } from "@/lib/content";

/**
 * The two people a client actually works with. On the home page it sits right
 * after the work ("who made this?") with the short bios; the About page uses
 * the full version.
 */
export function Founders({ variant = "short", eyebrow }: { variant?: "short" | "long"; eyebrow: string }) {
  return (
    <section data-tone="paper" className="bg-paper text-ink" aria-labelledby="founders-title">
      <div className="shell relative z-[2] py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-stone">{eyebrow}</p>
            <h2 id="founders-title" className="mt-5 text-[clamp(2.8rem,6.4vw,6.8rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
              Two founders. <span className="serif-i text-violet">On every project</span>
              <Stop />
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-stone">
            The people on your first call are the people who design your site. No hand-off to a junior team after the proposal.
          </p>
        </div>

        <ul className="mt-16 grid gap-3 md:grid-cols-2">
          {founders.map((founder) => (
            <li key={founder.name} className="slab flex flex-col gap-8 border border-ink/12 bg-[#fbfaf6] p-6 md:p-10">
              <div className="flex items-center gap-5">
                <span className="slab relative block size-24 shrink-0 overflow-hidden bg-cobalt [--slab:20px] md:size-28">
                  <Image
                    src={founder.photo}
                    alt={`Portrait of ${founder.name}`}
                    fill
                    sizes="(min-width: 768px) 112px, 96px"
                    className="object-cover"
                  />
                  <span aria-hidden className="absolute right-2 bottom-2 size-2.5 rounded-full bg-lime ring-2 ring-paper" />
                </span>
                <div>
                  <h3 className="text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1] font-bold tracking-[-0.03em]">{founder.name}</h3>
                  <p className="mt-2 text-sm font-medium text-stone">{founder.role}</p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2" aria-label={`${founder.name}: background`}>
                {founder.credentials.map((credential) => (
                  <li key={credential} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium text-ink">
                    {credential}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 border-t border-ink/15 pt-6 text-base leading-relaxed text-ink/75 md:text-lg">
                {variant === "short" ? <p>{founder.short}</p> : founder.long.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
