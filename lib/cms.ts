/**
 * Payload Local API 資料存取層 — 前台唯一的 CMS 查詢入口。
 * React cache() 確保同一次 render 內查詢去重；頁面層以 revalidate = 3600 做 ISR。
 */
import { cache } from "react";
import { getPayload } from "payload";

import config from "@payload-config";
import type { Locale } from "@/lib/i18n/config";
import type { DistributorCountryGroup } from "@/lib/cms-types";
import type {
  Application,
  Distributor,
  Faq,
  News,
  Product,
} from "@/lib/payload-types";

const client = cache(async () => getPayload({ config }));

/* ─── Products ────────────────────────────────────────────── */

export const fetchProducts = cache(async (locale: Locale): Promise<Product[]> => {
  const payload = await client();
  const result = await payload.find({
    collection: "products",
    locale,
    sort: "displayOrder",
    limit: 100,
    depth: 1,
  });
  return result.docs;
});

export const fetchProductBySlug = cache(
  async (locale: Locale, slug: string): Promise<Product | undefined> => {
    const payload = await client();
    const result = await payload.find({
      collection: "products",
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return result.docs[0];
  },
);

export const fetchProductsByMethod = cache(
  async (locale: Locale, cuttingMethod: string): Promise<Product[]> => {
    const payload = await client();
    const result = await payload.find({
      collection: "products",
      locale,
      where: { cuttingMethod: { equals: cuttingMethod } },
      sort: "displayOrder",
      limit: 100,
      depth: 0,
    });
    return result.docs;
  },
);

export const fetchProductsBySeriesType = cache(
  async (locale: Locale, productType: "knife" | "guide-bar"): Promise<Product[]> => {
    const payload = await client();
    const result = await payload.find({
      collection: "products",
      locale,
      where: { productType: { equals: productType } },
      sort: "displayOrder",
      limit: 100,
      depth: 0,
    });
    return result.docs;
  },
);

/* ─── Applications ────────────────────────────────────────── */

export const fetchApplications = cache(async (locale: Locale): Promise<Application[]> => {
  const payload = await client();
  const result = await payload.find({
    collection: "applications",
    locale,
    sort: "categoryNumber",
    limit: 50,
    depth: 1,
  });
  return result.docs;
});

export const fetchApplicationBySlug = cache(
  async (locale: Locale, slug: string): Promise<Application | undefined> => {
    const payload = await client();
    const result = await payload.find({
      collection: "applications",
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return result.docs[0];
  },
);

/* ─── Distributors ────────────────────────────────────────── */

export type { DistributorCountryGroup };

export const fetchDistributorCountries = cache(
  async (locale: Locale): Promise<DistributorCountryGroup[]> => {
    const payload = await client();
    const result = await payload.find({
      collection: "distributors",
      locale,
      where: { active: { equals: true } },
      sort: "displayOrder",
      limit: 200,
      depth: 0,
    });

    const groups = new Map<string, DistributorCountryGroup>();
    for (const doc of result.docs as Distributor[]) {
      const group = groups.get(doc.countryCode) ?? {
        countryCode: doc.countryCode,
        countryName: doc.countryName,
        region: doc.region,
        companies: [],
      };
      group.companies.push(doc.companyName);
      groups.set(doc.countryCode, group);
    }
    return [...groups.values()];
  },
);

/* ─── News ────────────────────────────────────────────────── */

export const fetchNews = cache(async (locale: Locale): Promise<News[]> => {
  const payload = await client();
  const result = await payload.find({
    collection: "news",
    locale,
    sort: "-publishedDate",
    limit: 100,
    depth: 0,
  });
  return result.docs;
});

export const fetchArticleBySlug = cache(
  async (locale: Locale, slug: string): Promise<News | undefined> => {
    const payload = await client();
    const result = await payload.find({
      collection: "news",
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return result.docs[0];
  },
);

/* ─── FAQs ────────────────────────────────────────────────── */

export const fetchFaqs = cache(
  async (locale: Locale, page: "products" | "applications"): Promise<Faq[]> => {
    const payload = await client();
    const result = await payload.find({
      collection: "faqs",
      locale,
      where: { page: { equals: page } },
      sort: "displayOrder",
      limit: 50,
      depth: 0,
    });
    return result.docs;
  },
);

export { populated, populatedOne } from "@/lib/relations";
