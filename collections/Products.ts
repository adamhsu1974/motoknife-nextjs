import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

import { seoField } from "./fields/seo";

const MUTATING_OPS = new Set([
  "create",
  "update",
  "updateByID",
  "delete",
  "deleteByID",
]);

/**
 * 任何 Products 寫入(含拖曳排序、tagline 編輯、刪除)都清掉前台
 * 相關頁面的 ISR 快取,F5 立即反映。
 *
 * 用 route pattern + 'page' type 一次清所有動態路徑實例
 * (每個 series / model slug / lang 組合),不需一頁頁列。
 *
 * revalidatePath 只在 Next.js request context 內可用;從獨立 Node
 * script(例如 scripts/import-product-copy.ts)呼叫 payload.update()
 * 時會抛「static generation store missing」,靜默略過即可 —— 批次
 * 匯入場景不需要即時清快取,下次 request 或 revalidate=3600 到期
 * 自然會刷新。
 */
function revalidateAllProductPaths() {
  try {
    revalidatePath("/[lang]", "page");
    revalidatePath("/[lang]/products", "page");
    revalidatePath("/[lang]/products/[series]", "page");
    revalidatePath("/[lang]/products/model/[slug]", "page");
  } catch {
    /* 非 Next.js runtime,靜默略過 */
  }
}

/**
 * 型號家族（PLANNING.md 第六章）：
 * - Score Cut：A110 / A130 / A160 / B110 / C121（輕中型）＋ A140 / A170 / A510（重磅型）
 * - Shear Cut：A410 / A450（精密型，含金屬箔）＋ A650 / A850 / A880（通用型）
 * - Half Cut：A310 / A310H（醫療多層材料）
 * - Hot Cut：A710
 */
export const CUTTING_METHOD_OPTIONS = [
  { label: "Score Cut 壓切", value: "score-cut" },
  { label: "Shear Cut 剪切", value: "shear-cut" },
  { label: "Half Cut 半斷", value: "half-cut" },
  { label: "Hot Cut 熱切", value: "hot-cut" },
] as const;

