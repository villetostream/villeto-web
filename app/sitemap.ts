import type { MetadataRoute } from "next";
import { productPages } from "@/lib/content/product-pages";
import { solutionPages } from "@/lib/content/solution-pages";

const BASE_URL = "https://www.villeto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    ...productPages.map((p) => ({
      url: `${BASE_URL}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...solutionPages.map((p) => ({
      url: `${BASE_URL}/solutions/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
