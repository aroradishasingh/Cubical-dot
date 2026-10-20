import { BrandButton } from "@/components/brand-button";
import { studio } from "@/lib/content";

export function Close() {
  return (
    <section className="home-close relative flex min-h-[calc(100svh-22rem)] flex-col justify-center overflow-hidden bg-ink pt-28 pb-12 text-white">
      <div className="pointer-events-none absolute top-20 right-[var(--page-margin)] hidden size-[280px] rounded-full bg-[radial-gradient(circle_at_32%_30%,#f4ffb0,#d7ff3f_40%,#7eac00_78%)] opacity-90 md:block" aria-hidden />
      <div className="pointer-events-none absolute -bottom-44 left-[var(--page-margin)] hidden size-[240px] rounded-[8px] bg-[linear-gradient(160deg,#7a4dff,#1a0860)] opacity-80 md:block" aria-hidden />
      <div className="shell relative">
        <p className="eyebrow text-white/60">08 / Invitation</p>
        <h2 className="display mt-4 max-w-4xl pb-[0.08em] text-[clamp(3rem,6vw,5.5rem)]">Let&apos;s build.</h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
          {studio.line} Tell us the market you are entering and the standard the website has to hold.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <BrandButton href="/contact" variant="lime" size="pillLg" magnetic>
            Start a project
          </BrandButton>
          <BrandButton href={`mailto:${studio.email}`} variant="ghostLight" size="pillLg">
            Email the studio
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
