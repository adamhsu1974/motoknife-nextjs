import type { Metadata } from "next";
import ApplicationPage from "@/components/ApplicationPage";
import { getMaterialBySlug } from "@/lib/data/applications";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Metallic Foil Cutting Solutions",
  description:
    "Shear Cut systems for aluminum, copper, and lithium battery foils. Burr-free edges for electronics and EV applications.",
};

export default function MetallicFoilPage() {
  const material = getMaterialBySlug("metallic-foil");
  if (!material) notFound();
  return <ApplicationPage material={material} />;
}
