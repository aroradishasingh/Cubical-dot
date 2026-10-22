import { Chapter } from "@/components/chapter";
import { cn } from "cn";

const REEL_OVERRIDES: Record<string, string[]> = {
  presentations: ["/presentations/art-01.webp", "/presentations/art-05.webp", "/presentations/public-01.webp"],
};

function reelFor(slug: string) {
  return REEL_OVERRIDES[slug] ?? [`/${slug}/01.webp`, `/${slug}/02.webp`, `/${slug}/03.webp`];
}

const slugs = ["mcdonalds", "trimble-modus", "magazine", "breadwala", "identity", "personal", "creatives", "presentations", "gen-ai"];

const reelImages = slugs.flatMap((slug) => reelFor(slug).map((src) => ({ src, slug })));

function chunk<T>(items: T[], columns: number) {
  const result: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => result[index % columns].push(item));
  return result;
}

const columns = chunk(reelImages, 4);

export function ShowReel() {
  return (
    <section className="overflow-hidden bg-ivory text-ink">
      <div className="shell pt-20 lg:pt-28">
        <Chapter index="05" label="Reel" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display section-title max-w-xl">The work, in motion.</h2>
          <p className="max-w-sm text-base leading-relaxed text-charcoal">
            A living wall of the studies — campaigns, identities, and the sites, side by side.
          </p>
        </div>
      </div>

      <div
        className="reel relative mt-12 h-[640px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] lg:mt-16 lg:h-[760px]"
        aria-hidden
      >
        <div className="grid h-full grid-cols-2 gap-3 px-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 md:px-4">
          {columns.map((column, index) => (
            <div key={index} className="relative overflow-hidden rounded-[4px]">
              <div className={cn("flex flex-col gap-3 md:gap-4", index % 2 === 0 ? "reel-up" : "reel-down")}>
                {[...column, ...column].map((image, imageIndex) => (
                  <div key={`${image.src}-${imageIndex}`} className="aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[4px] bg-stone/10">
                    <img src={image.src} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
