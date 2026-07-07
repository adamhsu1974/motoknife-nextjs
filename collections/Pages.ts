import type { Block, CollectionConfig } from "payload";

import { seoField } from "./fields/seo";

const contentBlock: Block = {
  slug: "content",
  labels: { singular: "Content", plural: "Content Blocks" },
  fields: [
    { name: "heading", type: "text", localized: true },
    { name: "body", type: "richText", localized: true, required: true },
  ],
};

const statsBlock: Block = {
  slug: "stats",
  labels: { singular: "Stats", plural: "Stats Blocks" },
  fields: [
    { name: "heading", type: "text", localized: true },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          admin: { description: "例如 35+、50+、±0.005mm" },
        },
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "例如 Years of Precision、Countries Served" },
        },
      ],
    },
  ],
};

const timelineBlock: Block = {
  slug: "timeline",
  labels: { singular: "Timeline", plural: "Timeline Blocks" },
  fields: [
    { name: "heading", type: "text", localized: true },
    {
      name: "milestones",
      type: "array",
      required: true,
      fields: [
        { name: "year", type: "text", required: true },
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "textarea", localized: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};

const galleryBlock: Block = {
  slug: "gallery",
  labels: { singular: "Gallery", plural: "Gallery Blocks" },
  fields: [
    { name: "heading", type: "text", localized: true },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
    },
  ],
};

const ctaBlock: Block = {
  slug: "cta",
  labels: { singular: "CTA", plural: "CTA Blocks" },
  fields: [
    { name: "heading", type: "text", required: true, localized: true },
    { name: "body", type: "textarea", localized: true },
    { name: "buttonLabel", type: "text", required: true, localized: true },
    {
      name: "buttonLink",
      type: "text",
      required: true,
      admin: { description: "站內路徑，例如 /contact" },
    },
  ],
};

/**
 * 通用頁面內容（Home / About / Contact 等 6 頁架構的靜態內容區塊）。
 * Products / Applications / Distributors / News 由各自 collection 驅動。
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
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
      admin: { description: "home / about / contact ..." },
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "heading",
          type: "text",
          localized: true,
          admin: {
            description:
              "例如 Precision Slitting Solutions — Made in Taiwan Since 1990",
          },
        },
        { name: "subheading", type: "textarea", localized: true },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "ctaLabel", type: "text", localized: true },
        { name: "ctaLink", type: "text" },
      ],
    },
    {
      name: "sections",
      type: "blocks",
      blocks: [contentBlock, statsBlock, timelineBlock, galleryBlock, ctaBlock],
    },
    seoField,
  ],
};
