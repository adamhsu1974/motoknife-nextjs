import type { Metadata } from "next";
import ApplicationPage from "@/components/ApplicationPage";
import { getMaterialBySlug } from "@/lib/data/applications";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Nonwoven Cutting Solutions",
  description:
    "Score Cut and Hot Cut solutions for nonwoven fabrics. Edge sealing available for medical and hygiene applications.",
};

export default function NonwovenPage() {
  const material = getMaterialBySlug("nonwoven");
  if (!material) notFound();
  return <ApplicationPage material={material} />;
}
