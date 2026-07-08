"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Media, Product } from "@/lib/payload-types";
import { populated } from "@/lib/relations";
import { getSeriesInfo, FAMILY_TIER_LABELS } from "@/lib/series";
import { keySpecRows, materialTags } from "@/lib/product-display";
import { CompareBar, CompareModal } from "@/components/ProductCompare";

const METHOD_FILTERS = ["score-cut", "shear-cut", "half-cut", "hot-cut"] as const;
type MethodFilter = (typeof METHOD_FILTERS)[number];

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function cardEnter(e: React.MouseEvent<HTMLAnchorElement>) {
  if (prefersReducedMotion()) return;
  gsap.to(e.currentTarget, {
    y: -6,
    scale: 1.015,
    boxShadow: "0 14px 30px rgba(13, 13, 20, 0.12)",
    duration: 0.35,
    ease: "power2.out",
  });
}

function cardLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  if (prefersReducedMotion()) return;
  gsap.to(e.currentTarget, {
    y: 0,
    scale: 1,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    duration: 0.45,
    ease: "power2.out",
  });
}

interface ProductCatalogProps {
  lang: Locale;
  dict: Dictionary;
  products: Product[];
}

export default function ProductCatalog({ lang, dict, products }: ProductCatalogProps) {
  const [filter, setFilter] = useState<MethodFilter | "all">("all");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const holders = products.filter((p) => p.productType === "knife-holder");
  const visible =
    filter === "all" ? holders : holders.filter((p) => p.cuttingMethod === filter);
  const compareProducts = compareSlugs.flatMap(
    (slug) => holders.find((p) => p.slug === slug) ?? [],
  );

  const filterLabel = (slug: MethodFilter) => getSeriesInfo(slug)?.name ?? slug;

  function toggleCompare(slug: string) {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  }

  return (
    <div className={compareSlugs.length > 0 ? "pb-24" : undefined}>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {dict.products.filterAll} ({holders.length})
        </FilterChip>
        {METHOD_FILTERS.map((slug) => (
          <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            {filterLabel(slug)} ({holders.filter((p) => p.cuttingMethod === slug).length})
          </FilterChip>
        ))}
      </div>

      {/* Product cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <Link
            key={product.slug}
            href={`/${lang}/products/model/${product.slug}`}
            onMouseEnter={cardEnter}
            onMouseLeave={cardLeave}
            className="group relative flex flex-col rounded-lg bg-white p-6 shadow-sm will-change-transform"
          >
            {/* Compare checkbox */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(product.slug);
              }}
              aria-pressed={compareSlugs.includes(product.slug)}
              aria-label={`${dict.products.compare} ${product.model}`}
              className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-medium transition-colors ${
                compareSlugs.includes(product.slug)
                  ? "bg-orange text-white"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary"
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border text-[9px] leading-none ${
                  compareSlugs.includes(product.slug)
                    ? "border-white bg-white text-orange-text"
                    : "border-text-secondary/50"
                }`}
              >
                {compareSlugs.includes(product.slug) ? "✓" : ""}
              </span>
              {dict.products.compare}
            </button>

            {/* Thumbnail：有產品圖用 next/image，否則佔位 */}
            <ProductThumbnail product={product} />

            <div className="flex items-center gap-2">
              {product.cuttingMethod && (
                <span className="rounded-sm bg-orange-soft px-2 py-0.5 text-xs font-semibold text-orange-text">
                  {filterLabel(product.cuttingMethod)}
                </span>
              )}
              {product.familyTier && (
                <span className="rounded-sm bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary">
                  {FAMILY_TIER_LABELS[product.familyTier] ?? product.familyTier}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-xl font-medium text-text-primary">
              {product.model}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{product.title}</p>

            {/* Key specs */}
            <div className="mt-4 space-y-1.5 border-t border-border pt-4">
              {keySpecRows(product).map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-text-secondary">{spec.label}</span>
                  <span className="text-right font-medium text-text-primary">
                    {spec.value}
                    {spec.note && (
                      <span className="ml-1 text-xs font-normal text-orange-text">({spec.note})</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Material tags（相關應用分類） */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {materialTags(product)
                .slice(0, 4)
                .map((mat) => (
                  <span
                    key={mat}
                    className="rounded-sm bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary"
                  >
                    {mat}
                  </span>
                ))}
            </div>

            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-orange-text">
              {dict.products.viewDetails}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Compare bar + modal */}
      <CompareBar
        products={compareProducts}
        dict={dict}
        onRemove={toggleCompare}
        onClear={() => setCompareSlugs([])}
        onCompare={() => setIsCompareOpen(true)}
      />
      {isCompareOpen && compareProducts.length >= 2 && (
        <CompareModal
          products={compareProducts}
          lang={lang}
          dict={dict}
          onClose={() => setIsCompareOpen(false)}
        />
      )}
    </div>
  );
}

function ProductThumbnail({ product }: { product: Product }) {
  const cover = populated<Media>(product.images).find(
    (m) => m.mimeType?.startsWith("image/") && m.url,
  );

  if (cover?.url) {
    return (
      <div className="relative mb-5 h-40 overflow-hidden rounded bg-bg-tertiary">
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover"
        />
      </div>
    );
  }

  // Neutral image slot — 產品照到位後原位替換
  return <div aria-hidden className="mb-5 h-40 rounded bg-bg-tertiary" />;
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-orange text-white"
          : "bg-white text-text-secondary shadow-sm hover:text-text-primary"
      }`}
    >
      {children}
    </button>
  );
}
