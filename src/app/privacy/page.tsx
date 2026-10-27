import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that cover using the Cubical Dot website.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Accepting these terms",
    body: [
      `By using ${studio.url}, you agree to these terms. This page covers the website itself — browsing it, reading it, contacting us through it. It is not a client services agreement; the terms of an actual engagement are set out separately, in writing, before any project starts.`,
    ],
  },
  {
    title: "Using the site",
    body: [
      "You're welcome to browse the site, read the case studies and notes, and get in touch. You may not scrape, mirror, or republish the site's content, code, or case study material as your own, or use any part of it to represent work you didn't do.",
    ],
  },
  {
    title: "Ownership",
    body: [
      `The design, code, copy, and case study presentation on this site belong to ${studio.name} unless stated otherwise. The underlying client work shown in each case study — the brands, products, and deliverables — belongs to the respective clients; we show it to describe work we did for them, not to claim it as our own product.`,
      "Client names and logos shown on this site (including the \"designed for\" strip and individual case studies) represent studio or founder work completed for those brands. If you are a brand shown here and have a concern about how your name or mark is displayed, contact us and we'll address it promptly.",
    ],
  },
  {
    title: "No warranty",
    body: [
      "The site is provided as is. We've tried to make sure everything on it is accurate, but we don't promise the site will be error-free, uninterrupted, or permanently available, and case study outcomes described are specific to that engagement, not a guarantee of results for anyone else.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      `To the extent permitted by law, ${studio.name} is not liable for any indirect, incidental, or consequential loss arising from your use of this website. Nothing here limits liability where the law does not allow it to be limited.`,
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India, and any dispute arising from them is subject to the jurisdiction of the courts in India, without prejudice to any mandatory consumer-protection rights you may have where you live.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms as the site changes. The date below reflects the last revision.",
    ],
  },
  {
    title: "Contact",
    body: [`Questions about these terms can go to ${studio.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <header className="bg-ink text-white">
        <div className="shell pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Terms of Use" }]} />
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,4.8rem)]">Terms of Use.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              The plain terms that cover using this website — not a client contract, just the site itself.
            </p>
            <p className="mt-4 text-sm text-white/50">Last updated 27 October 2026.</p>
          </div>
        </div>
      </header>
      <div className="bg-ivory">
        <div className="shell py-14 md:py-20">
          <div className="mx-auto max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold tracking-[-0.04em]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-charcoal md:text-lg">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
