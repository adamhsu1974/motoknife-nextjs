# CMS-GUIDE.md — Payload CMS 後台操作手冊

> **文件目的**:MOTOKNIFE 官網後台(Payload CMS)的內容管理手冊。
> 說明每個 Collection 的欄位意義、填寫方式、以及填寫後在前台網站的呈現效果。
> 給日後負責維護網站內容的同仁(不需程式背景)閱讀。
>
> **維護規則**:每次 CMS schema 變更(即每次 `npx payload migrate:create`)
> 後,必須同步更新本文件對應章節。此規則亦記錄於 PROGRESS.md、CLAUDE.md 與
> Notion 多機操作手冊。
>
> **最後更新**:2026-07-12(依 collections/ 實際 schema 填充全部章節)

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
- **儲存後生效**:前台使用 Next.js ISR(每 3600 秒重新驗證),內容儲存後
  開發環境重新整理即可看到;正式環境最多延遲約 1 小時

### 多語系(🌐 標記)
- 欄位標 🌐 者為多語欄位:後台右上角可切換 **English / 繁體中文** 分別填寫
- 未填 zh-tw 時前台自動 fallback 顯示英文(Phase 2 翻譯前 zh-tw 可先留空)
- 沒有 🌐 的欄位(型號、slug、數字、圖片)兩種語言共用同一個值

### 草稿與發佈(Draft / Publish)
- **Products / Applications / News / Pages** 四個 collection 有版本機制:
  按「Save Draft」只存草稿,**前台看不到**;要按「**Publish**」才會上線
- Distributors / FAQs / Media 沒有草稿,儲存即生效

### 後台選單分組
| 分組 | Collections |
|------|-------------|
| Catalog | Products、Applications |
| Network | Distributors |
| Content | News、Pages、FAQs |
| (未分組) | Media、Users |

---

## 1. Products(產品)

**用途**:全部產品型號的單一資料來源——驅動產品總覽(`/products`)、六個系列頁
(`/products/[series]`)、型號詳情頁(`/products/model/[slug]`)、產品比較、規格 PDF 與首頁產品入口。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| model | 文字 | ✅ | 型號,**保留 MT- 前綴**(SEO),例:`MT-A110`。不可重複 | 全站產品標題、產品卡、比較表、PDF |
| slug | 文字 | ✅ | URL 用小寫,例:`mt-a110`。不可重複,發佈後勿改(會斷連結) | 型號頁網址 `/products/model/mt-a110` |
| title 🌐 | 文字 | ✅ | 產品顯示名稱,例:`Pneumatic Score Cut Knife Holder`(**Knife Holder 兩字分開寫**) | 型號頁 H1、產品卡副標 |
| productType | 下拉 | ✅ | 刀組 knife-holder / 刀片 knife / 導桿 guide-bar / 配件 accessory,預設刀組 | 決定歸入哪個系列頁(knives / guide-bar 系列頁依此篩選) |
| cuttingMethod | 下拉 | 刀組必填 | Score / Shear / Half / Hot Cut。僅 productType = 刀組時顯示 | 決定歸入哪個切法系列頁、產品篩選器 |
| familyTier | 下拉 | — | 型號家族分級(輕型 / 中型 / 重磅型 / 精密型 / 通用型 / 醫療半斷 / 熱封切邊)。原 `light-medium` 於 2026-07-14 拆分為 `light-duty` + `medium-duty` | 系列頁內的家族分組 |
| tagline 🌐 | 文字 | — | 一句話賣點 | 產品卡副標 |
| description 🌐 | richText | — | **slittec 三段式**:技術特點 → 解決什麼問題 → 適用材料 | 型號頁 Overview 段 |
| keySpecs | 群組 | — | 核心規格,見下表 | 產品卡數字化呈現、型號頁 Specs、比較表 |
| detailedSpecs | 陣列 | — | 完整規格表:label 🌐 + value + note 🌐(條件註記) | 型號頁 Specs 錨點段、規格 PDF |
| applications | 關聯(多) | — | 此型號適用的產業分類(第六章矩陣) | 型號頁「適用應用」連結區 |
| images | 上傳(多) | — | 產品圖多角度,第一張為主圖 | 產品卡封面、型號頁圖庫(主圖+縮圖切換) |
| pdfCatalog | 上傳 | — | PDF 型錄檔 | 型號頁型錄下載按鈕 |
| featureHighlights | 陣列(≤6) | — | 交錯圖文:image + heading 🌐 + body 🌐,建議 3–6 個 | 型號頁 Overview 的奇偶交錯圖文區 |
| technicalDrawings | 上傳(多) | — | 工程圖 PNG | 型號頁 Drawings 段(前台自動加浮水印、防下載) |
| drawingNotes 🌐 | 文字 | — | 工程圖適用版本/尺寸備註 | Drawings 段說明文字 |
| model3d | 上傳 | — | GLB 格式 3D 模型 | 型號頁 3D View 段(經 API 代理,不暴露下載 URL) |
| relatedProducts | 關聯(多) | — | 相關型號(不可選自己) | 型號頁「相關型號」區 |
| featured | 勾選 | — | ⚠️ 目前前台尚未讀取此欄位(預留) | — |
| displayOrder | 數字 | — | 手動強制置頂用,小在前,預設 0(一般不填,拖曳排序即可) | 產品總覽/系列頁排序第一層 |
| _order | (系統) | — | Payload `orderable: true` 產生,**後台列表左側⋮⋮直接拖曳** | 產品總覽/系列頁排序第二層(displayOrder 相同時) |
| seo | 群組 | — | 見附錄 C | `<title>`、meta description、og:image |

