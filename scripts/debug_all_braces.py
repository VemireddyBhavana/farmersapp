import re

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

brace_level = 0
languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

for i, line in enumerate(lines):
    # Only count braces inside the translations object (starting from line 13)
    if i < 11: continue
    
    brace_level += line.count('{')
    brace_level -= line.count('}')
    
    # Check if we are at a language definition boundary
    for lang in languages:
        if f"  {lang}: {{" in line:
            print(f"[{lang}] starts at line {i+1}. Current brace level before this line: {brace_level - 1}")

print(f"Final brace level at EOF: {brace_level}")
