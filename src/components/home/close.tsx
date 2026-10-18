import { BrandButton } from "@/components/brand-button";
import { studio } from "@/lib/content";

export function Close() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-10 -right-10 size-[280px] rounded-full bg-[radial-gradient(circle_at_32%_30%,#f4ffb0,#d7ff3f_40%,#7eac00_78%)] opacity-90 md:size-[420px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] size-[340px] rounded-[3rem] bg-[linear-gradient(160deg,#7a4dff,#1a0860)] opacity-80" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 lg:px-16 lg:py-36">
        <p className="eyebrow text-white/60">08 / Invitation</p>
        <h2 className="display mt-6 max-w-4xl text-[clamp(3.4rem,8vw,7rem)]">Let&apos;s build.</h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
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
