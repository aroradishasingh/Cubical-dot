import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { essays, getEssay, nextEssay, studio } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return { title: "Note" };
  return pageMetadata({ title: essay.title, description: essay.dek, path: `/blog/${essay.slug}` });
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();
  const next = nextEssay(essay.slug);
  const published = new Date(essay.date).toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.dek,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Organization", name: studio.name },
    publisher: { "@type": "Organization", name: studio.name },
    mainEntityOfPage: `${studio.url}/blog/${essay.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-ink text-white">
        <div className="shell pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { label: essay.title },
            ]}
          />
          <p className="eyebrow mt-8 text-lime">
            {essay.kicker}
            <span className="px-2 text-white/40">/</span>
            {essay.date}
            <span className="px-2 text-white/40">/</span>
            {essay.minutes}
          </p>
          <h1 className="display mt-5 text-[clamp(2.6rem,6vw,4.8rem)]">{essay.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{essay.dek}</p>
          </div>
        </div>
      </header>
      <div className="bg-ivory">
        <div className="shell py-14 md:py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-charcoal md:text-lg">
            {essay.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="shell pb-20">
          <div className="mx-auto max-w-3xl">
            <Link href={`/blog/${next.slug}`} className="block rounded-[8px] bg-ink p-8 text-white">
              <p className="eyebrow text-lime">Next note</p>
              <p className="mt-3 text-3xl font-bold tracking-[-0.028em]">{next.title}</p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
