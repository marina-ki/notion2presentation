# デモ


https://github.com/user-attachments/assets/6e2fa736-fe7d-4010-a152-41134efce789






# 使い方
## 1. ソースコードのダウンロード

Code ボタン →Download ZIP をクリック → ダウンロードされた zip ファイルを解凍
![Image 2968x1028 from GitHub](https://github.com/user-attachments/assets/a5ffb0d8-0fca-4a17-a74c-3e7a74164f35)


## 2. Chrome への拡張機能の読み込み

- Chrome で chrome://extensions/ にアクセスします。
- 右上の「デベロッパーモード」をオンにします。
- 「パッケージ化されていない拡張機能を読み込む」をクリックし、先ほどダウンロードしたフォルダを選択することで拡張機能がインストールされます。

## 3. プレゼンテーションの起動
notionのページを開いた状態で拡張機能のアイコンをクリックすると利用できます（インストール直後はnotionページをリロードしてください。）

# 機能

- notion の h1 ブロックを起点にページを生成します。
- キーボードの矢印キー ← → で前後のスライドに移動します。

# ソースコードをいじってお好みにカスタマイズしてください

## スタイル

presentation.css でスタイルを定義しています。

## スライドを区切る箇所

content.js の

```
// 見出しブロックの場合、新しいスライドを作成
```

という箇所で、notion の h1 ブロック（実際の html では h2）を見つけたら新しいスライドにしています。
これを divider ブロックを区切りにするなどいい感じにコードを変更してください。

## スライドの進む/戻る

presentation.js の

```
  // キーボードショートカット
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  });
```

で定義しています。適宜追加してください。
また、presentation.js の

```
  // ボタンにイベントリスナーを追加
  // document.getElementById('prev-button').addEventListener('click', prevSlide);
  // document.getElementById('next-button').addEventListener('click', nextSlide);
```

のコメントアウトを外し、presentation.html の

```
    <!-- <button id="prev-button">前へ</button>
    <button id="next-button">次へ</button> -->
```

のコメントアウトを外すとボタンが表示されます。こちらも使用したい際は適宜利用してください。

# 未対応

- callout のアイコンのサイズが小さくなってしまいます。
  <img width="848" alt="image" src="https://github.com/user-attachments/assets/8bd92e11-6c20-4c07-a535-7f9055c915eb">

全然確認しきれてないので他にもスタイル対応してないところあると思います。
