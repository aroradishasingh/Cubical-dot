import Link from "next/link";
import { Logo } from "@/components/mark";
import { nav, studio } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell grid gap-x-[var(--grid-gutter)] gap-y-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Cubical Dot, home" className="inline-flex text-white">
            <Logo />
          </Link>
          <p className="mt-6 max-w-sm text-lg leading-snug font-medium text-white">
            {studio.line}
          </p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">{studio.lockup}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-white/70">Visit</p>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base text-white/85 transition-colors hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-white/70">Start a project</p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 block text-2xl font-semibold tracking-[-0.03em] transition-colors hover:text-lime"
          >
            {studio.email}
          </a>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-white/75">
            Independent studio. Clients across Europe, North America, the Gulf, and Asia-Pacific. We reply within two business days.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cubical Dot. All rights reserved.</p>
          <p>Independent digital design studio</p>
        </div>
      </div>
    </footer>
  );
}
