window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type && event.data.type === 'CONVERT_NOTION_PAGE') {
    extractContent();
  }
});

function removeContenteditableElements(block) {
  // contenteditable="true" の要素を削除
  const regex = /contenteditable="true"/g;
  return block.replace(regex, '');
}



function extractContent() {
  let currentSlide = null
  const slides = [];

  function processBlock(block) {
    console.log('Processing block:', block);

    const isHeading = block.querySelector('h2');

    const images = block.querySelectorAll('img');
    
    if (isHeading) {
      // 見出しブロックの場合、新しいスライドを作成
      if (currentSlide) {
        slides.push(currentSlide);
      }
      currentSlide = {
        content: "",
      };
    }

    let newHTML = block.outerHTML;
    if (images && images.length > 0) {
      // 画像ブロックの処理
      const imgRegex = /<img[^>]+>/g;
      const imageHTMLs = []

      images.forEach((imgTag, i) => {
        const imageUrl = imgTag.src;
        imageHTMLs.push(`<img src="${imageUrl}" alt="Image" style="width:100%; height:100%;">`);
      });
      newHTML = newHTML.replace(imgRegex, () => imageHTMLs.shift() || '');
    }

    // max-widthの削除
    const maxWidthRegex = /max-width:[^;]+;/g;
    newHTML = newHTML.replace(maxWidthRegex, '');
    
    currentSlide.content += removeContenteditableElements(newHTML);
      
    
  }

  // notionのページタイトルを取得
  const pageTitle = document.querySelector('.notion-page-block h1').innerText;
  slides.push({
    title: pageTitle,
    content: `<div class='cover'>${pageTitle}</div>`,
  });


  // notionページ内の最上位ブロックを処理
  const pageContent = document.querySelector('.notion-page-content');
  const topLevelBlocks = pageContent.querySelectorAll(':scope > div[data-block-id]');
  topLevelBlocks.forEach((block) => {
    processBlock(block);
  });
  slides.push(currentSlide);

  if (slides.length > 0) {
    // スライドデータを保存
    chrome.storage.local.set({ slides: slides }, () => {
      // バックグラウンドスクリプトにメッセージを送信
      chrome.runtime.sendMessage({ type: 'OPEN_PRESENTATION' });
    });
  } else {
    alert('スライドに変換できるコンテンツが見つかりませんでした。');
  }
}