import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductSeriesPage from "@/components/ProductSeriesPage";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProductsByMethod, fetchProductsBySeriesType } from "@/lib/cms";
import { SERIES, getSeriesInfo } from "@/lib/series";

export const revalidate = 3600;

interface SeriesPageProps {
  params: Promise<{ lang: string; series: string }>;
}

export function generateStaticParams() {
  return SERIES.map((s) => ({ series: s.slug }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { lang, series: seriesSlug } = await params;
  if (!isLocale(lang)) return {};
  const series = getSeriesInfo(seriesSlug);
  if (!series) return {};
  return pageMetadata({
    lang,
    path: `/products/${series.slug}`,
    title: series.fullName,
    description: `${series.tagline}. ${series.description}`.slice(0, 160),
  });
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { lang, series: seriesSlug } = await params;
  if (!isLocale(lang)) notFound();
  const series = getSeriesInfo(seriesSlug);
  if (!series) notFound();

  const products =
    series.slug === "knives" || series.slug === "guide-bar"
      ? await fetchProductsBySeriesType(lang, series.slug === "knives" ? "knife" : "guide-bar")
      : await fetchProductsByMethod(lang, series.slug);

  return <ProductSeriesPage series={series} products={products} lang={lang} />;
}
