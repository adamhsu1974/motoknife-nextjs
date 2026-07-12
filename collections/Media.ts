import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";

import type { CollectionConfig } from "payload";

import { MEDIA_DIR } from "../lib/media-dir";

/** 副檔名 → Content-Type（涵蓋 upload.mimeTypes 允許的類型與圖片尺寸變體） */
const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".glb": "model/gltf-binary",
  ".mp4": "video/mp4",
};

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
    // 自行供檔：Payload 內建 getFile 的路徑檢查（resolvedDir + path.sep 前綴比對）
    // 在 staticDir 為磁碟機根目錄（如 M:\，path.resolve 後自帶結尾反斜線）時
    // 必定失敗回 400 Invalid filename，故在 fallback 之前以 handler 接手。
    // Payload 會先跑 checkFileAccess 再進 handlers，存取控制不受影響。
    handlers: [
      async (_req, { params: { filename } }) => {
        // 拒絕含路徑分隔或跳脫的檔名
        if (!filename || path.basename(filename) !== filename) {
          return Response.json(
            { errors: [{ message: "Invalid filename." }] },
            { status: 400 },
          );
        }

        const filePath = path.join(MEDIA_DIR, filename);
        let size: number;
        try {
          size = (await stat(filePath)).size;
        } catch {
          return Response.json(
            { errors: [{ message: "Not found." }] },
            { status: 404 },
          );
        }

        const mimeType =
          MIME_BY_EXT[path.extname(filename).toLowerCase()] ??
          "application/octet-stream";
        const body = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
        return new Response(body, {
          headers: {
            "Content-Type": mimeType,
            "Content-Length": String(size),
            ...(mimeType === "image/svg+xml"
              ? { "Content-Security-Policy": "script-src 'none'" }
              : {}),
          },
        });
      },
    ],
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
