"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { Logo } from "@/components/mark";
import { nav, studio } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

function useStudioTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const time = useStudioTime();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(menu.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" });
        gsap.from(".menu-word", { yPercent: 110, duration: 1, stagger: 0.05, ease: "expo.out", delay: 0.35 });
        gsap.from(".menu-fade", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.05, delay: 0.6 });
      });
      return () => mm.revert();
    },
    { dependencies: [open] }
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-[75] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:top-4",
        hidden && !open && "-translate-y-[140%]"
      )}
    >
      {/* A floating island: its own paper surface keeps it legible over every section. */}
      <div className="shell relative z-[76]">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-ink/10 bg-paper/90 pr-3 pl-5 text-ink shadow-[0_12px_40px_-18px_rgba(16,16,18,0.45)] backdrop-blur-xl md:h-16 md:pr-3.5 md:pl-6">
          <Link href="/" data-site-logo aria-label="Cubical Dot, home" className="inline-flex shrink-0">
            <Logo className="text-[1.3rem] sm:text-[1.45rem]" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-xs font-medium tracking-[0.04em] uppercase transition-colors hover:bg-ink/5",
                    active && "bg-ink text-paper hover:bg-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-2 px-3 font-mono text-xs tracking-[0.04em] text-ink uppercase xl:flex">
              <span className="size-2 rounded-full bg-lime ring-1 ring-ink/40" aria-hidden />
              {time ? `India ${time}` : "India"}
            </span>
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-cobalt sm:inline-flex md:h-12"
            >
              <span className="size-2 rounded-full bg-lime" aria-hidden />
              Get in touch
            </Link>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-mono text-xs font-medium tracking-[0.04em] uppercase hover:bg-ink/5 lg:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div ref={menu} id="site-menu" className="fixed inset-0 z-[74] flex flex-col bg-cobalt text-paper">
          <div className="shell flex flex-1 flex-col justify-between pt-28 pb-10">
            <nav aria-label="Mobile">
              <ul>
                {[{ href: "/", label: "Home" }, ...nav].map((item, index) => (
                  <li key={item.href} className="overflow-hidden border-b border-paper/30">
                    <Link href={item.href} className="menu-word flex items-baseline gap-4 py-3">
                      <span className="font-mono text-xs text-lime">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[clamp(2.6rem,11vw,5rem)] leading-none font-extrabold tracking-[-0.035em]">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="menu-fade mt-10 flex flex-col gap-4">
              <a href={`mailto:${studio.email}`} className="text-xl font-semibold">
                {studio.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
