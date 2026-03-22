import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

lang_ranges = {}
for lang in languages:
    # Try different patterns if needed
    pattern = rf'^\s+{lang}:\s*\{{'
    match = re.search(pattern, content, re.MULTILINE)
    if match:
        start_idx = match.start()
        # Find closing brace
        bracket_count = 0
        end_idx = -1
        for i in range(match.end() - 1, len(content)):
            if content[i] == '{':
                bracket_count += 1
            elif content[i] == '}':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i + 1
                    break
        if end_idx != -1:
            lang_ranges[lang] = (start_idx, end_idx)

for lang, (s, e) in lang_ranges.items():
    print(f"{lang}: {s} to {e}")
