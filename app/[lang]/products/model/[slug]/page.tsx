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
import ProductSubnav from "@/components/ProductSubnav";
import Reveal from "@/components/gsap/Reveal";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqSection from "@/components/seo/FaqSection";
import { buildCompareRows } from "@/lib/compare";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProductBySlug, fetchProducts } from "@/lib/cms";
import { populated, populatedOne } from "@/lib/relations";
import { getSeriesInfo, seriesForProductType, FAMILY_TIER_LABELS, type SeriesInfo } from "@/lib/series";
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

/** i18n 模板填值：{model} / {method} / {value} / {materials} */
function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

/** 產品 FAQ（3–5 題）：由產品事實組稿，供頁面與 FAQPage JSON-LD 共用 */
function buildProductFaqs(
  product: Product,
  series: SeriesInfo | undefined,
  applications: Application[],
  dict: Dictionary,
): { question: string; answer: string }[] {
  const p = dict.products;
  const model = product.model;
  const items: { question: string; answer: string }[] = [];

  if (series) {
    const base = fill(p.faqMethodA, { model, method: series.cuttingMethod });
    items.push({
      question: fill(p.faqMethodQ, { model }),
      answer: product.tagline ? `${base} ${product.tagline}` : base,
    });
  }
  const minSlit = formatDualSpec(product.keySpecs?.minSlitWidth);
  if (minSlit) {
    items.push({
      question: fill(p.faqMinSlitQ, { model }),
      answer: fill(p.faqMinSlitA, { model, value: minSlit }),
    });
  }
  const speed = formatDualSpec(product.keySpecs?.maxSpeed);
  if (speed) {
    items.push({
      question: fill(p.faqSpeedQ, { model }),
      answer: fill(p.faqSpeedA, { model, value: speed }),
    });
  }
  const materials = applications.map((a) => a.title).filter(Boolean).join(", ");
  if (materials) {
    items.push({
      question: fill(p.faqMaterialsQ, { model }),
      answer: fill(p.faqMaterialsA, { model, materials }),
    });
  }
  items.push({
    question: fill(p.faqLeadTimeQ, { model }),
    answer: p.faqLeadTimeA,
  });

  return items.slice(0, 5);
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
  const solutions = getSolutionsForModel(product.model);

  /* DJI 式 hero 關鍵規格（3 個數字橫排：最小分切寬度｜最大線速｜切法） */
  const ks = product.keySpecs;
  const heroSpecs: { label: string; value: string }[] = [];
  if (ks?.minSlitWidth?.standard) {
    heroSpecs.push({ label: dict.products.colMinSlit, value: ks.minSlitWidth.standard });
  }
  if (ks?.maxSpeed?.standard) {
    heroSpecs.push({ label: dict.products.colSpeed, value: ks.maxSpeed.standard });
  }
  if (ks?.maxTemperature?.standard && heroSpecs.length < 2) {
    heroSpecs.push({ label: "Temperature", value: ks.maxTemperature.standard });
  }
  if (series) {
    heroSpecs.push({ label: dict.products.colMethod, value: series.cuttingMethod });
  }

  /* 頁內常駐比較（本頁型號 + 同切法最多 3 型） */
  const compareProducts = [product, ...related.slice(0, 3)];
  const compareRows = related.length > 0 ? buildCompareRows(compareProducts, dict) : [];

  const faqItems = buildProductFaqs(product, series, relatedApplications, dict);

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

      {/* ── 1. 開場區（白色舞台：型號 + 定位 + 關鍵規格 + 雙按鈕 + 渲染大圖） ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
          <nav className="text-sm text-text-secondary">
            <Link href={`/${lang}`} className="transition-colors hover:text-orange-text">
              {dict.common.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/products`} className="transition-colors hover:text-orange-text">
              {dict.nav.products}
            </Link>
            {series && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/${lang}/products/${series.slug}`}
                  className="transition-colors hover:text-orange-text"
                >
                  {series.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-text-primary">{product.model}</span>
          </nav>

          <Reveal mode="mount" stagger y={16} className="mt-10 text-center md:mt-14">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {series && (
                <span className="rounded-sm bg-orange-soft px-2.5 py-1 text-xs font-semibold text-orange-text">
                  {series.cuttingMethod}
                </span>
              )}
              {tierLabel && (
                <span className="rounded-sm bg-bg-secondary px-2.5 py-1 text-xs text-text-secondary">
                  {tierLabel}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-[clamp(2.5rem,2rem+1.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.01em] text-text-primary">
              {product.model}
            </h1>
            <p className="mt-2 text-lg text-text-secondary">{product.title}</p>
            {product.tagline && (
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
                {product.tagline}
              </p>
            )}

            {/* 關鍵規格橫排（DJI 式） */}
            {heroSpecs.length > 0 && (
              <div className="mt-8 flex flex-wrap items-stretch justify-center divide-x divide-border">
                {heroSpecs.slice(0, 3).map((spec) => (
                  <div key={spec.label} className="px-6 text-center md:px-10">
                    <p className="text-xl font-medium text-text-primary md:text-2xl">
                      {spec.value}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">{spec.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton href={quoteHref} size="lg">
                {dict.nav.getAQuote}
              </CTAButton>
              <PdfDownloadButton
                product={product}
                label={dict.products.downloadPdf}
                generatingLabel={dict.products.generatingPdf}
                errorLabel={dict.products.pdfFailed}
                className="border border-border-strong px-8 py-3.5 text-sm text-text-primary hover:border-orange hover:text-orange-text md:px-10"
              />
            </div>
            {pdfCatalog?.url && (
              <a
                href={pdfCatalog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-orange-text underline-offset-4 transition-colors hover:underline"
              >
                {dict.products.catalogFile}
              </a>
            )}

            {/* 渲染大圖置中；缺圖用中性留白圖位 */}
            <div className="mx-auto mt-12 w-full max-w-4xl pb-14 md:pb-16">
              {galleryImages.length > 0 ? (
                <ProductGallery images={galleryImages} />
              ) : (
                <div aria-hidden className="aspect-[16/9] w-full rounded-lg bg-bg-tertiary" />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Sticky 子導覽（Apple 式錨點） ─────────────────── */}
      <ProductSubnav
        model={product.model}
        labels={{
          overview: dict.products.tabOverview,
          specs: dict.products.tabSpecs,
          "3d": dict.products.tab3d,
          drawings: dict.products.tabDrawings,
        }}
        quoteHref={quoteHref}
        quoteLabel={dict.nav.getAQuote}
      />

      {/* ── 3. 應用敘事區（圖文交錯） ────────────────────────── */}
      <section id="overview" className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="sr-only">{dict.products.tabOverview}</h2>
          {product.description && (
            <div className="mx-auto max-w-3xl">
              <LexicalContent data={product.description} />
            </div>
          )}

          {highlights.length > 0 && (
            <div className="mt-16">
              <FeatureHighlights items={highlights} />
            </div>
          )}

          {relatedApplications.length > 0 && (
            <div className="mt-16 text-center">
              <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                {dict.products.relatedApplications}
              </h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {relatedApplications.map((app) => (
                  <Link
                    key={app.slug}
                    href={`/${lang}/applications/${app.slug}`}
                    className="rounded-sm bg-orange-soft px-3 py-1.5 text-sm font-medium text-orange-text transition-colors hover:bg-orange hover:text-white"
                  >
                    {app.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. 完整規格表（DJI 式左右兩欄長表，白底） ────────── */}
      <section id="specs" className="scroll-mt-28 bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
            {dict.products.specifications}
          </h2>
          <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-sm md:p-10">
            <table className="w-full text-sm">
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
                {[
                  ...(ks?.minSlitWidth?.standard
                    ? [{ id: "min-slit", label: dict.products.colMinSlit, value: ks.minSlitWidth.standard, note: ks.minSlitWidth.condition }]
                    : []),
                  ...(ks?.maxSpeed?.standard
                    ? [{ id: "speed", label: dict.products.colSpeed, value: ks.maxSpeed.standard, note: ks.maxSpeed.condition }]
                    : []),
                  ...(ks?.maxTemperature?.standard
                    ? [{ id: "temp", label: "Temperature", value: ks.maxTemperature.standard, note: ks.maxTemperature.condition }]
                    : []),
                  ...(product.detailedSpecs ?? []),
                ].map((spec) => (
                  <tr key={spec.id ?? spec.label} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="w-1/2 py-3.5 pr-4 text-left font-normal text-text-secondary"
                    >
                      {spec.label}
                    </th>
                    <td className="py-3.5 font-medium text-text-primary">
                      {spec.value}
                      {spec.note && (
                        <span className="ml-2 text-xs font-normal text-orange-text">
                          ({spec.note})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-xs text-text-secondary">
              {dict.common.lastUpdated}:{" "}
              {new Date(product.updatedAt).toLocaleDateString(
                lang === "zh-tw" ? "zh-TW" : "en-US",
                { year: "numeric", month: "long" },
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── 5a. 3D 檢視 ─────────────────────────────────────── */}
      <section id="3d" className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="text-center text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
            {dict.products.tab3d}
          </h2>
          <div className="mt-10">
            {model3d ? (
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
            )}
          </div>
        </div>
      </section>

      {/* ── 5b. 工程圖 ──────────────────────────────────────── */}
      <section id="drawings" className="scroll-mt-28 bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="text-center text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
            {dict.products.tabDrawings}
          </h2>
          <div className="mt-10 rounded-lg bg-white p-4 shadow-sm md:p-6">
            {drawings.length > 0 ? (
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
            )}
          </div>
        </div>
      </section>

      {/* ── 6. 頁內常駐比較（同切法型號） ────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
              {dict.products.compareHeading}
            </h2>
            <div className="mx-auto mt-10 max-w-5xl overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">
                  {dict.products.compareHeading} — {compareProducts.map((p) => p.model).join(", ")}
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-36 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary"
                    >
                      {dict.products.colModel}
                    </th>
                    {compareProducts.map((p, i) => (
                      <th key={p.slug} scope="col" className="px-3 py-3 text-left">
                        {i === 0 ? (
                          <span className="text-base font-medium text-text-primary">
                            {p.model}
                          </span>
                        ) : (
                          <Link
                            href={`/${lang}/products/model/${p.slug}`}
                            className="text-base font-medium text-text-primary transition-colors hover:text-orange-text"
                          >
                            {p.model}
                          </Link>
                        )}
                        <p className="mt-0.5 text-xs font-normal text-text-secondary">
                          {i === 0
                            ? dict.products.currentModel
                            : p.familyTier
                              ? (FAMILY_TIER_LABELS[p.familyTier] ?? p.familyTier)
                              : ""}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th
                        scope="row"
                        className="px-3 py-3 text-left align-top font-normal text-text-secondary"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={`${row.label}-${compareProducts[i].slug}`}
                          className={`px-3 py-3 align-top ${
                            row.best.has(i)
                              ? "font-semibold text-orange-text"
                              : "text-text-primary"
                          }`}
                        >
                          {value}
                          {row.best.has(i) && (
                            <span className="ml-1.5 rounded-sm bg-orange-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-text">
                              {dict.products.bestValue}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. 產品 FAQ（FAQPage JSON-LD 就地標記） ──────────── */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <FaqSection heading={dict.common.faqHeading} items={faqItems} className="" />
        </div>
      </section>

      {/* ── 8. 相關推薦（同切法型號 + Solutions 內鏈） ────────── */}
      {(related.length > 0 || solutions.length > 0) && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {related.length > 0 && (
              <>
                <h2 className="text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
                  {dict.products.relatedModels}
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${lang}/products/model/${p.slug}`}
                      className="group rounded-lg border border-border p-6 transition-colors hover:border-orange"
                    >
                      <p className="text-lg font-medium text-text-primary transition-colors group-hover:text-orange-text">
                        {p.model}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">{p.title}</p>
                      {p.familyTier && (
                        <p className="mt-3 text-xs text-text-secondary">
                          {FAMILY_TIER_LABELS[p.familyTier] ?? p.familyTier}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {solutions.length > 0 && (
              <div className={related.length > 0 ? "mt-14" : ""}>
                <h2 className="text-lg font-medium text-text-primary">
                  {dict.products.relatedSolutions}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {solutions.map((solution) => (
                    <li key={solution.slug}>
                      <Link
                        href={`/${lang}/solutions/${solution.slug}`}
                        className="group block rounded border border-border p-4 transition-colors hover:border-orange"
                      >
                        <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-orange-text">
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
        </section>
      )}
    </>
  );
}

/* ─── Shared bits ─────────────────────────────────────────── */

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
    <div className="flex h-72 flex-col items-center justify-center gap-5 rounded-lg border border-dashed border-border bg-bg-tertiary px-6 text-center">
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
