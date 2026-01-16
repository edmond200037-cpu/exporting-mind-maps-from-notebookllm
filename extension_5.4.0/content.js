// NotebookLM Mindmap Extractor - Enhanced Deep Level Support v5.4 with Better Error Handling
console.log("🗺️ NotebookLM Mindmap Extractor v5.4 - Enhanced Deep Level Support with Better Error Handling loaded");

let globalDebugData = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("📨 Content script received message:", request);

  const timeout = setTimeout(() => {
    console.error("⏰ Operation timed out after 90 seconds");
    sendResponse({
      error: "Operation timed out. Try refreshing the page and ensure the mindmap is fully loaded.",
    });
  }, 90000);

  if (request.action === "detectMindmap") {
    try {
      console.log("🔍 Starting enhanced deep level detection...");
      Promise.resolve()
        .then(() => extractMindmapWithEnhancedDeepLevelSupport())
        .then((mindmapData) => {
          clearTimeout(timeout);
          sendResponse(mindmapData);
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error("❌ Detection error:", error);
          sendResponse({ error: error.message });
        });
    } catch (error) {
      clearTimeout(timeout);
      console.error("❌ Detection catch error:", error);
      sendResponse({ error: error.message });
    }
  } else if (request.action === "debugExtract") {
    try {
      console.log("🛠️ Starting enhanced debug extraction...");
      Promise.resolve()
        .then(() => performEnhancedDebugExtraction())
        .then((debugData) => {
          clearTimeout(timeout);
          sendResponse(debugData);
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error("❌ Debug error:", error);
          sendResponse({ error: error.message });
        });
    } catch (error) {
      clearTimeout(timeout);
      console.error("❌ Debug catch error:", error);
      sendResponse({ error: error.message });
    }
  } else if (request.action === "extractWithRoot") {
    try {
      console.log("✅ Extracting with enhanced deep level logic:", request.rootNodeId);
      Promise.resolve()
        .then(() => extractWithEnhancedHierarchy(request.rootNodeId))
        .then((mindmapData) => {
          clearTimeout(timeout);
          sendResponse(mindmapData);
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error("❌ Extract with root error:", error);
          sendResponse({ error: error.message });
        });
    } catch (error) {
      clearTimeout(timeout);
      console.error("❌ Extract with root catch error:", error);
      sendResponse({ error: error.message });
    }
  } else {
    clearTimeout(timeout);
    sendResponse({ error: "Unknown action: " + request.action });
  }

  return true;
});

// ============= ENHANCED EXTRACTION WITH DEEP LEVEL SUPPORT =============
function extractMindmapWithEnhancedDeepLevelSupport() {
  console.log("🔍 Starting extraction with ENHANCED deep level support...");

  return new Promise((resolve, reject) => {
    try {
      // 1. 檢查 SVG 元素
      const svgElements = document.querySelectorAll("svg");
      console.log(`Found ${svgElements.length} SVG elements`);
      
      if (svgElements.length === 0) {
        console.error("❌ No SVG elements found");
        reject(new Error("No SVG elements found. Make sure the mindmap is fully loaded and visible."));
        return;
      }

      // 2. 提取節點
      console.log("🔍 Step 2: Extracting nodes...");
      const allNodes = extractAllUniqueNodesEnhanced(svgElements);
      console.log(`Extracted ${allNodes.length} unique nodes`);
      
      if (allNodes.length === 0) {
        console.error("❌ No unique nodes found");
        // 提供更詳細的診斷信息
        const diagnosticInfo = performBasicDiagnostic(svgElements);
        reject(new Error(`No unique nodes found with enhanced detection. Diagnostic: ${diagnosticInfo}`));
        return;
      }

      // 3. 分組節點
      console.log("🔍 Step 3: Grouping nodes by X-coordinate levels...");
      const nodesByLevel = groupNodesByXCoordinateLevelEnhanced(allNodes);
      const levelCount = Object.keys(nodesByLevel).length;
      console.log(`Grouped nodes into ${levelCount} X-coordinate levels`);
      
      if (levelCount === 0) {
        reject(new Error("No valid X-coordinate levels found"));
        return;
      }

      // 4. 提取連接
      console.log("🔍 Step 4: Extracting connections...");
      const connections = extractConnectionsWithEnhancedAnalysis(svgElements, allNodes);
      console.log(`Found ${connections.length} connections with enhanced analysis`);

      // 5. 建立父子關係
      console.log("🔍 Step 5: Building parent-child relationships...");
      const parentChildMap = buildParentChildMapWithEnhancedValidation(connections, nodesByLevel, allNodes);
      const parentCount = Object.keys(parentChildMap).length;
      console.log(`Built ${parentCount} parent-child relationships`);

      // 6. 建立層級結構
      console.log("🔍 Step 6: Building hierarchy...");
      const hierarchy = buildEnhancedHierarchyWithDeepLevelSupport(allNodes, parentChildMap, nodesByLevel);
      
      if (!hierarchy || !hierarchy.nodes || hierarchy.nodes.length === 0) {
        reject(new Error("Failed to build valid hierarchy structure"));
        return;
      }

      console.log(`✅ Successfully built hierarchy with ${hierarchy.nodes.length} nodes`);
      resolve(hierarchy);
      
    } catch (error) {
      console.error("❌ Error in extractMindmapWithEnhancedDeepLevelSupport:", error);
      reject(error);
    }
  });
}

