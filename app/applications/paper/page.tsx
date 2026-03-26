import type { Metadata } from "next";
import ApplicationPage from "@/components/ApplicationPage";
import { getMaterialBySlug } from "@/lib/data/applications";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Paper Cutting Solutions",
  description:
    "Score Cut and Shear Cut for paper, cardboard, and tissue. Dust-free slitting for printing and packaging.",
};

export default function PaperPage() {
  const material = getMaterialBySlug("paper");
  if (!material) notFound();
  return <ApplicationPage material={material} />;
}