### keySpecs 子欄位(雙值標示原則)

| 子欄位 | 說明 |
|--------|------|
| minSlitWidth | 最小分切寬度:standard(保守值,例 `< 25mm`)+ max(極限值,例 `< 13mm`)+ condition 🌐(條件註記,例「特定材料 / 特殊刀片」) |
| maxSpeed | 最大線速:standard / max / condition 🌐,同上結構 |
| airPressure | 氣壓範圍,例 `3–6 kg/cm²` |
| tolerance | 精度,例 `±0.005mm`(**只放這裡與 specs,不放首頁文案**) |
| maxTemperature | 加熱溫度(Hot Cut 專用):standard / max / condition 🌐 |

> **為什麼雙值**:standard 為保守值、max 為極限值+條件。避免我們的保守值
> 被客戶拿去比對手的極限值(PLANNING.md 第六章規格標示原則)。

### 填寫範例(MT-A110 完整流程)

1. Products → Create New
2. model:`MT-A110`,slug:`mt-a110`,productType:`刀組 Knife Holder`
3. cuttingMethod:`Score Cut 壓切`,familyTier:`輕型 Light Duty`
4. title(EN):`Pneumatic Score Cut Knife Holder`
5. tagline(EN):一句賣點,例 `Economical slitting for paper and board`
6. description:三段式——技術特點(氣動壓切、快速換刀)→ 解決問題(窄幅經濟分切)→ 適用材料(紙類、膠帶)
7. keySpecs:minSlitWidth standard `< 25mm`;airPressure `3–6 kg/cm²`;tolerance 留空(A110 非精密型就不填)
8. detailedSpecs:逐列填 label/value,有條件的加 note(例 `up to 30 m/min` 註「特殊刀片」)
9. images:選 Media 已上傳的產品圖(先去 Media 上傳,見第 7 章)
10. applications:勾 `Paper & Board`、`Tapes & Labels` 等適用分類
11. featureHighlights:3 個起,每個一張圖 + 標題 + 2–3 句
12. 按 **Publish**(不是 Save Draft),到 `/en/products/model/mt-a110` 檢查

### 注意事項
- 型號一律保留 **MT-** 前綴;「Knife Holder」兩個字分開寫
- ±0.005mm 精度只出現在 specs,不寫進 tagline / 首頁文案
- MT-A710 的 `< 13mm` 最小分切寬度是對 DIENES(< 25mm)的競爭差異點,放 max 值並加條件註記
- slug 發佈後不要改——已被外部收錄的連結會 404(改了就需要工程端做 301)
- 刪除產品前先確認沒有 Applications / News / 其他產品關聯到它

---

## 2. Applications(應用場景)

