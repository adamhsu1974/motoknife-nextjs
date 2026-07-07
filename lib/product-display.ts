import type { Application, Product } from "@/lib/payload-types";
import { populated } from "@/lib/relations";

/** 產品卡顯示的關鍵規格（keySpecs group → 顯示列，最多 3 列） */
export function keySpecRows(product: Product): { label: string; value: string; note?: string }[] {
  const ks = product.keySpecs;
  if (!ks) return [];
  const rows: { label: string; value: string; note?: string }[] = [];
  if (ks.minSlitWidth?.standard) {
    rows.push({
      label: "Min. Slit Width",
      value: ks.minSlitWidth.standard,
      note: ks.minSlitWidth.condition ?? ks.minSlitWidth.max ?? undefined,
    });
  }
  if (ks.maxSpeed?.standard) {
    rows.push({
      label: "Max. Speed",
      value: ks.maxSpeed.standard,
      note: ks.maxSpeed.condition ?? undefined,
    });
  }
  if (ks.airPressure) rows.push({ label: "Air Pressure", value: ks.airPressure });
  if (ks.maxTemperature?.standard) {
    rows.push({
      label: "Temperature",
      value: ks.maxTemperature.standard,
      note: ks.maxTemperature.condition ?? undefined,
    });
  }
  if (rows.length < 3 && ks.tolerance) {
    rows.push({ label: "Tolerance", value: ks.tolerance });
  }
  return rows.slice(0, 3);
}

/** 產品卡材料標籤 = populated applications 標題 */
export function materialTags(product: Product): string[] {
  return populated<Application>(product.applications).map((a) => a.title);
}
