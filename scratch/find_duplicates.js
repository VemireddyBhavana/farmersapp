import fs from 'fs';

const content = fs.readFileSync('client/lib/i18n/en.ts', 'utf8');
const lines = content.split('\n');

const keyMap = {};
const duplicates = [];

lines.forEach((line, idx) => {
  const match = line.match(/^\s*"([^"]+)"\s*:/);
  if (match) {
    const key = match[1];
    if (keyMap[key]) {
      duplicates.push({ key, firstLine: keyMap[key], dupLine: idx + 1 });
    } else {
      keyMap[key] = idx + 1;
    }
  }
});

console.log("Found duplicate keys:", duplicates);
