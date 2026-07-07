import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ApplicationPage from "@/components/ApplicationPage";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplicationBySlug, fetchApplications } from "@/lib/cms";

export const revalidate = 3600;

interface ApplicationDetailPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const applications = await fetchApplications("en");
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ApplicationDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const application = await fetchApplicationBySlug(lang, slug);
  if (!application) return {};
  const coverage = (application.coverage ?? []).map((c) => c.material).join(", ");
  return pageMetadata({
    lang,
    path: `/applications/${application.slug}`,
    title: `${application.title} Cutting Solutions`,
    description:
      coverage.length > 0
        ? `MOTOKNIFE knife holders for ${application.title.toLowerCase()}: ${coverage}.`.slice(0, 160)
        : `MOTOKNIFE cutting solutions for ${application.title.toLowerCase()}.`,
  });
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const application = await fetchApplicationBySlug(lang, slug);
  if (!application) notFound();

  const all = await fetchApplications(lang);
  const otherApplications = all
    .filter((a) => a.slug !== application.slug)
    .map((a) => ({ slug: a.slug, title: a.title }));

  return (
    <ApplicationPage
      application={application}
      otherApplications={otherApplications}
      lang={lang}
    />
  );
}
