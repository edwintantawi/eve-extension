export async function capturePageContent(tabId: number) {
  const tab = await browser.tabs.get(tabId);
  if (!tab.url?.startsWith("http")) {
    browser.storage.session.set({
      pageContent: null,
      pageTitle: null,
    });
  }
  const injection = await browser.scripting.executeScript({
    target: { tabId },
    files: ["extract.js"],
  });
  browser.storage.session.set({
    pageContent: injection[0].result,
    pageTitle: tab.title,
  });
}
