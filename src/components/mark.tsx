import { cn } from "cn";

/**
 * Geometry traced from the Cubical Dot lockup.
 * The slab is a square with a rounded top-left and bottom-right.
 * The top-right and bottom-left corners stay sharp. The lime dot
 * and the wordmark share the slab's bottom edge. Square = 64.
 */
export const markGeometry = {
  viewBox: "0 0 101.67 64",
  square: 64,
  corners: { tl: 18.4, tr: 0, br: 17.2, bl: 0 },
  dot: { cx: 86.2, cy: 48.54, r: 15.46 },
  blue: "#2C5CF6",
  lime: "#E1FC6D",
  word: "#F6F5F2",
} as const;

function coord(value: number) {
  return String(Math.round(value * 100) / 100);
}

/** Slab outline. Zero radii become sharp corners so the path can morph. */
export function slabPath(
  tl: number,
  tr: number,
  br: number,
  bl: number,
  size = markGeometry.square,
) {
  const s = size;
  const radius = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0);
  tl = radius(tl);
  tr = radius(tr);
  br = radius(br);
  bl = radius(bl);

  const turn = (r: number, x: number, y: number) =>
    r < 0.05 ? `L ${coord(x)} ${coord(y)}` : `A ${coord(r)} ${coord(r)} 0 0 1 ${coord(x)} ${coord(y)}`;

  return [
    `M ${coord(tl)} 0`,
    `H ${coord(s - tr)}`,
    turn(tr, s, tr),
    `V ${coord(s - br)}`,
    turn(br, s - br, s),
    `H ${coord(bl)}`,
    turn(bl, 0, s - bl),
    `V ${coord(tl)}`,
    turn(tl, tl, 0),
    "Z",
  ].join(" ");
}

type MarkProps = {
  className?: string;
  variant?: "mono" | "color";
  title?: string;
};

export function Mark({ className, variant = "mono", title }: MarkProps) {
  const label = title ?? "Cubical Dot mark";
  const { viewBox, square, corners, dot, blue, lime } = markGeometry;
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
      <path d={slabPath(corners.tl, corners.tr, corners.br, corners.bl, square)} fill={fill} />
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
        <span className="font-logo ml-[0.42em] translate-y-[0.157em] text-[0.95em] leading-none font-medium tracking-[-0.02em] text-[#F6F5F2]">
          Cubical Dot
        </span>
      ) : null}
    </span>
  );
}
