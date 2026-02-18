#!/usr/bin/env python3
"""
marked.jsをダウンロードするスクリプト
複数のURLを試行します
"""
import urllib.request
import sys

urls = [
    "https://unpkg.com/marked@17.0.2/marked.min.js",
    "https://cdn.jsdelivr.net/npm/marked@17.0.2/lib/marked.umd.js",
    "https://cdn.jsdelivr.net/npm/marked@17.0.2/dist/marked.min.js",
]

output_file = "marked.min.js"

for url in urls:
    try:
        print(f"Trying {url}...")
        urllib.request.urlretrieve(url, output_file)
        # ファイルサイズを確認（58バイト以下なら失敗）
        with open(output_file, 'rb') as f:
            size = len(f.read())
        if size > 1000:  # 1KB以上なら成功とみなす
            print(f"Successfully downloaded {output_file} ({size} bytes)")
            sys.exit(0)
        else:
            print(f"Downloaded file too small ({size} bytes), trying next URL...")
    except Exception as e:
        print(f"Error: {e}")
        continue

print("\nすべてのURLでダウンロードに失敗しました。")
print("手動でダウンロードする場合:")
print("1. https://github.com/markedjs/marked/releases を開く")
print("2. 最新リリースの marked.min.js をダウンロード")
print(f"3. このフォルダに {output_file} として保存")
sys.exit(1)
