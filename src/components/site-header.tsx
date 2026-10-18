"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { Logo } from "@/components/mark";
import { BrandButton } from "@/components/brand-button";
import { nav } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(() => {
    if (!open) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".menu-link", {
        yPercent: 40,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.55,
        ease: "power3.out",
      });
    });
    return () => mm.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", solid ? "px-3 pt-3 md:px-5" : "px-4 md:px-8 lg:px-12")}>
      <div
        className={cn(
          "relative z-50 flex h-16 items-center justify-between gap-4 text-white md:h-[4.5rem]",
          solid && "rounded-full border border-white/10 bg-ink/90 px-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-5"
        )}
      >
        <Link href="/" aria-label="Cubical Dot, home" className="relative z-10 text-white">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-[-0.01em] text-white/75 transition-colors hover:text-white",
                  active && "text-white"
                )}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-lime" aria-hidden />
                ) : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="relative z-10 flex items-center gap-2">
          <BrandButton href="/contact" variant="lime" className="hidden sm:inline-flex">
            Let&apos;s build
          </BrandButton>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={cn("absolute left-0 h-px w-4 bg-white transition-transform", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-4 bg-white transition-transform", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="fixed inset-0 z-40 bg-ink px-6 pt-28 text-white lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            <Link href="/" className="menu-link display text-5xl" onClick={() => setOpen(false)}>
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="menu-link display text-5xl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="menu-link mt-10">
            <BrandButton href="/contact" variant="lime" size="pillLg">
              Let&apos;s build
            </BrandButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
