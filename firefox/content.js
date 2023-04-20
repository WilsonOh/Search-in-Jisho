document.addEventListener("selectionchange", () => {
  const selection = window.getSelection().toString().trim();
  browser.runtime.sendMessage({
    request: "updateContextMenu",
    selection: selection,
  });
});
