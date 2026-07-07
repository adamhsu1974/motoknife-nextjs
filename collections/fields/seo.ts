import type { Field } from "payload";

export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: {
    description: "每頁獨立的 SEO 設定；留空時前台使用預設值",
  },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      localized: true,
      maxLength: 70,
      admin: { description: "建議 50–60 字元，包含目標關鍵字" },
    },
    {
      name: "metaDescription",
      type: "textarea",
      localized: true,
      maxLength: 170,
      admin: { description: "建議 140–160 字元，避免與其他頁面重複" },
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "社群分享縮圖（1200×630）" },
    },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "勾選後此頁不被搜尋引擎索引" },
    },
  ],
};
