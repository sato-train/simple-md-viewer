// URLパラメータからセッションIDを取得
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('id');

const viewerContent = document.getElementById('viewerContent');
const filename = document.getElementById('filename');
const backBtn = document.getElementById('backBtn');

if (!sessionId) {
  viewerContent.innerHTML = '<p class="error">セッションが無効です。ポップアップから再度ファイルを選択してください。</p>';
} else {
  chrome.storage.session.get([`mdviewer_${sessionId}`], (result) => {
    const data = result[`mdviewer_${sessionId}`];
    
    if (!data) {
      viewerContent.innerHTML = '<p class="error">データの有効期限が切れました。ポップアップから再度ファイルを選択してください。</p>';
      return;
    }
    
    const { markdown, fileName } = data;
    
    try {
      const html = marked.parse(markdown);
      viewerContent.innerHTML = html;
      filename.textContent = fileName;
      document.title = `${fileName} - Markdown Viewer`;
      
      // 表示後、ストレージをクリア（オプション：タブを閉じるまで保持する場合はコメントアウト）
      // chrome.storage.session.remove([`mdviewer_${sessionId}`]);
    } catch (error) {
      viewerContent.innerHTML = `<p class="error">レンダリングに失敗しました: ${error.message}</p>`;
    }
  });
}

backBtn.addEventListener('click', () => {
  chrome.tabs.getCurrent((tab) => {
    if (tab?.id) {
      chrome.tabs.remove(tab.id);
    } else {
      window.close();
    }
  });
});
