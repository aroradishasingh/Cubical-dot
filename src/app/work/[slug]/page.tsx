import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand-button";
import { FieldArt } from "@/components/field-art";
import { StudyHero } from "@/components/study-hero";
import { getStudy, nextStudy, studies } from "@/lib/content";

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return { title: "Study" };
  return {
    title: study.name,
    description: study.summary,
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();
  const next = nextStudy(study.slug);

  return (
    <article>
      <StudyHero study={study} />
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-16 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow text-stone">The story</p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{study.summary}</p>
          </div>
          <div className="space-y-14 lg:col-span-8">
            {study.chapters.map((chapter) => (
              <section key={chapter.kicker}>
                <p className="eyebrow text-violet">{chapter.kicker}</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                  {chapter.title}
                </h2>
                <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal">
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-4 px-5 pb-20 md:grid-cols-3 md:px-10 lg:px-16">
          {study.outcomes.map((outcome) => (
            <div key={outcome.label} className="rounded-[28px] bg-ink p-7 text-white">
              <p className="text-4xl font-bold tracking-[-0.05em] text-lime">{outcome.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{outcome.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Link href={`/work/${next.slug}`} className="group/button relative block min-h-[420px] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover/button:scale-105">
          <FieldArt variant={next.composition} tone={next.tone} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end px-5 py-14 md:px-10 lg:px-16">
          <p className="eyebrow text-lime">Next study</p>
          <p className="mt-4 text-4xl font-bold tracking-[-0.05em] md:text-6xl">{next.name}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
            {next.headline}
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}
