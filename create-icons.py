#!/usr/bin/env python3
"""
Markdown Viewer用のアイコンを生成するスクリプト
"""
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("PIL (Pillow) がインストールされていません。")
    print("インストール: pip install Pillow")
    print("\nまたは、create-icons.html をブラウザで開いてアイコンを生成してください。")
    exit(1)

def create_icon(size, filename):
    """アイコンを作成"""
    # 画像を作成（背景は青）
    img = Image.new('RGB', (size, size), color='#3498db')
    draw = ImageDraw.Draw(img)
    
    # 白い枠を描画
    margin = size // 10
    draw.rectangle([margin, margin, size - margin, size - margin], 
                   outline='white', width=max(1, size // 16))
    
    # M文字を描画（MarkdownのM）
    try:
        # フォントサイズを計算
        font_size = int(size * 0.5)
        # システムフォントを使用
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # フォントが見つからない場合はデフォルトフォント
        font = ImageFont.load_default()
    
    # テキストを中央に配置
    text = "M"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((size - text_width) // 2, (size - text_height) // 2 - bbox[1])
    
    draw.text(position, text, fill='white', font=font)
    
    # 保存
    img.save(filename)
    print(f"Created {filename} ({size}x{size})")

# 3つのサイズのアイコンを作成
create_icon(16, 'icon16.png')
create_icon(48, 'icon48.png')
create_icon(128, 'icon128.png')

print("\nアイコンの作成が完了しました！")
