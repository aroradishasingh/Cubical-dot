import Script from "next/script";
import { CONSENT_KEY } from "@/components/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics 4, gated by Consent Mode v2: storage defaults to denied,
 * so no analytics cookie is set until a visitor accepts via CookieConsent.
 * Renders nothing at all until NEXT_PUBLIC_GA_MEASUREMENT_ID is set - the
 * feature is inert in every environment that hasn't configured it.
 */
export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* App Router explicitly supports beforeInteractive in the root layout;
          the no-before-interactive-script-outside-document lint rule still
          only knows about the old pages/_document.js convention. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'all') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}`}
      </Script>
    </>
  );
}