// ============= BASIC DIAGNOSTIC FUNCTION =============
function performBasicDiagnostic(svgElements) {
  const diagnostic = [];
  
  try {
    // 檢查 SVG 內容
    svgElements.forEach((svg, index) => {
      const childCount = svg.children.length;
      const textElements = svg.querySelectorAll('text').length;
      const gElements = svg.querySelectorAll('g').length;
      const pathElements = svg.querySelectorAll('path').length;
      
      diagnostic.push(`SVG${index + 1}: children=${childCount}, text=${textElements}, g=${gElements}, path=${pathElements}`);
    });
    
    // 檢查頁面狀態
    const url = window.location.href;
    const isNotebookLM = url.includes('notebooklm.google.com');
    diagnostic.push(`URL: ${isNotebookLM ? 'NotebookLM' : 'Other'}`);
    
    return diagnostic.join('; ');
  } catch (error) {
    return `Diagnostic failed: ${error.message}`;
  }
}

// ============= ENHANCED NODE EXTRACTION =============
function extractAllUniqueNodesEnhanced(svgElements) {
  console.log("🔍 Starting enhanced node extraction...");
  
  const allNodes = [];
  const nodeTextSet = new Set();
  const nodePositionMap = new Map();
  let nodeId = 0;

  svgElements.forEach((svg, svgIndex) => {
    console.log(`🔍 Processing SVG ${svgIndex + 1} for enhanced node detection...`);

    // 更廣泛的節點選擇器
    const nodeSelectors = [
      "g.node",
      'g[class*="node"]',
      "g[transform] text",
      "text.node-name",
      "text[class*='node']",
      "g text",
      "text", // 最廣泛的文本選擇器
      "tspan" // 支持 tspan 元素
    ];

    const foundElements = new Set();

    nodeSelectors.forEach((selector) => {
      try {
        const elements = svg.querySelectorAll(selector);
        console.log(`  ${selector}: found ${elements.length} elements`);
        elements.forEach((element) => foundElements.add(element));
      } catch (error) {
        console.warn(`Error with selector ${selector}:`, error);
      }
    });

    console.log(`  Total unique elements found: ${foundElements.size}`);

    foundElements.forEach((element, index) => {
      try {
        const nodeData = extractEnhancedNodeData(element, nodeId, index);
        if (nodeData && isUniqueNodeEnhanced(nodeData, nodeTextSet, nodePositionMap)) {
          allNodes.push(nodeData);
          nodeTextSet.add(nodeData.text.toLowerCase().trim());
          nodePositionMap.set(
            `${Math.round(nodeData.position.x)}_${Math.round(nodeData.position.y)}`,
            nodeData.id
          );
          nodeId++;
          console.log(`✅ Added enhanced node: "${nodeData.text.substring(0, 30)}..."`);
        }
      } catch (error) {
        console.warn(`Error processing element ${index}:`, error);
      }
    });
  });

  console.log(`✅ Extracted ${allNodes.length} unique nodes total`);
  return allNodes;
}

function extractEnhancedNodeData(element, nodeId, index) {
  let text = "";
  let parentGroup = null;
  let actualElement = element;

  try {
    // Enhanced text extraction with better deep level support
    if (element.tagName?.toLowerCase() === "text" || element.tagName?.toLowerCase() === "tspan") {
      text = element.textContent?.trim() || "";
      parentGroup = element.closest("g.node") || element.closest("g") || element.parentElement;
      actualElement = parentGroup || element;
    } else if (element.tagName?.toLowerCase() === "g") {
      const textElement = element.querySelector("text.node-name") || 
                         element.querySelector("text") ||
                         element.querySelector("tspan");
      if (textElement) {
        text = textElement.textContent?.trim() || "";
        parentGroup = element;
      }
    }

    if (!text || text.length < 1 || !isValidMindmapContentEnhanced(text)) {
      return null;
    }

    // Enhanced position calculation with better error handling
    const position = getEnhancedElementPosition(actualElement);
    if (!position || (position.x === 0 && position.y === 0)) {
      console.warn(`Warning: Invalid position for element with text "${text}"`);
    }
    
    const bounds = calculateEnhancedElementBounds(actualElement, position);
    const connectionPoints = calculateEnhancedConnectionPoints(bounds);

    return {
      id: `node_${nodeId}`,
      text: text,
      position: position,
      bounds: bounds,
      connectionPoints: connectionPoints,
      element: actualElement,
      parentGroup: parentGroup,
      originalIndex: index,
      elementType: "Enhanced SVG Node",
    };
  } catch (error) {
    console.warn(`Error in extractEnhancedNodeData for element ${index}:`, error);
    return null;
  }
}

