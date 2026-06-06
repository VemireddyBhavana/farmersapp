import fs from 'fs';

const content = fs.readFileSync('client/lib/i18n/en.ts', 'utf8');
const lines = content.split('\n');

const nonAsciiLines = [];

lines.forEach((line, idx) => {
  // Check if line is a key-value entry
  const match = line.match(/^\s*"([^"]+)"\s*:\s*"(.*)"\s*,?\s*$/);
  if (match) {
    const key = match[1];
    const val = match[2];
    
    // Check if value contains non-ASCII characters (e.g. Hindi/Telugu)
    // Devnagari range: \u0900-\u097F
    // Telugu range: \u0C00-\u0C7F
    const hasHindi = /[\u0900-\u097F]/.test(val);
    const hasTelugu = /[\u0C00-\u0C7F]/.test(val);
    
    if (hasHindi || hasTelugu) {
      nonAsciiLines.push({ lineNum: idx + 1, key, val });
    }
  }
});

console.log("Found non-English entries in en.ts:", nonAsciiLines);
