import type { CollectionConfig } from "payload";

import { seoField } from "./fields/seo";
import { CUTTING_METHOD_OPTIONS } from "./Products";

/**
 * 對應 PLANNING.md 第六章「Applications 產業分類與對應矩陣 v2」：
 * 1 紙類 / 2 塑膠薄膜 / 3 不織布紡織 / 4 金屬箔 / 5 橡膠 /
 * 6 膠帶標籤 / 7 醫療材料 / 8 複合重磅材料 / 9 熱封切邊
 *
 * 每分類敘事結構（參考 DIENES）：痛點 → 切割方式選擇邏輯 → 對應 MT 型號
 */
export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Application", plural: "Applications" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["categoryNumber", "title", "cuttingMethods"],
    group: "Catalog",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "categoryNumber",
      type: "number",
      required: true,
      unique: true,
      min: 1,
      admin: { description: "第六章矩陣編號 1–9，也作為頁面排序" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "例如 Paper & Board、Plastic Film" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "例如 paper-board、plastic-film、metal-foils" },
    },
    {
      name: "coverage",
      type: "array",
      label: "涵蓋範圍（材料舉例）",
      fields: [
        {
          name: "material",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "例如 牛皮紙 Kraft Paper、銅箔 Copper Foil" },
        },
      ],
    },
    {
      name: "cuttingMethods",
      type: "select",
      hasMany: true,
      required: true,
      options: [...CUTTING_METHOD_OPTIONS],
      admin: { description: "此分類適用的切割方式（矩陣「切割方式」欄）" },
    },
    {
      name: "painPoints",
      type: "richText",
      localized: true,
      label: "痛點",
      admin: {
        description: "敘事開頭：此產業的切割痛點（例如不織布的粉塵、毛絮、脫紗）",
      },
    },
    {
      name: "selectionLogic",
      type: "richText",
      localized: true,
      label: "切割方式選擇邏輯",
      admin: {
        description:
          "例如不織布：Score 窄幅經濟 / Shear 高速高品質低粉塵 / Hot 化纖熔封",
      },
    },
    {
      name: "productRecommendations",
      type: "array",
      label: "對應刀組（依切割方式分組）",
      admin: {
        description: "矩陣「對應刀組」欄，例如紙類：Score → A110/A130/A160；Shear → A650/A850/A880",
      },
      fields: [
        {
          name: "cuttingMethod",
          type: "select",
          required: true,
          options: [...CUTTING_METHOD_OPTIONS],
        },
        {
          name: "products",
          type: "relationship",
          relationTo: "products",
          hasMany: true,
          required: true,
        },
        {
          name: "note",
          type: "text",
          localized: true,
          admin: { description: "補充說明，例如「重磅材料建議 A510/A170」" },
        },
      ],
    },
    {
      name: "selectorRules",
      type: "array",
      label: "選型器規則（材料 → 厚度 → 推薦型號）",
      admin: {
        description:
          "互動選型工具資料來源：符合材料 + 厚度區間時推薦對應型號",
      },
      fields: [
        {
          name: "materialLabel",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "選型器顯示的材料選項，例如 PE Film、Copper Foil" },
        },
        {
          name: "thicknessMin",
          type: "number",
          admin: { description: "最小厚度（µm），留空表示不限" },
        },
        {
          name: "thicknessMax",
          type: "number",
          admin: { description: "最大厚度（µm），留空表示不限" },
        },
        {
          name: "recommendedProducts",
          type: "relationship",
          relationTo: "products",
          hasMany: true,
          required: true,
        },
        {
          name: "note",
          type: "text",
          localized: true,
          admin: { description: "推薦理由，顯示於選型結果" },
        },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    seoField,
  ],
};
