import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import FaqSection from "@/components/seo/FaqSection";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getSeriesInfo } from "@/lib/series";
import {
  SOLUTIONS,
  SOLUTIONS_LAST_UPDATED,
  getSolutionBySlug,
  modelSlug,
  type Solution,
} from "@/lib/data/solutions";
import { fetchApplicationBySlug } from "@/lib/cms";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

interface SolutionPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return pageMetadata({
    lang,
    path: `/solutions/${solution.slug}`,
    title: solution.title,
    description: solution.metaDescription,
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  const dict = getDictionary(lang);

  const series = getSeriesInfo(solution.cuttingMethod);
  const application = await fetchApplicationBySlug(lang, solution.applicationSlug);

  return (
    <>
      <SolutionProductsJsonLd solution={solution} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.nav.applications, path: `/${lang}/applications` },
          { name: solution.title },
        ]}
      />
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="hover:text-orange">{dict.common.home}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/applications`} className="hover:text-orange">
              {dict.nav.applications}
            </Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 inline text-text-primary">{solution.material}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  {series && (
                    <Link
                      href={`/${lang}/products/${series.slug}`}
                      className="rounded-sm bg-orange-soft px-2.5 py-1 text-xs font-semibold text-orange transition-colors hover:bg-orange hover:text-white"
                    >
                      {series.cuttingMethod}
                    </Link>
                  )}
                  <span className="rounded-sm bg-bg-card px-2.5 py-1 text-xs text-text-secondary">
                    {solution.material}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-bold leading-tight text-text-primary md:text-3xl">
                  {solution.title}
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                  {dict.common.lastUpdated}:{" "}
                  {new Date(SOLUTIONS_LAST_UPDATED).toLocaleDateString(
                    lang === "zh-tw" ? "zh-TW" : "en-US",
                    { year: "numeric", month: "long" },
                  )}
                </p>

                <div className="mt-6 space-y-4">
                  {solution.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Recommended models */}
                <h2 className="mt-10 text-lg font-bold text-text-primary">
                  Recommended Knife Holders
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {solution.recommendedModels.map((model) => (
                    <div key={model} className="rounded-lg border border-border p-5">
                      <p className="font-heading text-xl font-bold text-text-primary">{model}</p>
                      <div className="mt-3 flex gap-2">
                        <Link
                          href={`/${lang}/products/model/${modelSlug(model)}`}
                          className="rounded border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-orange hover:text-orange"
                        >
                          {dict.products.viewDetails}
                        </Link>
                        <Link
                          href={`/${lang}/contact?product=${model}`}
                          className="rounded bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                        >
                          {dict.nav.getAQuote}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Application link */}
                {application && (
                  <p className="mt-8 text-sm text-text-secondary">
                    {dict.products.relatedApplications}:{" "}
                    <Link
                      href={`/${lang}/applications/${application.slug}`}
                      className="font-semibold text-orange hover:text-orange-hover"
                    >
                      {application.title} →
                    </Link>
                  </p>
                )}
              </div>

              <FaqSection heading={dict.common.faqHeading} items={solution.faqs} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="rounded-lg bg-navy p-6 text-white">
                  <h2 className="text-lg font-bold">{solution.material}</h2>
                  <p className="mt-2 text-sm text-white/70">
                    {dict.services.test.heading}
                  </p>
                  <div className="mt-5 space-y-3">
                    <CTAButton
                      href={`/${lang}/contact?topic=material-test&material=${encodeURIComponent(solution.material)}`}
                      className="w-full"
                    >
                      {dict.services.test.cta}
                    </CTAButton>
                    <CTAButton
                      href={`/${lang}/contact?models=${encodeURIComponent(solution.recommendedModels.join(", "))}`}
                      variant="outline-light"
                      className="w-full"
                    >
                      {dict.nav.getAQuote}
                    </CTAButton>
                  </div>
                </div>

                {/* Other solutions */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    {dict.products.relatedSolutions}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {SOLUTIONS.filter((s) => s.slug !== solution.slug)
                      .slice(0, 5)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${lang}/solutions/${s.slug}`}
                            className="text-sm text-text-secondary transition-colors hover:text-orange"
                          >
                            {s.material} · {getSeriesInfo(s.cuttingMethod)?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Product JSON-LD（推薦型號） ─────────────────────────── */

function SolutionProductsJsonLd({ solution }: { solution: Solution }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": solution.recommendedModels.map((model) => ({
      "@type": "Product",
      name: `${model} — ${solution.title}`,
      sku: model,
      brand: { "@type": "Brand", name: "MOTOKNIFE" },
      manufacturer: {
        "@type": "Organization",
        name: "友聚工業股份有限公司",
        url: SITE_URL,
      },
      description: solution.metaDescription,
      category: "Industrial Slitting Equipment",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "MOTOKNIFE" },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
