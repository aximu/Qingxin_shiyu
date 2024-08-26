import os
from bs4 import BeautifulSoup
import markdownify
from pathlib import Path

def html_to_markdown(html_content):
    # 使用BeautifulSoup解析HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # 将BeautifulSoup对象转换为Markdown
    markdown_text = markdownify.markdownify(str(soup))
    
    return markdown_text

def convert_html_to_markdown(input_folder, output_folder):
    # 遍历输入文件夹中的所有HTML文件
    for filename in os.listdir(input_folder):
        if filename.endswith('.txt'):
            input_file_path = os.path.join(input_folder, filename)
            output_file_path = os.path.join(output_folder, filename.replace('.txt', '.md'))
            # 读取HTML文件内容
            with open(input_file_path, 'r', encoding='utf-8') as f:
                html_content = f.read()

            # 将HTML转换为Markdown
            markdown_text = html_to_markdown(html_content)

            # 将Markdown写入输出文件
            with open(output_file_path, 'w', encoding='utf-8') as f:
                f.write(markdown_text)

    print('HTML to Markdown conversion complete.')

input_folder = r'F:\qingxin_work\data\recipe\ingredient_info\useful'
output_folder = r'F:\qingxin_work\md_data\recipe_ingredient_info'

convert_html_to_markdown(input_folder, output_folder)