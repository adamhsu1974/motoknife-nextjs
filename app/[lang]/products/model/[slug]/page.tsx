import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import LexicalContent from "@/components/LexicalContent";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProductBySlug, fetchProducts } from "@/lib/cms";
import { populated } from "@/lib/relations";
import { getSeriesInfo, seriesForProductType, FAMILY_TIER_LABELS } from "@/lib/series";
import type { Application, Product } from "@/lib/payload-types";

export const revalidate = 3600;

interface ProductModelPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const products = await fetchProducts("en");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductModelPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = await fetchProductBySlug(lang, slug);
  if (!product) return {};
  return pageMetadata({
    lang,
    path: `/products/model/${product.slug}`,
    title: `${product.model} — ${product.title}`,
    description: product.tagline ?? product.title,
  });
}

export default async function ProductModelPage({ params }: ProductModelPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = await fetchProductBySlug(lang, slug);
  if (!product) notFound();
  const dict = getDictionary(lang);

  const series = product.cuttingMethod
    ? getSeriesInfo(product.cuttingMethod)
    : seriesForProductType(product.productType);

  const allProducts = await fetchProducts(lang);
  const related = allProducts.filter(
    (p) =>
      p.slug !== product.slug &&
      (product.cuttingMethod
        ? p.cuttingMethod === product.cuttingMethod
        : p.productType === product.productType),
  );

  const relatedApplications = populated<Application>(product.applications);
  const tierLabel = product.familyTier
    ? (FAMILY_TIER_LABELS[product.familyTier] ?? product.familyTier)
    : undefined;

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
                  {tierLabel && (
                    <span className="rounded-sm bg-bg-card px-2.5 py-1 text-xs text-text-secondary">
                      {tierLabel}
                    </span>
                  )}
                </div>
                <h1 className="mt-3 font-heading text-3xl font-bold text-text-primary md:text-4xl">
                  {product.model}
                </h1>
                <p className="mt-1 text-lg text-text-secondary">{product.title}</p>
                {product.tagline && (
                  <p className="mt-4 leading-relaxed text-text-secondary">{product.tagline}</p>
                )}

                {product.description && (
                  <div className="mt-6 border-t border-border pt-6">
                    <LexicalContent data={product.description} />
                  </div>
                )}
              </div>

              {/* Specifications */}
              {product.detailedSpecs && product.detailedSpecs.length > 0 && (
                <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-lg font-bold text-text-primary">
                    {dict.products.specifications}
                  </h2>
                  <table className="mt-4 w-full text-sm">
                    <tbody>
                      {product.detailedSpecs.map((spec, i) => (
                        <tr key={spec.id ?? spec.label} className={i % 2 === 0 ? "bg-bg-card" : ""}>
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
              )}

              {/* Related applications */}
              {relatedApplications.length > 0 && (
                <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-lg font-bold text-text-primary">
                    {dict.products.relatedApplications}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedApplications.map((app) => (
                      <Link
                        key={app.slug}
                        href={`/${lang}/applications/${app.slug}`}
                        className="rounded-sm bg-orange-soft px-3 py-1.5 text-sm font-medium text-orange transition-colors hover:bg-orange hover:text-white"
                      >
                        {app.title} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
                            <span className="text-xs text-text-secondary">
                              {p.familyTier
                                ? (FAMILY_TIER_LABELS[p.familyTier] ?? p.familyTier)
                                : ""}
                            </span>
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
    name: `${product.model} ${product.title}`,
    sku: product.model,
    brand: { "@type": "Brand", name: "MOTOKNIFE" },
    manufacturer: {
      "@type": "Organization",
      name: "友聚工業股份有限公司",
      url: "https://motoknife.com",
    },
    description: product.tagline ?? product.title,
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