**用途**:9 大產業分類(PLANNING.md 第六章矩陣),驅動 `/applications` 列表、
`/applications/[slug]` 分類頁與互動選型器,也是首頁應用入口的資料來源。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| categoryNumber | 數字 | ✅ | 矩陣編號 1–9,不可重複:1 紙類/2 塑膠薄膜/3 不織布紡織/4 金屬箔/5 橡膠/6 膠帶標籤/7 醫療材料/8 複合重磅材料/9 熱封切邊 | 列表排序 |
| title 🌐 | 文字 | ✅ | 例 `Paper & Board`、`Plastic Film` | 分類頁 H1、列表卡片、首頁入口 |
| slug | 文字 | ✅ | 例 `paper-board`、`metal-foils`,不可重複 | 網址 `/applications/paper-board` |
| coverage | 陣列 | — | 材料舉例,每列一個 material 🌐,例 `牛皮紙 Kraft Paper` | 分類頁涵蓋範圍列表 |
| cuttingMethods | 下拉(多) | ✅ | 此分類適用的切割方式(矩陣「切割方式」欄) | 分類頁切法標籤、篩選 |
| painPoints 🌐 | richText | — | 敘事開頭:產業切割痛點(例:不織布的粉塵、毛絮、脫紗) | 分類頁敘事第一段 |
| selectionLogic 🌐 | richText | — | 切割方式選擇邏輯(例:Score 窄幅經濟 / Shear 高速低粉塵 / Hot 化纖熔封) | 分類頁敘事第二段 |
| productRecommendations | 陣列 | — | 對應刀組,依切法分組:cuttingMethod + products(關聯多筆)+ note 🌐 | 分類頁「對應 MT 型號」區 |
| selectorRules | 陣列 | — | **選型器資料來源**,見下表 | `/applications` 互動選型器 |
| heroImage | 上傳 | — | 分類主視覺 | 分類頁 hero、列表卡片 |
| seo | 群組 | — | 見附錄 C | meta 標籤 |

### selectorRules 子欄位(選型器規則)

| 子欄位 | 說明 |
|--------|------|
| materialLabel 🌐 | 選型器顯示的材料選項,例 `PE Film`、`Copper Foil` |
| thicknessMin / thicknessMax | 厚度區間(µm),留空表示不限 |
| recommendedProducts | 符合材料+厚度時推薦的型號(必填,關聯多筆) |
| note 🌐 | 推薦理由,顯示於選型結果 |

### 注意事項
- 敘事結構固定為 DIENES 框架:**痛點 → 選擇邏輯 → 對應型號**,三段都填才完整
- selectorRules 的厚度區間不要留出「無人接手」的空洞(例:min 50 的下一條從 80 開始,50–80 就查無結果)
- 9 個分類應全部建立且各自 Publish;缺一個,首頁入口與選型器的該分類就消失

---

## 3. Distributors(全球代理商)

**用途**:驅動 `/distributors` 互動地圖與詢價策略:**有代理商的國家保護代理商**
(地圖顯示代理商資訊),**無代理商的國家直接接單**(顯示詢價表單)。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| companyName | 文字 | ✅ | 代理商公司名 | 地圖點擊後的資訊卡 |
| countryCode | 文字 | ✅ | **ISO 3166-1 alpha-2 大寫國碼**,例 `TW`、`DE`、`IN`(小寫會自動轉大寫)。地圖以此比對國家 | 地圖著色與比對的 key |
| countryName 🌐 | 文字 | ✅ | 國家顯示名,例 `Germany` / `德國` | 地圖 tooltip、手機版國家下拉 |
| region | 下拉 | ✅ | 亞太 / 歐洲 / 北美 / 中南美 / 中東非洲 | 地圖區域分組 |
| coverageNote 🌐 | 文字 | — | 服務範圍備註,例「僅北印度」 | 資訊卡補充說明 |
| contact | 群組 | — | person / email / phone / website / address | 資訊卡聯絡資訊 |
| logo | 上傳 | — | 代理商 logo | 資訊卡 |
| showContactPublicly | 勾選 | — | 預設勾。**取消**後地圖只顯示「本地區由代理商服務」並轉導詢價表單(由我方轉介) | 控制資訊卡顯示模式 |
| active | 勾選 | — | 預設勾。**取消**後該筆不出現,該國視同無代理商(詢價直接進來) | 控制是否納入地圖 |
| displayOrder | 數字 | — | 同國多代理商時的排序 | 資訊卡列表順序 |

