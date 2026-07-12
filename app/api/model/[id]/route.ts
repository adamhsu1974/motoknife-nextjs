/**
 * GLB 代理路由 — 3D 模型不暴露直接檔案 URL：
 * 依 media id 查 Payload、驗證 mime 為 GLB，從上傳目錄串流回應，
 * Cache-Control: no-store 避免瀏覽器留下可下載的快取副本。
 */
import { readFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@payload-config";

import { MEDIA_DIR } from "@/lib/media-dir";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const payload = await getPayload({ config });

  let doc;
  try {
    doc = await payload.findByID({ collection: "media", id: numericId, depth: 0 });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (doc.mimeType !== "model/gltf-binary" || !doc.filename) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // filename 由 Payload 產生並驗證存在於 media 目錄內（防路徑跳脫）
  const filePath = path.resolve(MEDIA_DIR, doc.filename);
  if (!filePath.startsWith(MEDIA_DIR)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let file: Buffer;
  try {
    file = await readFile(filePath);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "no-store",
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
