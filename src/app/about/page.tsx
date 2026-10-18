import type { Metadata } from "next";
import { BrandButton } from "@/components/brand-button";
import { FieldArt } from "@/components/field-art";
import { PageHero } from "@/components/page-hero";
import { principles } from "@/lib/content";

const swatches = [
  { name: "Brand Black", hex: "#0A0A0A", className: "bg-ink text-white" },
  { name: "Ivory", hex: "#F9F9F7", className: "bg-ivory text-ink ring-1 ring-ink/10" },
  { name: "Electric Violet", hex: "#6318FF", className: "bg-violet text-white" },
  { name: "Neon Lime", hex: "#D7FF3F", className: "bg-lime text-ink" },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Cubical Dot is an independent digital design studio. Simple forms. Bigger ideas. Websites for premium brands entering their next market.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="04"
        label="About"
        title="Simple forms. Bigger ideas."
        lede="Cubical Dot is an independent digital design studio. We design the websites that carry a premium brand into its next market."
        variant="split"
        tone="ink"
      />

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-stone">The studio</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em]">A cube is structure. A dot is the idea in motion.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-charcoal lg:col-span-7">
            <p>
              The mark is the working rule. Reduce the form until the idea has room. A website that needs another typeface, another illustration style, and another accent to feel finished is usually hiding a sentence that is not true yet.
            </p>
            <p>
              We are hired by founders, brand directors, and marketing leads whose price already says premium, and whose website still says otherwise. Often they are selling into a second country. Often the current site was assembled quickly and then asked to do a job it was never designed for.
            </p>
            <p>
              The studio stays small on purpose. A senior design direction leads every engagement. Engineering, motion, and content join per project, named, and introduced. You are not handed to a different team after the proposal.
            </p>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <FieldArt variant="orbit" tone="dusk" />
        </div>
        <div className="bg-white px-5 py-16 md:px-12 lg:px-16 lg:py-20">
          <p className="eyebrow text-stone">How it feels</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em]">Written work. Live reviews. One story.</h2>
          <ul className="mt-8 space-y-6">
            {[
              ["Two clocks", "Workshops are placed where both sides are awake. The days between them are written, so a decision survives the timezone."],
              ["One narrative", "Every page answers the same commercial question. If a section cannot, it does not ship."],
              ["A month after", "Launch is not the exit. We stay for a refinement window while the first real visitors tell the truth."],
            ].map(([title, body]) => (
              <li key={title}>
                <h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone md:text-base">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-16">
          <p className="eyebrow text-lime">Bold. Creative. Different.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-[28px] border border-white/10 p-7">
                <h2 className="text-3xl font-bold tracking-[-0.045em]">{principle.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-16">
          <p className="eyebrow text-stone">The palette</p>
          <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.045em]">Four colors. One signal.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone md:text-base">
            Black and ivory are the fields. Violet carries the form. Lime is the only signal — the thing a buyer is meant to do next. If everything signals, nothing does.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <li key={swatch.hex} className={`flex min-h-40 flex-col justify-between rounded-[28px] p-5 ${swatch.className}`}>
                <span className="text-sm font-medium">{swatch.name}</span>
                <span className="font-mono text-xs tracking-wide">{swatch.hex}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-stone">Type is Inter. Display is bold and tight. UI is medium. Long reading is regular.</p>
          <div className="mt-12">
            <BrandButton href="/contact" variant="lime">
              Start a project
            </BrandButton>
          </div>
        </div>
      </section>
    </>
  );
}
