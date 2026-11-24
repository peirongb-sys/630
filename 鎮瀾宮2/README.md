# 大甲鎮瀾宮｜數位文化導覽

純前端、行動優先的單頁導覽網站，使用原生 HTML5、CSS3 與 Vanilla JavaScript，沒有建置步驟或伺服器端程式。提供金媽祖開放時間提醒、工藝介紹彈窗、五媽祖頁籤、景點分類篩選與 Google Maps 搜尋連結。

## 專案結構

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## 本機預覽

可直接在瀏覽器開啟 `index.html`。也可從專案根目錄啟動任何靜態檔案伺服器；本網站不需要安裝 npm 套件、編譯或設定環境變數。

## 部署至 Render Static Site

1. 將此專案推送到 GitHub、GitLab 或 Bitbucket 儲存庫。
2. 在 Render 控制台選擇 **New → Static Site**，連結該儲存庫與部署分支。
3. 若專案就在儲存庫根目錄，Root Directory 留白（若位於子目錄則填入相對路徑）。
4. **Build Command** 留白；**Publish Directory** 設為 `.`（專案根目錄）。
5. 建立 Static Site。之後每次推送至指定分支，Render 會自動重新部署。

本網站使用相對路徑載入 CSS/JS，適合 Render Static Site。若要使用自訂網域，可在 Render 的 Settings 設定網域與 HTTPS。

## 圖片與資訊維護

頁面以 Unsplash 圖片作為示意素材，HTML 註解標示可替換成實地攝影的位置。上線前請確認圖片授權、來源及替代文字。Google Fonts 只用於字型增強；網路無法連線時會退回系統字型。

開放狀態以瀏覽器 `Intl.DateTimeFormat` 的 `Asia/Taipei` 時區判斷，每分鐘更新。開放時段、地址電話、票價、停車資訊、店家價格及營業情況可能變更，請發布前向廟方與店家查證，並更新相應內容；Google Maps 連結為搜尋導引。
