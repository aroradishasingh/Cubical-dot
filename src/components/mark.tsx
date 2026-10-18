import { useId } from "react";
import { cn } from "cn";

type MarkProps = {
  className?: string;
  variant?: "mono" | "color";
  title?: string;
};

export function Mark({ className, variant = "mono", title }: MarkProps) {
  const id = useId().replace(/:/g, "");
  const label = title ?? "Cubical Dot mark";

  return (
    <svg
      viewBox="0 0 90 64"
      className={cn("h-8 w-auto", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title ? label : undefined}
    >
      {variant === "color" ? (
        <>
          <defs>
            <linearGradient id={`${id}-slab`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9a78ff" />
              <stop offset="0.45" stopColor="#6318ff" />
              <stop offset="1" stopColor="#2a0d8c" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="18" fill={`url(#${id}-slab)`} />
          <circle cx="77" cy="32" r="13" fill="#d7ff3f" />
        </>
      ) : (
        <>
          <rect width="64" height="64" rx="18" fill="currentColor" />
          <circle cx="77" cy="32" r="13" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function Logo({
  className,
  variant = "mono",
  wordmark = true,
}: {
  className?: string;
  variant?: "mono" | "color";
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark variant={variant} className="h-8" />
      {wordmark ? (
        <span className="text-[1.15rem] leading-none font-bold tracking-[-0.045em]">
          Cubical Dot
          <sup className="ml-0.5 text-[0.5em] font-semibold">™</sup>
        </span>
      ) : null}
    </span>
  );
}
