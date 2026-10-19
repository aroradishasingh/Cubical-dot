import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand-button";
import { StudyMedia } from "@/components/study-media";
import { StudyHero } from "@/components/study-hero";
import { getStudy, nextStudy, studies, type Study } from "@/lib/content";

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
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-16 py-16 lg:grid-cols-12 lg:py-24">
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
        {study.gallery ? (
          <Gallery study={study} />
        ) : null}
        <div className="shell grid gap-[var(--grid-gutter)] pb-20 md:grid-cols-3">
          {study.outcomes.map((outcome) => (
            <div key={outcome.label} className="rounded-[8px] bg-ink p-7 text-white">
              <p className="text-4xl font-bold tracking-[-0.05em] text-lime">{outcome.value}</p>
              <p className="mt-3 text-base leading-relaxed text-white/80">{outcome.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Link href={`/work/${next.slug}`} className="group/button relative block min-h-[420px] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover/button:scale-105">
          <StudyMedia study={next} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="shell relative z-10 flex min-h-[420px] flex-col justify-end py-14">
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

function Gallery({ study }: { study: Study }) {
  const gallery = study.gallery ?? [];
  const wide = gallery.some((piece) => piece.deck);
  const groups: { deck?: string; pieces: NonNullable<Study["gallery"]> }[] = [];
  for (const piece of gallery) {
    const last = groups[groups.length - 1];
    if (last && last.deck === piece.deck) last.pieces.push(piece);
    else groups.push({ deck: piece.deck, pieces: [piece] });
  }
  let shown = 0;

  return (
    <div className="shell pb-8">
      <p className="eyebrow text-violet">The set</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
        All {gallery.length} {wide ? "slides" : "pieces"}.
      </h2>
      {groups.map((group) => (
        <div key={group.deck ?? "set"} className="mt-8">
          {group.deck ? (
            <h3 className="text-xl font-semibold tracking-[-0.04em]">{group.deck}</h3>
          ) : null}
          <ul
            className={
              wide
                ? "mt-4 grid grid-cols-1 gap-[var(--grid-gutter)] md:grid-cols-2"
                : "grid grid-cols-2 gap-[var(--grid-gutter)] md:grid-cols-3 lg:grid-cols-4"
            }
          >
            {group.pieces.map((piece) => {
              const eager = shown < 4;
              shown += 1;
              return (
                <li key={piece.src} className="overflow-hidden rounded-[8px] bg-ink">
                  <img
                    src={piece.src}
                    alt={piece.alt}
                    width={wide ? 1500 : 1000}
                    height={wide ? 844 : 1000}
                    loading={eager ? "eager" : "lazy"}
                    className={wide ? "aspect-video w-full object-cover" : "aspect-square w-full object-cover"}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