function isValidMindmapContentEnhanced(text) {
  if (!text || typeof text !== "string") return false;
  
  const trimmed = text.trim();
  if (trimmed.length === 0) return false;
  
  // 排除明顯的非內容元素，但保留更多有效內容
  const invalidPatterns = [
    /^[\s\u00A0]*$/, // 只有空白字符
    /^[^\w\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]*$/, // 只有標點符號（支持日文）
    /^(svg|g|text|path|rect|circle|line|tspan)$/i, // SVG 元素名稱
    /^[\d\s\-_\.]+$/, // 只有數字和符號
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(trimmed));
}

function getEnhancedElementPosition(element) {
  let x = 0, y = 0;

  try {
    // Enhanced transform parsing with better error handling
    const transform = element.getAttribute("transform");
    if (transform) {
      const match = transform.match(/translate\(\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*\)/);
      if (match) {
        x = parseFloat(match[1]) || 0;
        y = parseFloat(match[2]) || 0;
        return { x, y };
      }
    }

    // Fallback methods with enhanced accuracy
    x = parseFloat(element.getAttribute("x") || "0");
    y = parseFloat(element.getAttribute("y") || "0");

    if (x === 0 && y === 0) {
      try {
        const rect = element.getBoundingClientRect();
        const svgRect = element.closest("svg")?.getBoundingClientRect();
        if (rect && svgRect) {
          x = rect.left - svgRect.left;
          y = rect.top - svgRect.top;
        }
      } catch (error) {
        console.warn("Could not get enhanced element position:", error);
      }
    }
  } catch (error) {
    console.warn("Error in getEnhancedElementPosition:", error);
  }

  return { x, y };
}

function calculateEnhancedElementBounds(element, position) {
  let bounds = null;

  try {
    const rectElement = element.querySelector("rect");
    if (rectElement) {
      const x = parseFloat(rectElement.getAttribute("x") || "0") + position.x;
      const y = parseFloat(rectElement.getAttribute("y") || "0") + position.y;
      const width = parseFloat(rectElement.getAttribute("width") || "0");
      const height = parseFloat(rectElement.getAttribute("height") || "0");

      bounds = {
        left: x,
        top: y,
        right: x + width,
        bottom: y + height,
        width: width,
        height: height,
        centerX: x + width / 2,
        centerY: y + height / 2,
      };
    }
  } catch (error) {
    console.warn("Error getting enhanced rect bounds:", error);
  }

  // Enhanced fallback to getBBox
  if (!bounds) {
    try {
      if (element.getBBox && typeof element.getBBox === "function") {
        const bbox = element.getBBox();
        bounds = {
          left: bbox.x + position.x,
          top: bbox.y + position.y,
          right: bbox.x + bbox.width + position.x,
          bottom: bbox.y + bbox.height + position.y,
          width: bbox.width,
          height: bbox.height,
          centerX: bbox.x + bbox.width / 2 + position.x,
          centerY: bbox.y + bbox.height / 2 + position.y,
        };
      }
    } catch (error) {
      console.warn("Error with enhanced getBBox:", error);
    }
  }

  // Enhanced final fallback with better default values
  if (!bounds) {
    bounds = {
      left: position.x - 20,
      top: position.y - 16,
      right: position.x + 20,
      bottom: position.y + 16,
      width: 40,
      height: 32,
      centerX: position.x,
      centerY: position.y,
    };
  }

  return bounds;
}

function calculateEnhancedConnectionPoints(bounds) {
  if (!bounds) return [];

  return [
    { x: bounds.left, y: bounds.centerY, side: "left" },
    { x: bounds.right, y: bounds.centerY, side: "right" },
    { x: bounds.centerX, y: bounds.top, side: "top" },
    { x: bounds.centerX, y: bounds.bottom, side: "bottom" },
    { x: bounds.centerX, y: bounds.centerY, side: "center" },
  ];
}

function isUniqueNodeEnhanced(nodeData, nodeTextSet, nodePositionMap) {
  const textKey = nodeData.text.toLowerCase().trim();
  const positionKey = `${Math.round(nodeData.position.x)}_${Math.round(nodeData.position.y)}`;

  // Enhanced text duplicate check - more lenient for short content
  if (nodeTextSet.has(textKey) && textKey.length > 2) {
    console.log(`🔄 Enhanced: Text duplicate detected: "${textKey}"`);
    return false;
  }

  // Enhanced position duplicate check with adaptive tolerance
  const tolerance = textKey.length <= 3 ? 3 : 5;
  for (let [existingPosKey, existingNodeId] of nodePositionMap) {
    const [existingX, existingY] = existingPosKey.split("_").map(Number);
    const currentX = Math.round(nodeData.position.x);
    const currentY = Math.round(nodeData.position.y);

    const distance = Math.sqrt((currentX - existingX) ** 2 + (currentY - existingY) ** 2);

    if (distance <= tolerance) {
      console.log(`🔄 Enhanced: Position duplicate detected: distance ${distance} <= ${tolerance}`);
      return false;
    }
  }

  return true;
}

