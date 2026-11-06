import Script from "next/script";
import { CONSENT_KEY } from "@/lib/consent";

// G-LRYWB8HNBX is the studio's own GA4 property. Not a secret (it's visible
// in every page's HTML source anyway), so it's safe as a baked-in default.
// NEXT_PUBLIC_GA_MEASUREMENT_ID overrides it without a code edit.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LRYWB8HNBX";

/**
 * Google Analytics 4 (gtag.js), gated by Consent Mode v2: storage defaults
 * to denied, so no analytics cookie is set until a visitor accepts via
 * CookieConsent. Set NEXT_PUBLIC_GA_MEASUREMENT_ID="" to disable entirely.
 */
export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
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
