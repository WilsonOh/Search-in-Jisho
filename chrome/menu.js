const NAME = "Search in Jisho";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: NAME,
    title: NAME,
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === NAME) {
    const selectedText = info.selectionText.trim();
    chrome.tabs.create({ url: `https://jisho.org/search/${selectedText}` });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.request === "updateContextMenu") {
    chrome.contextMenus.update(NAME, {
      title: `Search Jisho for "${msg.selection}"`,
    });
  }
});
