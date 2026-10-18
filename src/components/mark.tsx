import { cn } from "cn";

/** Geometry measured from the Cubical Dot lockup. Square is 64; the dot sits on the baseline. */
export const markGeometry = {
  viewBox: "0 0 100.3 64",
  square: 64,
  radius: 19,
  dot: { cx: 84.53, cy: 48.3, r: 15.7 },
  blue: "#2C5CF6",
  lime: "#E1FC6D",
  word: "#F6F5F2",
} as const;

type MarkProps = {
  className?: string;
  variant?: "mono" | "color";
  title?: string;
};

export function Mark({ className, variant = "mono", title }: MarkProps) {
  const label = title ?? "Cubical Dot mark";
  const { viewBox, square, radius, dot, blue, lime } = markGeometry;
  const fill = variant === "color" ? blue : "currentColor";
  const dotFill = variant === "color" ? lime : "currentColor";

  return (
    <svg
      viewBox={viewBox}
      className={cn("h-8 w-auto", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title ? label : undefined}
    >
      <rect width={square} height={square} rx={radius} fill={fill} />
      <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill={dotFill} />
    </svg>
  );
}

export function Logo({
  className,
  variant = "color",
  wordmark = true,
}: {
  className?: string;
  variant?: "mono" | "color";
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-end text-[1.65rem] sm:text-[1.85rem]", className)}>
      <Mark variant={variant} className="h-[1em] w-auto" />
      {wordmark ? (
        <span className="font-logo mb-[-0.15em] ml-[0.5em] text-[0.9em] leading-none font-medium tracking-[-0.02em] text-[#F6F5F2]">
          Cubical Dot
          <sup className="ml-[0.14em] text-[0.38em] font-medium">™</sup>
        </span>
      ) : null}
    </span>
  );
}
