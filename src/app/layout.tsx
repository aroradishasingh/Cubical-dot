import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { MotionRoot } from "@/components/motion-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Loader } from "@/components/world/loader";
import { studio } from "@/lib/content";
import "./globals.css";

// One variable grotesk carries display and reading text; weight contrast is the accent.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
});

// Labels, indexes and meta: a mono keeps the system feeling engineered.
const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

const poppins = localFont({
  src: "../fonts/poppins-latin-500.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.url),
  title: {
    default: "Cubical Dot - Websites that convert",
    template: "%s - Cubical Dot",
  },
  description: studio.description,
  alternates: { canonical: studio.url },
  openGraph: {
    title: "Cubical Dot - Websites that convert",
    description: studio.description,
    url: studio.url,
    siteName: "Cubical Dot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubical Dot - Websites that convert",
    description: studio.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: studio.name,
  description: studio.description,
  url: studio.url,
  email: studio.email,
  areaServed: "Worldwide",
  slogan: studio.lockup,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${mono.variable} ${poppins.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-[8px] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Loader />
        <MotionRoot />
        <SiteHeader />
        <main id="content" className="relative">
          {children}
        </main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
