import Link from "next/link";
import { Chapter } from "@/components/chapter";
import { essays } from "@/lib/content";

export function JournalTease() {
  const [feature, ...rest] = essays;

  return (
    <section className="bg-ivory">
      <div className="shell py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Chapter index="07" label="Blog" />
            <h2 className="display section-title mt-6">Notes from the studio.</h2>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium underline decoration-lime decoration-2 underline-offset-4 sm:inline">
            All notes
          </Link>
        </div>
        <div className="mt-12 grid gap-[var(--grid-gutter)] lg:grid-cols-12">
          <Link
            href={`/blog/${feature.slug}`}
            className="group/button flex flex-col justify-between rounded-[8px] bg-ink p-7 text-white lg:col-span-7 lg:min-h-[420px] lg:p-10"
          >
            <div>
              <p className="eyebrow text-lime">{feature.kicker}</p>
              <h3 className="mt-5 max-w-lg text-4xl font-bold tracking-[-0.045em] transition-transform duration-500 group-hover/button:-translate-y-1 md:text-5xl">
                {feature.title}
              </h3>
            </div>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/80">{feature.dek}</p>
          </Link>
          <div className="grid gap-[var(--grid-gutter)] lg:col-span-5">
            {rest.map((essay) => (
              <Link
                key={essay.slug}
                href={`/blog/${essay.slug}`}
                className="group/button flex flex-1 flex-col justify-between rounded-[8px] border border-ink/10 bg-white p-7 transition-colors hover:border-ink"
              >
                <p className="eyebrow text-stone">{essay.kicker}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] group-hover/button:text-violet">
                  {essay.title}
                </h3>
                <p className="mt-4 text-sm text-stone">
                  {essay.date} · {essay.minutes}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
