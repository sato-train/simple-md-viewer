# Markdown Viewer Chrome Extension

個人用の軽量MarkdownファイルビューアChrome拡張機能。

## 機能

- Markdownファイル（.md, .markdown）をアップロードして表示
- **ポップアップ表示**と**タブ表示**の両方に対応
- ドラッグ&ドロップ対応
- シンプルで軽量なUI
- コードシンタックスハイライト対応（marked.js使用）

## インストール方法

1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダ（`markdown-viewer`）を選択

## 使い方

1. 拡張機能のアイコンをクリック
2. 「ファイルを選択」ボタンをクリックするか、Markdownファイルをドラッグ&ドロップ
3. Markdownがレンダリングされて表示されます
4. 表示中に「タブで開く」ボタンをクリックすると、新しいブラウザタブでフルページ表示されます

## ファイル構成

```
markdown-viewer/
├── manifest.json          # 拡張機能の設定ファイル
├── popup.html             # ポップアップUI
├── popup.js               # メインロジック
├── viewer.html            # タブ表示用フルページビューア
├── viewer.js              # タブ表示用ロジック
├── viewer.css             # タブ表示用スタイル
├── styles.css             # 共通スタイルシート
├── marked.min.js          # Markdownパーサー（UMD版）
├── icon16.png             # アイコン 16x16（要作成）
├── icon48.png             # アイコン 48x48（要作成）
├── icon128.png            # アイコン 128x128（要作成）
├── create-icons.html      # アイコン生成用HTML
├── create-icons.py        # アイコン生成用Pythonスクリプト（Pillow必要）
├── download-marked.py     # marked.jsダウンロード用スクリプト
└── README.md              # このファイル
```

## セットアップ手順

### 1. marked.js のダウンロード（完了済み）

`marked.min.js` は既にダウンロード済みです。もし再ダウンロードが必要な場合：

```bash
cd markdown-viewer
python download-marked.py
```

### 2. アイコンの作成

以下のいずれかの方法でアイコンを作成してください：

#### 方法A: HTMLで作成（推奨）

1. `create-icons.html` をブラウザで開く
2. 表示された3つのアイコンを右クリックして「名前を付けて画像を保存」
3. それぞれ `icon16.png`, `icon48.png`, `icon128.png` として保存

#### 方法B: Pythonで作成

```bash
pip install Pillow
python create-icons.py
```

#### 方法C: オンラインツールを使用

- [Favicon Generator](https://favicon.io/)
- [Canva](https://www.canva.com/)

16x16、48x48、128x128のPNGアイコンを作成して配置してください。

**注意**: アイコンがない場合、Chrome拡張は読み込めますが、アイコンが表示されません。

## 動作確認

`test.md` ファイルを作成してテストできます：

```markdown
# テスト

これは**Markdown**のテストです。

- リスト項目1
- リスト項目2

```javascript
console.log('Hello, World!');
```
```

## 技術スタック

- **Manifest V3** - Chrome拡張の最新仕様
- **marked.js** - Markdownパーサー（UMD版）
- **Vanilla JavaScript** - フレームワークなしの軽量実装

## カスタマイズ

### スタイルの変更

`styles.css` を編集して、色やフォントを変更できます。

### 機能の追加

`popup.js` を編集して、以下のような機能を追加できます：

- ダークモード切り替え
- エクスポート機能（PDF、HTML）
- 複数ファイルの管理
- 履歴機能

## トラブルシューティング

### 拡張機能が読み込めない

- `manifest.json` の構文エラーを確認
- Chromeのデベロッパーツールでエラーを確認

### Markdownが表示されない

- `marked.min.js` が正しくダウンロードされているか確認
- ブラウザのコンソールでエラーを確認

### アイコンが表示されない

- アイコンファイル（icon16.png, icon48.png, icon128.png）が存在するか確認
- `manifest.json` のアイコンパスが正しいか確認

## ライセンス

個人利用のみ。MITライセンス。

## 参考

- [Marked.js Documentation](https://marked.js.org/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
