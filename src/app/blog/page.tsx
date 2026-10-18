import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { essays } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Cubical Dot on redesign, form, and what an international buyer needs to trust.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        index="05"
        label="Blog"
        title="Notes from the studio."
        lede="Short essays on the commercial side of a website. Written the way we talk to a client: specific, and willing to leave something out."
        variant="eclipse"
        tone="grove"
      />
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-16 md:px-10 lg:px-16">
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/blog/${essay.slug}`}
              className="group/button grid gap-6 rounded-[28px] border border-ink/10 bg-white p-7 transition-colors hover:border-ink md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-3">
                <p className="eyebrow text-violet">{essay.kicker}</p>
                <p className="mt-3 text-sm text-stone">
                  {essay.date}
                  <span className="px-2">·</span>
                  {essay.minutes}
                </p>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-3xl font-bold tracking-[-0.045em] transition-transform duration-500 group-hover/button:-translate-y-0.5 md:text-4xl">
                  {essay.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone md:text-base">{essay.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
