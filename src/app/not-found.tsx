import { BrandButton } from "@/components/brand-button";
import { Mark } from "@/components/mark";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-end bg-ink pt-32 pb-16 text-white">
      <Mark variant="color" className="h-16" title="Cubical Dot" />
      <p className="eyebrow mt-10 text-white/55">404</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(3rem,7vw,6rem)]">This page left the grid.</h1>
      <p className="mt-5 max-w-md text-white/70">The address does not match a page in the studio. The work, the practice, and the desk are still here.</p>
      <div className="mt-8">
        <BrandButton href="/" variant="lime">
          Back to the studio
        </BrandButton>
      </div>
    </section>
  );
}