// ============= ENHANCED X-COORDINATE LEVEL GROUPING =============
function groupNodesByXCoordinateLevelEnhanced(nodes) {
  console.log("📊 ENHANCED: Grouping nodes by X-coordinate levels with deep level support...");

  const nodesByLevel = {};
  const tolerance = 20;

  nodes.forEach((node) => {
    const x = Math.round(node.position.x / tolerance) * tolerance;
    if (!nodesByLevel[x]) {
      nodesByLevel[x] = [];
    }
    nodesByLevel[x].push(node);
  });

  // Sort X levels from left to right
  const sortedXLevels = Object.keys(nodesByLevel)
    .map((x) => parseFloat(x))
    .sort((a, b) => a - b);

  console.log("🎯 ENHANCED X-coordinate hierarchy levels:");
  sortedXLevels.forEach((x, levelIndex) => {
    const count = nodesByLevel[x].length;
    console.log(`  Level ${levelIndex}: X=${x}, Nodes=${count}`);
    if (levelIndex >= 5) {
      console.log(`    🔍 DEEP LEVEL ${levelIndex} detected with ${count} nodes`);
    }
    nodesByLevel[x].forEach((node) => {
      console.log(`    - "${node.text.substring(0, 30)}..."`);
    });
  });

  return nodesByLevel;
}

// ============= ENHANCED HIERARCHY BUILDING WITH DEEP LEVEL SUPPORT =============
function buildEnhancedHierarchyWithDeepLevelSupport(allNodes, parentChildMap, nodesByLevel) {
  console.log("🏗️ ENHANCED: Building hierarchy with deep level support (up to 8 levels)...");

  if (allNodes.length === 0) {
    throw new Error("No nodes available for enhanced hierarchy building");
  }

  const rootNode = findRootNodeByXLevelEnhanced(nodesByLevel);
  
  if (!rootNode) {
    console.warn("⚠️ No root node found by X-level, attempting fallback methods...");
    return buildFallbackHierarchy(allNodes, nodesByLevel);
  }
  
  console.log(`🎯 ENHANCED root node identified: "${rootNode.text}"`);

  // 使用完整的 BFS 算法建構多層級結構
  const hierarchy = buildHierarchyBFSWithEnhancedDeepLevelSupport(allNodes, rootNode, parentChildMap, nodesByLevel);
  
  console.log(`✅ Built ENHANCED hierarchy with ${hierarchy.nodes.length} unique nodes, max level: ${hierarchy.maxLevel}`);
  return hierarchy;
}

function buildFallbackHierarchy(allNodes, nodesByLevel) {
  console.log("🔄 Building fallback hierarchy based on X-coordinate levels...");
  
  // 根據 X 坐標建立層級結構
  const xLevels = Object.keys(nodesByLevel)
    .map((x) => parseFloat(x))
    .filter((x) => !isNaN(x))
    .sort((a, b) => a - b);
  
  if (xLevels.length === 0) {
    // 最後的後備方案：扁平結構
    const firstNode = allNodes[0];
    return {
      nodes: allNodes.map((node, index) => ({
        id: node.id,
        text: node.text,
        parentId: index === 0 ? null : firstNode.id,
        level: index === 0 ? 0 : 1,
        originalIndex: node.originalIndex,
      })),
      totalNodes: allNodes.length,
      maxLevel: 1,
      extractionMethod: "Fallback Flat Structure",
      rootNode: firstNode,
    };
  }
  
  const hierarchyNodes = [];
  let previousLevelNodes = [];
  
  xLevels.forEach((xLevel, levelIndex) => {
    const nodesAtLevel = nodesByLevel[xLevel];
    console.log(`Processing level ${levelIndex} with ${nodesAtLevel.length} nodes at X=${xLevel}`);
    
    nodesAtLevel.forEach((node, nodeIndex) => {
      let parentId = null;
      
      if (levelIndex === 0) {
        // 根節點
        parentId = null;
      } else if (previousLevelNodes.length > 0) {
        // 選擇最近的父節點（基於 Y 坐標）
        const closestParent = previousLevelNodes.reduce((closest, parent) => {
          const currentDistance = Math.abs(node.position.y - parent.position.y);
          const closestDistance = Math.abs(node.position.y - closest.position.y);
          return currentDistance < closestDistance ? parent : closest;
        });
        parentId = closestParent.id;
      }
      
      hierarchyNodes.push({
        id: node.id,
        text: node.text,
        parentId: parentId,
        level: levelIndex,
        originalIndex: node.originalIndex,
      });
    });
    
    previousLevelNodes = nodesAtLevel;
  });
  
  const maxLevel = Math.max(...hierarchyNodes.map(n => n.level));
  const rootNode = hierarchyNodes.find(n => n.level === 0) || hierarchyNodes[0];
  
  return {
    nodes: hierarchyNodes,
    totalNodes: hierarchyNodes.length,
    maxLevel: maxLevel,
    extractionMethod: "Fallback X-Level Based Structure",
    rootNode: rootNode,
  };
}

