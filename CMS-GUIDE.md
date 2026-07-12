# CMS-GUIDE.md — Payload CMS 後台操作手冊

> **文件目的**:MOTOKNIFE 官網後台(Payload CMS)的內容管理手冊。
> 說明每個 Collection 的欄位意義、填寫方式、以及填寫後在前台網站的呈現效果。
> 給日後負責維護網站內容的同仁(不需程式背景)閱讀。
>
> **維護規則**:每次 CMS schema 變更(即每次 `npx payload migrate:create`)
> 後,必須同步更新本文件對應章節。此規則亦記錄於 PROGRESS.md、CLAUDE.md 與
> Notion 多機操作手冊。
>
> **最後更新**:2026-07-12(migrations 基準化,初版骨架建立)

---

## 0. 快速上手

### 登入後台
- 網址:`http://localhost:3000/admin`(開發)/ `https://www.motoknife.com/admin`(正式,上線後)
- 帳號:三機共用 admin 帳號(帳密存放位置見 Notion 多機操作手冊)
- ⚠️ 上線前必須更換 admin 密碼(見 PROGRESS.md pre-launch checklist)

### 基本概念
- **Collection**:一種內容類型(如「產品」「媒體檔案」),每筆內容是一個 entry
- **兩種操作的區分**:
  - **輸入內容**(日常):在後台新增產品、上傳圖片、改文字——只是往資料庫填資料,
    不需要任何工程操作
  - **修改 collection 定義**(偶爾):改 `collections/` 下的程式碼、增刪欄位——
    這是動「表格結構」,必須走 migration 流程(見附錄 B),通常透過 Claude Code 進行
- **上傳圖片**:一律透過 Media collection 上傳,實體檔案存於 NAS 共享資料夾
  (Windows 為 `M:\`,Mac 為 `/Volumes/motoknife-media`),三台機器即刻同步
- **儲存後生效**:前台使用 Next.js,內容儲存後重新整理頁面即可看到
  (正式環境視快取設定,最多延遲數分鐘)

---

<!-- ============================================================
  以下各 Collection 章節為骨架模板。
  請用 Claude Code 在 repo 內執行以下指令填充實際內容:

  「請讀取 collections/ 下所有 collection 定義,
    依照 CMS-GUIDE.md 既有章節格式,為每個 collection 填寫:
    1. 用途說明(一句話)
    2. 欄位表格:欄位名稱|型別|必填?|填寫說明|前台呈現位置
    3. 填寫範例(以 MT-A110 或實際產品為例)
    4. 常見錯誤與注意事項」
  ============================================================ -->

## 1. Products(產品)

**用途**:(待填——一句話說明)

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| (待填) | | | | |

### 填寫範例
(待填——以 MT-A110 為例走一遍完整輸入流程)

### 注意事項
- (待填——例:型號一律保留 MT- 前綴;規格 ±0.005mm 只放 specs tab,不放首頁文案)

---

## 2. Media(媒體檔案)

**用途**:(待填)

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| (待填) | | | | |

### 注意事項
- 實體檔案存於 NAS `motoknife-media` 共享資料夾(透過 MEDIA_DIR 環境變數)
- (待填——建議檔名規則、圖片尺寸/格式建議、透明 PNG 使用時機等)

---

## 3.(其他 Collections——依實際 schema 增補)

<!-- 每個 collection 一個章節,格式同上 -->

---

## 附錄 A:內容填寫的品牌準則(摘自 PROGRESS.md 品牌決策)

- 信任支柱:Since 1990 / 50+ Countries / In-house Full Process / 3-Day Dispatch
- 首頁不出現價格訴求
- ±0.005mm 精度僅出現在產品 specs tab
- Mazak / 機械手臂照片僅用於 About 頁
- MT-A710 Hot Cut <13mm slit width 為對 DIENES(<25mm)的競爭差異點,可強調
- 術語:「Knife Holder」兩個字分開寫;產品型號保留 MT- 前綴(SEO)

## 附錄 B:schema 變更流程(工程端)

```bash
# 修改 collections/ 下的 collection 定義後:
npx payload migrate:create <描述性名稱>
npx payload migrate          # 全部機器只需執行一次
git add migrations/ collections/ 等
git commit && git push
# 然後更新本文件對應章節!
```

詳見 Notion「MOTOKNIFE 官網開發 — 多機操作手冊」的 Migrations 模式章節。
