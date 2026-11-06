"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/consent";

type Consent = "all" | "necessary";

/** Tells any already-loaded analytics script the visitor's current choice. */
export function applyConsent(consent: Consent) {
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: consent === "all" ? "granted" : "denied",
  });
}

/**
 * A fixed bar, not a modal: the site stays usable underneath, which matters
 * for a one-page-at-a-time portfolio where the first screen is the pitch.
 * No analytics cookie is set before a visitor picks "Accept" - see Analytics.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode, strict settings): skip the banner
      // rather than ask on every single page view.
    }
  }, []);

  const choose = (consent: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {
      // Nothing persists, but still honour the choice for this page view.
    }
    applyConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[80] p-4 md:p-6"
    >
      <div className="shell mx-auto flex max-w-3xl flex-col gap-4 rounded-[8px] border border-ink/10 bg-paper p-5 shadow-xl shadow-black/10 md:flex-row md:items-center md:justify-between md:p-6">
        <p className="text-sm leading-relaxed text-ink/80">
          We use cookies only to understand traffic in aggregate, and only once you say yes.{" "}
          <Link href="/privacy" className="underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt-deep">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="h-10 rounded-[8px] border border-ink/15 px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="h-10 rounded-[8px] bg-lime px-4 text-sm font-medium text-ink transition-colors hover:bg-cobalt hover:text-white"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
