import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/payload-types";
import { SERIES, FAMILY_TIER_LABELS, type SeriesInfo } from "@/lib/series";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { keySpecRows } from "@/lib/product-display";

interface ProductSeriesPageProps {
  series: SeriesInfo;
  products: Product[];
  lang: Locale;
}

export default function ProductSeriesPage({ series, products, lang }: ProductSeriesPageProps) {
  return (
    <>
      <ProductJsonLd series={series} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: `/${lang}` },
          { name: "Products", path: `/${lang}/products` },
          { name: series.name },
        ]}
      />
      <div className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="transition-colors hover:text-orange-text">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/products`} className="transition-colors hover:text-orange-text">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{series.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Series Header */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                {/* Neutral image slot — 系列產品照到位後原位替換 */}
                <div aria-hidden className="mb-6 h-48 rounded-lg bg-bg-tertiary md:h-64" />

                <span className="inline-block rounded-sm bg-orange-soft px-2.5 py-1 text-xs font-medium text-orange-text">
                  {series.cuttingMethod}
                </span>
                <h1 className="mt-3 text-2xl font-medium text-text-primary md:text-3xl">
                  {series.fullName}
                </h1>
                <p className="mt-2 text-text-secondary">{series.tagline}</p>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {series.description}
                </p>

                {/* Key Specs */}
                <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg bg-bg-secondary p-5 sm:grid-cols-4">
                  {series.keySpecs.map((spec) => (
                    <div key={spec.label} className="text-center">
                      <p className="text-lg font-medium text-text-primary">
                        {spec.value}
                      </p>
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {spec.label}
                        {spec.note && <span className="text-orange-text"> ({spec.note})</span>}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Suitable Materials */}
                <div className="mt-8">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Suitable Materials
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {series.materials.map((mat) => (
                      <span
                        key={mat}
                        className="rounded-sm bg-bg-secondary px-3 py-1.5 text-sm text-text-primary"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Models List */}
              <div className="mt-8">
                <h2 className="mb-6 text-xl font-medium text-text-primary">
                  Available Models
                </h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.model}
                      className="rounded-lg bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium text-text-primary">
                              {product.model}
                            </h3>
                            {product.familyTier && (
                              <span className="rounded-sm bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary">
                                {FAMILY_TIER_LABELS[product.familyTier] ?? product.familyTier}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-text-secondary">
                            {product.tagline}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Link
                            href={`/${lang}/products/model/${product.slug}`}
                            className="rounded border border-border px-4 py-2 text-center text-sm font-medium text-text-primary transition-colors hover:border-orange hover:text-orange-text"
                          >
                            Details
                          </Link>
                          <Link
                            href={`/${lang}/contact?product=${product.model}`}
                            className="rounded bg-orange px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-orange-hover"
                          >
                            Get a Quote
                          </Link>
                        </div>
                      </div>

                      {/* Key specs row */}
                      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 text-sm">
                        {keySpecRows(product).map((spec) => (
                          <div key={spec.label}>
                            <span className="text-text-secondary">{spec.label}: </span>
                            <span className="font-medium text-text-primary">
                              {spec.value}
                            </span>
                            {spec.note && (
                              <span className="ml-1 text-xs text-orange-text">({spec.note})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-text-primary">Need Help Choosing?</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    Tell us your material and application. We&apos;ll recommend
                    the right {series.name} holder for you.
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="mt-5 block rounded bg-orange py-3 text-center text-sm font-medium text-white transition-colors hover:bg-orange-hover"
                  >
                    Get a Quote
                  </Link>
                </div>

                {/* Related Series */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Other Series
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {SERIES.filter((s) => s.slug !== series.slug).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${lang}/products/${s.slug}`}
                          className="text-sm text-text-secondary transition-colors hover:text-orange-text"
                        >
                          {s.name}
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
