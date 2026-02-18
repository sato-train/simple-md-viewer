// DOM要素の取得
const fileInput = document.getElementById('fileInput');
const selectBtn = document.getElementById('selectBtn');
const uploadArea = document.getElementById('uploadArea');
const viewerContainer = document.getElementById('viewerContainer');
const viewerContent = document.getElementById('viewerContent');
const filename = document.getElementById('filename');
const closeBtn = document.getElementById('closeBtn');
const openInTabBtn = document.getElementById('openInTabBtn');
const errorMessage = document.getElementById('errorMessage');

// エラーメッセージのタイムアウトIDを保持
let errorTimeoutId = null;

// 現在表示中のMarkdownデータ（タブで開く用）
let currentFileData = null;

// ファイル選択ボタンのクリック
selectBtn.addEventListener('click', () => {
  fileInput.click();
});

// ファイル選択時の処理
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    if (isMarkdownFile(file)) {
      handleFile(file);
    } else {
      showError('Markdownファイル（.md, .markdown）を選択してください');
    }
  }
});

// ドラッグ&ドロップの処理
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const file = e.dataTransfer.files[0];
  if (file) {
    if (isMarkdownFile(file)) {
      handleFile(file);
    } else {
      showError('Markdownファイル（.md, .markdown）を選択してください');
    }
  }
});

// ファイル拡張子の検証関数
function isMarkdownFile(file) {
  const fileName = file.name.toLowerCase();
  return fileName.endsWith('.md') || fileName.endsWith('.markdown');
}

// ファイル処理関数
function handleFile(file) {
  hideError();
  
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const markdown = e.target.result;
      const html = marked.parse(markdown);
      
      currentFileData = { markdown, fileName: file.name };
      filename.textContent = file.name;
      viewerContent.innerHTML = html;
      
      uploadArea.style.display = 'none';
      viewerContainer.style.display = 'block';
    } catch (error) {
      showError('ファイルの読み込みに失敗しました: ' + error.message);
    }
  };
  
  reader.onerror = () => {
    showError('ファイルの読み込みに失敗しました');
  };
  
  reader.readAsText(file, 'UTF-8');
}

// 閉じるボタンの処理
closeBtn.addEventListener('click', () => {
  viewerContainer.style.display = 'none';
  uploadArea.style.display = 'block';
  fileInput.value = '';
  viewerContent.innerHTML = '';
  currentFileData = null;
});

// タブで開くボタンの処理
openInTabBtn.addEventListener('click', () => {
  if (!currentFileData) return;
  
  const sessionId = 'md_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  const storageKey = `mdviewer_${sessionId}`;
  
  chrome.storage.session.set({ [storageKey]: currentFileData }, () => {
    const viewerUrl = chrome.runtime.getURL(`viewer.html?id=${sessionId}`);
    chrome.tabs.create({ url: viewerUrl });
  });
});

// エラー表示関数
function showError(message) {
  // 既存のタイムアウトをクリア
  if (errorTimeoutId !== null) {
    clearTimeout(errorTimeoutId);
    errorTimeoutId = null;
  }
  
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  
  // 新しいタイムアウトを設定
  errorTimeoutId = setTimeout(() => {
    hideError();
  }, 5000);
}

function hideError() {
  // タイムアウトをクリア
  if (errorTimeoutId !== null) {
    clearTimeout(errorTimeoutId);
    errorTimeoutId = null;
  }
  
  errorMessage.style.display = 'none';
}
