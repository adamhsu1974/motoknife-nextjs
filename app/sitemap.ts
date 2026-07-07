import type { MetadataRoute } from "next";

import { LOCALES } from "@/lib/i18n/config";
import { SERIES } from "@/lib/series";
import { fetchApplications, fetchNews, fetchProducts } from "@/lib/cms";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, applications, articles] = await Promise.all([
    fetchProducts("en"),
    fetchApplications("en"),
    fetchNews("en"),
  ]);

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/products/cutting-methods", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/applications", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/distributors", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" as const },
    ...articles.map((a) => ({
      path: `/news/${a.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];

  const productPages = [
    ...SERIES.map((s) => `/products/${s.slug}`),
    ...products.map((p) => `/products/model/${p.slug}`),
  ];
  const applicationPages = applications.map((a) => `/applications/${a.slug}`);

  const now = new Date();

  return LOCALES.flatMap((lang) => [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}/${lang}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...productPages.map((path) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...applicationPages.map((path) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
}
