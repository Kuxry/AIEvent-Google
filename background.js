async function fetchChatGPTResponse(content) {
    const apiKey = "api-key";
    
    try {
      console.log("Preparing to send request to ChatGPT API...");
  
      const cleanedContent = content
        .replace(/\s+/g, " ") // 去掉多余的空格
        .replace(/<[^>]*>/g, "") // 去掉 HTML 标签
        .slice(0, 2000); // 限制长度
  
      const requestBody = {
        model: "gpt-4",
        max_tokens: 1000, // 限制输出 token 数量
        messages: [
          { role: "system", content: "你是一名生成事件的助手。" },
          { role: "user", content: `解析以下页面内容并生成事件：${cleanedContent}` }
        ]
      };
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
  
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
      console.log("Full API Response:", JSON.stringify(data, null, 2));
  
      if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("No valid choices returned from ChatGPT API");
      }
  
      return data.choices[0].message.content.trim();
  
    } catch (error) {
      console.error("Error in fetchChatGPTResponse:", error);
      throw new Error(error.message || "An unknown error occurred while fetching ChatGPT response");
    }
  }
  
  
  // 监听消息的部分
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message in background.js:", message);
  
    if (message.action === "generateEvent") {
      console.log("Processing generateEvent action...");
  
      // 调用 fetchChatGPTResponse 函数处理内容
      fetchChatGPTResponse(message.content)
        .then(event => {
          console.log("Generated Event from ChatGPT:", event);
          sendResponse({ success: true, event }); // 成功响应事件
        })
        .catch(error => {
          console.error("Error generating event:", error);
          sendResponse({ success: false, error: error.message }); // 返回错误
        });
  
      return true; // 必须返回 true，保持异步连接
    }
  });
  