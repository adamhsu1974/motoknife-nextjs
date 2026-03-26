import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Half Cut Knife Holders",
  description: "Controlled depth cutting solutions for labels and laminates with micrometer adjustment. Model: MT-C310.",
};

export default function HalfCutPage() {
  const series = getSeriesBySlug("half-cut");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
