// Debug Test Script for NotebookLM Mindmap Detection
// 在瀏覽器控制台中運行此腳本來診斷問題

console.log("🔍 開始診斷心智圖檢測問題...");

// 1. 檢查 SVG 元素
function checkSVGElements() {
  console.log("\n=== 1. 檢查 SVG 元素 ===");
  const svgElements = document.querySelectorAll("svg");
  console.log(`找到 ${svgElements.length} 個 SVG 元素`);
  
  if (svgElements.length === 0) {
    console.error("❌ 沒有找到 SVG 元素！請確保心智圖已完全載入。");
    return false;
  }
  
  svgElements.forEach((svg, index) => {
    console.log(`SVG ${index + 1}:`, {
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height'),
      viewBox: svg.getAttribute('viewBox'),
      childElementCount: svg.children.length
    });
  });
  
  return true;
}

// 2. 檢查節點元素
function checkNodeElements() {
  console.log("\n=== 2. 檢查節點元素 ===");
  const svgElements = document.querySelectorAll("svg");
  let totalNodes = 0;
  
  const nodeSelectors = [
    "g.node",
    'g[class*="node"]',
    "g[transform] text",
    "text.node-name",
    "text[class*='node']",
    "g text"
  ];
  
  svgElements.forEach((svg, svgIndex) => {
    console.log(`\n檢查 SVG ${svgIndex + 1}:`);
    
    nodeSelectors.forEach(selector => {
      try {
        const elements = svg.querySelectorAll(selector);
        if (elements.length > 0) {
          console.log(`  ${selector}: ${elements.length} 個元素`);
          totalNodes += elements.length;
          
          // 顯示前3個元素的文本內容
          Array.from(elements).slice(0, 3).forEach((el, i) => {
            const text = el.textContent?.trim();
            if (text) {
              console.log(`    [${i + 1}] "${text.substring(0, 30)}..."`);
            }
          });
        }
      } catch (error) {
        console.warn(`  ${selector}: 錯誤 - ${error.message}`);
      }
    });
  });
  
  console.log(`\n總共找到 ${totalNodes} 個潛在節點元素`);
  return totalNodes > 0;
}

// 3. 檢查連接元素
function checkConnectionElements() {
  console.log("\n=== 3. 檢查連接元素 ===");
  const svgElements = document.querySelectorAll("svg");
  let totalConnections = 0;
  
  const connectionSelectors = [
    "path.link",
    "path",
    "line",
    "polyline"
  ];
  
  svgElements.forEach((svg, svgIndex) => {
    console.log(`\n檢查 SVG ${svgIndex + 1} 的連接:`);
    
    connectionSelectors.forEach(selector => {
      try {
        const elements = svg.querySelectorAll(selector);
        if (elements.length > 0) {
          console.log(`  ${selector}: ${elements.length} 個元素`);
          totalConnections += elements.length;
        }
      } catch (error) {
        console.warn(`  ${selector}: 錯誤 - ${error.message}`);
      }
    });
  });
  
  console.log(`\n總共找到 ${totalConnections} 個潛在連接元素`);
  return totalConnections > 0;
}

// 4. 檢查頁面狀態
function checkPageState() {
  console.log("\n=== 4. 檢查頁面狀態 ===");
  
  console.log("URL:", window.location.href);
  console.log("頁面標題:", document.title);
  console.log("文檔就緒狀態:", document.readyState);
  
  // 檢查是否在正確的 NotebookLM 頁面
  const isNotebookLM = window.location.href.includes('notebooklm.google.com');
  console.log("是否在 NotebookLM 頁面:", isNotebookLM);
  
  if (!isNotebookLM) {
    console.error("❌ 不在 NotebookLM 頁面！請在 NotebookLM 心智圖頁面運行此擴展。");
    return false;
  }
  
  return true;
}

// 5. 測試增強版檢測函數
function testEnhancedDetection() {
  console.log("\n=== 5. 測試增強版檢測函數 ===");
  
  try {
    // 檢查函數是否存在
    if (typeof extractAllUniqueNodesEnhanced === 'undefined') {
      console.error("❌ extractAllUniqueNodesEnhanced 函數未定義");
      return false;
    }
    
    const svgElements = document.querySelectorAll("svg");
    const nodes = extractAllUniqueNodesEnhanced(svgElements);
    
    console.log(`✅ 成功提取 ${nodes.length} 個節點`);
    
    if (nodes.length > 0) {
      console.log("前5個節點:");
      nodes.slice(0, 5).forEach((node, i) => {
        console.log(`  [${i + 1}] "${node.text}" (X:${Math.round(node.position.x)}, Y:${Math.round(node.position.y)})`);
      });
    }
    
    return nodes.length > 0;
  } catch (error) {
    console.error("❌ 增強版檢測函數錯誤:", error);
    return false;
  }
}

// 6. 完整診斷
function runFullDiagnosis() {
  console.log("🚀 開始完整診斷...\n");
  
  const results = {
    svgElements: checkSVGElements(),
    nodeElements: checkNodeElements(),
    connectionElements: checkConnectionElements(),
    pageState: checkPageState(),
    enhancedDetection: testEnhancedDetection()
  };
  
  console.log("\n=== 診斷結果總結 ===");
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? '通過' : '失敗'}`);
  });
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log("\n🎉 所有檢查都通過！心智圖檢測應該可以正常工作。");
  } else {
    console.log("\n⚠️ 發現問題！請檢查失敗的項目。");
    
    // 提供解決建議
    if (!results.pageState) {
      console.log("💡 建議: 請確保在 NotebookLM 心智圖頁面運行此擴展");
    }
    if (!results.svgElements) {
      console.log("💡 建議: 請等待心智圖完全載入後再嘗試");
    }
    if (!results.nodeElements) {
      console.log("💡 建議: 心智圖可能使用了不同的 DOM 結構，需要更新選擇器");
    }
  }
  
  return results;
}

// 自動運行診斷
runFullDiagnosis();