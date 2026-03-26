import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Score Cut Knife Holders",
  description: "Precision score cutting knife holders for flexible films, paper, and nonwoven. ±0.005mm tolerance. Models: MT-A110, MT-A120, MT-A130.",
};

export default function ScoreCutPage() {
  const series = getSeriesBySlug("score-cut");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
