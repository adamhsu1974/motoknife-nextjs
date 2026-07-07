"use client";

import { useState } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { PRODUCTS, PRODUCT_SERIES, type SeriesSlug } from "@/lib/data/products";

const METHOD_FILTERS: SeriesSlug[] = ["score-cut", "shear-cut", "half-cut", "hot-cut"];

interface ProductCatalogProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ProductCatalog({ lang, dict }: ProductCatalogProps) {
  const [filter, setFilter] = useState<SeriesSlug | "all">("all");

  const holders = PRODUCTS.filter((p) => METHOD_FILTERS.includes(p.series));
  const visible = filter === "all" ? holders : holders.filter((p) => p.series === filter);

  const filterLabel = (slug: SeriesSlug) =>
    PRODUCT_SERIES.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {dict.products.filterAll} ({holders.length})
        </FilterChip>
        {METHOD_FILTERS.map((slug) => (
          <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            {filterLabel(slug)} ({holders.filter((p) => p.series === slug).length})
          </FilterChip>
        ))}
      </div>

      {/* Product cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <Link
            key={product.slug}
            href={`/${lang}/products/model/${product.slug}`}
            className="group flex flex-col rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Thumbnail placeholder */}
            <div className="mb-5 flex h-40 items-center justify-center rounded bg-bg-card">
              <span className="font-heading text-2xl font-bold text-text-secondary/20">
                {product.model}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-sm bg-orange-soft px-2 py-0.5 text-xs font-semibold text-orange">
                {filterLabel(product.series)}
              </span>
              <span className="rounded-sm bg-bg-card px-2 py-0.5 text-xs text-text-secondary">
                {product.tier}
              </span>
            </div>

            <h3 className="mt-3 font-heading text-xl font-bold text-text-primary">
              {product.model}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{product.name}</p>

            {/* Key specs */}
            <div className="mt-4 space-y-1.5 border-t border-border pt-4">
              {product.keySpecs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-text-secondary">{spec.label}</span>
                  <span className="text-right font-medium text-text-primary">
                    {spec.value}
                    {spec.note && (
                      <span className="ml-1 text-xs font-normal text-orange">({spec.note})</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Material tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.materials.slice(0, 4).map((mat) => (
                <span
                  key={mat}
                  className="rounded-sm bg-bg-card px-2 py-0.5 text-xs text-text-secondary"
                >
                  {mat}
                </span>
              ))}
            </div>

            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-orange">
              {dict.products.viewDetails}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
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
