import type { CollectionConfig } from "payload";

import { seoField } from "./fields/seo";

/**
 * 現有官網診斷第 4 點：News 停更給買家「公司停業」的錯誤印象。
 * 上線時至少準備 3–5 篇（展覽、新產品、產業知識）。
 */
export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News Post", plural: "News" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedDate", "_status"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  defaultSort: "-publishedDate",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "展覽 Exhibition", value: "exhibition" },
        { label: "新產品 Product News", value: "product-news" },
        { label: "產業知識 Industry Knowledge", value: "industry-knowledge" },
        { label: "公司動態 Company News", value: "company-news" },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      admin: { description: "列表頁摘要，建議 100–160 字元" },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      admin: { description: "文中提及的產品（新產品發佈時使用）" },
    },
    seoField,
  ],
};
