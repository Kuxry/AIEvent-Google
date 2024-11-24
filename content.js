// 从整个页面读取 HTML 内容
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractPageContent") {
      const pageContent = document.documentElement.outerHTML; // 获取页面 HTML
      sendResponse({ content: pageContent });
    }
  });
  