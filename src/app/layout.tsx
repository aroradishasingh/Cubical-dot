import type { Metadata } from "next";
import localFont from "next/font/local";
import { LogoIntro } from "@/components/home/logo-intro";
import { MotionRoot } from "@/components/motion-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/lib/content";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-latin-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
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
    default: "Cubical Dot — Ideas in motion",
    template: "%s — Cubical Dot",
  },
  description: studio.description,
  openGraph: {
    title: "Cubical Dot — Ideas in motion",
    description: studio.description,
    url: studio.url,
    siteName: "Cubical Dot",
    type: "website",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-[8px] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <LogoIntro />
        <MotionRoot />
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
