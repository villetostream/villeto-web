import type { MetadataRoute } from "next";
import { productPages } from "@/lib/content/product-pages";
import { allSolutionPages } from "@/lib/content/solution-pages";

const BASE_URL = "https://villeto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/vendors`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/support`, changeFrequency: "monthly", priority: 0.7 },
    ...productPages.map((p) => ({
      url: `${BASE_URL}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allSolutionPages.map((p) => ({
      url: `${BASE_URL}/solutions/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
