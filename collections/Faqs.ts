import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "page", "displayOrder"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "page",
      type: "select",
      required: true,
      options: [
        { label: "Products 頁", value: "products" },
        { label: "Applications 頁", value: "applications" },
      ],
      admin: { description: "FAQ 顯示在哪個頁面（含 FAQPage JSON-LD）" },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
