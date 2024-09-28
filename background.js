chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'OPEN_PRESENTATION') {
      chrome.tabs.create({ url: chrome.runtime.getURL('presentation.html') }, () => {
        sendResponse({ status: 'success' });
      });
      return true; // 非同期で応答することを示す
    }
  });

chrome.action.onClicked.addListener((tab) => {
  // Notionのページかどうかを確認
  if (tab.url && tab.url.startsWith('https://www.notion.so/')) {
    // コンテンツスクリプトを実行
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: waitForNotionContentAndConvert
    });
  } else {
    // Notionのページでない場合はアラートを表示
    chrome.tabs.create({ url: 'https://www.notion.so/' });
    chrome.tabs.sendMessage(tab.id, { type: 'SHOW_ALERT', message: 'Notionのページで実行してください。' });
  }
});

function waitForNotionContentAndConvert() {
  const checkReady = setInterval(() => {
    console.log(document);
    const blocks = document.querySelectorAll('div[data-block-id]');
    if (blocks.length > 0) {
      clearInterval(checkReady);
      setTimeout(() => {
        window.postMessage({ type: 'CONVERT_NOTION_PAGE' }, '*');
      }, 1000); // 追加の待機時間
    }
  }, 1000); // 1秒ごとにチェック
}