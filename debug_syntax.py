import re
import os

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# I see what went wrong. When removing duplicates earlier using the `multi_replace_file_content` I removed the closing bracket of the English object prematurely or didn't add it back when replacing.
# Based on the file context:
# The Bengali object was missing a `}`
# The English object was broken around line 430
# Let's fix lines around "modSustainableAgDesc"

# We know the structure should be:
# modSustainableAg: "Sustainable Agriculture",
# modSustainableAgDesc: "Future-proof your farm with sustainable practices.",
# modProductivity: "Farm Productivity",

broken_snippet = '    modSustainableAgDesc: "Future-proof your farm with sustainable practices.",\n    modProductivity: "Farm Productivity",'

# If the snippet is present, we are fine here, but let's check what exactly is breaking in the TSC output.
# I will first print out the surrounding lines.

lines = content.split('\n')
for i, line in enumerate(lines):
    if "modSustainableAgDesc" in line:
        print(f"Line {i+1}: {line}")
        print(f"Line {i+2}: {lines[i+1]}")
        print(f"Line {i+3}: {lines[i+2]}")

# Since the previous grep and typescript errors showed "Missing Hindi, Tamil" at line 13, it means the `English` object was accidentally closed somewhere early on.
# Let's find exactly where the `English` object closes by analyzing indentation and brackets.
brace_level = 0
in_english = False
english_close_line = -1

for i, line in enumerate(lines[:1000]):
    if "English: {" in line:
        in_english = True
        brace_level = 1
        continue
    
    if in_english:
        brace_level += line.count('{')
        brace_level -= line.count('}')
        if brace_level == 0:
            english_close_line = i + 1
            break
            
print(f"English object closes at line: {english_close_line}")
if english_close_line != -1:
    print(f"Line {english_close_line-1}: {lines[english_close_line-2]}")
    print(f"Line {english_close_line}: {lines[english_close_line-1]}")
    print(f"Line {english_close_line+1}: {lines[english_close_line]}")
    
# From my previous edits, I mistakenly added:
#     historySeedRecommendation: "Seed recommendation",
# },  <-- THIS CLOSED THE ENGLISH BLOCK!
#   Telugu: {

# Yes, in English section, it had a `},` followed by Telugu. But wait, what if it closed earlier? We will find out.
