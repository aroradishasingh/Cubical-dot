import Link from "next/link";
import { ArrowIcon } from "@/components/brand-button";
import { Stop } from "@/components/story-line";
import { essays } from "@/lib/content";

/** Chapter 07, notes. A quiet list on a deeper paper tone before the finale. */
export function JournalTease() {
  return (
    <section data-tone="paper" className="bg-mist text-ink" aria-labelledby="journal-title">
      <div className="shell relative z-[2] py-28 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-stone">07 — Notes</p>
            <h2 id="journal-title" className="mt-5 text-[clamp(2.8rem,6vw,6.4rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
              From the <span className="serif-i">studio</span>
              <Stop />
            </h2>
          </div>
          <Link href="/blog" className="eyebrow text-ink underline decoration-cobalt decoration-2 underline-offset-[6px] hover:text-cobalt-deep">
            All notes
          </Link>
        </div>
        <ul className="mt-14 border-t border-ink/15">
          {essays.map((essay) => (
            <li key={essay.slug} className="border-b border-ink/15">
              <Link
                href={`/blog/${essay.slug}`}
                data-cursor="Read"
                className="group/note grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:py-9"
              >
                <span className="eyebrow text-stone md:col-span-2">{essay.date}</span>
                <span className="text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.02] font-bold tracking-[-0.028em] transition-colors duration-500 group-hover/note:text-cobalt-deep md:col-span-6">
                  {essay.title}
                </span>
                <span className="text-base leading-relaxed text-stone md:col-span-3">{essay.dek.split(". ")[0]}.</span>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <ArrowIcon className="size-6 -rotate-45 text-stone transition-colors group-hover/note:text-cobalt-deep" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
