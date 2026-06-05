import fs from 'fs';
import path from 'path';

const files = ['en.ts', 'hi.ts', 'te.ts'];
const i18nDir = 'client/lib/i18n';

files.forEach(file => {
  const filePath = path.join(i18nDir, file);
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');

  const keyMap = {};
  const duplicates = [];

  // 1. Identify duplicates
  lines.forEach((line, idx) => {
    const match = line.match(/^\s*"([^"]+)"\s*:\s*"(.*)"\s*,?\s*$/);
    if (match) {
      const key = match[1];
      const val = match[2];
      if (keyMap[key] !== undefined) {
        duplicates.push({ key, firstIdx: keyMap[key], dupIdx: idx, dupVal: val });
      } else {
        keyMap[key] = idx;
      }
    }
  });

  if (duplicates.length === 0) {
    console.log(`No duplicates in ${file}`);
    return;
  }

  console.log(`Found duplicates in ${file}:`, duplicates.map(d => d.key));

  // 2. Update first occurrences with duplicate values (if different)
  duplicates.forEach(dup => {
    const firstLine = lines[dup.firstIdx];
    const match = firstLine.match(/^(\s*"[^"]+"\s*:\s*").*("\s*,?\s*)$/);
    if (match) {
      lines[dup.firstIdx] = `${match[1]}${dup.dupVal}${match[2]}`;
      console.log(`Updated first line for key "${dup.key}" with value "${dup.dupVal}"`);
    }
  });

  // 3. Remove duplicate lines (from end to start to avoid index shifting)
  duplicates.sort((a, b) => b.dupIdx - a.dupIdx);
  duplicates.forEach(dup => {
    lines.splice(dup.dupIdx, 1);
  });

  // 4. Ensure trailing commas are correct
  // Let's find the last key-value line before the closing brace/export
  let lastKeyValIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].match(/^\s*"[^"]+"\s*:/)) {
      lastKeyValIdx = i;
      break;
    }
  }

  if (lastKeyValIdx !== -1) {
    // Make sure the last key-value does NOT end with a comma (optional, but clean)
    // Actually standard JS objects can have a trailing comma, so it's fine.
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Saved clean ${file}`);
});
