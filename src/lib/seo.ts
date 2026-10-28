import type { Metadata } from "next";
import { studio } from "@/lib/content";

/**
 * One place that wires title/description into canonical + Open Graph +
 * Twitter card together, so every page gets its own accurate social
 * preview instead of silently inheriting the homepage's.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${studio.url}${path}`;
  const social = `${title} - ${studio.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: social,
      description,
      url,
      siteName: studio.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
  };
}
