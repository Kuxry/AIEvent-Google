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
  
                  // 将生成的事件添加到 Google 日历
                  const eventDetails = parseGeneratedTextToEventDetails(result.generatedText);
                  addEventToGoogleCalendar(eventDetails);
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
  

  // 绑定 "添加到谷歌日历" 按钮事件
document.getElementById("add-to-calendar").addEventListener("click", () => {
    console.log("Add to Google Calendar button clicked.");
    
    // 假设生成的事件存储在变量 `generatedEventDetails`
    const generatedEventDetails = {
      startDateTime: "2024-11-30T10:00:00Z", // 示例时间，替换为实际生成的事件时间
      endDateTime: "2024-11-30T12:00:00Z",
      eventTitle: "示例事件",
      eventDescription: "这是一个从 ChatGPT 生成的事件。",
      eventLocation: "在线会议"
    };
  
    // 发送消息到后台服务以创建 Google 日历事件
    chrome.runtime.sendMessage(
      { action: "createCalendarEvent", eventDetails: generatedEventDetails },
      response => {
        if (chrome.runtime.lastError) {
          console.error("Error communicating with background script:", chrome.runtime.lastError);
          alert(`Failed to add event to Google Calendar: ${chrome.runtime.lastError.message}`);
          return;
        }
  
        if (!response || !response.success) {
          alert(`Error: ${response.error}`);
          return;
        }
  
        alert("Event successfully added to Google Calendar!");
      }
    );
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
  
  // 解析生成的文本为事件详情
  function parseGeneratedTextToEventDetails(generatedText) {
    // 假设生成的文本格式如下：
    // "会议时间：2024-11-25 10:00 AM\n地点：会议室 A\n主题：年度规划讨论"
    const lines = generatedText.split("\n");
    return {
      eventTitle: lines.find(line => line.startsWith("主题："))?.replace("主题：", "").trim() || "无标题事件",
      eventDescription: generatedText,
      eventLocation: lines.find(line => line.startsWith("地点："))?.replace("地点：", "").trim() || "未指定地点",
      startDateTime: "2024-11-25T10:00:00Z", // 替换为解析后的实际时间
      endDateTime: "2024-11-25T11:00:00Z" // 替换为解析后的实际时间
    };
  }
  
  // 添加事件到 Google 日历
  function addEventToGoogleCalendar(eventDetails) {
    chrome.runtime.sendMessage(
      { action: "createCalendarEvent", eventDetails },
      response => {
        if (chrome.runtime.lastError) {
          alert(`Error: ${chrome.runtime.lastError.message}`);
          return;
        }
  
        if (response.success) {
          alert(`Event added to calendar! View it here: ${response.eventLink}`);
          window.open(response.eventLink, "_blank"); // 打开 Google Calendar 事件页面
        } else {
          alert(`Failed to add event: ${response.error}`);
        }
      }
    );
  }
  