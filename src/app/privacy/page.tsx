import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cubical Dot handles the information you share with us.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Hosting and technical logs",
    body: [
      "The site is hosted on Vercel. Like any web host, Vercel's infrastructure processes standard request metadata — such as IP address, browser type, and the page requested — purely to deliver pages and keep the service secure. We don't access or use this data for profiling; it is governed by Vercel's own privacy policy, not ours.",
      "Fonts and other assets on this site are hosted by us directly, not fetched from Google Fonts or any other third party, so your browser does not make typography-related requests to outside services when you visit.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "If you're in India, this is handled consistently with the Digital Personal Data Protection Act, 2023: you can ask us what we hold about you (in practice, whatever you wrote in an email to us), ask us to correct or delete it, and withdraw consent for us to hold it.",
      "If you're in the EU/EEA or UK, the same requests apply under the GDPR: access, correction, erasure, restriction, and objection. You also have the right to lodge a complaint with your local data protection authority.",
      `To exercise any of these, just email ${studio.email} — the same address the contact form writes to. We'll action it directly since it's a real person reading real email, not a ticketing system.`,
    ],
  },
  {
    title: "Children",
    body: [
      "This site is a business-to-business portfolio and is not directed at children. We do not knowingly collect information from anyone under 18.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If what the site does changes — for example, if we ever add analytics — we'll update this page to reflect it rather than leave a policy that no longer describes reality.",
    ],
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