function buildHierarchyBFSWithEnhancedDeepLevelSupport(allNodes, rootNode, parentChildMap, nodesByLevel) {
  console.log("🌳 ENHANCED: Building hierarchy using BFS with deep level support (up to 8 levels)...");

  const hierarchyNodes = [];
  const processedNodes = new Set();
  const nodeIdToHierarchyIndex = new Map();
  const queue = [{ nodeId: rootNode.id, level: 0, parentId: null }];
  const xLevels = Object.keys(nodesByLevel)
    .map((x) => parseFloat(x))
    .sort((a, b) => a - b);

  // Add root
  hierarchyNodes.push({
    id: rootNode.id,
    text: rootNode.text,
    parentId: null,
    level: 0,
    originalIndex: rootNode.originalIndex,
  });
  processedNodes.add(rootNode.id);
  nodeIdToHierarchyIndex.set(rootNode.id, 0);

  // Enhanced BFS traversal with deep level support (up to 8 levels)
  while (queue.length > 0) {
    const { nodeId, level, parentId } = queue.shift();
    
    // 限制最大層級到 8 層
    if (level >= 8) {
      console.log(`🛑 Reached maximum level limit (8), stopping traversal`);
      continue;
    }
    
    const childIds = parentChildMap[nodeId] || [];

    console.log(`🔍 ENHANCED: Processing level ${level} node "${allNodes.find((n) => n.id === nodeId)?.text?.substring(0, 20)}..." with ${childIds.length} children`);

    childIds.forEach((childId) => {
      if (!processedNodes.has(childId)) {
        const childNode = allNodes.find((n) => n.id === childId);
        if (childNode) {
          const parentNode = allNodes.find((n) => n.id === nodeId);
          const parentLevelIndex = xLevels.findIndex((x) => Math.abs(x - parentNode.position.x) <= 20);
          const childLevelIndex = xLevels.findIndex((x) => Math.abs(x - childNode.position.x) <= 20);

          // Enhanced validation with special deep level handling
          if (parentLevelIndex >= 0 && childLevelIndex >= 0 && 
              childLevelIndex === parentLevelIndex + 1 && 
              level < 8) { // 限制到 8 層
            
            // 特殊的深層級驗證
            if (level >= 5) {
              console.log(`🔍 DEEP LEVEL PROCESSING: Level ${level + 1} - Enhanced validation for "${childNode.text}"`);
              
              // 檢查循環引用
              if (hasCircularReferenceEnhanced(childId, parentNode, hierarchyNodes, allNodes)) {
                console.warn(`⚠️ DEEP LEVEL: Circular reference detected at level ${level + 1}, skipping "${childNode.text}"`);
                return;
              }
              
              // 深層級的坐標驗證 - 更寬鬆的條件
              if (!validateDeepLevelCoordinates(childNode, parentNode, level)) {
                console.warn(`⚠️ DEEP LEVEL: Invalid coordinates at level ${level + 1}, skipping "${childNode.text}"`);
                return;
              }
              
              // 深層級的子節點數量限制 - 更寬鬆
              if (!validateDeepLevelChildCount(nodeId, hierarchyNodes, level)) {
                console.warn(`⚠️ DEEP LEVEL: Too many children at level ${level + 1}, skipping "${childNode.text}"`);
                return;
              }
              
              console.log(`✅ DEEP LEVEL: Validation passed for level ${level + 1} node "${childNode.text}"`);
            }

            // 確保不會重複添加節點
            if (nodeIdToHierarchyIndex.has(childId)) {
              console.warn(`⚠️ ENHANCED: Attempted to add duplicate node: "${childNode.text}"`);
              return;
            }

            const hierarchyIndex = hierarchyNodes.length;
            hierarchyNodes.push({
              id: childId,
              text: childNode.text,
              parentId: nodeId,
              level: level + 1,
              originalIndex: childNode.originalIndex,
            });

            processedNodes.add(childId);
            nodeIdToHierarchyIndex.set(childId, hierarchyIndex);
            queue.push({ nodeId: childId, level: level + 1, parentId: nodeId });

            console.log(`✅ ENHANCED: Added level ${level + 1} node: "${childNode.text}"`);
          } else {
            console.warn(`⚠️ ENHANCED: Invalid level transition: ${parentLevelIndex} → ${childLevelIndex} at level ${level + 1}`);
          }
        }
      }
    });
  }

  const maxLevel = Math.max(...hierarchyNodes.map(n => n.level));
  
  return {
    nodes: hierarchyNodes,
    totalNodes: hierarchyNodes.length,
    maxLevel: maxLevel,
    extractionMethod: "Enhanced Deep Level BFS (8 levels max)",
    rootNode: rootNode,
  };
}

