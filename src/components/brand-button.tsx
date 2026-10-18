"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsap";

type Variant = "lime" | "ink" | "violet" | "ghostLight" | "ghostDark";

const dotClass: Record<Variant, string> = {
  lime: "bg-ink group-hover/button:bg-violet",
  ink: "bg-lime group-hover/button:bg-ink",
  violet: "bg-lime",
  ghostLight: "bg-lime group-hover/button:bg-violet",
  ghostDark: "bg-lime group-hover/button:bg-ink",
};

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cn("size-4 transition-transform duration-300 group-hover/button:translate-x-1", className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BrandButton({
  href,
  children,
  variant = "lime",
  size = "pill",
  className,
  magnetic = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "pill" | "pillLg";
  className?: string;
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!magnetic) return;
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const move = (event: MouseEvent) => {
        const bounds = el.getBoundingClientRect();
        const relX = event.clientX - (bounds.left + bounds.width / 2);
        const relY = event.clientY - (bounds.top + bounds.height / 2);
        xTo(Math.max(-10, Math.min(10, relX * 0.22)));
        yTo(Math.max(-8, Math.min(8, relY * 0.3)));
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => mm.revert();
  }, { dependencies: [magnetic] });

  const classNames = cn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      <span className={cn("size-2 rounded-full", dotClass[variant])} aria-hidden />
      {children}
      <ArrowIcon />
    </>
  );

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a ref={ref} href={href} className={classNames}>
        {content}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classNames}>
      {content}
    </Link>
  );
}
