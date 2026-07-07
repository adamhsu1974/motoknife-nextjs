import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ApplicationPage from "@/components/ApplicationPage";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";
import { APPLICATION_MATERIALS, getMaterialBySlug } from "@/lib/data/applications";

interface ApplicationDetailPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return APPLICATION_MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: ApplicationDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const material = getMaterialBySlug(slug);
  if (!material) return {};
  return pageMetadata({
    lang,
    path: `/applications/${material.slug}`,
    title: `${material.name} Cutting Solutions`,
    description: material.tagline,
  });
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const material = getMaterialBySlug(slug);
  if (!material) notFound();
  return <ApplicationPage material={material} lang={lang} />;
}