### 注意事項
- countryCode 填錯地圖就對不到國家——填之前確認 ISO 國碼(TW 台灣、DE 德國、IN 印度、VN 越南)
- 同一國家可以有多筆代理商,前台會依國碼自動分組
- 終止合作用 **active 取消勾選** 即可,不必刪資料(保留歷史)
- 此 collection 無草稿機制,**儲存即生效**
- 智慧詢價表單(`/contact`)也依國家判斷是否轉介代理商,資料來源同這裡

---

## 4. News(消息)

**用途**:驅動 `/news` 列表與 `/news/[slug]` 文章頁。News 停更會給買家
「公司停業」的錯誤印象(舊站診斷第 4 點)——上線時至少 3–5 篇,之後持續更新。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| title 🌐 | 文字 | ✅ | 文章標題 | 列表卡片、文章 H1、Article JSON-LD |
| slug | 文字 | ✅ | 英文小寫連字號,不可重複 | 網址 `/news/[slug]` |
| category | 下拉 | ✅ | 展覽 / 新產品 / 產業知識 / 公司動態 | 列表分類標籤 |
| publishedDate | 日期 | ✅ | 發佈日(列表依此新到舊排序) | 列表與文章頁日期 |
| excerpt 🌐 | 多行文字 | — | 摘要,建議 100–160 字元 | 列表卡片摘要、meta description fallback |
| content 🌐 | richText | ✅ | 內文;**H2/H3 標題會自動生成側邊目錄錨點** | 文章內文 + 側邊目錄 |
| coverImage | 上傳 | — | 封面圖 | 列表卡片、文章 hero、og:image |
| relatedProducts | 關聯(多) | — | 文中提及的產品(新產品發佈時使用) | 文章末端產品連結卡 |
| seo | 群組 | — | 見附錄 C | meta 標籤 |

### 注意事項
- 有草稿機制:寫一半存 Draft,確認後 **Publish** 才上線
- 內文標題請用 richText 的 Heading 2 / Heading 3(不要用粗體大字假裝標題),側邊目錄才會生成
- 展覽文附展位資訊與代理商連結;新產品文記得掛 relatedProducts

---

## 5. Pages(通用頁面)

**用途**:6 頁主架構(Home / About / Contact 等)的靜態內容區塊,採積木式
(blocks)組合:hero + 任意排列的 content / stats / timeline / gallery / cta 區塊。

> ⚠️ **現況**:前台目前尚未讀取 Pages collection(首頁等頁面內容暫由
> `/messages/[lang].json` i18n 字串與程式碼驅動)。本 collection 為預留,
> 接線後以下欄位才會生效;屆時請回來更新本章節。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置(接線後) |
|------|------|:----:|----------|--------------|
| title 🌐 | 文字 | ✅ | 頁面標題 | 頁面 H1 |
| slug | 文字 | ✅ | `home` / `about` / `contact` … | 對應路由 |
| hero | 群組 | — | heading 🌐 + subheading 🌐 + image + video(mp4,image 作 poster)+ ctaLabel 🌐 + ctaLink | 頁首大圖區 |
| sections | blocks | — | 五種區塊自由排列,見下表 | 頁面主體 |
| seo | 群組 | — | 見附錄 C | meta 標籤 |

### sections 可用區塊

| 區塊 | 欄位 | 用途 |
|------|------|------|
| content | heading 🌐 + body 🌐(richText) | 一般圖文段落 |
| stats | heading 🌐 + items(value + label 🌐) | 信任數字,例 `35+ Years of Precision`、`50+ Countries Served` |
| timeline | heading 🌐 + milestones(year + title 🌐 + description 🌐 + image) | About 頁品牌時間軸 |
| gallery | heading 🌐 + images(多) | 設備/工廠照片牆 |
| cta | heading 🌐 + body 🌐 + buttonLabel 🌐 + buttonLink | 行動呼籲,link 填站內路徑例 `/contact` |