function hasCircularReferenceEnhanced(childId, parentNode, hierarchyNodes, allNodes) {
  let currentParent = parentNode;
  let depth = 0;
  const maxDepthCheck = 15;

  while (currentParent && depth < maxDepthCheck) {
    if (currentParent.id === childId) {
      return true;
    }
    
    const parentInHierarchy = hierarchyNodes.find(h => h.id === currentParent.id);
    if (parentInHierarchy && parentInHierarchy.parentId) {
      currentParent = allNodes.find(n => n.id === parentInHierarchy.parentId);
    } else {
      break;
    }
    depth++;
  }
  
  return false;
}

function validateDeepLevelCoordinates(childNode, parentNode, level) {
  const xDiff = Math.abs(childNode.position.x - parentNode.position.x);
  const yDiff = Math.abs(childNode.position.y - parentNode.position.y);
  
  // 深層級使用更寬鬆的坐標驗證
  const minXDiff = level >= 6 ? 15 : 20;
  const maxYDiff = level >= 6 ? 400 : 300;
  
  return xDiff >= minXDiff && yDiff <= maxYDiff;
}

function validateDeepLevelChildCount(nodeId, hierarchyNodes, level) {
  const currentChildCount = hierarchyNodes.filter(h => h.parentId === nodeId).length;
  const maxChildren = level >= 6 ? 40 : 30;
  
  return currentChildCount < maxChildren;
}

function findRootNodeByXLevelEnhanced(nodesByLevel) {
  const xLevels = Object.keys(nodesByLevel)
    .map((x) => parseFloat(x))
    .filter((x) => !isNaN(x))
    .sort((a, b) => a - b);
  
  if (xLevels.length === 0) {
    console.error("❌ No valid X-levels found in nodesByLevel");
    return null;
  }
  
  const rootX = xLevels[0];
  const rootCandidates = nodesByLevel[rootX];

  if (!rootCandidates || rootCandidates.length === 0) {
    console.error(`❌ No root candidates found at X-coordinate: ${rootX}`);
    return null;
  }

  console.log(`🎯 ENHANCED Root X-coordinate: ${rootX}, Candidates: ${rootCandidates.length}`);

  if (rootCandidates.length === 1) {
    return rootCandidates[0];
  }

  // Choose the most central candidate vertically
  const centerY = rootCandidates.reduce((sum, node) => sum + node.position.y, 0) / rootCandidates.length;

  return rootCandidates.reduce((closest, node) => {
    const distFromCenter = Math.abs(node.position.y - centerY);
    const closestDist = Math.abs(closest.position.y - centerY);
    return distFromCenter < closestDist ? node : closest;
  });
}

// ============= ENHANCED CONNECTION AND PARENT-CHILD FUNCTIONS =============
function extractConnectionsWithEnhancedAnalysis(svgElements, nodes) {
  console.log("🔗 ENHANCED: Extracting connections with deep level analysis...");

  const connections = [];

  svgElements.forEach((svg) => {
    const connectionElements = [
      ...Array.from(svg.querySelectorAll("path.link")),
      ...Array.from(svg.querySelectorAll("path")),
      ...Array.from(svg.querySelectorAll("line")),
      ...Array.from(svg.querySelectorAll("polyline")),
    ];

    console.log(`Found ${connectionElements.length} potential connection elements`);

    connectionElements.forEach((connElement) => {
      try {
        const connectionData = analyzeConnectionWithEnhancedLogic(connElement, nodes);
        if (connectionData) {
          connections.push(connectionData);
        }
      } catch (error) {
        console.warn("Error analyzing enhanced connection element:", error);
      }
    });
  });

  console.log(`✅ Analyzed ${connections.length} valid connections with enhanced logic`);
  return connections;
}

function analyzeConnectionWithEnhancedLogic(connElement, nodes) {
  const tagName = connElement.tagName.toLowerCase();
  let startPoint = null;
  let endPoint = null;

  if (tagName === "path") {
    const pathPoints = parseEnhancedPathData(connElement.getAttribute("d"));
    if (pathPoints.length >= 2) {
      startPoint = pathPoints[0];
      endPoint = pathPoints[pathPoints.length - 1];
    }
  } else if (tagName === "line") {
    startPoint = {
      x: parseFloat(connElement.getAttribute("x1") || "0"),
      y: parseFloat(connElement.getAttribute("y1") || "0"),
    };
    endPoint = {
      x: parseFloat(connElement.getAttribute("x2") || "0"),
      y: parseFloat(connElement.getAttribute("y2") || "0"),
    };
  } else if (tagName === "polyline") {
    const points = parseEnhancedPointsAttribute(connElement.getAttribute("points"));
    if (points.length >= 2) {
      startPoint = points[0];
      endPoint = points[points.length - 1];
    }
  }

  if (!startPoint || !endPoint) {
    return null;
  }

  // Enhanced connection detection with increased tolerance for deep levels
  const parentNode = findNodeByRightCenterConnectionEnhanced(startPoint, nodes);
  const childNode = findNodeByLeftCenterConnectionEnhanced(endPoint, nodes);

  if (parentNode && childNode && parentNode.id !== childNode.id) {
    if (childNode.position.x > parentNode.position.x) {
      console.log(`🔗 ENHANCED Connection: "${parentNode.text.substring(0, 20)}..." → "${childNode.text.substring(0, 20)}..."`);

      return {
        parentNode: parentNode,
        childNode: childNode,
        startPoint: startPoint,
        endPoint: endPoint,
        element: connElement,
        type: tagName,
        direction: "parent-to-child",
      };
    }
  }

  return null;
}

