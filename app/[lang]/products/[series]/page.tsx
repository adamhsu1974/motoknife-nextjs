import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductSeriesPage from "@/components/ProductSeriesPage";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";
import { PRODUCT_SERIES, getSeriesBySlug } from "@/lib/data/products";

interface SeriesPageProps {
  params: Promise<{ lang: string; series: string }>;
}

export function generateStaticParams() {
  return PRODUCT_SERIES.map((s) => ({ series: s.slug }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { lang, series: seriesSlug } = await params;
  if (!isLocale(lang)) return {};
  const series = getSeriesBySlug(seriesSlug);
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
  const series = getSeriesBySlug(seriesSlug);
  if (!series) notFound();
  return <ProductSeriesPage series={series} lang={lang} />;
}
