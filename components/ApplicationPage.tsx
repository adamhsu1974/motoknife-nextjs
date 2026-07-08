import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Application, Product } from "@/lib/payload-types";
import { getSeriesInfo } from "@/lib/series";
import { getSolutionsForApplication } from "@/lib/data/solutions";
import { populated } from "@/lib/relations";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LexicalContent from "@/components/LexicalContent";

interface ApplicationPageProps {
  application: Application;
  otherApplications: { slug: string; title: string }[];
  lang: Locale;
}

export default function ApplicationPage({
  application,
  otherApplications,
  lang,
}: ApplicationPageProps) {
  const coverage = application.coverage ?? [];
  const recommendations = application.productRecommendations ?? [];
  const relatedSolutions = getSolutionsForApplication(application.slug);

  return (
    <div className="bg-bg-secondary py-16 md:py-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: `/${lang}` },
          { name: "Applications", path: `/${lang}/applications` },
          { name: application.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href={`/${lang}`} className="transition-colors hover:text-orange-text">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/applications`} className="transition-colors hover:text-orange-text">Applications</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{application.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h1 className="text-2xl font-medium text-text-primary md:text-3xl">
                {application.title}
              </h1>

              {/* Coverage 材料範圍 */}
              {coverage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {coverage.map((c) => (
                    <span
                      key={c.id ?? c.material}
                      className="rounded-sm bg-bg-secondary px-3 py-1.5 text-sm text-text-primary"
                    >
                      {c.material}
                    </span>
                  ))}
                </div>
              )}

              {/* Cutting methods */}
              {application.cuttingMethods && application.cuttingMethods.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-text-secondary">
                    Recommended:
                  </span>
                  {application.cuttingMethods.map((method) => (
                    <Link
                      key={method}
                      href={`/${lang}/products/${method}`}
                      className="rounded-sm bg-orange/10 px-3 py-1.5 text-sm font-semibold text-orange-text"
                    >
                      {getSeriesInfo(method)?.cuttingMethod ?? method}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pain points 痛點敘事 */}
            {application.painPoints && (
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-medium text-text-primary">
                  Material Challenges
                </h2>
                <div className="mt-4">
                  <LexicalContent data={application.painPoints} />
                </div>
              </div>
            )}

            {/* Selection logic 選擇邏輯 */}
            {application.selectionLogic && (
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-medium text-text-primary">
                  Choosing the Cutting Method
                </h2>
                <div className="mt-4">
                  <LexicalContent data={application.selectionLogic} />
                </div>
              </div>
            )}

            {/* Recommended Products */}
            {recommendations.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-medium text-text-primary">
                  Recommended Products
                </h2>
                <div className="mt-4 space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id ?? rec.cuttingMethod}
                      className="rounded border border-border p-4"
                    >
                      <span className="inline-block rounded-sm bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange-text">
                        {getSeriesInfo(rec.cuttingMethod)?.cuttingMethod ?? rec.cuttingMethod}
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {populated<Product>(rec.products).map((p) => (
                          <Link
                            key={p.slug}
                            href={`/${lang}/products/model/${p.slug}`}
                            className="rounded bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-orange-soft hover:text-orange-text"
                          >
                            {p.model}
                          </Link>
                        ))}
                      </div>
                      {rec.note && (
                        <p className="mt-3 text-sm text-text-secondary">{rec.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Solutions（內部連結網絡） */}
            {relatedSolutions.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-medium text-text-primary">Related Solutions</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relatedSolutions.map((solution) => (
                    <li key={solution.slug}>
                      <Link
                        href={`/${lang}/solutions/${solution.slug}`}
                        className="group block rounded border border-border p-4 transition-colors hover:border-orange"
                      >
                        <p className="text-sm font-semibold text-text-primary transition-colors group-hover:text-orange-text">
                          {solution.material} ·{" "}
                          {getSeriesInfo(solution.cuttingMethod)?.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
                          {solution.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Quote CTA */}
              <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium text-text-primary">
                  Cutting {application.title}?
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Tell us your specifications and we&apos;ll recommend the
                  optimal setup for your application.
                </p>
                <Link
                  href={`/${lang}/contact?material=${encodeURIComponent(application.title)}`}
                  className="mt-5 block rounded bg-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                >
                  Get a Recommendation
                </Link>
              </div>

              {/* Other Materials */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                  Other Applications
                </h3>
                <ul className="mt-3 space-y-2">
                  {otherApplications.map((app) => (
                    <li key={app.slug}>
                      <Link
                        href={`/${lang}/applications/${app.slug}`}
                        className="text-sm text-text-secondary transition-colors hover:text-orange-text"
                      >
                        {app.title}
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
  );
}
