import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { NewsCategory } from "@/lib/data/news";

export function categoryLabel(category: NewsCategory, dict: Dictionary): string {
  const map: Record<NewsCategory, string> = {
    exhibition: dict.news.categoryExhibition,
    "product-news": dict.news.categoryProductNews,
    "industry-knowledge": dict.news.categoryIndustryKnowledge,
    "company-news": dict.news.categoryCompanyNews,
  };
  return map[category];
}

export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === "zh-tw" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
