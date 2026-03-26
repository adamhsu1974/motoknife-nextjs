import type { Metadata } from "next";
import ApplicationPage from "@/components/ApplicationPage";
import { getMaterialBySlug } from "@/lib/data/applications";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Plastic Film Cutting Solutions",
  description:
    "Score Cut and Shear Cut solutions for PE, PP, PET films. Find the right knife holder for your plastic film application.",
};

export default function PlasticFilmPage() {
  const material = getMaterialBySlug("plastic-film");
  if (!material) notFound();
  return <ApplicationPage material={material} />;
}
