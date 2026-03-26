import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shear Cut Knife Holders",
  description: "High-performance shear slitting systems for metallic foils and tough materials. Models: MT-B210, MT-B220.",
};

export default function ShearCutPage() {
  const series = getSeriesBySlug("shear-cut");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
