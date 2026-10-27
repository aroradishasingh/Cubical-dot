import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cubical Dot handles the information you share with us.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who this policy covers",
    body: ["This is a minimal test paragraph."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-ink text-white">
        <div className="shell pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]} />
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,4.8rem)]">Privacy Policy.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">Minimal test.</p>
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
