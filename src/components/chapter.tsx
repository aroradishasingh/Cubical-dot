import { cn } from "cn";

export function Chapter({
  index,
  label,
  tone = "dark",
  className,
}: {
  index: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "light" ? "text-white/75" : "text-stone",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-lime" aria-hidden />
      <span>{index}</span>
      <span className="opacity-40" aria-hidden>
        /
      </span>
      <span>{label}</span>
    </p>
  );
}
