const fs = require('fs');
const filePath = 'client/lib/i18n/en.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Find the start and end of the object
const startMatch = content.match(/export const en = \{/);
const endMatch = content.lastIndexOf('};');

if (!startMatch || endMatch === -1) {
    console.error('Could not find object boundaries');
    process.exit(1);
}

const header = content.substring(0, startMatch.index + startMatch[0].length);
const footer = content.substring(endMatch);
const body = content.substring(startMatch.index + startMatch[0].length, endMatch);

const lines = body.split('\n');
const seenKeys = new Set();
const newLines = [];

for (const line of lines) {
    const match = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (match) {
        const key = match[1];
        if (seenKeys.has(key)) {
            // Duplicate found, skip this line
            continue;
        }
        seenKeys.add(key);
    }
    newLines.push(line);
}

const newContent = header + newLines.join('\n') + footer;
fs.writeFileSync(filePath, newContent);
console.log('Duplicates removed successfully');
