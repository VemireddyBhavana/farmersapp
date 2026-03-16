import json
import re

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

def find_and_remove_duplicates(content, lang):
    # Match the language block
    block_pattern = re.compile(rf'  {lang}: {{(.*?)\n  }},?\n', re.DOTALL)
    match = block_pattern.search(content)
    if not match:
        # Check if it's the last one without a trailing comma
        block_pattern = re.compile(rf'  {lang}: {{(.*?)\n  }}\n', re.DOTALL)
        match = block_pattern.search(content)
        if not match:
            return content

    block_content = match.group(1)
    
    # We will build a new block by processing line by line, keeping only the FIRST occurrence of any key
    lines = block_content.split('\n')
    seen_keys = set()
    new_lines = []
    
    key_pattern = re.compile(r'^\s*([A-Za-z0-9_]+)\s*:')
    
    for line in lines:
        key_match = key_pattern.search(line)
        if key_match:
            key = key_match.group(1)
            if key in seen_keys:
                print(f"[{lang}] Removing duplicate key: {key} -> {line.strip()}")
                continue
            seen_keys.add(key)
        new_lines.append(line)
        
    new_block_content = '\n'.join(new_lines)
    return content[:match.start(1)] + new_block_content + content[match.end(1):]


for lang in languages:
    text = find_and_remove_duplicates(text, lang)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Done scanning and removing duplicates.")
