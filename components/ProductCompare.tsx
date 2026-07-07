"use client";

import { useEffect } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { PRODUCT_SERIES, type Product } from "@/lib/data/products";

/* ─── Spec extraction ─────────────────────────────────────── */

function getSpec(product: Product, labels: string[]): string {
  for (const label of labels) {
    const spec =
      product.specs.find((s) => s.label === label) ??
      product.keySpecs.find((s) => s.label === label);
    if (spec) return spec.note ? `${spec.value} (${spec.note})` : spec.value;
  }
  return "—";
}

function firstNumber(value: string): number | undefined {
  const match = value.match(/[\d.]+/);
  return match ? Number(match[0]) : undefined;
}

function lastNumber(value: string): number | undefined {
  const matches = value.match(/[\d.]+/g);
  return matches ? Number(matches[matches.length - 1]) : undefined;
}

/**
 * 優勢值判定規則（2026-07-07 GM 校正）：
 * - 最小分切寬度：數值最小者最佳（窄幅能力）
 * - 分條速度：最大者最佳（分切效率），取標示中的極限值（up to）
 * - 刀片直徑：最大者最佳（刀片壽命）
 * - 適用材料：數量最多者最佳（泛用性）
 */
function bestIndexes(values: (number | undefined)[], direction: "min" | "max"): Set<number> {
  const defined = values.filter((v): v is number => v !== undefined);
  if (defined.length < 2) return new Set();
  const best = direction === "min" ? Math.min(...defined) : Math.max(...defined);
  return new Set(values.flatMap((v, i) => (v === best ? [i] : [])));
}

interface CompareRow {
  label: string;
  values: string[];
  best: Set<number>;
}

function buildRows(products: Product[], dict: Dictionary): CompareRow[] {
  const methodOf = (p: Product) =>
    PRODUCT_SERIES.find((s) => s.slug === p.series)?.cuttingMethod ?? "—";

  const minSlit = products.map((p) => getSpec(p, ["Min. Slit Width"]));
  const speed = products.map((p) =>
    getSpec(p, ["Max. Line Speed", "Max. Speed", "Line Speed"]),
  );
  const blade = products.map((p) => getSpec(p, ["Blade Diameter", "Blade"]));

  return [
    {
      label: dict.products.colMethod,
      values: products.map(methodOf),
      best: new Set<number>(),
    },
    {
      label: dict.products.colMinSlit,
      values: minSlit,
      best: bestIndexes(minSlit.map(firstNumber), "min"),
    },
    {
      label: dict.products.colSpeed,
      values: speed,
      best: bestIndexes(speed.map(lastNumber), "max"),
    },
    {
      label: dict.products.colBlade,
      values: blade,
      best: bestIndexes(blade.map(firstNumber), "max"),
    },
    {
      label: dict.products.colMaterials,
      values: products.map((p) => p.materials.join(", ")),
      best: bestIndexes(products.map((p) => p.materials.length), "max"),
    },
  ];
}

/* ─── Floating compare bar ────────────────────────────────── */

interface CompareBarProps {
  products: Product[];
  dict: Dictionary;
  onRemove: (slug: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export function CompareBar({ products, dict, onRemove, onClear, onCompare }: CompareBarProps) {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white shadow-[0_-4px_20px_rgba(13,13,20,0.10)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8">
        <span className="text-sm font-semibold text-text-primary">
          {dict.products.compare} ({products.length}/4)
        </span>
        <div className="flex flex-1 flex-wrap gap-2">
          {products.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => onRemove(p.slug)}
              className="flex items-center gap-1.5 rounded-sm bg-bg-card px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-orange-soft"
              aria-label={`Remove ${p.model} from comparison`}
            >
              {p.model}
              <span className="text-text-secondary">×</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-text-secondary transition-colors hover:text-text-primary"
        >
          {dict.products.clearAll}
        </button>
        <button
          type="button"
          onClick={onCompare}
          disabled={products.length < 2}
          className="rounded bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {products.length < 2 ? dict.products.compareBarHint : dict.products.compareNow}
        </button>
      </div>
    </div>
  );
}

/* ─── Comparison modal ────────────────────────────────────── */

interface CompareModalProps {
  products: Product[];
  lang: Locale;
  dict: Dictionary;
  onClose: () => void;
}

export function CompareModal({ products, lang, dict, onClose }: CompareModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const rows = buildRows(products, dict);
  const quoteHref = `/${lang}/contact?models=${encodeURIComponent(
    products.map((p) => p.model).join(", "),
  )}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dict.products.compareTitle}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={dict.products.close}
        onClick={onClose}
        className="absolute inset-0 bg-hero-black/70 backdrop-blur-sm"
      />

      <div className="relative max-h-[85vh] w-full max-w-4xl overflow-auto rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-text-primary">
            {dict.products.compareTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
            aria-label={dict.products.close}
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 py-5">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr>
                <th className="w-36 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {dict.products.colModel}
                </th>
                {products.map((p) => (
                  <th key={p.slug} className="px-3 py-3 text-left">
                    <Link
                      href={`/${lang}/products/model/${p.slug}`}
                      className="font-heading text-base font-bold text-text-primary hover:text-orange"
                    >
                      {p.model}
                    </Link>
                    <p className="mt-0.5 text-xs font-normal text-text-secondary">{p.tier}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.label} className={rowIndex % 2 === 0 ? "bg-bg-card" : ""}>
                  <td className="px-3 py-3 align-top font-medium text-text-secondary">
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={`${row.label}-${products[i].slug}`}
                      className={`px-3 py-3 align-top ${
                        row.best.has(i)
                          ? "font-semibold text-orange"
                          : "text-text-primary"
                      }`}
                    >
                      {value}
                      {row.best.has(i) && (
                        <span className="ml-1.5 rounded-sm bg-orange-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange">
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

        {/* Footer CTA */}
        <div className="sticky bottom-0 flex flex-col items-center justify-between gap-3 border-t border-border bg-white px-6 py-4 sm:flex-row">
          <p className="text-xs text-text-secondary">{dict.products.maxCompareNote}</p>
          <Link
            href={quoteHref}
            className="rounded bg-orange px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            {dict.products.compareQuote}
          </Link>
        </div>
      </div>
    </div>
  );
}
