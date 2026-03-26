import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide Bars",
  description: "High-rigidity chrome-plated guide bars for accurate knife positioning. Round and square profiles, up to 6000mm.",
};

export default function GuideBarPage() {
  const series = getSeriesBySlug("guide-bar");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
