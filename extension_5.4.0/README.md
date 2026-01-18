# NotebookLM Mindmap Exporter v5.4.0 / NotebookLM 心智圖導出器 v5.4.0

---

[🇨🇳 中文 / Chinese](#-快速開始-quick-start) | [🇺🇸 English](#quick-start)

---

## 🎯 快速開始 / Quick Start

### 安裝步驟 / Installation Steps

**中文 / Chinese:**
1. 打開 Chrome 瀏覽器
2. 進入 `chrome://extensions/`
3. 開啟右上角的「開發者模式」
4. 點擊「載入未封裝項目」
5. 選擇 `extension_5.4.0` 資料夾
6. 看到 🧪 圖標表示安裝成功

**English:**
1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `extension_5.4.0` folder
6. You should see the 🧪 icon when installed successfully

### 使用方法 / How to Use

**中文 / Chinese:**
1. 打開 NotebookLM 心智圖頁面
2. 點擊瀏覽器工具列的 🧪 圖標
3. 點擊「🧪 檢測心智圖」
4. 選擇導出格式
5. 點擊「💾 導出心智圖」

**English:**
1. Open the NotebookLM mindmap page
2. Click the 🧪 icon in the browser toolbar
3. Click "🧪 Detect Mindmap"
4. Select the export format
5. Click "💾 Export Mindmap"

## 🔧 修復內容 / Fixes

| Issue | Original | Fixed | Improvement |
|------|--------|--------|----------|
| 超時限制 / Timeout | 25秒 / 25s | 60秒 / 60s | 支持大型心智圖 / Support large mindmaps |
| 連接檢測 / Connection Detection | 25px容錯 / 25px tolerance | 50px容錯 / 50px tolerance | 提高檢測準確性 / Improve detection accuracy |
| 層級分組 / Level Grouping | 5px容錯 / 5px tolerance | 15px容錯 / 15px tolerance | 減少錯誤分組 / Reduce incorrect grouping |
| 節點過濾 / Node Filtering | 嚴格過濾 / Strict filtering | 寬鬆過濾 / Loose filtering | 保留更多有效節點 / Keep more valid nodes |
| 中文支持 / Chinese Support | 基本支持 / Basic support | 完整支持 / Full support | 更好的中文處理 / Better Chinese handling |

**Key Improvements in v5.4:**
- ✅ Support for deep-level nodes (up to 8 levels)
- ✅ Increased timeout to 90 seconds for complex mindmaps
- ✅ Enhanced connection detection tolerance (60px)
- ✅ Better error handling with detailed diagnostics
- ✅ Multi-language support (Chinese, English, etc.)

## 🧪 測試建議 / Testing Suggestions

### 基本測試 / Basic Tests
- ✅ 小型心智圖 / Small mindmap (< 20 節點 / nodes)
- ✅ 中型心智圖 / Medium mindmap (20-50 節點 / nodes)
- ✅ 大型心智圖 / Large mindmap (> 50 節點 / nodes)

### 進階測試 / Advanced Tests
- 🛠️ 使用調試模式查看詳細分析 / Use debug mode for detailed analysis
- 🔍 手動選擇根節點重新提取 / Manually select root node to re-extract
- 📊 對比原版本的節點數量差異 / Compare node count differences with original version

### 特殊情況測試 / Special Case Tests
- 🈳 包含中文節點的心智圖 / Mindmap with Chinese nodes
- 🔗 複雜連接關係的心智圖 / Mindmap with complex connections
- ⏱️ 之前會超時的大型心智圖 / Large mindmap that previously timed out

## 📋 文件說明 / File Description

- `manifest.json` - 擴展配置文件 / Extension configuration file
- `content.js` - 核心提取邏輯 (已修復) / Core extraction logic (fixed)
- `popup.html/js` - 用戶界面 (中文化) / User interface (localized)
- `background.js` - 後台服務 / Background service
- `FIXES.md` - 技術修復詳情 / Technical fix details
- `README.md` - 使用說明 / Usage guide (this file)

## 🐛 問題回報 / Bug Report

**中文 / Chinese:**
如發現問題，請提供：
1. 心智圖規模 (節點數量)
2. 錯誤信息截圖
3. 瀏覽器控制台日誌
4. 與原版本的對比結果

**English:**
If you encounter issues, please provide:
1. Mindmap size (number of nodes)
2. Error message screenshots
3. Browser console logs
4. Comparison results with the original version

## 🎉 預期效果 / Expected Results

**中文 / Chinese:**
使用測試版後，你應該能看到：
- 📈 更多節點被成功檢測
- ⚡ 更穩定的處理過程
- 🎯 更準確的層級關係
- 🚀 更好的大型心智圖支持

祝測試順利！如有任何問題歡迎反饋。

**English:**
After using the fixed version, you should see:
- 📈 More nodes successfully detected
- ⚡ More stable processing
- 🎯 More accurate level relationships
- 🚀 Better support for large mindmaps

Good luck with testing! Feel free to provide feedback if you have any questions.