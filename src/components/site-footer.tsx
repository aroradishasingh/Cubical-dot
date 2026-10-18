import Link from "next/link";
import { Logo } from "@/components/mark";
import { nav, studio } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20 lg:px-16">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Cubical Dot, home" className="text-white">
            <Logo />
          </Link>
          <p className="mt-6 max-w-sm text-lg leading-snug font-medium tracking-[-0.03em] text-white">
            {studio.line}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{studio.lockup}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-white/45">Visit</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 transition-colors hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-white/45">Start a project</p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 block text-2xl font-semibold tracking-[-0.04em] transition-colors hover:text-lime"
          >
            {studio.email}
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Independent studio. Clients across Europe, North America, the Gulf, and Asia-Pacific. We reply within two business days.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16">
        <p>© {new Date().getFullYear()} Cubical Dot. All rights reserved.</p>
        <p>Independent digital design studio</p>
      </div>
    </footer>
  );
}
