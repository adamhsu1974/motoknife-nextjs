import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Cut Knife Holders",
  description: "Thermal slitting systems for synthetic fabrics and nonwoven materials. Temperature up to 400°C. Model: MT-D410.",
};

export default function HotCutPage() {
  const series = getSeriesBySlug("hot-cut");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
