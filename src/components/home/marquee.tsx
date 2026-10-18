const items = [
  "Website design",
  "Redesign",
  "Design systems",
  "Motion",
  "Digital brand",
  "Product interfaces",
  "Creative direction",
  "International clients",
];

export function Marquee() {
  const row = (
    <ul className="flex items-center gap-8 pr-8">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8">
          <span className="text-sm font-medium tracking-[-0.02em] whitespace-nowrap md:text-base">{item}</span>
          <span className="size-2 shrink-0 rounded-full bg-lime" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden border-y border-ink/10 bg-ivory py-4 text-ink" aria-hidden>
      <div className="marquee-track flex w-max">
        {row}
        <div className="marquee-copy flex">{row}</div>
      </div>
    </div>
  );
}
