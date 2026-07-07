import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import {
  PRODUCTS,
  getProductBySlug,
  getProductsBySeries,
  getSeriesBySlug,
  type Product,
} from "@/lib/data/products";
import { APPLICATION_MATERIALS } from "@/lib/data/applications";

interface ProductModelPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductModelPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    lang,
    path: `/products/model/${product.slug}`,
    title: `${product.model} — ${product.name}`,
    description: product.summary,
  });
}

export default async function ProductModelPage({ params }: ProductModelPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const dict = getDictionary(lang);
  const series = getSeriesBySlug(product.series);
  const related = getProductsBySeries(product.series).filter((p) => p.slug !== product.slug);
  const relatedApplications = APPLICATION_MATERIALS.filter((m) =>
    product.applicationSlugs.includes(m.slug),
  );

  return (
    <>
      <ProductModelJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.nav.products, path: `/${lang}/products` },
          ...(series ? [{ name: series.name, path: `/${lang}/products/${series.slug}` }] : []),
          { name: product.model },
        ]}
      />
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="hover:text-orange">{dict.common.home}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/products`} className="hover:text-orange">
              {dict.nav.products}
            </Link>
            {series && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/${lang}/products/${series.slug}`} className="hover:text-orange">
                  {series.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-text-primary">{product.model}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="space-y-8 lg:col-span-2">
              {/* Hero */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6 flex h-64 items-center justify-center rounded bg-bg-card md:h-80">
                  <span className="font-heading text-3xl font-bold text-text-secondary/20">
                    {product.model}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {series && (
                    <span className="rounded-sm bg-orange-soft px-2.5 py-1 text-xs font-semibold text-orange">
                      {series.cuttingMethod}
                    </span>
                  )}
                  <span className="rounded-sm bg-bg-card px-2.5 py-1 text-xs text-text-secondary">
                    {product.tier}
                  </span>
                </div>
                <h1 className="mt-3 font-heading text-3xl font-bold text-text-primary md:text-4xl">
                  {product.model}
                </h1>
                <p className="mt-1 text-lg text-text-secondary">{product.name}</p>
                <p className="mt-4 leading-relaxed text-text-secondary">{product.summary}</p>

                {product.description && (
                  <div className="mt-6 space-y-4 border-t border-border pt-6">
                    {product.description.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="leading-relaxed text-text-secondary">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-bold text-text-primary">
                  {dict.products.specifications}
                </h2>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? "bg-bg-card" : ""}>
                        <td className="px-3 py-2.5 font-medium text-text-secondary">
                          {spec.label}
                        </td>
                        <td className="px-3 py-2.5 text-text-primary">
                          {spec.value}
                          {spec.note && (
                            <span className="ml-2 text-xs text-orange">({spec.note})</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Suitable materials + related applications */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-bold text-text-primary">
                  {dict.products.suitableMaterials}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span
                      key={mat}
                      className="rounded-sm bg-bg-card px-3 py-1.5 text-sm text-text-primary"
                    >
                      {mat}
                    </span>
                  ))}
                </div>

                {relatedApplications.length > 0 && (
                  <>
                    <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                      {dict.products.relatedApplications}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {relatedApplications.map((app) => (
                        <Link
                          key={app.slug}
                          href={`/${lang}/applications/${app.slug}`}
                          className="rounded-sm bg-orange-soft px-3 py-1.5 text-sm font-medium text-orange transition-colors hover:bg-orange hover:text-white"
                        >
                          {app.name} →
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Quote CTA */}
                <div className="rounded-lg bg-navy p-6 text-white">
                  <h3 className="text-lg font-bold">{product.model}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    {dict.meta.contact.description}
                  </p>
                  <div className="mt-5 space-y-3">
                    <CTAButton
                      href={`/${lang}/contact?product=${product.model}`}
                      className="w-full"
                    >
                      {dict.nav.getAQuote}
                    </CTAButton>
                    <PdfDownloadButton
                      product={product}
                      label={dict.products.downloadPdf}
                      generatingLabel={dict.products.generatingPdf}
                      errorLabel={dict.products.pdfFailed}
                      className="w-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/70"
                    />
                  </div>
                </div>

                {/* Related models */}
                {related.length > 0 && (
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                      {dict.products.relatedModels}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/${lang}/products/model/${p.slug}`}
                            className="group flex items-baseline justify-between gap-2 text-sm"
                          >
                            <span className="font-medium text-text-primary transition-colors group-hover:text-orange">
                              {p.model}
                            </span>
                            <span className="text-xs text-text-secondary">{p.tier}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── JSON-LD ─────────────────────────────────────────────── */

function ProductModelJsonLd({ product }: { product: Product }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.model} ${product.name}`,
    sku: product.model,
    brand: { "@type": "Brand", name: "MOTOKNIFE" },
    manufacturer: {
      "@type": "Organization",
      name: "友聚工業股份有限公司",
      url: "https://motoknife.com",
    },
    description: product.summary,
    category: "Industrial Slitting Equipment",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "MOTOKNIFE" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
