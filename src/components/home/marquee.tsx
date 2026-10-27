import { cn } from "cn";

const items = [
  "Website design",
  "Redesign",
  "Design systems",
  "Motion",
  "Digital brand",
  "Product interfaces",
  "Creative direction",
  "Working worldwide",
];

export function Marquee({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const row = (
    <ul className="flex items-center gap-8 pr-8 md:gap-10 md:pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 md:gap-10">
          <span className="text-lg font-semibold tracking-[-0.03em] whitespace-nowrap md:text-2xl">{item}</span>
          <span className="size-1.5 shrink-0 rounded-full bg-lime md:size-2" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee overflow-hidden border-y py-5 md:py-6",
        tone === "dark" ? "border-white/10 bg-ink text-white" : "border-ink/10 bg-ivory text-ink"
      )}
      aria-hidden
    >
      <div className="marquee-track marquee-reverse flex w-max">
        {row}
        <div className="marquee-copy flex">{row}</div>
      </div>
    </div>
  );
}
