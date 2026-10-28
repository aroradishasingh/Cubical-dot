import type { MetadataRoute } from "next";
import { studio } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${studio.url}/sitemap.xml`,
  };
}
