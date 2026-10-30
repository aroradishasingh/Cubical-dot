import { BrandButton } from "@/components/brand-button";
import { Stop } from "@/components/story-line";
import { studio } from "@/lib/content";

/** Chapter 08, the invitation. The line ends here, on the period of the last sentence. */
export function Close() {
  return (
    <section data-tone="lime" className="bg-lime text-ink" aria-labelledby="close-title">
      <div className="shell relative z-[2] flex min-h-[90svh] flex-col justify-center py-28">
        <p className="eyebrow">08 — Your turn</p>
        <h2 id="close-title" className="mt-6 text-[clamp(3.6rem,11vw,12rem)] leading-[0.84] font-extrabold tracking-[-0.03em]">
          <span className="serif-i">Let&apos;s</span> build<Stop />
        </h2>
        <div className="mt-12 grid gap-8 border-t border-ink/25 pt-6 md:grid-cols-12 md:items-end">
          <p className="max-w-lg text-lg leading-snug md:col-span-6 md:text-xl">
            Tell us the market you are entering and the standard the website has to hold. We reply within two business days.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <BrandButton href="/contact" variant="ink" size="pillLg" magnetic>
              Get in touch
            </BrandButton>
            <BrandButton href={`mailto:${studio.email}`} variant="ghostDark" size="pillLg">
              {studio.email}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
