
  async function fetchChatGPTResponse(content) {
    const apiKey = "your-key"
    try {
      console.log("Preparing to send request to ChatGPT API...");
  
      const cleanedContent = content
        .replace(/\s+/g, " ") // 替换多余空格
        .replace(/<[^>]*>/g, "") // 去掉 HTML 标签
        .slice(0, 2000); // 限制内容长度
  
      const requestBody = {
        model: "gpt-4o",
        max_tokens: 1000,
        messages: [
          { role: "system", content: "你是一名生成事件的助手，请用自然语言总结内容。" },
          { role: "user", content: `以下是内容，请提取日期信息并返回文字描述：\n\n${cleanedContent}` }
        ]
      };
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`API Error: ${response.status} - ${response.statusText}`, errorDetails);
        throw new Error(`API Error: ${response.status} - ${response.statusText}\nDetails: ${errorDetails}`);
      }
  
      const data = await response.json();
      const rawContent = data.choices[0].message.content.trim();
  
      // 清理并保留多语言字符
      const cleanedOutput = rawContent.replace(/[^\x20-\x7E\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7A3]/g, "");
      console.log("Cleaned ChatGPT Response:", cleanedOutput);
  
      return cleanedOutput;
  
    } catch (error) {
      console.error("Error in fetchChatGPTResponse:", error);
      throw new Error(error.message || "An unknown error occurred while fetching ChatGPT response");
    }
  }

  

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "generateEvent") {
      fetchChatGPTResponse(message.content)
        .then(responseText => {
          sendResponse({ success: true, generatedText: responseText }); // 返回生成的文本
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // 保持异步连接
    } else if (message.action === "createCalendarEvent") {
      createCalendarEvent(message.eventDetails)
        .then((eventLink) => {
          sendResponse({ success: true, eventLink });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true;
    }
  });
  
  async function getOAuthToken() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, token => {
        if (chrome.runtime.lastError || !token) {
          console.error("Failed to get OAuth token:", chrome.runtime.lastError);
          reject(new Error("Failed to get OAuth token"));
        } else {
          resolve(token);
        }
      });
    });
  }
  
  async function createCalendarEvent(eventDetails) {
    try {
      const token = await getOAuthToken();
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          summary: eventDetails.eventTitle,
          description: eventDetails.eventDescription,
          location: eventDetails.eventLocation,
          start: {
            dateTime: eventDetails.startDateTime,
            timeZone: "Asia/Tokyo" // 替换为用户的实际时区
          },
          end: {
            dateTime: eventDetails.endDateTime,
            timeZone: "Asia/Tokyo"
          }
        })
      });
    
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to create event: ${response.status} - ${response.statusText}`, errorDetails);
        throw new Error(`Failed to create event: ${response.statusText}`);
      }
    
      const event = await response.json();
      console.log("Event created:", event);
      return event.htmlLink; // 返回事件链接
    } catch (error) {
      console.error("Error creating Google Calendar event:", error);
      throw error;
    }
  }
  
  