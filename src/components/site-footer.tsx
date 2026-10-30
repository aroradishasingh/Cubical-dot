import Link from "next/link";
import { Logo } from "@/components/mark";
import { nav, studio } from "@/lib/content";

/** The sign-off: ink ground, the mark set large, everything a client needs to start. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 pt-20 pb-12 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-6">
          <p className="eyebrow text-lime">Get in touch</p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 inline-block text-[clamp(1.6rem,3.2vw,3.1rem)] leading-none break-all sm:break-normal font-bold tracking-[-0.03em] underline decoration-paper/40 decoration-2 underline-offset-[10px] transition-colors hover:text-lime hover:decoration-lime"
          >
            {studio.email}
          </a>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/85">
            India-based independent studio, working with ambitious brands worldwide. We reply within two business days.
          </p>
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <p className="eyebrow text-lime">Index</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-lg transition-colors hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="eyebrow text-lime">The approach</p>
          <p className="mt-4 text-lg leading-snug">
            Founder-led, start to finish. <span className="serif-i">Built to convert.</span>
          </p>
        </div>
      </div>

      <div className="shell pb-6" aria-hidden>
        <Logo className="text-[clamp(2rem,calc(12.5vw_-_2px),13.5rem)]! text-paper" />
      </div>

      <div className="border-t border-paper/15">
        <div className="shell flex flex-col gap-3 py-5 font-mono text-xs tracking-[0.04em] text-paper/85 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cubical Dot</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-lime">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-lime">
              Terms
            </Link>
            <span>Designed &amp; built in-house</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
