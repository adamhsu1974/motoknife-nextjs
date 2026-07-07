import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  PRODUCT_SERIES,
  getProductsBySeries,
  type ProductSeries,
} from "@/lib/data/products";

interface ProductSeriesPageProps {
  series: ProductSeries;
  lang: Locale;
}

export default function ProductSeriesPage({ series, lang }: ProductSeriesPageProps) {
  const products = getProductsBySeries(series.slug);

  return (
    <>
      <ProductJsonLd series={series} />
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="hover:text-orange">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/products`} className="hover:text-orange">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{series.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Series Header */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                {/* Image placeholder */}
                <div className="mb-6 flex h-48 items-center justify-center rounded bg-bg-card md:h-64">
                  <span className="text-lg text-text-secondary/30">
                    {series.name} Product Photo
                  </span>
                </div>

                <span className="inline-block rounded-sm bg-orange-soft px-2.5 py-1 text-xs font-medium text-orange">
                  {series.cuttingMethod}
                </span>
                <h1 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
                  {series.fullName}
                </h1>
                <p className="mt-2 text-text-secondary">{series.tagline}</p>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {series.description}
                </p>

                {/* Key Specs */}
                <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg bg-bg-card p-5 sm:grid-cols-4">
                  {series.keySpecs.map((spec) => (
                    <div key={spec.label} className="text-center">
                      <p className="text-lg font-bold text-text-primary">
                        {spec.value}
                      </p>
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {spec.label}
                        {spec.note && <span className="text-orange"> ({spec.note})</span>}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Suitable Materials */}
                <div className="mt-8">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    Suitable Materials
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {series.materials.map((mat) => (
                      <span
                        key={mat}
                        className="rounded-sm bg-bg-card px-3 py-1.5 text-sm text-text-primary"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Models List */}
              <div className="mt-8">
                <h2 className="mb-6 text-xl font-bold text-text-primary">
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
                            <h3 className="font-heading text-lg font-bold text-text-primary">
                              {product.model}
                            </h3>
                            <span className="rounded-sm bg-bg-card px-2 py-0.5 text-xs text-text-secondary">
                              {product.tier}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-text-secondary">
                            {product.summary}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Link
                            href={`/${lang}/products/model/${product.slug}`}
                            className="rounded border border-border px-4 py-2 text-center text-sm font-medium text-text-primary transition-colors hover:border-orange hover:text-orange"
                          >
                            Details
                          </Link>
                          <Link
                            href={`/${lang}/contact?product=${product.model}`}
                            className="rounded bg-orange px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                          >
                            Get a Quote
                          </Link>
                        </div>
                      </div>

                      {/* Key specs row */}
                      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 text-sm">
                        {product.keySpecs.map((spec) => (
                          <div key={spec.label}>
                            <span className="text-text-secondary">{spec.label}: </span>
                            <span className="font-medium text-text-primary">
                              {spec.value}
                            </span>
                            {spec.note && (
                              <span className="ml-1 text-xs text-orange">({spec.note})</span>
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
                <div className="rounded-lg bg-navy p-6 text-white">
                  <h3 className="text-lg font-bold">Need Help Choosing?</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Tell us your material and application. We&apos;ll recommend
                    the right {series.name} holder for you.
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="mt-5 block rounded bg-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                  >
                    Get a Quote
                  </Link>
                </div>

                {/* Related Series */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    Other Series
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {PRODUCT_SERIES.filter((s) => s.slug !== series.slug).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${lang}/products/${s.slug}`}
                          className="text-sm text-text-secondary transition-colors hover:text-orange"
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