export const FAMILY_TIER_OPTIONS = [
  { label: "輕型 Light Duty", value: "light-duty" },
  { label: "中型 Medium Duty", value: "medium-duty" },
  { label: "重磅型 Heavy Duty", value: "heavy-duty" },
  { label: "精密型 Precision", value: "precision" },
  { label: "通用型 General Purpose", value: "general" },
  { label: "醫療半斷 Medical Half-cut", value: "medical" },
  { label: "熱封切邊 Heat-sealed Edge", value: "heat-sealed" },
] as const;

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  orderable: true,
  admin: {
    useAsTitle: "model",
    defaultColumns: ["model", "cuttingMethod", "familyTier", "featured"],
    group: "Catalog",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterOperation: [
      ({ operation, result }) => {
        if (MUTATING_OPS.has(operation)) {
          revalidateAllProductPaths();
        }
        return result;
      },
    ],
  },
  fields: [
    {
      name: "model",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "型號，例如 MT-A110、MT-A310H、MT-A710" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL slug，例如 mt-a110" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "產品顯示名稱，例如 Pneumatic Score Cut Knife Holder",
      },
    },
    {
      name: "productType",
      type: "select",
      required: true,
      defaultValue: "knife-holder",
      options: [
        { label: "刀組 Knife Holder", value: "knife-holder" },
        { label: "刀片 Knife / Blade", value: "knife" },
        { label: "導桿 Guide Bar", value: "guide-bar" },
        { label: "配件 Accessory", value: "accessory" },
      ],
    },
    {
      name: "cuttingMethod",
      type: "select",
      options: [...CUTTING_METHOD_OPTIONS],
      admin: {
        description: "刀組必填；刀片/導桿/配件可留空",
        condition: (data) => data?.productType === "knife-holder",
      },
    },
    {
      name: "familyTier",
      type: "select",
      options: [...FAMILY_TIER_OPTIONS],
      admin: {
        description:
          "型號家族分級：Score 輕型 / 中型（A110/A130/A160/B110/C121）vs 重磅型（A140/A170/A510）；Shear 精密型（A410/A450）vs 通用型（A650/A850/A880）",
        condition: (data) => data?.productType === "knife-holder",
      },
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      admin: { description: "一句話賣點，顯示於產品卡" },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      admin: {
        description:
          "建議採 slittec 三段式結構：技術特點 → 解決什麼問題 → 適用材料",
      },
    },
    {
      name: "keySpecs",
      type: "group",
      label: "核心規格（產品卡數字化呈現）",
      admin: {
        description:
          "規格標示原則：雙值標示（standard 為保守值、max 為極限值 + 條件註記），避免保守值被拿去比對手極限值",
      },
      fields: [
        {
          name: "minSlitWidth",
          type: "group",
          label: "最小分切寬度",
          fields: [
            { name: "standard", type: "text", admin: { description: "例如 < 25mm" } },
            { name: "max", type: "text", admin: { description: "例如 < 13mm" } },
            {
              name: "condition",
              type: "text",
              localized: true,
              admin: { description: "極限值的條件註記，例如「特定材料 / 特殊刀片」" },
            },
          ],
        },
        {
          name: "maxSpeed",
          type: "group",
          label: "最大線速",
          fields: [
            { name: "standard", type: "text", admin: { description: "例如 20 m/min" } },
            { name: "max", type: "text", admin: { description: "例如 30 m/min" } },
            { name: "condition", type: "text", localized: true },
          ],
        },
        {
          name: "airPressure",
          type: "text",
          label: "氣壓範圍",
          admin: { description: "例如 3–6 kg/cm²" },
        },
        {
          name: "tolerance",
          type: "text",
          label: "精度",
          admin: { description: "例如 ±0.005mm" },
        },
        {
          name: "maxTemperature",
          type: "group",
          label: "加熱溫度（Hot Cut 專用）",
          fields: [
            { name: "standard", type: "text", admin: { description: "例如 600°C" } },
            { name: "max", type: "text", admin: { description: "例如 650°C" } },
            { name: "condition", type: "text", localized: true },
          ],
        },
      ],
    },
    {
      name: "detailedSpecs",
      type: "array",
      label: "完整規格表",
      labels: { singular: "Spec", plural: "Specs" },
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "value", type: "text", required: true },
        {
          name: "note",
          type: "text",
          localized: true,
          admin: { description: "條件註記（up to / max. 標示原則）" },
        },
      ],
    },
    {
      name: "applications",
      type: "relationship",
      relationTo: "applications",
      hasMany: true,
      admin: {
        description: "對應第六章產業分類矩陣（此型號適用的產業/材料分類）",
      },
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "pdfCatalog",
      type: "upload",
      relationTo: "media",
      admin: { description: "PDF 型錄下載" },
    },
    {
      name: "featureHighlights",
      type: "array",
      label: "Feature Highlights 圖文敘事",
      maxRows: 6,
      admin: {
        description: "產品頁 Overview 的交錯圖文區塊，建議 3–6 個（奇偶交錯排版）",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "heading",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "例如 Patented Design — One Step Ahead" },
        },
        {
          name: "body",
          type: "textarea",
          localized: true,
          admin: { description: "2–3 句說明" },
        },
      ],
    },
    {
      name: "technicalDrawings",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Technical Drawings / 工程圖（PNG）",
      admin: { description: "產品頁 Drawings tab 顯示，前台帶浮水印與防下載" },
    },
    {
      name: "drawingNotes",
      type: "text",
      localized: true,
      admin: { description: "工程圖適用版本或尺寸備註" },
    },
    {
      name: "model3d",
      type: "upload",
      relationTo: "media",
      label: "3D Model / 展示用 3D 模型（GLB）",
      admin: { description: "產品頁 3D View tab 顯示，透過 API 代理存取不暴露直接 URL" },
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "顯示於首頁產品分類快速入口" },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { description: "同分類內排序，數字小在前（保留給特殊置頂用；一般拖曳排序即可）" },
    },
    seoField,
  ],
};
