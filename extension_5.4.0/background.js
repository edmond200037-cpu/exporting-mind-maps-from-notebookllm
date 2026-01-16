// Background service worker for NotebookLM 心智圖導出器
chrome.runtime.onInstalled.addListener((details) => {
  console.log(
    "🧪 NotebookLM 心智圖導出器 v5.3.0 installed/updated"
  );

  chrome.storage.local.set({
    installDate: Date.now(),
    version: chrome.runtime.getManifest().version,
    algorithm: "fixed-data-loss-issues",
  });

  // 創建右鍵菜單
  chrome.contextMenus.create({
    id: "extract-mindmap-test",
    title: "心智圖導出器",
    contexts: ["page"],
    documentUrlPatterns: ["https://notebooklm.google.com/*"],
  });


});

chrome.downloads.onChanged.addListener((downloadDelta) => {
  if (downloadDelta.state && downloadDelta.state.current === "complete") {
    console.log("✅ mindmap download completed:", downloadDelta.id);
  }
});

// Keep service worker alive and handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📨 background received message:", message);
  return true;
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extract-mindmap-test") {
    // Open the popup or perform extraction
    chrome.action.openPopup();
  }
});
