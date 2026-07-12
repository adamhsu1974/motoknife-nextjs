import type { CollectionConfig } from "payload";

import { MEDIA_DIR } from "../lib/media-dir";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  access: {
    read: () => true,
  },
  upload: {
    // 不放 public/：檔案一律經 Payload /api/media/file/* 或代理路由供應，
    // GLB 才能做到不暴露可直接下載的靜態 URL
    // 目錄由 MEDIA_DIR 環境變數決定（NAS 集中存放），未設定則用專案內 media/
    staticDir: MEDIA_DIR,
    // 產品圖三種尺寸（維持原始長寬比）
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 800 },
      { name: "large", width: 1200 },
    ],
    mimeTypes: ["image/*", "application/pdf", "model/gltf-binary", "video/mp4"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "圖片替代文字（SEO / 無障礙）" },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
    },
  ],
};
