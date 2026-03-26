import type { Metadata } from "next";
import ApplicationPage from "@/components/ApplicationPage";
import { getMaterialBySlug } from "@/lib/data/applications";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Rubber Cutting Solutions",
  description:
    "Score Cut solutions for rubber sheets and compounds. Controlled blade pressure for elastic materials.",
};

export default function RubberPage() {
  const material = getMaterialBySlug("rubber");
  if (!material) notFound();
  return <ApplicationPage material={material} />;
}
