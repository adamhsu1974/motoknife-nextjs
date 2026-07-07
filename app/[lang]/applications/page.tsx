import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ApplicationSelector from "@/components/ApplicationSelector";
import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { APPLICATION_MATERIALS } from "@/lib/data/applications";

interface ApplicationsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ApplicationsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/applications",
    title: dict.meta.applications.title,
    description: dict.meta.applications.description,
  });
}

export default async function ApplicationsPage({ params }: ApplicationsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <PageShell
      title={dict.meta.applications.title}
      breadcrumbs={[
        { label: dict.common.home, href: `/${lang}` },
        { label: dict.nav.applications },
      ]}
    >
      <div className="mb-12">
        <ApplicationSelector lang={lang} dict={dict} />
      </div>

      <p className="mb-8 max-w-2xl text-text-secondary">
        Find the right cutting solution for your material. Select your material type below.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {APPLICATION_MATERIALS.map((m) => (
          <Link
            key={m.slug}
            href={`/${lang}/applications/${m.slug}`}
            className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-text-primary">{m.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{m.tagline}</p>
            <span className="mt-3 inline-block text-sm font-medium text-orange">
              {dict.common.learnMore} →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
