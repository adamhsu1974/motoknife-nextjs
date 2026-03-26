import ProductSeriesPage from "@/components/ProductSeriesPage";
import { getSeriesBySlug } from "@/lib/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slitting Knives & Score Blades",
  description: "Precision slitting knives and score blades in HSS and Tungsten Carbide. Ø57–120mm, HRC 60–65.",
};

export default function KnivesPage() {
  const series = getSeriesBySlug("knives");
  if (!series) notFound();
  return <ProductSeriesPage series={series} />;
}