function findNodeByRightCenterConnectionEnhanced(startPoint, nodes, tolerance = 60) {
  return nodes.find((node) => {
    if (!node.connectionPoints) return false;

    const rightCenter = node.connectionPoints.find((cp) => cp.side === "right");
    if (rightCenter) {
      const distance = Math.sqrt(
        (startPoint.x - rightCenter.x) ** 2 + (startPoint.y - rightCenter.y) ** 2
      );
      if (distance <= tolerance) {
        console.log(`🎯 ENHANCED: Found parent node "${node.text.substring(0, 20)}..." at right center (distance: ${Math.round(distance)})`);
        return true;
      }
    }
    return false;
  });
}

function findNodeByLeftCenterConnectionEnhanced(endPoint, nodes, tolerance = 60) {
  return nodes.find((node) => {
    if (!node.connectionPoints) return false;

    const leftCenter = node.connectionPoints.find((cp) => cp.side === "left");
    if (leftCenter) {
      const distance = Math.sqrt(
        (endPoint.x - leftCenter.x) ** 2 + (endPoint.y - leftCenter.y) ** 2
      );
      if (distance <= tolerance) {
        console.log(`🎯 ENHANCED: Found child node "${node.text.substring(0, 20)}..." at left center (distance: ${Math.round(distance)})`);
        return true;
      }
    }
    return false;
  });
}

function parseEnhancedPathData(pathData) {
  if (!pathData) return [];

  const points = [];
  const commands = pathData.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];

  let currentX = 0, currentY = 0;

  commands.forEach((command) => {
    const type = command[0];
    const coords = command
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(parseFloat)
      .filter((n) => !isNaN(n));

    switch (type.toUpperCase()) {
      case "M":
        if (coords.length >= 2) {
          currentX = type === "M" ? coords[0] : currentX + coords[0];
          currentY = type === "M" ? coords[1] : currentY + coords[1];
          points.push({ x: currentX, y: currentY });
        }
        break;
      case "L":
        if (coords.length >= 2) {
          currentX = type === "L" ? coords[0] : currentX + coords[0];
          currentY = type === "L" ? coords[1] : currentY + coords[1];
          points.push({ x: currentX, y: currentY });
        }
        break;
      case "C":
        if (coords.length >= 6) {
          currentX = type === "C" ? coords[4] : currentX + coords[4];
          currentY = type === "C" ? coords[5] : currentY + coords[5];
          points.push({ x: currentX, y: currentY });
        }
        break;
      case "H":
        if (coords.length >= 1) {
          currentX = type === "H" ? coords[0] : currentX + coords[0];
          points.push({ x: currentX, y: currentY });
        }
        break;
      case "V":
        if (coords.length >= 1) {
          currentY = type === "V" ? coords[0] : currentY + coords[0];
          points.push({ x: currentX, y: currentY });
        }
        break;
    }
  });

  return points;
}

function parseEnhancedPointsAttribute(pointsAttr) {
  if (!pointsAttr) return [];

  const coords = pointsAttr
    .trim()
    .split(/[\s,]+/)
    .map(parseFloat)
    .filter((n) => !isNaN(n));
  const points = [];

  for (let i = 0; i < coords.length; i += 2) {
    if (i + 1 < coords.length) {
      points.push({ x: coords[i], y: coords[i + 1] });
    }
  }

  return points;
}

