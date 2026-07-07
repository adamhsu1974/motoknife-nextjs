import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import DrawingViewer from "@/components/DrawingViewer";
import LexicalContent from "@/components/LexicalContent";
import ModelViewer from "@/components/ModelViewer";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import ProductTabs from "@/components/ProductTabs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProductBySlug, fetchProducts } from "@/lib/cms";
import { populated, populatedOne } from "@/lib/relations";
import { getSeriesInfo, seriesForProductType, FAMILY_TIER_LABELS } from "@/lib/series";
import type { Application, Media, Product } from "@/lib/payload-types";

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

  const heroImage = populated<Media>(product.images).find(
    (m) => m.mimeType?.startsWith("image/") && m.url,
  );
  const model3d = populatedOne<Media>(product.model3d);
  const drawings = populated<Media>(product.technicalDrawings)
    .filter((m) => m.mimeType?.startsWith("image/") && m.url)
    .map((m) => ({ url: m.url as string, alt: m.alt }));
  const pdfCatalog = populatedOne<Media>(product.pdfCatalog);

  const quoteHref = `/${lang}/contact?product=${product.model}`;

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
            <div className="lg:col-span-2">
              {/* Product header */}
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
                {heroImage?.url ? (
                  <div className="relative mb-6 h-56 overflow-hidden rounded bg-bg-card md:h-72">
                    <Image
                      src={heroImage.url}
                      alt={heroImage.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-6 flex h-56 items-center justify-center rounded bg-bg-card md:h-72">
                    <span className="font-heading text-3xl font-bold text-text-secondary/20">
                      {product.model}
                    </span>
                  </div>
                )}

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

                {/* Tabs */}
                <div className="mt-8">
                  <ProductTabs
                    labels={{
                      overview: dict.products.tabOverview,
                      specs: dict.products.tabSpecs,
                      "3d": dict.products.tab3d,
                      drawings: dict.products.tabDrawings,
                    }}
                    panels={{
                      overview: (
                        <OverviewPanel
                          product={product}
                          relatedApplications={relatedApplications}
                          lang={lang}
                          dict={dict}
                        />
                      ),
                      specs: <SpecsPanel product={product} dict={dict} />,
                      "3d": model3d ? (
                        <ModelViewer
                          src={`/api/model/${model3d.id}`}
                          alt={`${product.model} 3D model`}
                          fullscreenLabel={dict.products.fullscreen}
                        />
                      ) : (
                        <PlaceholderCta
                          text={dict.products.model3dPlaceholder}
                          ctaLabel={dict.products.requestAccess}
                          href={quoteHref}
                        />
                      ),
                      drawings:
                        drawings.length > 0 ? (
                          <DrawingViewer
                            images={drawings}
                            note={product.drawingNotes}
                            fullscreenLabel={dict.products.fullscreen}
                            resetLabel={dict.products.resetView}
                          />
                        ) : (
                          <PlaceholderCta
                            text={dict.products.drawingsPlaceholder}
                            ctaLabel={dict.products.requestAccess}
                            href={quoteHref}
                          />
                        ),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Quote CTA + Downloads */}
                <div className="rounded-lg bg-navy p-6 text-white">
                  <h3 className="text-lg font-bold">{product.model}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    {dict.meta.contact.description}
                  </p>
                  <div className="mt-5">
                    <CTAButton href={quoteHref} className="w-full">
                      {dict.nav.getAQuote}
                    </CTAButton>
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {dict.products.downloadsHeading}
                  </p>
                  <div className="mt-3 space-y-3">
                    <PdfDownloadButton
                      product={product}
                      label={dict.products.downloadPdf}
                      generatingLabel={dict.products.generatingPdf}
                      errorLabel={dict.products.pdfFailed}
                      className="w-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/70"
                    />
                    {pdfCatalog?.url && (
                      <a
                        href={pdfCatalog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70"
                      >
                        {dict.products.catalogFile}
                      </a>
                    )}
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

/* ─── Tab panels ──────────────────────────────────────────── */

function OverviewPanel({
  product,
  relatedApplications,
  lang,
  dict,
}: {
  product: Product;
  relatedApplications: Application[];
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="space-y-8">
      {product.description && <LexicalContent data={product.description} />}

      {relatedApplications.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
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
  );
}

/** 核心數字視覺化（Helios 風格：大字 + 單位 + 漸層色條） */
function KeyFigure({ label, value, note }: { label: string; value: string; note?: string | null }) {
  const match = value.match(/^([<>≤≥~約]*\s*[\d.,–-]+)\s*(.*)$/);
  const number = match?.[1]?.trim() ?? value;
  const unit = match?.[2]?.trim() ?? "";

  return (
    <div className="rounded-lg bg-bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="font-heading text-4xl font-bold text-text-primary">{number}</span>
        {unit && <span className="text-sm font-medium text-text-secondary">{unit}</span>}
      </p>
      {note && <p className="mt-1 text-xs text-orange">{note}</p>}
      <div className="mt-3 h-1.5 w-full rounded-full bg-gradient-to-r from-orange via-orange/60 to-orange/15" />
    </div>
  );
}

function SpecsPanel({ product, dict }: { product: Product; dict: Dictionary }) {
  const ks = product.keySpecs;
  const figures: { label: string; value: string; note?: string | null }[] = [];
  if (ks?.minSlitWidth?.standard) {
    figures.push({
      label: dict.products.colMinSlit,
      value: ks.minSlitWidth.standard,
      note: ks.minSlitWidth.condition,
    });
  }
  if (ks?.maxSpeed?.standard) {
    figures.push({
      label: dict.products.colSpeed,
      value: ks.maxSpeed.standard,
      note: ks.maxSpeed.condition,
    });
  }
  if (ks?.maxTemperature?.standard) {
    figures.push({
      label: "Temperature",
      value: ks.maxTemperature.standard,
      note: ks.maxTemperature.condition,
    });
  }

  return (
    <div className="space-y-8">
      {figures.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
            {dict.products.keyFigures}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {figures.map((f) => (
              <KeyFigure key={f.label} label={f.label} value={f.value} note={f.note} />
            ))}
          </div>
        </div>
      )}

      {product.detailedSpecs && product.detailedSpecs.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
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
    </div>
  );
}

function PlaceholderCta({
  text,
  ctaLabel,
  href,
}: {
  text: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-5 rounded-lg border border-dashed border-border bg-bg-card px-6 text-center">
      <p className="max-w-md text-sm text-text-secondary">{text}</p>
      <CTAButton href={href}>{ctaLabel}</CTAButton>
    </div>
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