---

## 6. FAQs(常見問答)

**用途**:Products 頁與 Applications 頁底部的 FAQ 區塊,同時輸出
FAQPage JSON-LD(搜尋結果可展開問答,SEO 加分)。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| question 🌐 | 文字 | ✅ | 問題(以買家口吻,含關鍵字更佳) | FAQ 摺疊標題 + JSON-LD |
| answer 🌐 | 多行文字 | ✅ | 回答(純文字,無格式) | FAQ 展開內容 + JSON-LD |
| page | 下拉 | ✅ | 顯示於 `Products 頁` 或 `Applications 頁` | 決定出現在哪頁 |
| displayOrder | 數字 | — | 排序,小在前 | FAQ 顯示順序 |

### 注意事項
- 無草稿機制,儲存即生效
- answer 是純文字欄位——不要貼 HTML 或 markdown 語法,不會被渲染
- 問答會進 Google 結構化資料,內容需與頁面實際資訊一致(不一致有 SEO 風險)

---

## 7. Media(媒體檔案)

**用途**:全站唯一的檔案上傳入口——產品圖、工程圖、3D 模型、PDF 型錄、
影片、代理商 logo 全部先上傳到這裡,再由其他 collection 選用。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 | 前台呈現位置 |
|------|------|:----:|----------|--------------|
| (檔案本體) | 上傳 | ✅ | 允許格式:**圖片(任意)、PDF、GLB(3D)、MP4** | 各引用處 |
| alt 🌐 | 文字 | ✅ | 圖片替代文字(SEO / 無障礙),描述圖中內容,例 `MT-A110 pneumatic score cut knife holder side view` | `<img alt>`、讀屏軟體 |
| caption 🌐 | 文字 | — | 圖說 | 引用處圖說(視元件而定) |

### 存放與供應機制
- **實體檔案存於 NAS** `motoknife-media` 共享資料夾,透過 `MEDIA_DIR` 環境變數指定
  (Windows `M:\`、Mac `/Volumes/motoknife-media`;未設定則 fallback 專案內 `media/`),
  三台機器上傳後即刻互通
- 圖片上傳時自動產生三種尺寸:thumbnail(480w)/ card(800w)/ large(1200w),維持原始長寬比
- 檔案**不放 public/**,一律經 Payload `/api/media/file/*` 供應;
  GLB 另走 `/api/model/[id]` 代理(no-store、防直接下載)

### 注意事項
- alt 為必填且多語——上傳時就寫好英文 alt,不要填「image1」之類佔位字
- 建議檔名規則:小寫-連字號,含型號,例 `mt-a110-side-view.png`、`mt-a710-drawing-01.png`
  (上傳後檔名即定,重傳才可換)
- 產品去背圖建議透明 PNG;照片類用 JPG;工程圖用 PNG(前台加浮水印)
- 刪除 media 前先確認沒有產品/文章引用中,否則前台出現破圖

---

## 8. Users(後台帳號)

**用途**:Payload 後台登入帳號管理。

### 欄位說明

| 欄位 | 型別 | 必填 | 填寫說明 |
|------|------|:----:|----------|
| email | email | ✅ | 登入帳號 |
| password | 密碼 | ✅ | 登入密碼 |
| name | 文字 | ✅ | 顯示名稱 |
| role | 下拉 | ✅ | Admin / Editor,預設 Editor |

### 注意事項
- ⚠️ role 目前**僅作標示**,程式尚未依 role 區分權限(Editor 實際權限與 Admin 相同),欄位為未來擴充預留
- 目前為三機共用單一 admin 帳號(見 Notion 手冊);上線前必須改強密碼並考慮分人開帳號

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

## 附錄 C:SEO 群組欄位(Products / Applications / News / Pages 共用)

| 欄位 | 說明 |
|------|------|
| metaTitle 🌐 | 建議 50–60 字元(上限 70),包含目標關鍵字;留空用前台預設值 |
| metaDescription 🌐 | 建議 140–160 字元(上限 170),避免與其他頁面重複 |
| ogImage | 社群分享縮圖,1200×630 |
| noIndex | 勾選後此頁不被搜尋引擎索引(一般內容勿勾) |
