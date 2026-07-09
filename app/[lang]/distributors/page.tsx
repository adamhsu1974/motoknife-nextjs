import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import DistributorsMap from "@/components/DistributorsMap";
import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchDistributorCountries } from "@/lib/cms";

export const revalidate = 3600;

interface DistributorsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: DistributorsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/distributors",
    title: dict.meta.distributors.title,
    description: dict.meta.distributors.description,
  });
}

export default async function DistributorsPage({ params }: DistributorsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const countries = await fetchDistributorCountries(lang);

  return (
    <PageShell
      title={dict.distributors.heading}
      breadcrumbs={[
        { label: dict.common.home, href: `/${lang}` },
        { label: dict.nav.distributors },
      ]}
    >
      <p className="mb-10 max-w-2xl text-text-secondary">{dict.distributors.intro}</p>

      <DistributorsMap lang={lang} dict={dict} countries={countries} />

      {/* Become a distributor */}
      <div className="mt-12 rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="text-xl font-medium text-text-primary">{dict.distributors.becomeDistributor}</h2>
          <Link
            href={`/${lang}/contact`}
            className="shrink-0 rounded bg-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-hover"
          >
            {dict.distributors.applyNow}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
