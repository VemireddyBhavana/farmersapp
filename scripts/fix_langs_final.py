import os

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the last closing brace for a language block
last_lang_end = -1
for i in range(len(lines) - 1, -1, -1):
    if lines[i].strip() == '},':
        last_lang_end = i
        break

if last_lang_end != -1:
    # Everything after this should be the closing of the translations object and the rest of the file
    # But wait, we need to make sure the last language block is actually closed with '}' not '},'
    # and then the object is closed with '};'
    
    # Let's find where 'export const LanguageProvider' starts
    provider_start = -1
    for i in range(len(lines)):
        if 'export const LanguageProvider' in lines[i]:
            provider_start = i
            break
            
    if provider_start != -1:
        # We'll reconstruct the middle part
        new_lines = lines[:last_lang_end]
        new_lines.append('  }\n') # Close last lang block
        new_lines.append('};\n\n') # Close translations object
        new_lines.extend(lines[provider_start:])
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Fixed file structure.")
    else:
        print("Could not find LanguageProvider.")
else:
    print("Could not find last language block end.")
