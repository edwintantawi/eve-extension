import { capturePageContent } from "@/lib/capture-page-content";

export default defineBackground(async () => {
  let languageModel: LanguageModel | null = null;

  // Capture page content on tab activation and update
  browser.tabs.onActivated.addListener((activeInfo) => {
    capturePageContent(activeInfo.tabId);
  });
  browser.tabs.onUpdated.addListener((tabId) => {
    capturePageContent(tabId);
  });

  browser.runtime.onInstalled.addListener(async () => {
    // Set side panel to open on action click
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

    // Initialize Language Model on installation
    if ("LanguageModel" in self) {
      const availability = await LanguageModel.availability();
      if (availability === "unavailable") {
        console.error("LanguageModel API is unavailable");
        return;
      }
      languageModel = await LanguageModel.create();
    }
  });

  browser.runtime.onMessage.addListener(
    async (message, _sender, _sendResponse) => {
      // Handle chat requests
      if (message.type === "CHAT_REQUEST") {
        // Generate stream chat id
        const messageId = crypto.randomUUID();
        if (!languageModel) {
          browser.runtime.sendMessage({
            type: "CHAT_RESPONSE",
            payload: {
              id: messageId,
              text: "Language Model is not initialized.",
            },
          });
          return;
        }

        const streamResult = languageModel.promptStreaming([
          {
            role: "user",
            content: `${
              message.payload.enableTalkToPage
                ? `current page content: ${await getPageContent()}\n\n`
                : ""
            }${message.payload.text}`,
          },
        ]);

        for await (const chunk of streamResult) {
          browser.runtime.sendMessage({
            type: "CHAT_RESPONSE",
            payload: {
              id: messageId,
              text: chunk,
            },
          });
        }
      }
    }
  );
});

async function getPageContent() {
  return new Promise((resolve, reject) => {
    browser.storage.session.get(["pageContent"], (result) => {
      resolve(result.pageContent);
    });
  });
}