function buildParentChildMapWithEnhancedValidation(connections, nodesByLevel, allNodes) {
  console.log("🔗 ENHANCED: Building parent-child map with deep level validation...");

  const parentChildMap = {};
  const childToParentMap = new Map();
  const xLevels = Object.keys(nodesByLevel)
    .map((x) => parseFloat(x))
    .sort((a, b) => a - b);

  console.log(`Available X-levels: ${xLevels.join(", ")} (Total: ${xLevels.length} levels)`);

  connections.forEach((conn) => {
    if (conn.direction === "parent-to-child") {
      const parentX = conn.parentNode.position.x;
      const childX = conn.childNode.position.x;

      // Enhanced level matching with better tolerance for deep hierarchies
      const parentLevelIndex = xLevels.findIndex((x) => Math.abs(x - parentX) <= 20);
      const childLevelIndex = xLevels.findIndex((x) => Math.abs(x - childX) <= 20);

      // Enhanced validation for deep hierarchies (up to 8 levels)
      if (parentLevelIndex >= 0 && childLevelIndex >= 0 && childLevelIndex === parentLevelIndex + 1) {
        const parentId = conn.parentNode.id;
        const childId = conn.childNode.id;

        // Enhanced parent selection logic
        if (childToParentMap.has(childId)) {
          const existingParentId = childToParentMap.get(childId);
          const existingParent = allNodes.find((n) => n.id === existingParentId);

          if (shouldReplaceParentWithEnhancedLogic(existingParent, conn.parentNode, conn.childNode, parentLevelIndex)) {
            console.log(`🔄 ENHANCED: Replacing parent for "${conn.childNode.text}": "${existingParent.text}" → "${conn.parentNode.text}"`);

            // Remove from old parent
            if (parentChildMap[existingParentId]) {
              parentChildMap[existingParentId] = parentChildMap[existingParentId].filter((id) => id !== childId);
            }

            // Add to new parent
            if (!parentChildMap[parentId]) {
              parentChildMap[parentId] = [];
            }
            parentChildMap[parentId].push(childId);
            childToParentMap.set(childId, parentId);
          }
        } else {
          // Child doesn't have a parent yet
          if (!parentChildMap[parentId]) {
            parentChildMap[parentId] = [];
          }
          parentChildMap[parentId].push(childId);
          childToParentMap.set(childId, parentId);

          console.log(`✅ ENHANCED: Level ${parentLevelIndex} → Level ${childLevelIndex}: "${conn.parentNode.text}" → "${conn.childNode.text}"`);
        }
      } else {
        console.warn(`⚠️ ENHANCED: Invalid level connection: Level ${parentLevelIndex} → Level ${childLevelIndex}`);
      }
    }
  });

  console.log(`🔗 ENHANCED Parent-child relationships: ${Object.keys(parentChildMap).length} parents`);
  return parentChildMap;
}

function shouldReplaceParentWithEnhancedLogic(existingParent, newParent, childNode, levelIndex) {
  // Enhanced logic with special handling for deep levels
  const isDeepLevel = levelIndex >= 5;
  
  // For deep levels, be more conservative about parent replacement
  if (isDeepLevel) {
    const existingXDiff = Math.abs(childNode.position.x - existingParent.position.x);
    const newXDiff = Math.abs(childNode.position.x - newParent.position.x);
    
    // Only replace if new parent is significantly closer
    return newXDiff < existingXDiff * 0.8;
  }

  // Standard logic for shallow levels
  const existingXDiff = Math.abs(childNode.position.x - existingParent.position.x);
  const newXDiff = Math.abs(childNode.position.x - newParent.position.x);

  if (Math.abs(existingXDiff - newXDiff) > 50) {
    return newXDiff < existingXDiff;
  }

  const existingYDiff = Math.abs(childNode.position.y - existingParent.position.y);
  const newYDiff = Math.abs(childNode.position.y - newParent.position.y);

  if (Math.abs(existingYDiff - newYDiff) > 30) {
    return newYDiff < existingYDiff;
  }

  return false;
}

// ============= DEBUG AND UTILITY FUNCTIONS =============
function performEnhancedDebugExtraction() {
  console.log("🛠️ Starting enhanced debug extraction...");
  
  try {
    const svgElements = document.querySelectorAll("svg");
    const allNodes = extractAllUniqueNodesEnhanced(svgElements);
    const nodesByLevel = groupNodesByXCoordinateLevelEnhanced(allNodes);
    const connections = extractConnectionsWithEnhancedAnalysis(svgElements, allNodes);
    
    globalDebugData = {
      svgElements: Array.from(svgElements),
      allNodes: allNodes,
      nodesByLevel: nodesByLevel,
      connections: connections,
      extractionMethod: "Enhanced Deep Level Debug v5.4",
    };
    
    return {
      success: true,
      totalNodes: allNodes.length,
      totalLevels: Object.keys(nodesByLevel).length,
      totalConnections: connections.length,
      maxLevel: Math.max(...allNodes.map(n => {
        const xLevels = Object.keys(nodesByLevel).map(x => parseFloat(x)).sort((a, b) => a - b);
        return xLevels.findIndex(x => Math.abs(x - n.position.x) <= 20);
      })),
      debugData: globalDebugData,
    };
  } catch (error) {
    console.error("❌ Debug extraction error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

function extractWithEnhancedHierarchy(rootNodeId) {
  console.log("✅ Extracting with enhanced hierarchy from root:", rootNodeId);
  
  if (!globalDebugData) {
    throw new Error("No debug data available. Please run debug extraction first.");
  }
  
  const selectedRoot = globalDebugData.allNodes.find(n => n.id === rootNodeId);
  if (!selectedRoot) {
    throw new Error(`Root node with ID ${rootNodeId} not found`);
  }
  
  const parentChildMap = buildParentChildMapWithEnhancedValidation(
    globalDebugData.connections,
    globalDebugData.nodesByLevel,
    globalDebugData.allNodes
  );
  
  const hierarchy = buildEnhancedHierarchyWithDeepLevelSupport(
    globalDebugData.allNodes,
    parentChildMap,
    globalDebugData.nodesByLevel
  );
  
  return hierarchy;
}