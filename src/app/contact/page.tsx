import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { studio } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Start a website design or redesign with Cubical Dot. We reply within two business days.",
  path: "/contact",
});

const steps = [
  ["01", "You write", "Market, timeline, and the job the website has to do. A range is enough."],
  ["02", "We reply", "Within two business days. If the fit is wrong, we say so."],
  ["03", "A working session", "One conversation with the person who would lead the work. No junior stand-in."],
  ["04", "A written proposal", "Scope, sequence, and investment. You can decide without another performance."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="06"
        label="Contact"
        title="Let's build."
        lede="Tell us the market you are entering and the standard the website has to hold. If we are the right studio, you will hear back within two business days."
        form="dot"
      />
      <section className="bg-ivory">
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow text-stone">The desk</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.028em]">What happens after you write.</h2>
            <ol className="mt-8 space-y-6">
              {steps.map(([index, title, body]) => (
                <li key={index} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="text-sm font-semibold text-violet">{index}</span>
                  <div>
                    <h3 className="font-semibold tracking-[-0.03em]">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-charcoal">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href={`mailto:${studio.email}`} className="mt-10 block text-xl font-semibold tracking-[-0.04em] underline decoration-violet decoration-2 underline-offset-4">
              {studio.email}
            </a>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-charcoal">
              India-based independent studio. Working with ambitious brands worldwide.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
