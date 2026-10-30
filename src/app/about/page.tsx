import { BrandButton } from "@/components/brand-button";
import { DesignedFor } from "@/components/designed-for";
import { PageHero } from "@/components/page-hero";
import { principles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const swatches = [
  { name: "Cobalt", hex: "#2C5CF6", className: "bg-cobalt text-paper" },
  { name: "Paper", hex: "#F2F0E9", className: "bg-paper text-ink ring-1 ring-ink/15" },
  { name: "Ink", hex: "#101012", className: "bg-ink text-paper" },
  { name: "Signal Lime", hex: "#E1FC6D", className: "bg-lime text-ink" },
];

const ways = [
  ["Two clocks", "Workshops are placed where both sides are awake. The days between them are written, so a decision survives the timezone."],
  ["One narrative", "Every page answers the same commercial question. If a section cannot, it does not ship."],
  ["A month after", "Launch is not the exit. We stay for a refinement window while the first real visitors tell the truth."],
];

export const metadata = pageMetadata({
  title: "About",
  description:
    "Cubical Dot is an independent digital design studio. Simple forms. Bigger ideas. Websites for premium brands entering their next market.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="04"
        label="About"
        title="Simple forms. Bigger ideas."
        lede="Cubical Dot is an independent digital design studio. We design the websites that carry a premium brand into its next market."
        form="logo"
      />

      <section data-form="1" className="relative text-ink">
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 py-28 md:py-40 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-ink/65">The studio</p>
            <h2 className="mt-6 text-[clamp(2.6rem,5.4vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.035em]">
              Your price says premium. <span className="serif-i text-violet">Your website should too.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/75 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p>
              The mark is the working rule. Reduce the form until the idea has room. A website that needs another typeface, another illustration style, and another accent to feel finished is usually hiding a sentence that is not true yet.
            </p>
            <p>
              We are hired by founders, brand directors, and marketing leads whose price already says premium, and whose website still says otherwise. Often they are selling into a second country. Often the current site was assembled quickly and then asked to do a job it was never designed for.
            </p>
            <p className="text-ink">
              Founder-led design, with specialist collaborators engaged when a project requires them, each named and introduced before they join. You are not handed to a different team after the proposal.
            </p>
          </div>
        </div>
      </section>

      <DesignedFor />

      <section data-form="2" className="relative text-ink">
        <div className="shell py-28 md:py-40">
          <p className="eyebrow text-ink/65">How it feels</p>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.6rem,5.4vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.035em]">
            Written work. Live reviews. <span className="serif-i text-violet">One story.</span>
          </h2>
          <ol className="mt-16 grid gap-10 md:max-w-[58%] md:grid-cols-1">
            {ways.map(([title, body], index) => (
              <li key={title} className="grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-[5rem_1fr]">
                <span className="serif-i text-4xl leading-none text-ink/65">0{index + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/75">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-form="4" className="relative text-ink">
        <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-14 py-28 md:py-40 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-ink/65">The palette</p>
            <h2 className="mt-6 text-[clamp(2.6rem,5.4vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.035em]">
              Four colors. <span className="serif-i text-violet">One signal.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
              Cobalt is the field, taken from the mark. Paper and ink carry the reading. Lime is the only signal: the thing a buyer is meant to do next. If everything signals, nothing does.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3">
              {swatches.map((swatch) => (
                <li key={swatch.hex} className={`flex min-h-36 flex-col justify-between rounded-tl-[22px] rounded-br-[22px] p-5 ${swatch.className}`}>
                  <span className="text-sm font-medium">{swatch.name}</span>
                  <span className="font-mono text-xs tracking-wide">{swatch.hex}</span>
                </li>
              ))}
            </ul>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.title}>
                  <h3 className="serif-i text-3xl text-ink">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{principle.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-14">
              <BrandButton href="/contact" variant="lime" size="pillLg" magnetic>
                Get in touch
              </BrandButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
