import { designedFor } from "@/lib/content";

function LogoRow({ id }: { id: string }) {
  return (
    <ul className="flex items-center gap-12 pr-12 md:gap-16 md:pr-16">
      {designedFor.map((company) => (
        <li key={`${id}-${company.name}`} className="flex items-center gap-12 md:gap-16">
          <img
            src={company.src}
            alt=""
            className="h-8 w-auto shrink-0 md:h-11"
            draggable={false}
          />
          <span className="size-2 shrink-0 rounded-full bg-lime" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

export function DesignedFor() {
  return (
    <section className="bg-ivory text-ink" aria-labelledby="designed-for">
      <h2 id="designed-for" className="shell eyebrow pt-8 text-stone md:pt-10">
        The team has designed for
      </h2>
      <ul className="sr-only">
        {designedFor.map((company) => (
          <li key={company.name}>{company.name}</li>
        ))}
      </ul>
      <div className="marquee mt-4 overflow-hidden border-y border-ink/10 py-6 md:py-8" aria-hidden>
        <div className="marquee-track flex w-max">
          <LogoRow id="a" />
          <div className="marquee-copy flex">
            <LogoRow id="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
