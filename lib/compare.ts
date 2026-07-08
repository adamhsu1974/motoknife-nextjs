import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Product } from "@/lib/payload-types";
import { getSeriesInfo } from "@/lib/series";
import { populated } from "@/lib/relations";

/**
 * 產品比較列資料邏輯 — ProductCompare（浮動比較彈窗）與
 * 型號頁「同切法比較」區塊共用。
 */

function detailedSpec(product: Product, labels: string[]): string {
  for (const label of labels) {
    const spec = product.detailedSpecs?.find((s) => s.label === label);
    if (spec) return spec.note ? `${spec.value} (${spec.note})` : spec.value;
  }
  return "—";
}

function withNote(value?: string | null, note?: string | null): string {
  if (!value) return "—";
  return note ? `${value} (${note})` : value;
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

export interface CompareRow {
  label: string;
  values: string[];
  best: Set<number>;
}

export function buildCompareRows(products: Product[], dict: Dictionary): CompareRow[] {
  const minSlit = products.map((p) =>
    withNote(p.keySpecs?.minSlitWidth?.standard, p.keySpecs?.minSlitWidth?.condition),
  );
  const speed = products.map((p) =>
    withNote(p.keySpecs?.maxSpeed?.standard, p.keySpecs?.maxSpeed?.condition),
  );
  const blade = products.map((p) => detailedSpec(p, ["Blade Diameter", "Blade"]));
  const materialCounts = products.map((p) => populated(p.applications).length);

  return [
    {
      label: dict.products.colMethod,
      values: products.map((p) =>
        p.cuttingMethod ? (getSeriesInfo(p.cuttingMethod)?.cuttingMethod ?? p.cuttingMethod) : "—",
      ),
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
      values: products.map((p) =>
        populated<{ title: string }>(p.applications)
          .map((a) => a.title)
          .join(", ") || "—",
      ),
      best: bestIndexes(materialCounts, "max"),
    },
  ];
}
