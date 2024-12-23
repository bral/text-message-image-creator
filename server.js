import express from "express";
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { join } from "path";

const app = express();
app.use(express.json());

const THEMES = {
  iOS: {
    background: "#fff",
    messageSentBg: "#007aff",
    messageReceivedBg: "#e5e5ea",
    messageSentText: "#fff",
    messageReceivedText: "#000",
    statusBarBg: "#fff",
    statusBarText: "#000",
    borderColor: "#1c1c1e",
  },
  android: {
    background: "#000",
    messageSentBg: "#00D856",
    messageReceivedBg: "#303030",
    messageSentText: "#fff",
    messageReceivedText: "#fff",
    statusBarBg: "#000",
    statusBarText: "#fff",
    borderColor: "#1c1c1e",
  },
  dark: {
    background: "#000",
    messageSentBg: "#007aff",
    messageReceivedBg: "#1c1c1e",
    messageSentText: "#fff",
    messageReceivedText: "#fff",
    statusBarBg: "#000",
    statusBarText: "#fff",
    borderColor: "#1c1c1e",
  },
  androidDark: {
    background: "#000",
    messageSentBg: "#00D856",
    messageReceivedBg: "#303030",
    messageSentText: "#fff",
    messageReceivedText: "#fff",
    statusBarBg: "#000",
    statusBarText: "#fff",
    borderColor: "#1c1c1e",
  },
};

const generateHTML = (
  messages,
  theme = "iOS",
  resolution,
  fontSize = { size: 17, lineHeight: 1.4 }
) => {
  const colors = THEMES[theme] || THEMES.iOS;
  const isIOS = theme === "iOS" || theme === "dark";
  const isAndroid = theme === "android" || theme === "androidDark";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
  <style>
    :root {
      --f7-message-sent-bg-color: ${colors.messageSentBg};
      --f7-message-received-bg-color: ${colors.messageReceivedBg};
      --f7-message-sent-text-color: ${colors.messageSentText};
      --f7-message-received-text-color: ${colors.messageReceivedText};
      --f7-message-bubble-border-radius: ${isAndroid ? "24px" : "20px"};
      --f7-message-bubble-padding-vertical: ${isAndroid ? "12px" : "8px"};
      --f7-message-bubble-padding-horizontal: ${isAndroid ? "20px" : "16px"};
      --f7-message-bubble-min-height: 32px;
      --f7-message-bubble-font-size: ${fontSize.size}px;
      --f7-message-bubble-line-height: ${fontSize.lineHeight};
    }
    body {
      margin: 0;
      padding: 20px;
      background: ${colors.background};
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .phone-container {
      width: ${resolution?.width || 375}px;
      height: ${resolution?.height || 667}px;
      border: 12px solid ${colors.borderColor};
      border-radius: 47px;
      position: relative;
      overflow: hidden;
      background: ${colors.background};
    }
    .status-bar {
      height: 44px;
      background: ${colors.statusBarBg};
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: ${colors.statusBarText};
      font-weight: 600;
    }
    .messages-content {
      height: calc(100% - 44px);
      overflow-y: auto;
      padding: 12px 16px;
      background: ${colors.background};
    }
    .messages {
      display: flex;
      flex-direction: column;
      gap: ${isAndroid ? "8px" : "4px"};
    }
    .message {
      max-width: 75%;
      margin: 0;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .message-sent {
      margin-left: auto;
      align-items: flex-end;
    }
    .message-received {
      margin-right: auto;
      align-items: flex-start;
    }
    .message-bubble {
      position: relative;
      padding: var(--f7-message-bubble-padding-vertical) var(--f7-message-bubble-padding-horizontal);
      min-height: var(--f7-message-bubble-min-height);
      font-size: var(--f7-message-bubble-font-size);
      line-height: var(--f7-message-bubble-line-height);
      word-break: break-word;
      border-radius: var(--f7-message-bubble-border-radius);
      display: flex;
      align-items: center;
      white-space: pre-line; /* Preserve line breaks in lists */
    }
    .message-sent .message-bubble {
      background: var(--f7-message-sent-bg-color);
      color: var(--f7-message-sent-text-color);
    }
    .message-received .message-bubble {
      background: var(--f7-message-received-bg-color);
      color: var(--f7-message-received-text-color);
    }
    .message-text {
      font-size: var(--f7-message-bubble-font-size);
      line-height: var(--f7-message-bubble-line-height);
    }
    .status-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .status-bar-left {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .status-bar-right {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .battery-icon {
      width: 25px;
      height: 12px;
      border: 1px solid currentColor;
      border-radius: 3px;
      padding: 1px;
      position: relative;
    }
    .battery-icon::after {
      content: '';
      position: absolute;
      right: -4px;
      top: 3px;
      width: 3px;
      height: 6px;
      border-radius: 0 2px 2px 0;
      background: currentColor;
    }
    .battery-level {
      height: 100%;
      width: 100%;
      background: currentColor;
      border-radius: 1px;
    }
  </style>
</head>
<body>
  <div class="phone-container">
    <div class="status-bar">
      <div class="status-bar-content">
        <div class="status-bar-left">
          <span>9:41</span>
        </div>
        <div class="status-bar-right">
          <span>●●●●</span>
          <span>●●●</span>
          <div class="battery-icon">
            <div class="battery-level"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="messages-content">
      <div class="messages">
        ${messages
          .map(
            (message) => `
          <div class="message ${
            message.isReceiver ? "message-received" : "message-sent"
          }">
            <div class="message-bubble">
              <div class="message-text">${message.text}</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </div>
</body>
</html>
`;
};

app.post("/generate-image", async (req, res) => {
  let browser;

  try {
    console.log("Starting image generation...");
    const {
      messages,
      title = "conversation",
      theme = "iOS",
      format = "png",
      resolution,
      fontSize,
    } = req.body;
    const html = generateHTML(messages, theme, resolution, fontSize);

    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    console.log("Creating page...");
    const page = await browser.newPage();

    await page.setViewport({
      width: (resolution?.width || 375) + 40,
      height: (resolution?.height || 667) + 40,
      deviceScaleFactor: resolution?.scale || 2,
    });

    console.log("Setting content...");
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.waitForSelector(".phone-container");

    console.log("Taking screenshot...");
    const element = await page.$(".phone-container");
    if (!element) {
      throw new Error("Could not find phone container element");
    }

    const screenshot = await element.screenshot({
      type: format === "jpg" ? "jpeg" : format,
      quality: format === "jpeg" ? 90 : undefined,
      omitBackground: true,
    });

    console.log(`Screenshot taken, size: ${screenshot.length} bytes`);

    // Generate filename from title and theme
    const filename = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${theme.toLowerCase()}.${format}`;
    const filepath = join("output", filename);
    writeFileSync(filepath, screenshot);
    console.log(`Saved screenshot to ${filepath}`);

    // Send success response
    res.json({
      success: true,
      message: `Image generated and saved as ${filepath}`,
      size: screenshot.length,
      filename: filepath,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
