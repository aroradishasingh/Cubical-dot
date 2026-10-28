import type { MetadataRoute } from "next";
import { essays, studies, studio } from "@/lib/content";

const buildTime = new Date();

function yearEnd(year: string) {
  const match = year.match(/\d{4}/g);
  const last = match?.[match.length - 1];
  return last ? new Date(`${last}-12-31`) : buildTime;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: studio.url, lastModified: buildTime, changeFrequency: "weekly", priority: 1 },
    { url: `${studio.url}/work`, lastModified: buildTime, changeFrequency: "weekly", priority: 0.9 },
    { url: `${studio.url}/services`, lastModified: buildTime, changeFrequency: "monthly", priority: 0.9 },
    { url: `${studio.url}/about`, lastModified: buildTime, changeFrequency: "monthly", priority: 0.7 },
    { url: `${studio.url}/blog`, lastModified: buildTime, changeFrequency: "weekly", priority: 0.7 },
    { url: `${studio.url}/contact`, lastModified: buildTime, changeFrequency: "monthly", priority: 0.8 },
    { url: `${studio.url}/privacy`, lastModified: buildTime, changeFrequency: "yearly", priority: 0.2 },
    { url: `${studio.url}/terms`, lastModified: buildTime, changeFrequency: "yearly", priority: 0.2 },
  ];

  const studyPages: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${studio.url}/work/${study.slug}`,
    lastModified: yearEnd(study.year),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const essayPages: MetadataRoute.Sitemap = essays.map((essay) => ({
    url: `${studio.url}/blog/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...studyPages, ...essayPages];
}
