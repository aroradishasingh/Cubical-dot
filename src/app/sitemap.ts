import type { MetadataRoute } from "next";
import { essays, studies, studio } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    "/services",
    "/about",
    "/blog",
    "/contact",
    ...studies.map((study) => `/work/${study.slug}`),
    ...essays.map((essay) => `/blog/${essay.slug}`),
  ];

  return paths.map((path) => ({
    url: `${studio.url}${path}`,
    lastModified: new Date("2026-10-18"),
  }));
}
