// 快速診斷腳本 - 在 NotebookLM 頁面的瀏覽器控制台中運行
console.log("🔍 開始快速診斷心智圖檢測問題...");

// 1. 檢查基本環境
console.log("\n=== 1. 基本環境檢查 ===");
console.log("URL:", window.location.href);
console.log("是否在 NotebookLM:", window.location.href.includes('notebooklm.google.com'));
console.log("頁面標題:", document.title);

// 2. 檢查 SVG 元素
console.log("\n=== 2. SVG 元素檢查 ===");
const svgElements = document.querySelectorAll("svg");
console.log(`找到 ${svgElements.length} 個 SVG 元素`);

if (svgElements.length > 0) {
  svgElements.forEach((svg, i) => {
    console.log(`SVG ${i + 1}:`, {
      width: svg.getAttribute('width') || svg.style.width,
      height: svg.getAttribute('height') || svg.style.height,
      children: svg.children.length,
      classes: svg.className.baseVal || svg.className
    });
  });
} else {
  console.error("❌ 沒有找到 SVG 元素！");
}

// 3. 檢查節點元素
console.log("\n=== 3. 節點元素檢查 ===");
const nodeSelectors = [
  "g.node",
  'g[class*="node"]', 
  "g[transform] text",
  "text.node-name",
  "text[class*='node']",
  "g text"
];

let totalNodes = 0;
nodeSelectors.forEach(selector => {
  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}: ${elements.length} 個元素`);
      totalNodes += elements.length;
      
      // 顯示前3個元素的內容
      Array.from(elements).slice(0, 3).forEach((el, i) => {
        const text = el.textContent?.trim();
        if (text && text.length > 0) {
          console.log(`  [${i + 1}] "${text.substring(0, 50)}..."`);
        }
      });
    }
  } catch (error) {
    console.warn(`${selector}: 錯誤 - ${error.message}`);
  }
});

console.log(`總節點元素: ${totalNodes}`);

// 4. 檢查連接元素
console.log("\n=== 4. 連接元素檢查 ===");
const connectionSelectors = ["path.link", "path", "line", "polyline"];
let totalConnections = 0;

connectionSelectors.forEach(selector => {
  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}: ${elements.length} 個元素`);
      totalConnections += elements.length;
    }
  } catch (error) {
    console.warn(`${selector}: 錯誤 - ${error.message}`);
  }
});

console.log(`總連接元素: ${totalConnections}`);

// 5. 檢查頁面內容
console.log("\n=== 5. 頁面內容檢查 ===");
const bodyText = document.body.textContent;
const hasMindmapKeywords = /mindmap|mind map|心智圖|思維導圖/i.test(bodyText);
console.log("包含心智圖關鍵字:", hasMindmapKeywords);

// 6. 檢查可能的心智圖容器
console.log("\n=== 6. 心智圖容器檢查 ===");
const possibleContainers = [
  'div[class*="mindmap"]',
  'div[class*="mind-map"]', 
  'div[class*="diagram"]',
  'div[class*="canvas"]',
  'div[class*="visualization"]',
  'canvas',
  'svg'
];

possibleContainers.forEach(selector => {
  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}: ${elements.length} 個容器`);
    }
  } catch (error) {
    console.warn(`${selector}: 錯誤 - ${error.message}`);
  }
});

// 7. 總結診斷結果
console.log("\n=== 診斷結果總結 ===");
const isOnNotebookLM = window.location.href.includes('notebooklm.google.com');
const hasSVG = svgElements.length > 0;
const hasNodes = totalNodes > 0;
const hasConnections = totalConnections > 0;

console.log(`✅ 在 NotebookLM 頁面: ${isOnNotebookLM}`);
console.log(`${hasSVG ? '✅' : '❌'} 找到 SVG 元素: ${svgElements.length}`);
console.log(`${hasNodes ? '✅' : '❌'} 找到節點元素: ${totalNodes}`);
console.log(`${hasConnections ? '✅' : '❌'} 找到連接元素: ${totalConnections}`);

if (isOnNotebookLM && hasSVG && hasNodes) {
  console.log("\n🎉 基本條件滿足！心智圖檢測應該可以工作。");
  console.log("💡 如果仍然失敗，請嘗試：");
  console.log("   1. 等待心智圖完全載入");
  console.log("   2. 重新整理頁面");
  console.log("   3. 使用調試模式查看詳細信息");
} else {
  console.log("\n⚠️ 發現問題：");
  if (!isOnNotebookLM) console.log("   - 不在 NotebookLM 頁面");
  if (!hasSVG) console.log("   - 沒有找到 SVG 元素");
  if (!hasNodes) console.log("   - 沒有找到節點元素");
  if (!hasConnections) console.log("   - 沒有找到連接元素（可能正常）");
}

// 8. 如果找到了元素，嘗試簡單的提取測試
if (hasSVG && hasNodes) {
  console.log("\n=== 8. 簡單提取測試 ===");
  try {
    // 嘗試提取一些基本信息
    const firstSVG = svgElements[0];
    const textElements = firstSVG.querySelectorAll('text');
    console.log(`第一個 SVG 中的文本元素: ${textElements.length}`);
    
    if (textElements.length > 0) {
      console.log("前5個文本內容:");
      Array.from(textElements).slice(0, 5).forEach((el, i) => {
        const text = el.textContent?.trim();
        if (text) {
          console.log(`  [${i + 1}] "${text}"`);
        }
      });
    }
  } catch (error) {
    console.error("簡單提取測試失敗:", error);
  }
}

console.log("\n🔍 診斷完成！請將以上結果截圖或複製給開發者。");