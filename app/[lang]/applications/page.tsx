import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ApplicationSelector, {
  type SelectorMaterialData,
} from "@/components/ApplicationSelector";
import FaqSection from "@/components/seo/FaqSection";
import PageShell from "@/components/PageShell";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplications, fetchFaqs } from "@/lib/cms";
import { populated } from "@/lib/relations";
import type { Application, Product } from "@/lib/payload-types";

export const revalidate = 3600;

function buildSelectorData(applications: Application[]): SelectorMaterialData[] {
  return applications
    .filter((app) => (app.selectorRules ?? []).length > 0)
    .map((app) => ({
      id: app.slug,
      name: app.title,
      examples: (app.coverage ?? []).map((c) => c.material).join(", "),
      options: (app.selectorRules ?? []).map((rule) => ({
        id: rule.id ?? rule.materialLabel,
        label: rule.materialLabel,
        note: rule.note,
        products: populated<Product>(rule.recommendedProducts).map((p) => ({
          model: p.model,
          slug: p.slug,
          cuttingMethod: p.cuttingMethod,
        })),
      })),
    }));
}

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
  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const [applications, faqs] = await Promise.all([
    fetchApplications(locale),
    fetchFaqs(locale, "applications"),
  ]);

  return (
    <PageShell
      title={dict.meta.applications.title}
      breadcrumbs={[
        { label: dict.common.home, href: `/${locale}` },
        { label: dict.nav.applications },
      ]}
    >
      <div className="mb-12">
        <ApplicationSelector
          lang={locale}
          dict={dict}
          materials={buildSelectorData(applications)}
        />
      </div>

      <p className="mb-8 max-w-2xl text-text-secondary">
        Find the right cutting solution for your material. Select your material type below.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <Link
            key={app.slug}
            href={`/${locale}/applications/${app.slug}`}
            className="group rounded-lg border border-transparent bg-white p-6 shadow-sm transition-colors hover:border-orange"
          >
            <h2 className="text-lg font-medium text-text-primary">{app.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
              {(app.coverage ?? []).map((c) => c.material).join(", ")}
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-orange-text">
              {dict.common.learnMore} →
            </span>
          </Link>
        ))}
      </div>

      <FaqSection
        heading={dict.common.faqHeading}
        items={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
    </PageShell>
  );
}
