import { designedFor } from "@/lib/content";

export function DesignedFor() {
  return (
    <section className="bg-white text-ink" aria-labelledby="designed-for">
      <div className="shell py-16 md:py-24">
        <p className="eyebrow text-stone">The team</p>
        <h2 id="designed-for" className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.045em] md:text-5xl">
          The team has designed for.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal">
          Product, brand, and campaign work, done by the people in this studio.
        </p>
        <ul className="mt-12 grid grid-cols-3 gap-2 sm:gap-3">
          {designedFor.map((company) => (
            <li
              key={company.name}
              className="flex h-16 items-center justify-center rounded-[8px] border border-ink/10 bg-ivory px-2 sm:h-24 sm:px-5"
            >
              <svg viewBox="0 0 220 48" className="h-6 w-full max-w-[220px] text-ink sm:h-9" role="img" aria-label={company.name}>
                <text
                  x="110"
                  y="33"
                  textAnchor="middle"
                  fill="currentColor"
                  fontFamily="var(--font-inter), Inter, sans-serif"
                  fontSize="30"
                  fontWeight="600"
                  letterSpacing="-0.04em"
                  lengthAdjust="spacingAndGlyphs"
                  textLength="200"
                >
                  {company.mark}
                </text>
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
