const NAME = "Search in Jisho";

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: NAME,
    title: NAME,
    contexts: ["selection"],
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === NAME) {
    const selectedText = info.selectionText.trim();
    const url = `https://jisho.org/search/${selectedText}`

    browser.tabs.query({}).then((tabs) => {
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        if (tabs[tabIndex].url.includes("jisho")) {
          browser.tabs.update(tabs[tabIndex].id, { url: url });
          browser.tabs.highlight({ tabs: tabIndex });
          return;
        }
      }
      browser.tabs.create({ url: url });
    })
  }
});

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.request === "updateContextMenu") {
    browser.contextMenus.update(NAME, {
      title: `Search Jisho for "${msg.selection}"`,
    });
  }
});
