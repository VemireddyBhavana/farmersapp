import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

output_lines = []
languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

current_lang = None
seen_keys = set()
in_translations = False

for line in lines:
    stripped = line.strip()
    
    # Detect start of translations object
    if "export const translations" in line:
        in_translations = True
        output_lines.append(line)
        continue
        
    if not in_translations:
        output_lines.append(line)
        continue
        
    # Detect language block start
    lang_found = False
    for lang in languages:
        if f"{lang}: {{" in line:
            current_lang = lang
            seen_keys = set()
            lang_found = True
            break
    
    if lang_found:
        output_lines.append(line)
        continue
        
    # Detect key-value pair
    match = re.match(r'^\s*([a-zA-Z0-9_]+):', line)
    if match and current_lang:
        key = match.group(1)
        if key in seen_keys:
            # Duplicate key found, skip this line
            continue
        else:
            seen_keys.add(key)
            output_lines.append(line)
    elif "}," in line and current_lang:
        # Closing a language block
        output_lines.append(line)
        # We don't Reset current_lang here because it might be the end of the whole object
    else:
        output_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("Deduplication complete.")
