import re

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

brace_level = 0
in_english = False

for i, line in enumerate(lines):
    if "English: {" in line:
        in_english = True
        
    if in_english:
        brace_level += line.count('{')
        brace_level -= line.count('}')
        
        # We expect brace_level to be 1 within the English object.
        # If it goes above 1, we found an opened but unclosed brace.
        if brace_level > 1 and "{" in line:
            print(f"Extra opening brace found at line {i+1}: {line.strip()}")
        
        # Stop checking when we hit Telugu, which should officially end English
        if "Telugu: {" in line:
            print(f"Hit Telugu at line {i+1}. Current brace level: {brace_level}")
            break
