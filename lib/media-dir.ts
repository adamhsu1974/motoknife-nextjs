import path from "path";

/**
 * Media 實體檔案存放目錄。
 *
 * 讀 MEDIA_DIR 環境變數以支援集中存放於 NAS 共享資料夾（三機共用）；
 * 未設定時 fallback 到專案內 media/（本機模式，向下相容）。
 *
 * 一律經 path.resolve 正規化，處理 Windows 反斜線與相對路徑：
 *   MEDIA_DIR=M:\                    → M:\（Windows 掛載網路磁碟機）
 *   MEDIA_DIR=/Volumes/motoknife-media → 該路徑（Mac SMB 掛載）
 *   未設定                            → <cwd>/media
 *
 * Payload upload.staticDir 與 GLB 代理路由共用此值，確保寫入/讀取一致。
 */
export const MEDIA_DIR = process.env.MEDIA_DIR
  ? path.resolve(process.env.MEDIA_DIR)
  : path.resolve(process.cwd(), "media");
