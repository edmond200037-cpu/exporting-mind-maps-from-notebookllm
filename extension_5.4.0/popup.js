document.addEventListener("DOMContentLoaded", function () {
  console.log("🧪 popup script v5.4.0 loaded");

  const detectCorrectedBtn = document.getElementById("detectCorrectedBtn");
  const debugCorrectedBtn = document.getElementById("debugCorrectedBtn");
  const convertBtn = document.getElementById("convertBtn");
  const useSelectedBtn = document.getElementById("useSelectedBtn");
  const downloadHtmlBtn = document.getElementById("downloadHtmlBtn");
  const formatSelector = document.getElementById("formatSelector");
  const debugPanel = document.getElementById("debugPanel");
  const nodeList = document.getElementById("nodeList");
  const htmlDisplay = document.getElementById("htmlDisplay");
  const levelInfo = document.getElementById("levelInfo");
  const status = document.getElementById("status");
  const preview = document.getElementById("preview");
  const progressBar = document.getElementById("progressBar");
  const progressFill = document.getElementById("progressFill");
  const nodesTab = document.getElementById("nodesTab");
  const htmlTab = document.getElementById("htmlTab");
  const nodesContent = document.getElementById("nodesContent");
  const htmlContent = document.getElementById("htmlContent");

  let mindmapData = null;
  let debugData = null;
  let selectedNodeId = null;
  let completeHtml = "";

  // Event listeners with CORRECTED action names
  detectCorrectedBtn.addEventListener("click", async function () {
    console.log("🖱️ Corrected detect button clicked");
    await performCorrectedDetection();
  });

  debugCorrectedBtn.addEventListener("click", async function () {
    console.log("🛠️ Corrected debug button clicked");
    await performCorrectedDebugAnalysis();
  });

  convertBtn.addEventListener("click", async function () {
    console.log("🖱️ Convert button clicked");
    await performConversion();
  });

  useSelectedBtn.addEventListener("click", async function () {
    console.log("✅ Extract with corrected logic clicked");
    await performCorrectedExtractionWithSelectedRoot();
  });

  downloadHtmlBtn.addEventListener("click", function () {
    downloadCompleteHtml();
  });

  nodesTab.addEventListener("click", function () {
    switchTab("nodes");
  });

  htmlTab.addEventListener("click", function () {
    switchTab("html");
  });

  function switchTab(tab) {
    if (tab === "nodes") {
      nodesTab.classList.add("active");
      htmlTab.classList.remove("active");
      nodesContent.style.display = "block";
      htmlContent.style.display = "none";
    } else {
      htmlTab.classList.add("active");
      nodesTab.classList.remove("active");
      htmlContent.style.display = "block";
      nodesContent.style.display = "none";
    }
  }

  // ============= CORRECTED DETECTION WITH MATCHING ACTION NAMES =============
  async function performCorrectedDetection() {
    try {
      updateButton(detectCorrectedBtn, "🔄 Analyzing Mindmap...", true);
      showProgress("Connecting to page...", 20);

      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length === 0) {
        throw new Error("No active tab found");
      }

      const tab = tabs[0];
      console.log("📑 Current tab:", tab.url);

      showProgress("Injecting corrected detection script...", 40);

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      showProgress("Analyzing with X-level parent-child logic...", 60);

      // FIXED: Use correct action name that matches content.js
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "detectMindmap", // ✅ Changed from 'detectMindmapCorrected'
      });

      console.log("📨 Corrected response received:", response);

      if (response && response.error) {
        throw new Error(response.error);
      }

      if (response && response.nodes && response.nodes.length > 0) {
        mindmapData = response;

        showProgress("Processing corrected results...", 90);

        const stats = analyzeCorrectedStructure(response.nodes);
        showCorrectedSuccess(response, stats);

        formatSelector.style.display = "block";
        convertBtn.disabled = false;

        preview.innerHTML = generateCorrectedPreview(response.nodes, stats);

        showProgress("Detection complete!", 100);
        setTimeout(hideProgress, 1000);
      } else {
        throw new Error("No mindmap structure detected.");
      }
    } catch (error) {
      console.error("❌ Detection error:", error);
      showError(
        error.message +
          "<br><br>💡 <strong>NotebookLM Mindmap Not Found.</strong>"
      );
      hideProgress();
    } finally {
      updateButton(detectCorrectedBtn, "🧪 檢測心智圖", false);
    }
  }

  // ============= CORRECTED DEBUG MODE =============
  async function performCorrectedDebugAnalysis() {
    try {
      updateButton(debugCorrectedBtn, "🔄 Corrected Debug Analysis...", true);
      showProgress("Extracting complete HTML...", 20);

      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length === 0) {
        throw new Error("No active tab found");
      }

      const tab = tabs[0];
      console.log("📑 Corrected debugging tab:", tab.url);

      showProgress("Injecting corrected debug script...", 40);

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      showProgress("Corrected X-level connection analysis...", 70);

      // FIXED: Use correct action name that matches content.js
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "debugExtract", // ✅ Changed from 'debugExtractCorrected'
      });

      console.log("🛠️ Corrected debug response received:", response);

      if (response && response.error) {
        throw new Error(response.error);
      }

      if (response && response.allNodes) {
        debugData = response;
        completeHtml = response.completeHtml || "";

        showCorrectedDebugResults(response);

        showProgress("Corrected debug analysis complete!", 100);
        setTimeout(hideProgress, 1000);
      } else {
        throw new Error("No debug data received from corrected analysis");
      }
    } catch (error) {
      console.error("❌ Corrected debug analysis error:", error);
      showError(`Corrected debug analysis failed: ${error.message}`);
      hideProgress();
    } finally {
      updateButton(debugCorrectedBtn, "🛠️ 調試模式", false);
    }
  }

  async function performCorrectedExtractionWithSelectedRoot() {
    try {
      if (!selectedNodeId || !debugData) {
        throw new Error("No node selected or debug data missing");
      }

      updateButton(useSelectedBtn, "⏳ Corrected Extraction...", true);
      showProgress("Building hierarchy with corrected X-level logic...", 30);

      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const tab = tabs[0];

      showProgress(
        "Processing ALL nodes with corrected consecutive level mapping...",
        60
      );

      // FIXED: Use correct action name that matches content.js
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "extractWithRoot", // ✅ Changed from 'extractWithRootCorrected'
        rootNodeId: selectedNodeId,
      });

      console.log("📨 Corrected extraction response:", response);

      if (response && response.error) {
        throw new Error(response.error);
      }

      if (response && response.nodes && response.nodes.length > 0) {
        mindmapData = response;

        const stats = analyzeCorrectedStructure(response.nodes);
        showCorrectedExtractionSuccess(response, stats);

        formatSelector.style.display = "block";
        convertBtn.disabled = false;

        preview.innerHTML = generateCorrectedPreview(response.nodes, stats);

        showProgress("Corrected extraction finished!", 100);
        setTimeout(hideProgress, 1000);
      } else {
        throw new Error("No valid mindmap data extracted with corrected logic");
      }
    } catch (error) {
      console.error("❌ Corrected extraction error:", error);
      showError(`Corrected extraction failed: ${error.message}`);
      hideProgress();
    } finally {
      updateButton(useSelectedBtn, "✅ 使用修復邏輯提取", false);
    }
  }

  function showCorrectedDebugResults(debugResponse) {
    debugPanel.style.display = "block";

    // Show corrected X-level information
    if (
      debugResponse.nodesByLevel &&
      Object.keys(debugResponse.nodesByLevel).length > 0
    ) {
      const xLevels = Object.keys(debugResponse.nodesByLevel)
        .map((x) => parseFloat(x))
        .sort((a, b) => a - b);

      levelInfo.innerHTML = `
        <strong>🔧 CORRECTED X-Level Analysis:</strong><br>
        Hierarchy Levels: <strong>${xLevels.length}</strong><br>
        ${xLevels
          .map(
            (x, level) =>
              `Level ${level}: X=${x} (${debugResponse.nodesByLevel[x].length} nodes)`
          )
          .join("<br>")}
      `;
    }

    // Populate node list
    nodeList.innerHTML = "";
    if (debugResponse.allNodes && debugResponse.allNodes.length > 0) {
      debugResponse.allNodes.forEach((node, index) => {
        const nodeItem = document.createElement("div");
        nodeItem.className = "node-item";
        nodeItem.dataset.nodeId = node.id;

        const nodeInfo = `
          <strong>Node ${index + 1}:</strong> "${truncateText(
          node.text,
          50
        )}"<br>
          <span style="color: #666;">
            X: ${Math.round(node.position?.x || 0)}, Y: ${Math.round(
          node.position?.y || 0
        )} | 
            Type: ${node.elementType || "Unknown"} | 
            ${node.isDetectedRoot ? "🎯 CORRECTED ROOT" : "Level Node"}
          </span>
        `;

        nodeItem.innerHTML = nodeInfo;
        nodeItem.addEventListener("click", function () {
          selectNodeForCorrectedExtraction(node.id);
        });

        if (node.isDetectedRoot) {
          nodeItem.classList.add("selected");
          selectedNodeId = node.id;
          useSelectedBtn.disabled = false;
        }

        nodeList.appendChild(nodeItem);
      });
    } else {
      nodeList.innerHTML =
        '<div style="padding: 10px; color: #666;">No nodes found with corrected detection</div>';
    }

    // Show HTML content
    htmlDisplay.textContent = completeHtml || "No HTML content available";

    // Show connection analysis if available
    if (debugResponse.connections && debugResponse.connections.length > 0) {
      const connectionsHtml = `
        <div style="margin: 10px 0; padding: 10px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
          <strong>🔗 CORRECTED Connection Analysis:</strong><br>
          • Found Connections: <strong>${
            debugResponse.connections.length
          }</strong><br>
          • Connection Types: ${[
            ...new Set(debugResponse.connections.map((c) => c.type)),
          ].join(", ")}<br>
          <strong>✅ Corrected Parent → Child (Level N → N+1):</strong><br>
          ${debugResponse.connections
            .slice(0, 5)
            .map(
              (conn, i) =>
                `• ${truncateText(conn.parentNode.text, 15)} → ${truncateText(
                  conn.childNode.text,
                  15
                )}`
            )
            .join("<br>")}
          ${debugResponse.connections.length > 5 ? "<br>... and more" : ""}
        </div>
      `;

      htmlDisplay.insertAdjacentHTML("afterend", connectionsHtml);
    }

    // Update status
    status.innerHTML = `
      <div class="warning">
        <strong>🛠️ Corrected Debug Mode Active</strong><br>
        Found <strong>${
          debugResponse.allNodes?.length || 0
        }</strong> nodes with corrected X-level analysis.<br>
        X-Levels: <strong>${
          Object.keys(debugResponse.nodesByLevel || {}).length
        }</strong> | 
        Connections: <strong>${
          debugResponse.connections?.length || 0
        }</strong><br>
        Auto-detected root: <strong>"${
          debugResponse.detectedRoot?.text || "None detected"
        }"</strong><br>
        <small>Select any node as root and click "Extract with Corrected Logic" to build mindmap with <strong>corrected X-level parent-child mapping between consecutive levels</strong>.</small>
      </div>
    `;
  }

  function selectNodeForCorrectedExtraction(nodeId) {
    selectedNodeId = nodeId;

    document.querySelectorAll(".node-item").forEach((item) => {
      item.classList.remove("selected");
    });

    const selectedItem = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (selectedItem) {
      selectedItem.classList.add("selected");
    }

    useSelectedBtn.disabled = false;

    const selectedNode = debugData.allNodes.find((n) => n.id === nodeId);
    if (selectedNode) {
      status.innerHTML = `
        <div class="info">
          <strong>✅ Node Selected for Corrected Extraction</strong><br>
          Text: <strong>"${truncateText(selectedNode.text, 40)}"</strong><br>
          X-Position: <strong>${Math.round(
            selectedNode.position?.x || 0
          )}</strong> (Hierarchy Level)<br>
          Type: <strong>${selectedNode.elementType}</strong><br>
          <br><strong>This will use CORRECTED X-level logic to map ALL ${
            debugData.allNodes.length
          } nodes with proper consecutive level parent-child relationships.</strong>
        </div>
      `;
    }
  }

  // Include all other functions from previous version...
  function showCorrectedExtractionSuccess(results, stats) {
    status.innerHTML = `
      <div class="success">
        <strong>✅ Corrected Hierarchy Extracted Successfully!</strong><br><br>
        📊 <strong>Corrected Analysis:</strong><br>
        • Total Nodes Extracted: <strong>${results.nodes.length}</strong><br>
        • Hierarchy Depth: <strong>${stats.maxLevel + 1} levels</strong><br>
        • Root Node: <strong>"${truncateText(
          results.rootNode.text,
          35
        )}"</strong><br>
        • Quality Score: <strong>${calculateQualityScore(
          stats
        )}%</strong><br><br>
        🔧 <strong>All nodes mapped with CORRECTED X-level consecutive parent-child logic!</strong>
      </div>
    `;
  }

  // ============= UTILITY FUNCTIONS =============
  function analyzeCorrectedStructure(nodes) {
    const levels = nodes.map((node) => node.level || 0);
    const levelCounts = {};
    const xPositions = nodes
      .map((node) => node.xPosition || 0)
      .filter((x) => x !== 0);

    levels.forEach((level) => {
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    return {
      totalNodes: nodes.length,
      maxLevel: Math.max(...levels),
      minLevel: Math.min(...levels),
      levelCounts: levelCounts,
      xLevels: [...new Set(xPositions)].length,
      hasXPositions: xPositions.length > 0,
      isCorrected: true,
    };
  }

  function showCorrectedSuccess(results, stats) {
    status.innerHTML = `
      <div class="success">
        <strong>✅ Corrected Mindmap Detection Successful!</strong><br><br>
        📊 <strong>Corrected Analysis:</strong><br>
        • Total Nodes: <strong>${results.nodes.length}</strong><br>
        • Hierarchy Depth: <strong>${stats.maxLevel + 1} levels</strong><br>
        • X-Coordinate Levels: <strong>${stats.xLevels}</strong><br>
        • Root Node: <strong>"${truncateText(
          results.rootNode.text,
          35
        )}"</strong><br><br>
        🔧 <strong>Parent-Child Mapping:</strong> Corrected X-Level Logic<br>
        🎯 <strong>Quality:</strong> ${calculateQualityScore(stats)}%
      </div>
    `;
  }

  function showError(message) {
    status.innerHTML = `
      <div class="error">
        <strong>❌ Error</strong><br>
        ${message}<br><br>
      </div>
    `;
    formatSelector.style.display = "none";
    convertBtn.disabled = true;
    preview.innerHTML = "";
  }

  function downloadCompleteHtml() {
    if (!completeHtml) {
      showError("No HTML content available to download");
      return;
    }

    const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
    const filename = `notebooklm-corrected-v6-debug-${timestamp}.html`;

    const blob = new Blob([completeHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      {
        url: url,
        filename: filename,
        saveAs: true,
      },
      () => {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        status.innerHTML = `
        <div class="success">
          <strong>📄 Corrected HTML Downloaded!</strong><br>
          File: <code>${filename}</code><br>
          Analyze complete structure with corrected X-level data.
        </div>
      `;
      }
    );
  }

  // ============= REST OF UTILITY FUNCTIONS =============
  async function performConversion() {
    if (!mindmapData) {
      showError(
        "No mindmap data available. Please run corrected detection first."
      );
      return;
    }

    try {
      const format = getSelectedFormat();
      updateButton(convertBtn, "⏳ Converting...", true);

      showProgress("Generating file with corrected hierarchy...", 40);

      const filename = generateFilename(mindmapData.rootNode.text, format);
      const content = convertToFormat(mindmapData, format);

      showProgress("Downloading...", 80);

      await downloadFile(content, filename, format);

      showConversionSuccess(filename, format);
      showProgress("Corrected export complete!", 100);
      setTimeout(hideProgress, 2000);
    } catch (error) {
      console.error("❌ Conversion error:", error);
      showError(`Export failed: ${error.message}`);
      hideProgress();
    } finally {
      updateButton(convertBtn, "💾 導出心智圖", false);
    }
  }

  function showConversionSuccess(filename, format) {
    status.innerHTML = `
      <div class="success">
        <strong>🎉 Corrected Export Successful!</strong><br><br>
        📁 <strong>File:</strong> <code>${filename}</code><br>
        📄 <strong>Format:</strong> ${format.toUpperCase()}<br>
        📊 <strong>Nodes:</strong> ${mindmapData.nodes.length}<br>
        💾 <strong>Status:</strong> Downloaded successfully<br>
        🔧 <strong>Hierarchy:</strong> Corrected X-level consecutive parent-child mapping preserved
      </div>
    `;
  }

  function calculateQualityScore(stats) {
    let score = 70;
    if (stats.totalNodes >= 5) score += 10;
    if (stats.totalNodes >= 15) score += 10;
    if (stats.maxLevel >= 1) score += 5;
    if (stats.maxLevel >= 2) score += 5;
    if (stats.hasXPositions) score += 10;
    if (stats.isCorrected) score += 5;
    return Math.min(100, score);
  }

  function generateCorrectedPreview(nodes, stats) {
    let html = "<h4>📋 Structure Preview</h4>";
    html += '<div class="tree-view">';

    const rootNode = nodes.find((n) => (n.level || 0) === stats.minLevel);
    if (rootNode) {
      html += buildTreeView(nodes, rootNode.id, 0);
    }

    html += "</div>";

    html += '<div class="stats">';
    html += "<div><strong>📊 Level Distribution</strong></div>";

    Object.keys(stats.levelCounts)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((level) => {
        const count = stats.levelCounts[level];
        const percentage = Math.round((count / stats.totalNodes) * 100);
        const levelName = level == 0 ? "Root" : `Level ${level}`;
        html += `
          <div>
            <span>${levelName}:</span>
            <span><strong>${count}</strong> (${percentage}%)</span>
          </div>
        `;
      });

    if (stats.hasXPositions) {
      html += `
        <div>
          <span>X-Levels:</span>
          <span><strong>${stats.xLevels}</strong> coordinates</span>
        </div>
      `;
    }

    html += "</div>";
    return html;
  }

  function buildTreeView(nodes, parentId, depth) {
    const children = nodes.filter((node) => node.parentId === parentId);
    let html = "";

    children.forEach((child, index) => {
      const indent = "  ".repeat(depth);
      const connector = index === children.length - 1 ? "└─" : "├─";
      const text = truncateText(child.text, 45);
      const xInfo = child.xPosition
        ? ` (X:${Math.round(child.xPosition)})`
        : "";

      html += `<div>${indent}${connector} ${text}<span style="color:#999;font-size:10px;">${xInfo}</span></div>`;

      if (depth < 8) {
        html += buildTreeView(nodes, child.id, depth + 1);
      }
    });

    return html;
  }

  function getSelectedFormat() {
    const formats = document.querySelectorAll('input[name="format"]');
    for (const format of formats) {
      if (format.checked) return format.value;
    }
    return "mm";
  }

  function convertToFormat(data, format) {
    switch (format) {
      case "mm":
        return convertToFreeMind(data);
      case "xml":
        return convertToGenericXML(data);
      case "opml":
        return convertToOPML(data);
      default:
        return convertToFreeMind(data);
    }
  }

  function convertToFreeMind(data) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<map version="1.0.1">\n`;
    xml += `<!-- Generated by NotebookLM Mindmap Extractor v5.3.0 with X-Level Parent-Child Logic -->\n`;
    xml += generateNodeXML(data.rootNode, data.nodes, 1);
    xml += `</map>`;
    return xml;
  }

  function generateNodeXML(node, allNodes, depth) {
    const indent = "  ".repeat(depth);
    const nodeText = escapeXML(node.text);
    let xml = `${indent}<node ID="${node.id}" TEXT="${nodeText}">\n`;

    const children = allNodes.filter((n) => n.parentId === node.id);
    children.forEach((child) => {
      xml += generateNodeXML(child, allNodes, depth + 1);
    });

    xml += `${indent}</node>\n`;
    return xml;
  }

  function convertToGenericXML(data) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<mindmap title="${escapeXML(
      data.rootNode.text
    )}" created="${new Date().toISOString()}" algorithm="corrected-x-level">\n`;
    xml += generateGenericNode(data.rootNode, data.nodes, 1);
    xml += `</mindmap>`;
    return xml;
  }

  function generateGenericNode(node, allNodes, depth) {
    const indent = "  ".repeat(depth);
    const xPos = node.xPosition ? ` x-position="${node.xPosition}"` : "";
    let xml = `${indent}<node id="${node.id}" text="${escapeXML(
      node.text
    )}" level="${node.level || 0}"${xPos}>\n`;

    const children = allNodes.filter((n) => n.parentId === node.id);
    children.forEach((child) => {
      xml += generateGenericNode(child, allNodes, depth + 1);
    });

    xml += `${indent}</node>\n`;
    return xml;
  }

  function convertToOPML(data) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<opml version="2.0">\n`;
    xml += `  <head>\n`;
    xml += `    <title>${escapeXML(data.rootNode.text)}</title>\n`;
    xml += `    <dateCreated>${new Date().toUTCString()}</dateCreated>\n`;
    xml += `    <generator>NotebookLM Mindmap Extractor v5.3.0</generator>\n`;
    xml += `  </head>\n`;
    xml += `  <body>\n`;
    xml += generateOPMLOutline(data.rootNode, data.nodes, 2);
    xml += `  </body>\n`;
    xml += `</opml>`;
    return xml;
  }

  function generateOPMLOutline(node, allNodes, depth) {
    const indent = "  ".repeat(depth);
    let xml = `${indent}<outline text="${escapeXML(node.text)}">\n`;

    const children = allNodes.filter((n) => n.parentId === node.id);
    children.forEach((child) => {
      xml += generateOPMLOutline(child, allNodes, depth + 1);
    });

    xml += `${indent}</outline>\n`;
    return xml;
  }

  function generateFilename(rootText, format) {
    const clean = rootText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 40);

    const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
    const extension =
      format === "opml" ? "opml" : format === "xml" ? "xml" : "mm";

    return `${
      clean || "notebooklm-corrected-mindmap"
    }-${timestamp}.${extension}`;
  }

  async function downloadFile(content, filename, format) {
    const mimeTypes = {
      mm: "application/freemind",
      xml: "application/xml;charset=utf-8",
      opml: "text/x-opml;charset=utf-8",
    };

    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      chrome.downloads.download(
        {
          url: url,
          filename: filename,
          saveAs: true,
        },
        (downloadId) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(downloadId);
          }
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      );
    });
  }

  function truncateText(text, maxLength) {
    return text && text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  function escapeXML(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .trim();
  }

  function updateButton(button, text, disabled) {
    button.innerHTML = text;
    button.disabled = disabled;
  }

  function showProgress(message, percentage) {
    progressBar.style.display = "block";
    progressFill.style.width = percentage + "%";

    if (message) {
      status.innerHTML = `
        <div class="info">
          <strong>⏳ ${message}</strong><br>
          Progress: ${percentage}%
        </div>
      `;
    }
  }

  function hideProgress() {
    progressBar.style.display = "none";
    progressFill.style.width = "0%";
  }
});
