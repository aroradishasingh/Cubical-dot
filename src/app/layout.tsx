import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { LogoIntro } from "@/components/home/logo-intro";
import { MotionRoot } from "@/components/motion-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: "500",
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-[16px] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
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
