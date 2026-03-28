import os
import re

def clean_duplicates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the start of the object and the end
    match = re.search(r'export const \w+ = \{(.*)\};', content, re.DOTALL)
    if not match:
        print(f"Could not find object in {file_path}")
        return

    prefix = content[:match.start(1)]
    suffix = content[match.end(1):]
    body = match.group(1)

    # Simple regex to match "key: value," or "key: value"
    # This is a bit naive but should work for these simple translation files
    lines = body.splitlines()
    new_lines = []
    seen_keys = {} # key -> line_index in new_lines
    
    for line in lines:
        # Check if line looks like a key-value pair: "  key: 'value',"
        kv_match = re.match(r'^(\s+)(\w+):(.*)', line)
        if kv_match:
            indent, key, rest = kv_match.groups()
            if key in seen_keys:
                # Replace the old line index with the new one
                old_idx = seen_keys[key]
                new_lines[old_idx] = line
                continue
            else:
                seen_keys[key] = len(new_lines)
                new_lines.append(line)
        else:
            new_lines.append(line)

    # Reconstruct the body
    new_body = "\n".join(new_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(prefix + new_body + suffix)
    print(f"Cleaned {file_path}")

i18n_dir = r'd:\farmersapp\client\lib\i18n'
for filename in os.listdir(i18n_dir):
    if filename.endswith('.ts'):
        clean_duplicates(os.path.join(i18n_dir, filename))
