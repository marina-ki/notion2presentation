let slides = [];
let currentSlide = 0;

function showSlide(index) {
  document.querySelectorAll('.slide').forEach((slide) => {
    slide.classList.remove('active');
  });
  document.getElementById('slide-' + index).classList.add('active');
}

function moveIndicator(index, isForward) {
  if (isForward) {
    document.getElementById('indicator-' + index).classList.add('done');
  } else {
    document.getElementById('indicator-' + (index+1)).classList.remove('done');
  }
}

function nextSlide() {
  if (currentSlide === slides.length - 1) {
    return;
  }
  currentSlide += 1;
  showSlide(currentSlide);
  moveIndicator(currentSlide, true);
}

function prevSlide() {
  if (currentSlide === 0) {
    return;
  }
  currentSlide -= 1;
  showSlide(currentSlide);
  moveIndicator(currentSlide, false);
}

function renderSlides() {
  // titleタグの設定
  document.title = slides[0].title;

  const container = document.getElementById('slides-container');
  const indicatorContainer = document.getElementById('slide-indicator');
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide' + (index === 0 ? ' active' : '');
    slideDiv.id = 'slide-' + index;
    slideDiv.innerHTML = slide.content;
    container.appendChild(slideDiv);

    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'indicator' + (index === 0 ? ' done' : '');
    indicatorDiv.id = 'indicator-' + index;
    indicatorContainer.appendChild(indicatorDiv);
  });

}

// スライドデータを取得
function getSlidesData() {
  // chrome.storage を使用してデータを取得
  chrome.storage.local.get('slides', (result) => {
    slides = result.slides || [];
    if (slides.length > 0) {
      renderSlides();
    } else {
      alert('スライドデータが見つかりませんでした。');
    }
  });
}

// ページロード時に実行
document.addEventListener('DOMContentLoaded', () => {
  getSlidesData();


  // ボタンにイベントリスナーを追加
  // document.getElementById('prev-button').addEventListener('click', prevSlide);
  // document.getElementById('next-button').addEventListener('click', nextSlide);

  // キーボードショートカット
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  });
});

