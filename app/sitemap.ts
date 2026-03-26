import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/applications", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/cutting-methods", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const productPages = [
    "/products/score-cut",
    "/products/shear-cut",
    "/products/half-cut",
    "/products/hot-cut",
    "/products/knives",
    "/products/guide-bar",
  ];

  const applicationPages = [
    "/applications/plastic-film",
    "/applications/metallic-foil",
    "/applications/rubber",
    "/applications/paper",
    "/applications/nonwoven",
  ];

  const now = new Date();

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...productPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...applicationPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
