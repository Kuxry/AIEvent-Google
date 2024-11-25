# AIEvent-Google

# **Event Generator with AI MOdel**

**Event Generator with ChatGPT** is a Chrome extension that extracts content from web pages, processes the extracted data using ChatGPT, and generates meaningful events that can be added to your Google Calendar.

## **Features**
- Extracts content from the currently active web page.
- Utilizes ChatGPT to analyze the content and generate event suggestions.
- Supports multi-language input (English, Chinese, Japanese, etc.).
- Seamlessly integrates with Google Calendar to add events directly from the extension.
- Provides a simple and user-friendly interface.

## **Installation**

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/your-repo/event-generator-with-chatgpt.git
   ```

2. **Enable Developer Mode in Chrome:**
   - Open Chrome and go to `chrome://extensions/`.
   - Toggle the "Developer mode" switch in the top-right corner.

3. **Load the Extension:**
   - Click "Load unpacked."
   - Select the folder containing this extension's files.

4. **Add Required OAuth Client:**
   - Create an OAuth Client in the [Google Cloud Console](https://console.cloud.google.com/).
   - Select "Chrome App" or "Web Application" as the application type.
   - Use the provided extension ID for the redirect URI:
     ```
     https://<your-extension-id>.chromiumapp.org/
     ```
   - Replace the `client_id` in the code with the one from your OAuth configuration.

5. **Update `manifest.json`:**
   - Ensure the `key` field in `manifest.json` is set for consistent extension IDs.

6. **Enable the Extension:**
   - Toggle the extension's switch in `chrome://extensions/` to enable it.

## **How to Use**

1. **Generate Events:**
   - Navigate to a web page containing relevant information.
   - Click the "Generate Event" button in the extension popup.
   - Review the generated event details in the display area.

2. **Add to Google Calendar:**
   - Click the "Add to Google Calendar" button after generating an event.
   - The event will be automatically added to your Google Calendar.

3. **View the Event:**
   - A confirmation link to the event in Google Calendar will be displayed. Click the link to view or edit the event.

## **Configuration**

### **Required Permissions**
- `activeTab`: To access the content of the currently active tab.
- `identity`: For Google OAuth to interact with Google Calendar.
- `scripting`: To inject content scripts for extracting data.
- `storage`: To save temporary event details if necessary.

### **Environment Variables**
Replace placeholders in the code with your actual API keys and OAuth client details:
- **OpenAI API Key:** Replace `"YOUR_OPENAI_API_KEY"` with your actual API key.
- **OAuth Client ID:** Replace the client ID in the `manifest.json` file and `background.js`.

## **Development**

### **Project Structure**
```
/extension
├── manifest.json         # Chrome extension manifest
├── background.js         # Background script for event processing
├── content.js            # Script to extract page content
├── popup.html            # UI for the extension popup
├── popup.js              # Logic for popup interactions
├── style.css             # Styling for the popup UI
├── icons/                # Extension icons
```

### **Scripts**
- **Content Script (`content.js`):** Injected into web pages to extract content.
- **Background Script (`background.js`):** Handles API calls to ChatGPT and Google Calendar.
- **Popup Script (`popup.js`):** Manages user interactions in the popup interface.

### **Commands**
- `npm install`: Install dependencies if any.
- `npm run lint`: Lint the JavaScript files for errors.

## **Troubleshooting**

1. **Google OAuth Errors:**
   - Ensure the OAuth client is configured correctly in Google Cloud Console.
   - Verify that the extension's `key` and redirect URI match the ones in your OAuth configuration.

2. **API Errors:**
   - Check the OpenAI API key and ensure it's valid.
   - Monitor usage limits in the OpenAI API dashboard.

3. **Content Extraction Issues:**
   - Make sure the content script (`content.js`) is correctly injected into the page.
   - Confirm that the page is accessible and not blocked by CORS policies.

4. **Extension ID Changes:**
   - Set the `key` field in `manifest.json` to prevent ID changes during reinstallation.

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Contributing**
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## **Acknowledgments**
- [OpenAI ChatGPT API](https://platform.openai.com/docs/): For natural language processing.
- [Google Calendar API](https://developers.google.com/calendar): For calendar integration.
- Chrome Extensions Documentation: For extension development.

---

Feel free to adapt this `README.md` further based on your project's needs. Let me know if you need help with anything else!以下是为您的插件 **"Event Generator with ChatGPT"** 编写的 `README.md` 文件：

---

# **Event Generator with ChatGPT**

**Event Generator with ChatGPT** is a Chrome extension that extracts content from web pages, processes the extracted data using ChatGPT, and generates meaningful events that can be added to your Google Calendar.

## **Features**
- Extracts content from the currently active web page.
- Utilizes ChatGPT to analyze the content and generate event suggestions.
- Supports multi-language input (English, Chinese, Japanese, etc.).
- Seamlessly integrates with Google Calendar to add events directly from the extension.
- Provides a simple and user-friendly interface.

## **Installation**

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/your-repo/event-generator-with-chatgpt.git
   ```

2. **Enable Developer Mode in Chrome:**
   - Open Chrome and go to `chrome://extensions/`.
   - Toggle the "Developer mode" switch in the top-right corner.

3. **Load the Extension:**
   - Click "Load unpacked."
   - Select the folder containing this extension's files.

4. **Add Required OAuth Client:**
   - Create an OAuth Client in the [Google Cloud Console](https://console.cloud.google.com/).
   - Select "Chrome App" or "Web Application" as the application type.
   - Use the provided extension ID for the redirect URI:
     ```
     https://<your-extension-id>.chromiumapp.org/
     ```
   - Replace the `client_id` in the code with the one from your OAuth configuration.

5. **Update `manifest.json`:**
   - Ensure the `key` field in `manifest.json` is set for consistent extension IDs.

6. **Enable the Extension:**
   - Toggle the extension's switch in `chrome://extensions/` to enable it.

## **How to Use**

1. **Generate Events:**
   - Navigate to a web page containing relevant information.
   - Click the "Generate Event" button in the extension popup.
   - Review the generated event details in the display area.

2. **Add to Google Calendar:**
   - Click the "Add to Google Calendar" button after generating an event.
   - The event will be automatically added to your Google Calendar.

3. **View the Event:**
   - A confirmation link to the event in Google Calendar will be displayed. Click the link to view or edit the event.

## **Configuration**

### **Required Permissions**
- `activeTab`: To access the content of the currently active tab.
- `identity`: For Google OAuth to interact with Google Calendar.
- `scripting`: To inject content scripts for extracting data.
- `storage`: To save temporary event details if necessary.

### **Environment Variables**
Replace placeholders in the code with your actual API keys and OAuth client details:
- **OpenAI API Key:** Replace `"YOUR_OPENAI_API_KEY"` with your actual API key.
- **OAuth Client ID:** Replace the client ID in the `manifest.json` file and `background.js`.

## **Development**

### **Project Structure**
```
/extension
├── manifest.json         # Chrome extension manifest
├── background.js         # Background script for event processing
├── content.js            # Script to extract page content
├── popup.html            # UI for the extension popup
├── popup.js              # Logic for popup interactions
├── style.css             # Styling for the popup UI
├── icons/                # Extension icons
```

### **Scripts**
- **Content Script (`content.js`):** Injected into web pages to extract content.
- **Background Script (`background.js`):** Handles API calls to ChatGPT and Google Calendar.
- **Popup Script (`popup.js`):** Manages user interactions in the popup interface.

### **Commands**
- `npm install`: Install dependencies if any.
- `npm run lint`: Lint the JavaScript files for errors.

## **Troubleshooting**

1. **Google OAuth Errors:**
   - Ensure the OAuth client is configured correctly in Google Cloud Console.
   - Verify that the extension's `key` and redirect URI match the ones in your OAuth configuration.

2. **API Errors:**
   - Check the OpenAI API key and ensure it's valid.
   - Monitor usage limits in the OpenAI API dashboard.

3. **Content Extraction Issues:**
   - Make sure the content script (`content.js`) is correctly injected into the page.
   - Confirm that the page is accessible and not blocked by CORS policies.

4. **Extension ID Changes:**
   - Set the `key` field in `manifest.json` to prevent ID changes during reinstallation.

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Contributing**
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## **Acknowledgments**
- [OpenAI ChatGPT API](https://platform.openai.com/docs/): For natural language processing.
- [Google Calendar API](https://developers.google.com/calendar): For calendar integration.
- Chrome Extensions Documentation: For extension development.

---

Feel free to adapt this `README.md` further based on your project's needs. Let me know if you need help with anything else!
