import { Breadcrumb } from "@/components/breadcrumb";
import { studio } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Cubical Dot handles the information you share with us.",
  path: "/privacy",
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who this policy covers",
    body: [
      `This policy explains how ${studio.name} ("we", "us") handles information in connection with ${studio.url}. It is written to describe what the site actually does, not a generic template - if a section below doesn't apply to you, that's because the practice it describes doesn't happen on this site.`,
    ],
  },
  {
    title: "What we collect",
    body: [
      "The personal information this site asks you to type in is what the contact form collects: your name, email, company, website (optional), the kind of project, a timeline (optional), and your message.",
      "If you accept cookies when asked, we also receive aggregate analytics about how people use the site - which pages, roughly which country, and which device - never your name, email, or anything you haven't chosen to share. See “Cookies & analytics” below for exactly what that involves and how to say no.",
    ],
  },
  {
    title: "Cookies & analytics",
    body: [
      "This site uses Google Analytics 4 to understand traffic in aggregate - how many people visit, roughly where from, and which pages work. We do not use advertising cookies, do not build an individual profile of you, and do not sell or share analytics data with anyone beyond Google acting as our processor.",
      "Nothing analytics-related runs until you click “Accept all” on the cookie banner. If you click “Necessary only”, or simply close the banner without choosing, no analytics cookie is set and no analytics request is sent - the site already works without it. You can change your mind at any time by clearing your browser's site data for cubicaldot.com, which brings the banner back.",
      "When accepted, Google Analytics typically sets cookies named _ga (expires after 2 years) and _ga_<container-id> (expires after 2 years), used only to distinguish one visit from another. Google's own handling of this data is covered by the Google Privacy Policy (policies.google.com/privacy); you can also opt out globally of Google Analytics via Google's browser add-on (tools.google.com/dlpage/gaoptout).",
      "“Necessary” cookies - the kind that aren't optional because the site can't function without them - are limited to your saved cookie choice itself, stored only in your own browser, never sent to us or anyone else.",
    ],
  },
  {
    title: "How the contact form actually works",
    body: [
      `When you submit the contact form, what you typed is sent once to a small server function we run, which forwards it straight to our inbox as an email using Resend, an email-delivery service. We do not save your submission in a database - the only copy that persists is the email itself, in our inbox, like any other message you'd send us.`,
      "The form also checks a hidden field that only automated bots fill in, and how quickly the form was submitted, purely to filter spam before it reaches us. Neither check collects anything beyond what the form already asks for.",
      `We use your message only to reply to your enquiry. We do not add you to a mailing list, share it with third parties, or use it for anything beyond that conversation. If the form is ever unreachable, you can always write ${studio.email} directly.`,
    ],
  },
  {
    title: "Hosting and technical logs",
    body: [
      "The site is hosted on Vercel. Like any web host, Vercel's infrastructure processes standard request metadata - such as IP address, browser type, and the page requested - purely to deliver pages and keep the service secure. We don't access or use this data for profiling; it is governed by Vercel's own privacy policy, not ours.",
      "Fonts and other assets on this site are hosted by us directly, not fetched from Google Fonts or any other third party, so your browser does not make typography-related requests to outside services when you visit.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "If you're in India, this is handled consistently with the Digital Personal Data Protection Act, 2023: you can ask us what we hold about you (in practice, whatever you wrote in an email to us, plus any analytics you consented to), ask us to correct or delete it, and withdraw consent for us to hold it.",
      "If you're in the EU/EEA or UK, the same requests apply under the GDPR: access, correction, erasure, restriction, and objection. You also have the right to lodge a complaint with your local data protection authority. Withdrawing consent for analytics cookies is always as simple as clearing this site's data in your browser, which brings the cookie banner back.",
      "If you're in California or another US state with its own privacy law, you have materially the same rights: to know what we hold, to correct or delete it, and to opt out - which, since we don't sell or share data for advertising, you've effectively already done by choosing “Necessary only” on the cookie banner.",
      `To exercise any of these, just email ${studio.email} - the same address the contact form writes to. We'll action it directly since it's a real person reading real email, not a ticketing system.`,
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
      "If what the site does changes, we'll update this page to reflect it rather than leave a policy that no longer describes reality.",
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
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Short version: we only measure traffic in aggregate, only once you say yes to the cookie banner, we don&apos;t store what you send us on a server, and we don&apos;t sell or share anything with anyone. The long version is below.
            </p>
            <p className="mt-4 text-sm text-white/50">Last updated 6 November 2026.</p>
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
