import re

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

brace_level = 0
languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]
last_reported_lang = None

for i, line in enumerate(lines):
    if i < 11: continue
    
    brace_level += line.count('{')
    brace_level -= line.count('}')
    
    for lang in languages:
        # Some are just missing the comma, like `Telugu: {` instead of `  Telugu: {`
        if re.search(rf'^\s*{lang}:\s*{{', line):
            print(f"[{lang}] starts at line {i+1}. Current brace level before this line: {brace_level - 1}")
            last_reported_lang = lang

print(f"Final brace level at EOF: {brace_level}")
