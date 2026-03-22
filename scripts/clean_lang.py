import re
import os
import json

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove duplicate agriMarketplace keys in each language block
languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

def remove_duplicates(text, lang):
    # Find the language block
    block_pattern = re.compile(rf'  {lang}: {{(.*?)\n  }},?\n', re.DOTALL)
    match = block_pattern.search(text)
    if not match:
        return text
    
    block_content = match.group(1)
    
    # Check if there are multiple occurrences of agriMarketplace
    agri_marketplace_pattern = re.compile(r'\s*agriMarketplace:\s*".*?",\s*agriMarketplaceDesc:\s*".*?",')
    matches = list(agri_marketplace_pattern.finditer(block_content))
    
    if len(matches) > 1:
        # Keep the first one, remove the rest
        for m in reversed(matches[1:]):
            block_content = block_content[:m.start()] + block_content[m.end():]
            
        print(f"Removed duplicate agriMarketplace from {lang}")
        
    return text[:match.start(1)] + block_content + text[match.end(1):]

for lang in languages:
    content = remove_duplicates(content, lang)


# Find the Tamil text block that got injected everywhere
tamil_block_regex = re.compile(r'\s*uploadLeaf: "Upload Leaf Image",.*?\s*fertilizerAdvice: "உர ஆலோசனைகள்",', re.DOTALL)

matches = list(tamil_block_regex.finditer(content))
print(f"Found {len(matches)} occurrences of Tamil leakage.")

# Replace Tamil block with correct translations for each language
# (I'll do this in a multi_replace step after verifying the regex works)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done removing duplicates.")
