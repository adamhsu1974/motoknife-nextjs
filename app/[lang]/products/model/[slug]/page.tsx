import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import DrawingViewer from "@/components/DrawingViewer";
import FeatureHighlights, {
  type FeatureHighlightItem,
} from "@/components/FeatureHighlights";
import LexicalContent from "@/components/LexicalContent";
import ModelViewer from "@/components/ModelViewer";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProductBySlug, fetchProducts } from "@/lib/cms";
import { populated, populatedOne } from "@/lib/relations";
import { getSeriesInfo, seriesForProductType, FAMILY_TIER_LABELS } from "@/lib/series";
import { getSolutionsForModel } from "@/lib/data/solutions";
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

  const galleryImages = populated<Media>(product.images)
    .filter((m) => m.mimeType?.startsWith("image/") && m.url)
    .map((m) => ({ url: m.url as string, alt: m.alt }));
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
                {galleryImages.length > 0 ? (
                  <ProductGallery images={galleryImages} />
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
                <p className="mt-3 text-xs text-text-secondary">
                  {dict.common.lastUpdated}:{" "}
                  {new Date(product.updatedAt).toLocaleDateString(
                    lang === "zh-tw" ? "zh-TW" : "en-US",
                    { year: "numeric", month: "long" },
                  )}
                </p>

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

              {/* Related Solutions（內部連結網絡） */}
              {getSolutionsForModel(product.model).length > 0 && (
                <div className="mt-8 rounded-lg bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-lg font-bold text-text-primary">
                    {dict.products.relatedSolutions}
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {getSolutionsForModel(product.model).map((solution) => (
                      <li key={solution.slug}>
                        <Link
                          href={`/${lang}/solutions/${solution.slug}`}
                          className="group block rounded border border-border p-4 transition-colors hover:border-orange"
                        >
                          <p className="text-sm font-semibold text-text-primary transition-colors group-hover:text-orange">
                            {solution.material}
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
  const highlights: FeatureHighlightItem[] = (product.featureHighlights ?? []).map(
    (item, index) => {
      const image = populatedOne<Media>(item.image);
      return {
        id: item.id ?? `highlight-${index}`,
        heading: item.heading,
        body: item.body,
        image: image?.url ? { url: image.url, alt: image.alt } : null,
      };
    },
  );

  return (
    <div className="space-y-8">
      {product.description && <LexicalContent data={product.description} />}

      <FeatureHighlights items={highlights} />

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
            <caption className="sr-only">
              {product.model} {product.title} specifications
            </caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {product.detailedSpecs.map((spec, i) => (
                <tr key={spec.id ?? spec.label} className={i % 2 === 0 ? "bg-bg-card" : ""}>
                  <th
                    scope="row"
                    className="px-3 py-2.5 text-left font-medium text-text-secondary"
                  >
                    {spec.label}
                  </th>
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

/** 預留：未來有具名客戶評價時改由 CMS 供應（依 product 查詢），目前回傳空值（JSON-LD 不輸出） */
function getProductRating(): { ratingValue: number; reviewCount: number } | undefined {
  return undefined;
}

function getProductReviews(): { author: string; reviewBody: string; ratingValue: number }[] {
  return [];
}

const CUTTING_METHOD_LABELS: Record<string, string> = {
  "score-cut": "Score cut (crush cut)",
  "shear-cut": "Shear cut",
  "half-cut": "Half cut (kiss cut)",
  "hot-cut": "Hot cut (heat cut)",
};

const PRODUCT_CATEGORY_LABELS: Record<Product["productType"], string> = {
  "knife-holder": "Slitting Knife Holder",
  knife: "Industrial Slitting Knife",
  "guide-bar": "Slitter Guide Bar",
  accessory: "Slitting Machine Accessory",
};

/** 雙值標示原則：standard 為主值，max + condition 附註於後 */
function formatDualSpec(spec?: {
  standard?: string | null;
  max?: string | null;
  condition?: string | null;
}): string | undefined {
  if (!spec?.standard) return undefined;
  if (!spec.max) return spec.standard;
  const condition = spec.condition ? ` — ${spec.condition}` : "";
  return `${spec.standard} (up to ${spec.max}${condition})`;
}

function buildAdditionalProperties(product: Product) {
  const props: { "@type": "PropertyValue"; name: string; value: string }[] = [];
  const push = (name: string, value?: string | null) => {
    if (value) props.push({ "@type": "PropertyValue", name, value });
  };

  push(
    "Cutting Method",
    product.cuttingMethod ? CUTTING_METHOD_LABELS[product.cuttingMethod] : undefined,
  );
  push("Minimum Slit Width", formatDualSpec(product.keySpecs?.minSlitWidth));
  push("Maximum Speed", formatDualSpec(product.keySpecs?.maxSpeed));
  push("Maximum Temperature", formatDualSpec(product.keySpecs?.maxTemperature));
  push("Air Pressure", product.keySpecs?.airPressure);
  push("Machining Tolerance", product.keySpecs?.tolerance);

  for (const spec of product.detailedSpecs ?? []) {
    push(spec.label, spec.note ? `${spec.value} (${spec.note})` : spec.value);
  }

  const applications = populated<Application>(product.applications)
    .map((app) => app.title)
    .filter(Boolean);
  push("Applicable Materials & Industries", applications.join(", ") || undefined);
  push("Country of Manufacture", "Taiwan");

  return props;
}

function ProductModelJsonLd({ product }: { product: Product }) {
  const aggregateRating = getProductRating();
  const reviews = getProductReviews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.model} ${product.title}`,
    sku: product.model,
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Organization", name: r.author },
        reviewBody: r.reviewBody,
        reviewRating: { "@type": "Rating", ratingValue: r.ratingValue },
      })),
    }),
    brand: { "@type": "Brand", name: "MOTOKNIFE" },
    manufacturer: {
      "@type": "Organization",
      name: "Moto Industries Co., Ltd. (友聚工業股份有限公司)",
      url: "https://motoknife.com",
      foundingDate: "1990",
      address: { "@type": "PostalAddress", addressCountry: "TW" },
    },
    description: product.tagline ?? product.title,
    category: PRODUCT_CATEGORY_LABELS[product.productType] ?? "Industrial Slitting Equipment",
    additionalProperty: buildAdditionalProperties(product),
    dateModified: product.updatedAt,
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
