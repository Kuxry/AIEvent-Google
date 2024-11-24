document.getElementById("generate").addEventListener("click", () => {
    console.log("Generate button clicked.");
  
    // 从当前活动标签页提取内容
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!tabs || tabs.length === 0) {
        alert("No active tab found.");
        console.error("No active tab found.");
        return;
      }
  
      chrome.scripting.executeScript(
        { target: { tabId: tabs[0].id }, files: ["content.js"] },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Failed to inject content script:", chrome.runtime.lastError);
            alert(`Failed to inject content script: ${chrome.runtime.lastError.message}`);
            return;
          }
  
          chrome.tabs.sendMessage(tabs[0].id, { action: "extractPageContent" }, response => {
            if (chrome.runtime.lastError) {
              console.error("Error communicating with content script:", chrome.runtime.lastError);
              alert(`Error extracting content: ${chrome.runtime.lastError.message}`);
              return;
            }
  
            if (!response || !response.content) {
              alert("No content extracted from the page.");
              console.error("Response from content script is empty or invalid:", response);
              return;
            }
  
            console.log("Extracted page content:", response.content);
  
            // 调用后台服务生成事件
            chrome.runtime.sendMessage(
              { action: "generateEvent", content: response.content },
              result => {
                if (chrome.runtime.lastError) {
                  console.error("Error communicating with background script:", chrome.runtime.lastError);
                  alert(`Failed to generate event: ${chrome.runtime.lastError.message}`);
                  return;
                }
  
                if (!result) {
                  alert("No response from background script.");
                  console.error("Background script returned an undefined response.");
                  return;
                }
  
                if (result.success) {
                  displayGeneratedText(result.generatedText); // 显示生成的文本
                } else {
                  alert(`Error: ${result.error}`);
                }
              }
            );
          });
        }
      );
    });
  });
  
  function displayGeneratedText(text) {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = ""; // 清空之前的内容
  
    // 显示生成的文本，支持多段文本
    const lines = text.split("\n");
    lines.forEach(line => {
      const paragraph = document.createElement("p");
      paragraph.textContent = line;
      eventsContainer.appendChild(paragraph);
    });
  }
  